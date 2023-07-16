ActiveAdmin.register Idea do

  permit_params :name, :icon, :background, :issue, :goal, :wish_function, :hypothesis, :target, :monetize, :similar, :github_url, :note, :view, :stance, :user_id, :commit, :product_url

  index do
    selectable_column
    column :id
    column :name
    column :user
    column :background
    column :issue
    column :goal
    column :note
    actions
  end

  filter :name
  filter :published_at
  filter :difficulty
  filter :likes_num
  filter :comments_num
end