require 'sidekiq/web'

Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'users/registrations',
    omniauth_callbacks: 'users/omniauth_callbacks',
    confirmations: 'users/confirmations',
    sessions: 'users/sessions'
  }

  devise_scope :user do
    get "sign_in", :to => "users/sessions#new"
    get "sign_out", :to => "users/sessions#destroy" 
  end

  root 'ideas#index'
  resources :ideas do
    collection do
      get :search
      get :tags
      get :suggest
      get :most_comment
      get :most_liked
      get :team_active
      get :deployed
    end
    member do
      post :publish
    end
  end
  resources :comments, only: %i[create edit update destroy] do
    collection do
      post :send_email
    end
  end
  resources :users, only: %i[index show] do
    collection do
      get :search
      get :commenter
      get :idea_man
    end
  end
  resources :likes, only: %i[create destroy]
  resources :teams, except: %i[destroy] do
    member do
      post :join
      post :stop
      post :activate
      post :finish
    end
  end
  resources :difficultys, only: %i[create]
  resources :notifications, only: %i[index] do
    collection do
      post :check
    end
  end
  get 'tags_popular', to: 'tags#popular'
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
  mount LetterOpenerWeb::Engine, at: '/letter_opener' if Rails.env.development?
  mount Sidekiq::Web => '/sidekiq'
end
