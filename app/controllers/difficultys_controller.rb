class DifficultysController < ApplicationController
  before_action :set_idea

  def create
    Difficulty.create!(level_params.merge(user_id: current_user.id))
    @idea.update_difficulty
    redirect_to @idea
  end

  private

  def set_idea
    @idea = Idea.find_by!(id: level_params[:idea_id])
  end

  def level_params
    params.permit(:idea_id, :level)
  end
end
