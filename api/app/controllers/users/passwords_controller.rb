# frozen_string_literal: true

class Users::PasswordsController < Devise::PasswordsController
  # TODO: 各アクションを実装したらコメントアウトを外す
  # CSRF 対策
  skip_before_action :verify_authenticity_token, only: %i[create update]
  prepend_before_action :verify_xhr_for_csrf_protection
  include AuthRateLimitable

  limit_auth_requests only: %i[create update], to: 10, within: 10.minutes, per_email: 3

  respond_to :json

  # POST /users/password
  def create
    # 登録の有無で応答を変えると他人のメールアドレスが登録済みか判別できるため、常に同じ応答を返す
    user = User.find_by(email: params[:email])
    if user.present?
      self.resource = user
      user.send_reset_password_instructions
    end
    render json: { action: 'パスワードリセット用メール送信', message: 'メールをご確認ください' }, status: :ok
  end

  # PUT /users/password
  def update
    self.resource = resource_class.reset_password_by_token(update_resource_params)

    if resource.errors.empty?
      render json: { action: 'パスワードリセット', message: 'ログインしてください' }, status: :ok
    else
      render json: { action: 'パスワードリセット', message: 'やり直してください' }, status: :unprocessable_content
    end
  end

  protected

  def update_resource_params
    params.permit(:password, :password_confirmation, :reset_password_token)
  end
end
