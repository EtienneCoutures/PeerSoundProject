class Addnewvartest < ActiveRecord::Migration[5.0]
  def change
    add_column :musics, :title, :string
    add_column :musics, :url, :string
    add_column :musics, :artist, :string
    add_column :musics, :version, :string
    add_column :musics, :txtoptional, :text
  end
end
