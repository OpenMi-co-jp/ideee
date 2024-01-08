# frozen_string_literal: true

class Users::ConfirmationsController < Devise::ConfirmationsController
  respond_to :json
  # GET /users/confirmation/new
  # def new
  #   super
  # end

  # POST users/confirmation
  def create
    user = User.send_confirmation_instructions(create_params)

    if user.errors.empty?
      render json: {}, status: :ok
    else
      render json: { message: user.errors.full_messages.join }, status: :unprocessable_entity
    end
  end

  # GET /users/confirmation?confirmation_token=abcdef
  # def show
  #   super
  # end

  # protected

  # The path used after resending confirmation instructions.
  # def after_resending_confirmation_instructions_path_for(resource_name)
  #   super(resource_name)
  # end

  # The path used after confirmation.
  # def after_confirmation_path_for(resource_name, resource)
  #   super(resource_name, resource)
  # end

  private

  def create_params
    params.permit(:email)
  end
end
