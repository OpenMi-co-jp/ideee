# frozen_string_literal: true

class CommentsController < ApplicationController
  before_action :set_comment, only: %i[edit update destroy]
  after_action :update_user_point, only: %i[create]

  def edit; end

  def create
    comment = current_user.create_comment(comment_params)
    return if comment.nil?

    idea = Idea.find(comment_params[:idea_id])
    current_user.create_notification_comment(idea, comment)
    SendCommentEmailJob.perform_later(current_user, idea, comment.description)
  end

  def update
    idea = @comment.idea
    if @comment.update!(comment_update_params)
      redirect_to idea, notice: t('.success')
    else
      flash.now[:alert] = t('.fail')
      render :edit
    end
  end

  def destroy
    @comment.destroy!
  end

  private

  def comment_params
    params.permit(:description, :idea_id, :user_id, :id)
  end

  def comment_update_params
    params.require(:comment).permit(:description)
  end

  def set_comment
    @comment = Comment.find(comment_params[:id])
  end
end
