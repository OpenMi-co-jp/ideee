class RemoveLikesIdea < ActiveRecord::Migration[6.1]
  def change
    remove_index :likes, %i[user_id idea_id], unique: true
    remove_reference :likes, :idea
  end
end
