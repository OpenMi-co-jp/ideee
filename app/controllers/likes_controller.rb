class LikesController < ApplicationController
  before_action :idea_id
  after_action :update_user_point, only: %i[create]

  def create
    like = current_user.like(@idea)
    @idea.create_notification_like(current_user, like)
  end

  def destroy
    current_user.unlike(@idea)
  end

  private

  def idea_id
    @idea = Idea.find_by!(id: params[:id])
  end
end
