class LikesController < ApplicationController
  before_action :idea_id

  def create
    current_user.like(@idea)
  end

  def destroy
    current_user.unlike(@idea)
  end

  private

  def idea_id
    @idea = Idea.find(params[:id])
  end
end
