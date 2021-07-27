Rails.application.routes.draw do
  root 'ideas#index'
  resources :ideas
  devise_for :users
  get 'login', to: 'devise/sessions#new'
  post 'login', to: 'devise/sessions#create'
  get 'logout', to: 'devise/sessions#destroy'
end
