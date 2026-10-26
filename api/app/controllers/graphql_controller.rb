class GraphqlController < ApplicationController
  protect_from_forgery with: :null_session
  # 1IPあたりの上限（通常の閲覧では届かない値。大量リクエストによる負荷を防ぐ）
  rate_limit to: 300, within: 1.minute, only: :execute,
             with: -> { render json: { errors: [{ message: 'Too many requests' }] }, status: :too_many_requests }

  # base64 の画像を含めても十分な上限。巨大なリクエストボディでのメモリ枯渇を防ぐ
  MAX_REQUEST_BYTES = 8.megabytes
  private_constant :MAX_REQUEST_BYTES

  before_action :reject_large_request, only: :execute

  def execute
    variables = prepare_variables(params[:variables])
    query = params[:query]
    operation_name = params[:operationName]
    context = {
      # Query context goes here, for example:
      current_user: current_user_from_token
    }
    result = IdeeeSchema.execute(query, variables:, context:, operation_name:)
    render json: result
  rescue StandardError => e
    raise e unless Rails.env.development?

    handle_error_in_development(e)
  end

  private

  def reject_large_request
    return if request.content_length.to_i <= MAX_REQUEST_BYTES

    render json: { errors: [{ message: 'リクエストが大きすぎます' }] }, status: :content_too_large
  end

  # Handle variables in form data, JSON body, or a blank value
  def prepare_variables(variables_param)
    case variables_param
    when String
      if variables_param.present?
        JSON.parse(variables_param) || {}
      else
        {}
      end
    when Hash
      variables_param
    when ActionController::Parameters
      variables_param.to_unsafe_hash # GraphQL-Ruby will validate name and type of incoming variables.
    when nil
      {}
    else
      raise ArgumentError, "Unexpected parameter: #{variables_param}"
    end
  end

  def handle_error_in_development(e)
    logger.error e.message
    logger.error e.backtrace.join("\n")

    render json: { errors: [{ message: e.message, backtrace: e.backtrace }], data: {} }, status: :internal_server_error
  end

  def current_user_from_token
    # NOTE: フロントからはCookieが渡されていないため必ずnilになるが、ここのコードがないとrspecの色んなところが落ちてしまうため残している(rspecのほうを修正したいがすぐにはわからなかったので)
    return current_user if current_user.present?

    token = extract_token_from_authorization
    return unless token

    decoded_token = decode_token(token)
    return unless decoded_token

    User.find_by(id: decoded_token['id'])
  rescue JWT::DecodeError
    nil
  end

  require 'cgi'
  def extract_token_from_authorization
    authorization = request.headers['Authorization']
    return if authorization.blank? || !authorization.start_with?('Bearer ')

    CGI.unescape(authorization).split('Bearer ').last.presence
  end

  def decode_token(token)
    JWT.decode(token, Rails.application.secret_key_base, true, { algorithm: 'HS256' }).first
  end

  def render_authentication_error
    render json: { error: t('devise.failure.unauthenticated') }, status: :unauthorized
  end
end
