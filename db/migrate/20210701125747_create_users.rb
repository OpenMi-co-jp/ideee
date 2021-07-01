class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :name
      t.text :description
      t.integer :point
      t.boolean :idea
      t.boolean :maker

      t.timestamps
    end
  end
end
