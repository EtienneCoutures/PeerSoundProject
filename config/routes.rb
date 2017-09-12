Rails.application.routes.draw do
  
  #get 'group/theme:string'

  get 'contact/new', as: 'contact'

  get '/search' => 'searchs#index', as: 'search'

  get '/group' => 'groups#home' , as: 'group'

  get '/groupsearch' => 'groups#index'

  get 'contact/create'

  get 'music/search' =>'musics#index', as: 'music_search'

  devise_for :users
  get 'home/homepage', as: 'home'
  root'home#homepage'

  get '/users/userlist', to: 'users#index'
  #get '/users/:id', to: 'users#show', as: 'userList'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
