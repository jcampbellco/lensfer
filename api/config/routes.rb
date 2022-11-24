Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  resources :authenticate, only: [ :create ]
  post :dev_token, to: 'authenticate#dev_token'

  resources :uploads, only: [ :index, :create ] do
    put :confirm, to: 'uploads#confirm'
  end
end
