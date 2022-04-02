class CreateTeams < ActiveRecord::Migration[6.1]
  def change
    create_table :teams do |t|
      t.integer :owner_id, null: false
      t.references :idea, null: false, foreign_key: true
      t.integer :status, null: false, default: 0
      t.string :requirement, null: false
      t.string :offer, null: false
      t.timestamps
    end
    add_index :teams, %i[status owner_id]
  end
end
