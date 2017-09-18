class MusicsController < ApplicationController

  def index
    query = params[:search]
    if params[:search]
      @musics = Music.where('title LIKE ?', "%#{query}%")
      #@artists = Music.where('artist LIKE ?', "%#{query}%")
    end
  end

  def my_search
  end

end
