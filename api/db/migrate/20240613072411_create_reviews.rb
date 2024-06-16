class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews, comment: 'レビュー' do |t|
      t.references :idea, null: false, foreign_key: true, description: 'アイデアオブジェクト'
      t.text :content, null: false, description: 'レビュー内容'
      t.integer :stance, description: 'レビュータイプ'

      t.timestamps
    end
  end
end
