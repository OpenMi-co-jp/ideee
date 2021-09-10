module DeviseHelper
  def omni_sign_up(provider)
    image_tag "#{provider}_icon.png", class: "#{provider}-sign-up"
  end
end
