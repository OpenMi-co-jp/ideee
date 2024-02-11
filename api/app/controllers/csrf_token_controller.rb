class CsrfTokenController < ApplicationController
  def show
    render json: { csrf_token: form_authenticity_token }, status: :ok
  end
end
