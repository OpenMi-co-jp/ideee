class CommentsController < ApplicationController
  before_action :set_comment, only: %i[edit update destroy]
  after_action :update_user_point, only: %i[create]

  def create
    comment = current_user.create_comment(comment_params)
    return if comment.nil?

    idea = Idea.find_by!(id: comment_params[:idea_id])
    current_user.create_notification_comment(idea, comment)
  end

  def edit; end

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
    @comment.idea.count_comments
  end

  def send_email
    return unless Rails.env.production?

    @idea = Idea.find_by!(id: comment_params[:idea_id])
    @users = [@idea.user].push(@idea.comment_users.uniq).flatten
    @users.delete(current_user)
    return if @users.nil?

    SendEmail.new.comment(@users, current_user, @idea, comment_params[:description])
  end

  private

  def comment_params
    params.permit(:description, :idea_id, :user_id, :id)
  end

  def comment_update_params
    params.require(:comment).permit(:description)
  end

  def set_comment
    @comment = Comment.find_by!(id: comment_params[:id])
  end
end
