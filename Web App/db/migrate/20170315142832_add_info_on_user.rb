class AddInfoOnUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :birthdate, :datetime
    add_column :users, :sex, :integer
    add_column :users, :job, :string
    add_column :users, :address_1, :string
    add_column :users, :address_2, :string
    add_column :users, :pers_msg, :text
  end
end
