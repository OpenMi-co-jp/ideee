class CsrfTokenController < ApplicationController
  skip_before_action :verify_authenticity_token, only: %i[create]

  def create
    response.set_header('X-CSRF-Token', form_authenticity_token)
    head :ok
  end
end
