# frozen_string_literal: true

class DeviseTokenAuth::ConfirmationsController < DeviseTokenAuth::ApplicationController
  # GET /auth/confirmation?confirmation_token=abcdef
  def show
    resource = resource_class.confirm_by_token(params[:confirmation_token])

    if resource.errors.empty?
      front_uri = Rails.application.config.frontend_url

      redirect_to "#{front_uri}/user/confirm"
    else
      render json: { errors: resource.errors }, status: :unprocessable_entity
    end
  end
end
