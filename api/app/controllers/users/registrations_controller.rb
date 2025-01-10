# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  # CSRF 対策
  skip_before_action :verify_authenticity_token, only: %i[create update]
  prepend_before_action :verify_xhr_for_csrf_protection

  before_action :configure_sign_up_params, only: [:create]
  before_action :configure_account_update_params, only: [:update]
  before_action :underscore_params!
  respond_to :json

  # GET /resource/sign_up
  # def new
  #   super
  # end

  # POST /resource
  def create
    resource = build_resource(sign_up_params)
    if resource.save!
      if resource.active_for_authentication?
        sign_up(resource_name, resource)
        response.set_header('Authorization', resource.generate_jwt_token)
        render json: { action: 'ユーザー作成', message: 'ユーザー作成・ログインに成功しました' }, status: :created
      else
        expire_data_after_sign_in!
        render json: { action: 'ユーザー作成', message: '確認用メールをご確認ください' }, status: :ok
      end
    else
      clean_up_passwords(resource)
      set_minimum_password_length
      render json: { success: false, errors: resource.errors.full_messages }, status: :unprocessable_entity
    end

    return unless Rails.env.production? && resource.present?

    user_url = "#{Rails.application.config.frontend_url}/users/#{resource.id}"
    Slack::SendNewJob.perform_later(resource, user_url)
  rescue StandardError => e
    Sentry.capture_exception(e)
    render json: { success: false, error: 'An error occurred while creating the user.' }, status: :internal_server_error
  end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  def update
    super
    return if resource.defined

    bool = resource.name.present? && resource.confirmed_at.present? && resource.definition.present?
    resource.update_column(:defined, bool)
  end

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
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[email password password_confirmation remember_me])
  end

  def configure_account_update_params
    devise_parameter_sanitizer.permit(
      :account_update,
      keys: %i[name email icon description definition twitter_id github_id site_url]
    )
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

  def after_update_path_for(_resource)
    user_path(@user.id)
  end

  def sign_up_params
    params.require(:registration).permit(:email, :password, :password_confirmation)
  end

  def underscore_params!
    params.deep_transform_keys!(&:underscore)
  end
end
