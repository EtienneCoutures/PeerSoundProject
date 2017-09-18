class CreateMusics < ActiveRecord::Migration[5.0]
  def change
    create_table :musics do |t|
      t.references :group, foreign_key: true

      t.timestamps
    end
  end
end
