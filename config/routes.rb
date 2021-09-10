Rails.application.routes.draw do
  root 'ideas#index'
  resources :ideas
  devise_for :users, controllers: {
    registrations: 'users/registrations',
    omniauth_callbacks: 'users/omniauth_callbacks',
    confirmations: "users/confirmations"
  }
  resources :users, only: %i[index show]
  get 'login', to: 'devise/sessions#new'
  post 'login', to: 'devise/sessions#create'
  get 'logout', to: 'devise/sessions#destroy'
  get 'privacy_policy' => 'high_voltage/pages#show', id: 'privacy_policy'
  get 'terms_of_service' => 'high_voltage/pages#show', id: 'terms_of_service'
end
