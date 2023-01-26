class ApplicationController < ActionController::Base
  before_action :store_user_location!, if: :storable_location?
  before_action :get_notifications, if: :defined_user?

  # deviseでログインした後の設定
  def after_sign_in_path_for(resource_or_scope)
    if resource.defined # ユーザー情報が登録されているか確認
      stored_location_for(resource_or_scope) || super
    else
      edit_user_registration_path(resource)
    end
  end

  # 本番環境でのエラーハンドリング
  if Rails.env.production?
    rescue_from StandardError, with: :render500
    rescue_from ActiveRecord::RecordNotFound, with: :render404
  end

  def render404
    render file: Rails.public_path.join('404.html'), status: :not_found, layout: false, content_type: 'text/html'
  end

  def render500
    render file: Rails.public_path.join('500.html'), status: :internal_server_error, layout: false,
           content_type: 'text/html'
  end

  protected

  # ユーザー情報が登録されているか確認し、アラートで登録必須項目を表示
  def defined_check
    return if defined_user?

    redirect_to edit_user_registration_path(params[:id])
    flash[:alert] = 'ユーザーの名前を登録してください。' if current_user.name.blank?
    flash[:alert] = 'ユーザーのメールアドレスを確認が完了していません。' if current_user.confirmed_at.blank?
    flash[:alert] = 'ユーザーのタイプを登録してください。' if current_user.definition.blank?
  end

  def store_user_location!
    store_location_for(:user, request.fullpath)
  end

  def storable_location?
    # after_sign_outのフレンドリーフォワーディングを使うときはこの行を削除
    return false if current_user

    request.get? && is_navigational_format? && !devise_controller? && !request.xhr?
  end

  def get_notifications
    @header_notifications = current_user.passive_notifications
                                        .eager_load(%i[visitor idea])
                                        .order(created_at: :desc)
                                        .limit(5)
  end

  def defined_user?
    current_user&.defined
  end

  def update_user_point
    UserJob::UpdatePointJob.perform_later(current_user) # Contributionの計算/更新
  end
end
