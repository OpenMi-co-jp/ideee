ActiveAdmin.register Idea do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  filter :name
  filter :published_at
  filter :difficulty
  filter :likes_num
  filter :comments_num
end