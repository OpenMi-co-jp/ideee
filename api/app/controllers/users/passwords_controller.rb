# frozen_string_literal: true

class Users::PasswordsController < Devise::PasswordsController
  # TODO: 各アクションを実装したらコメントアウトを外す
  # CSRF 対策
  skip_before_action :verify_authenticity_token, only: %i[create update]
  prepend_before_action :verify_xhr_for_csrf_protection

  respond_to :json

  # GET /resource/password/new
  # def new
  #   super
  # end

  # POST /resource/password
  def create
    super
    user = User.find_by(email: params[:email])
    if user.present?
      user.send_reset_password_insturction
      render json: { action: 'パスワードリセット用メール送信', message: 'メールをご確認ください' }, status: :ok
    else
      render json: { message: '送信できませんでした。' }, status: :unprocessable_entity
    end
  end

  # GET /resource/password/edit?reset_password_token=abcdef
  # def edit
  #   super
  # end

  # PUT /resource/password
  # def update
  #   super
  # end

  # protected

  # def after_resetting_password_path_for(resource)
  #   super(resource)
  # end

  # The path used after sending reset password instructions
  # def after_sending_reset_password_instructions_path_for(resource_name)
  #   super(resource_name)
  # end
end
