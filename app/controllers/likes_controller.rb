class LikesController < ApplicationController
  before_action :item_id
  after_action :update_user_point, only: %i[create]
  before_action :authenticate_user!
  after_action :count_idea_likes

  def create
    like = Like.find_or_create_by!(likable: @item, user: current_user)
    current_user.create_notification_with_notificationable_type(@item, "Like#{like.likable_type}")
  end

  def destroy
    Like.find_by(likable: @item, user: current_user).destroy
  end

  private

  def item_id
    @item =
      if params[:type] == 'Idea'
        Idea.find(params[:id])
      else
        Comment.find(params[:id])
      end
  end

  def count_idea_likes
    return unless @item.is_a?(Idea)

    @item.count_likes
  end
end
