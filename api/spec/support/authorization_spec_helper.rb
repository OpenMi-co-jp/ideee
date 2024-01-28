# frozen_string_literal: true

module AuthorizationSpecHelper
  def sign_in(user)
    post user_session_path, params: {
      email: user.email,
      password: user.password
    },
    xhr: true

    response.headers.slice('client', 'access-token', 'uid', 'authorization')
  end
end
