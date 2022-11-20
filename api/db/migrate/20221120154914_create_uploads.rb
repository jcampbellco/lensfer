class CreateUploads < ActiveRecord::Migration[7.0]
  def change
    create_table :uploads, id: :uuid do |t|
      t.uuid :user_id
      t.uuid :parent_id
      t.string :key
      t.timestamps
      t.datetime :deleted_at
    end

    add_foreign_key :uploads, :users
    add_foreign_key :uploads, :uploads, column: :parent_id
  end
end
