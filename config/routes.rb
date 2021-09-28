Rails.application.routes.draw do
  root 'ideas#index'
  resources :ideas do
    collection do
      get 'search'
    end
  end
  resources :comments, only: %i[create edit destroy]
  devise_for :users, controllers: {
    registrations: 'users/registrations',
    omniauth_callbacks: 'users/omniauth_callbacks',
    confirmations: "users/confirmations"
  }
  resources :users, only: %i[index show] do
    collection do
      get 'search'
    end
  end
  resources :likes, only: %i[create destroy]
  get 'login', to: 'devise/sessions#new'
  post 'login', to: 'devise/sessions#create'
  get 'logout', to: 'devise/sessions#destroy'
  get 'privacy_policy' => 'high_voltage/pages#show', id: 'privacy_policy'
  get 'terms_of_service' => 'high_voltage/pages#show', id: 'terms_of_service'
  get 'frequent_questions' => 'high_voltage/pages#show', id: 'frequent_questions'
end
