class MessagesController < ApplicationController
  before_action :set_message, only: %i[edit update destroy]
  after_action :update_user_point, only: %i[create]

  def create
    Message.create!(room_id: params[:room_id], user: current_user, content: message_params[:content])
    redirect_to room_path(@room), notice: t('.success')
  end

  def edit; end

  def update
    if @message.update!(message_update_params)
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
    @message = Message.find_by!(id: message_params[:id])
  end
end
