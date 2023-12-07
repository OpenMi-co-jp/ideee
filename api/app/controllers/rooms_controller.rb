# frozen_string_literal: true

class RoomsController < ApplicationController
  before_action :authenticate_user!
  def create
    @room = Room.create!(team_id: room_params[:team_id])
    redirect_to @room, notice: t('.success')
  end

  private

  def room_params
    params.permit(:team_id)
  end
end
