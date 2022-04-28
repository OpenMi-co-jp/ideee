class LikesController < ApplicationController
  before_action :item_id
  after_action :update_user_point, only: %i[create]
  after_action :count_idea_likes

  def create
    like = Like.find_or_create_by!(likable: @item, user: current_user)
    current_user.create_notification_like(@item, like)
  end

  def destroy
    Like.find_by(likable: @item, user: current_user).destroy
  end

  private

  def item_id
    @item =
      if params[:type] == 'Idea'
        Idea.find_by!(id: params[:id])
      else
        Comment.find_by!(id: params[:id])
      end
  end

  def count_idea_likes
    return unless @item.is_a?(Idea)

    @item.count_likes
  end
end
