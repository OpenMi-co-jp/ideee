class CommentsController < ApplicationController
  before_action :set_comment, only: %i[edit update destroy]
  def create
    current_user.create_comment(comment_params)
  end

  def edit; end

  def update
    @idea = Idea.find(@comment.idea.id)
    if @comment.update(comment_update_params)
      redirect_to @idea
    else
      render :edit
    end
  end

  def destroy
    @comment.destroy
  end

  def send_email
    @idea = Idea.find(comment_params[:idea_id])
    @users = [@idea.user].push(@idea.comment_users.uniq).flatten
    @users.delete(current_user)
    return if @users.nil?
    SendEmail.new.comment(@users, @idea, comment_params[:description])
  end

  private

  def comment_params
    params.permit(:description, :idea_id)
  end

  def comment_update_params
    params.require(:comment).permit(:description)
  end

  def set_comment
    @comment = Comment.find(params[:id])
  end
end
