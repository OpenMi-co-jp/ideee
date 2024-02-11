class CsrfTokenController < ApplicationController
  skip_before_action :verify_authenticity_token, only: %i[create]

  def create
    render json: { csrf_token: form_authenticity_token }, status: :ok
  end
end
