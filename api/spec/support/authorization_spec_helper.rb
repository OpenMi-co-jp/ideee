# frozen_string_literal: true

module AuthorizationSpecHelper
  def sign_in(user)
    token = user.generate_access_token
    { 'Authorization' => token }
  end
end
