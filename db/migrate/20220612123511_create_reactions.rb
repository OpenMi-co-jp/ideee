class CreateReactions < ActiveRecord::Migration[6.1]
  def change
    create_table :reactions do |t|
      t.text :emoji
      t.references :user, null: false, foreign_key: true
      t.references :reactionable, polymorphic: true, null: false

      t.timestamps
    end
  end
end
