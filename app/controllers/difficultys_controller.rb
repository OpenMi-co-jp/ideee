class DifficultysController < ApplicationController
  before_action :idea_id

  def create
    Difficulty.create!(user_id: current_user.id, idea_id: @idea.id, level: params[:difficulty][:level] )
  end

  private

  def idea_id
    @idea = Idea.find(params[:difficulty][:idea_id])
  end
end
