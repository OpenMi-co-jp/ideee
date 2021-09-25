class CommentsController < ApplicationController
  def create
    current_user.create_comment(comment_params)
  end

  def edit; end

  def destroy
    @comment = current_user.comments.find(params[:id])
    @comment.destroy
  end

  private

  def comment_params
    params.permit(:description, :idea_id)
  end
end
