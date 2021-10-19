# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  before_action :configure_sign_up_params, only: [:create]
  before_action :configure_account_update_params, only: [:update]

  # GET /resource/sign_up
  # def new
  #   super
  # end

  # POST /resource
  def create
    super
    SlackNotifier.new.send(resource, user_url(resource&.id))
  end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  # def update
    # super
    # current_user.active_relationships.update(update_params)
  # end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  protected

  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:email, :password, :password_confirmation, :remember_me])
  end

  def configure_account_update_params
    devise_parameter_sanitizer.permit(:account_update, keys: [:name, :email, :icon, :description, :definition, :twitter_id, :site_url])
  end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end

  # Updateメソッドでストロングパラメーターを設定
  def update_params
    params.require(:user).permit(:name, :email, :icon, :description, :definition)
  end

  def update_resource(resource, params)
    resource.update_without_password(params)
  end

  def after_update_path_for(resource)
    user_path(@user.id)
  end

  # def sign_up_params
  #   params.permit(:name, :email, :password, :password_confirmation, :icon, :description, :definition)
  # end

  # def account_update_params
  #   params.permit(:name, :email, :icon, :description, :definition)
  # end
end
