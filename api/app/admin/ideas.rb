ActiveAdmin.register Idea do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  permit_params :name, :icon, :background, :issue, :goal, :wish_function, :hypothesis, :target, :monetize, :similar, :github_url, :note, :view, :stance, :user_id, :commit, :product_url

  filter :name
  filter :published_at
  filter :difficulty
  filter :likes_num
  filter :comments_num
end