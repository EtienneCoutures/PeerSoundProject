class Music < ApplicationRecord
  belongs_to :group
  include SourceConstants
  
  def search(search)
    where("title LIKE ?", "%#{search}%") 
    where("artist LIKE ?", "%#{search}%")
    Rails.logger.debug("Ok je suis la")
  end

end
