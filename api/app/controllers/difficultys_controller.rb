# frozen_string_literal: true

class DifficultysController < ApplicationController
  before_action :set_idea

  def create
    difficulty = Difficulty.create!(level_params)
    IdeaJob::UpdateDifficultyJob.perform_later(@idea.id)
    Notifications::UpdateDifficultyJob.perform_later(current_user, difficulty) unless current_user == @idea.user
    redirect_to @idea
  end

  private

  def set_idea
    @idea = Idea.find(level_params[:idea_id])
  end

  def level_params
    params.permit(:idea_id, :level).merge(user: current_user)
  end
end
