ActiveAdmin.register User do
  permit_params :email, :name, :description, :point, :icon, :definition, :twitter_id, :provider, :uid, :remote_url, :site_url, :defined, :sign_in_count, :current_sign_in_at,
:last_sign_in_at, :current_sign_in_ip, :last_sign_in_ip, :github_id, :ideas_num, :tokens, :allow_password_change

  index do
    selectable_column
    column :email
    column :name
    column :definition
    actions
  end

  filter :name
  filter :email
  filter :definition
  filter :created_at
  filter :ideas_num
  filter :point
end
