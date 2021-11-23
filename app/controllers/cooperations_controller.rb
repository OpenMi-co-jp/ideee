class CooperationsController < ApplicationController
  before_action :authenticate_user!
  before_action :defined_check
  before_action :set_idea

  def create
    current_user.cooperations.find_or_create_by(idea: @idea)
    redirect_to @idea, notice: t('.success')
  end

  def destroy
    current_user.cooperations.find_by(idea: @idea).destroy
    redirect_to @idea, notice: t('.success')
  end

  private

  def set_idea
    @idea = Idea.find(params[:idea_id])
  end
end
