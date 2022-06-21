class RoomsController < ApplicationController
  prepend_before_action :set_room, only: %i[show]

  def create
    @room = Room.create(team_id: room_params[:team_id])
    redirect_to @room, notice: t('.success')
  end

  def show
    @team = @room.team
    @message = Message.new
    @messages = @room.messages.includes(:user)
  end

  private

  def set_room
    @room = Room.find_by!(id: params[:id])
  end

  def room_params
    params.permit(:team_id)
  end
end
