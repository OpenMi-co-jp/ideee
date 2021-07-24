Rails.application.routes.draw do
  root 'ideas#index'
  resources :ideas
  devise_for :users
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  get '/logout', to: 'sessions#destroy'
end
