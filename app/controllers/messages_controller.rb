class MessagesController < ApplicationController
  before_action :set_message, only: %i[edit update destroy]

  def create
    message = Message.create!(room_id: params[:room_id], user: current_user, content: message_params[:content])
    NotificationMessageJob.perform_now(message)
    redirect_to message.room, notice: t('.success')
  end

  def edit; end

  def update
    if @message.update(message_params)
      redirect_to @message.room, notice: t('.success')
    else
      flash.now[:alert] = t('.fail')
      render :edit
    end
  end

  def destroy
    @message.destroy!
  end

  private

  def message_params
    params.require(:message).permit(:id, :content, :user_id)
  end

  def set_message
    @message = Message.find_by!(id: params[:id])
  end
end
