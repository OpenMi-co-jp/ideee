# frozen_string_literal: true

class Users::ConfirmationsController < Devise::ConfirmationsController
  # CSRF 対策
  skip_before_action :verify_authenticity_token, only: %i[create]
  prepend_before_action :verify_xhr_for_csrf_protection

  respond_to :json

  # GET /users/confirmation/new
  # def new
  #   super
  # end

  # GET /users/confirmation?confirmation_token=abcdef
  def show
    user = User.confirm_by_token(params[:confirmation_token])
    redirect_to "#{Rails.application.config.frontend_url}/users/sign_in?confirmed=#{user.valid?}"
  end

  # POST /users/confirmation
  def create
    user = User.send_confirmation_instructions(create_params)

    if user.errors.empty?
      head :ok
    else
      # NOTE: 普通に user.errors.full_messages を返したいが、それだと以下のように状況に応じたメッセージが出てしまい、
      #       他人のメールアドレスが ideee に存在することを確認できてしまうので、どっちとも取れないようなメッセージを固定で返している
      #       - 未登録の場合:         Eメールは見つかりませんでした。
      #       - 登録済かつ確認済の場合: メールは既に登録済みです。ログインしてください。
      #       ref. https://github.com/naru20181117/ideee/pull/1264#discussion_r1457285509
      render json: { message: '送信できませんでした。既に確認済み、もしくはメールアドレスに誤りがあります。' }, status: :unprocessable_entity
    end
  end

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
