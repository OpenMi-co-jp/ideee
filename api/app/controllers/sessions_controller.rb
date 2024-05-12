class SessionsController < ApplicationController
  def create
    response.set_header('Authorization', current_user.generate_jwt_token) if signed_in?
    head :ok
  end
end
