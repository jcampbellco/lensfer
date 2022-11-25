class AddStatsToUploads < ActiveRecord::Migration[7.0]
  def change
    change_table :uploads do |t|
      t.jsonb :stats
    end
  end
end
