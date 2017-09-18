class Group < ApplicationRecord
  
  has_many :musics
  has_and_belongs_to_many :users

end
