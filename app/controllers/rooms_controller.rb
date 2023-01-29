class RoomsController < ApplicationController
  before_action :authenticate_user!
  prepend_before_action :set_room, only: %i[show]

  def show
    @team = @room.team
    redirect_to @team, notice: t('.not_joined') unless @team.joined?(current_user)

    @message = Message.new
    @messages = @room.messages.eager_load(:user, :rich_text_content)
  end

  def create
    @room = Room.create(team_id: room_params[:team_id])
    redirect_to @room, notice: t('.success')
  end

  private

  def set_room
    @room = Room.find(params[:id])
  end

  def room_params
    params.permit(:team_id)
  end
end
