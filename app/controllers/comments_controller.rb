class CommentsController < ApplicationController

  def create
    current_user.create_comment(comment_params)
  end

  def edit; end

  def destroy
    @comment = Comment.find(params[:id])
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
end
