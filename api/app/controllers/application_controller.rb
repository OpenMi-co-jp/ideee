# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include ActionController::RequestForgeryProtection

  prepend_before_action :valid_allowed_request_origin
  # before_action :store_user_location!, if: :storable_location?
  # before_action :get_notifications, if: :defined_user?
  protect_from_forgery with: :exception

  # TODO: Reactで再設定
  # deviseでログインした後の設定
  # def after_sign_in_path_for(resource_or_scope)
  #   if resource.defined # ユーザー情報が登録されているか確認
  #     stored_location_for(resource_or_scope) || super
  #   else
  #     edit_user_registration_path(resource)
  #   end
  # end

  def render404
    render file: Rails.public_path.join('404.html'), status: :not_found, layout: false, content_type: 'text/html'
  end

  def render500
    render file: Rails.public_path.join('500.html'), status: :internal_server_error, layout: false,
           content_type: 'text/html'
  end

  protected

  # ユーザー情報が登録されているか確認し、アラートで登録必須項目を表示
  # def defined_check
  #   return if defined_user?

  #   redirect_to edit_user_registration_path(params[:id])
  #   Rails.logger.debug 'ユーザーの名前を登録してください。' if current_user.name.blank?
  #   Rails.logger.debug 'ユーザーのメールアドレスを確認が完了していません。' if current_user.confirmed_at.blank?
  #   Rails.logger.debug 'ユーザーのタイプを登録してください。' if current_user.definition.blank?
  # end

  def store_user_location!
    store_location_for(:user, request.fullpath)
  end

  def storable_location?
    # after_sign_outのフレンドリーフォワーディングを使うときはこの行を削除
    return false if current_user

    request.get? && is_navigational_format? && !devise_controller? && !request.xhr?
  end

  # def get_notifications
  #   @header_notifications = current_user.passive_notifications
  #                                       .eager_load(%i[visitor idea])
  #                                       .order(created_at: :desc)
  #                                       .limit(5)
  # end

  # def defined_user?
  #   current_user&.defined
  # end

  def update_user_point
    UserJob::UpdatePointJob.perform_later(current_user) # Contributionの計算/更新
  end

  # NOTE: CSRF 対策
  #       ログイン時は JWT で対策ができているが、未ログイン時は対策できていないので対応
  #       フロントで固有の HTTP ヘッダを付与することで、以下のように対策する (もっといいやり方があれば変更してください)
  #       - 他サイトから HTML フォーム送信されても、 HTTP ヘッダを付与できないので、 xhr ではなくなる
  #       - 他サイトから同じヘッダをつけたリクエストが飛んできても、プリフライトリクエストと CORS の設定により遮断できる
  #       ref. https://qiita.com/mpyw/items/0595f07736cfa5b1f50c
  def verify_xhr_for_csrf_protection
    return unless request.method.in?(%w[POST PUT PATCH DELETE])
    return if request.xhr?

    render json: { message: '操作が許可されていません。' }, status: :forbidden
  end

  # NOTE: RequestForgeryProtection#valid_request_origin? を拡張したチェックをしている
  #       ※ 許可する origin は cors.rb に揃える
  #
  #       拡張している理由は以下。
  #       - API モードのため、別 origin だと RequestForgeryProtection#valid_request_origin? が必ず false になる
  #       - このため、 config.action_controller.forgery_protection_origin_check = false としている
  #       - これだと CSRF 検証のなかでは origin チェックが全くされなくなる
  #       - それは避けたいため、別 origin でも cors.rb で許可している origin だけ許容するようにしたい
  def valid_allowed_request_origin
    return if request.get? || request.head?
    return if valid_request_origin?
    # TODO: 本番へ移行時にドメイン設定を変更 (cors.rb と同様)
    return if request.origin.in?(%w[http://localhost:3010 https://ideee.vercel.app])
    return if request.origin.match?(/ideee-(.*)-narucel\.vercel\.app/)

    render json: { message: "HTTP Origin header (#{request.origin}) didn't match request.base_url (#{request.base_url})" },
           status: :forbidden
  end
end
