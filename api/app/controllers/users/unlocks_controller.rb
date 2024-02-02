# frozen_string_literal: true

class Users::UnlocksController < Devise::UnlocksController
  # TODO: 各アクションを実装したらコメントアウトを外す
  # CSRF 対策
  # skip_before_action :verify_authenticity_token, only: %i[create]
  # prepend_before_action :verify_xhr_for_csrf_protection

  respond_to :json

  # GET /resource/unlock/new
  # def new
  #   super
  # end

  # POST /resource/unlock
  # def create
  #   super
  # end

  # GET /resource/unlock?unlock_token=abcdef
  # def show
  #   super
  # end

  # protected

  # The path used after sending unlock password instructions
  # def after_sending_unlock_instructions_path_for(resource)
  #   super(resource)
  # end

  # The path used after unlocking the resource
  # def after_unlock_path_for(resource)
  #   super(resource)
  # end
end
