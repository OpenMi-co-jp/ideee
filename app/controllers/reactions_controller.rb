class ReactionsController < ApplicationController
  before_action :item_id
  after_action :update_user_point, only: %i[create]
  before_action :authenticate_user!

  def create
    reaction = Reaction.find_or_create_by!(reactionable: @item, user: current_user, emoji: params[:emoji])
  end

  def destroy
    Reaction.find_by(reactionable: @item, user: current_user).destroy
  end

  private

  def item_id
    @item = Comment.find_by!(id: params[:id])
  end

end
