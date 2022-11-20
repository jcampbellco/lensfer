class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users, id: :uuid do |t|
      t.string :name
      t.string :email, index: { unique: true, name: 'users_email_unique' }
      t.string :google_id
      t.string :icon_path
      t.string :status
      t.timestamps
    end
  end
end
