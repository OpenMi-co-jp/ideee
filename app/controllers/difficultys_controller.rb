class DifficultysController < ApplicationController
  before_action :set_idea

  def create
    difficulty = Difficulty.create!(level_params)
    IdeaJob.UpdateDifficultyJob.perform_later(@idea.id)
    Notifications::UpdateDifficultyJob.perform_later(current_user, difficulty)
    redirect_to @idea
  end

  private

  def set_idea
    @idea = Idea.find_by!(id: level_params[:idea_id])
  end

  def level_params
    params.permit(:idea_id, :level).merge(user: current_user)
  end
end
