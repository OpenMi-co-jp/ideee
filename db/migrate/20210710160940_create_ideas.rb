class CreateIdeas < ActiveRecord::Migration[6.1]
  def change
    create_table :ideas do |t|
      t.string :name
      t.text :note
      t.string :icon
      t.text :note
      t.integer :view

      t.timestamps
    end
  end
end
