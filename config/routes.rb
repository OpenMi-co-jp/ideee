require 'sidekiq/web'

Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'users/registrations',
    omniauth_callbacks: 'users/omniauth_callbacks',
    confirmations: "users/confirmations"
  }
  root 'ideas#index'
  resources :ideas do
    collection do
      get 'search'
      get 'tags'
    end
    member do
      post 'publish'
    end
  end
  resources :comments, only: %i[create edit update destroy] do
    collection do
      post 'send_email'
    end
  end
  resources :users, only: %i[index show] do
    collection do
      get 'search'
    end
  end
  resources :likes, only: %i[create destroy]
  resources :cooperations, only: %i[index new create destroy] do
    collection do
      post 'start'
      post 'complete'
      post 'restart'
    end
  end
  resources :difficultys, only: %i[create]
  resources :notifications, only: %i[index]
  get 'login', to: 'devise/sessions#new'
  post 'login', to: 'devise/sessions#create'
  get 'logout', to: 'devise/sessions#destroy'
  get 'about' => 'high_voltage/pages#show', id: 'about'
  get 'privacy_policy' => 'high_voltage/pages#show', id: 'privacy_policy'
  get 'terms_of_service' => 'high_voltage/pages#show', id: 'terms_of_service'
  get 'frequent_questions' => 'high_voltage/pages#show', id: 'frequent_questions'
  get 'how_to_find_idea' => 'high_voltage/pages#show', id: 'how_to_find_idea'
  get 'new_year_event' => 'high_voltage/pages#show', id: 'new_year_event'
  get 'events/valentine' => 'high_voltage/pages#show', id: 'events/valentine'
  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: "/letter_opener"
  end
  mount Sidekiq::Web => '/sidekiq'
end
