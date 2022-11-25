Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  get '/:id.:ext', to: 'view#show', constraints: { id: /[A-Za-z0-9]{8}/, ext: /[A-Za-z0-9]{3}/ }

  resources :authenticate, only: [ :create ]
  post :dev_token, to: 'authenticate#dev_token'

  resources :uploads, only: [ :index, :create ] do
    put :confirm, to: 'uploads#confirm'
  end
end
