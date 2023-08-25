class CreateActiveAdminComments < ActiveRecord::Migration[7.0]
  def up
    create_table :active_admin_comments, comment: 'Table of admin comment' do |t|
      t.string :namespace
      t.text   :body
      t.references :resource, polymorphic: true
      t.references :author, polymorphic: true
      t.timestamps
    end
    add_index :active_admin_comments, [:namespace]
  end

  def down
    drop_table :active_admin_comments
  end
end
