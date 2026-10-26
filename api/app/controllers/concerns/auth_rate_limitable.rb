# frozen_string_literal: true

# ログイン・パスワードリセットなど、総当たりやメール爆撃の対象になるアクションの回数制限
module AuthRateLimitable
  extend ActiveSupport::Concern

  class_methods do
    def limit_auth_requests(only:, to:, within:, per_email: nil)
      rate_limit to:, within:, only:, name: 'ip', with: -> { render_too_many_requests }
      return unless per_email

      rate_limit to: per_email, within:, only:, name: 'email',
                 by: -> { params[:email].to_s.strip.downcase.presence || request.remote_ip },
                 with: -> { render_too_many_requests }
    end
  end

  private

  def render_too_many_requests
    render json: { message: 'リクエストが多すぎます。しばらく時間をおいてからお試しください。' }, status: :too_many_requests
  end
end
