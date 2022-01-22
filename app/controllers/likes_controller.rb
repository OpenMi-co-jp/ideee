class LikesController < ApplicationController
  before_action :idea_id

  def create
    current_user.like(@idea)
    @idea.create_notification_like!(current_user)
  end

  def destroy
    current_user.unlike(@idea)
  end

  private

  def idea_id
    @idea = Idea.find_by!(id: params[:id])
  end
end
