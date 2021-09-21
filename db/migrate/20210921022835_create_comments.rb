class CreateComments < ActiveRecord::Migration[6.1]
  def change
    create_table :comments do |t|
      t.text :description
      t.string :type
      t.references :user, null: false, foreign_key: true
      t.references :like, null: false, foreign_key: true

      t.timestamps
    end
  end
end
