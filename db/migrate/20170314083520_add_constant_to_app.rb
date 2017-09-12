class AddConstantToApp < ActiveRecord::Migration[5.0]
  def change
    add_column :musics, :source, :integer
  end
end
