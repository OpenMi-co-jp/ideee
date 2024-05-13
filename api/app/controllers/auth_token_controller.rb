class AuthTokenController < ApplicationController
  def create
    if signed_in?
      response.set_header('Authorization', current_user.generate_jwt_token)
      head :ok
    else
      head :unauthorized
    end
  end
end
