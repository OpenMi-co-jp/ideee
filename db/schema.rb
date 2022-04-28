# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_04_23_072228) do

  create_table "action_text_rich_texts", charset: "utf8mb4", force: :cascade do |t|
    t.string "name", null: false
    t.text "body", size: :long
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["record_type", "record_id", "name"], name: "index_action_text_rich_texts_uniqueness", unique: true
  end

  create_table "active_storage_attachments", charset: "utf8mb4", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", charset: "utf8mb4", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "analytics", charset: "utf8mb4", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "comments", charset: "utf8mb4", force: :cascade do |t|
    t.text "description", null: false
    t.bigint "user_id", null: false
    t.bigint "idea_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["idea_id"], name: "index_comments_on_idea_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "difficulties", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "idea_id", null: false
    t.integer "level", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["idea_id"], name: "index_difficulties_on_idea_id"
    t.index ["user_id", "idea_id"], name: "index_difficulties_on_user_id_and_idea_id", unique: true
    t.index ["user_id"], name: "index_difficulties_on_user_id"
  end

  create_table "ideas", charset: "utf8mb4", force: :cascade do |t|
    t.string "name"
    t.string "icon"
    t.text "note"
    t.integer "view", default: 0
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id", null: false
    t.integer "likes_num", default: 0
    t.integer "difficulty", default: 0
    t.boolean "draft", default: false
    t.integer "comments_num", default: 0
    t.string "product_url"
    t.integer "product_apply", default: 0
    t.datetime "published_at"
    t.string "background"
    t.string "goal"
    t.string "issue"
    t.string "wish_function"
    t.string "hypothesis"
    t.string "target"
    t.string "similar"
    t.datetime "emailed_at", comment: "weeklyメールで新規アイデアとして送られた日時"
    t.index ["user_id"], name: "index_ideas_on_user_id"
  end

  create_table "likes", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "idea_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "likable_type", null: false
    t.bigint "likable_id", null: false
    t.index ["idea_id"], name: "index_likes_on_idea_id"
    t.index ["likable_type", "likable_id"], name: "index_likes_on_likable"
    t.index ["user_id", "idea_id"], name: "index_likes_on_user_id_and_idea_id", unique: true
    t.index ["user_id"], name: "index_likes_on_user_id"
  end

  create_table "notifications", charset: "utf8mb4", force: :cascade do |t|
    t.integer "visitor_id"
    t.integer "visited_id"
    t.integer "idea_id"
    t.boolean "checked", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "notificatable_id"
    t.string "notificatable_type"
    t.index ["notificatable_id", "notificatable_type"], name: "index_notifications_on_notificatable_id_and_notificatable_type"
  end

  create_table "taggings", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "idea_id", null: false
    t.bigint "tag_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["idea_id", "tag_id"], name: "index_taggings_on_idea_id_and_tag_id", unique: true
    t.index ["idea_id"], name: "index_taggings_on_idea_id"
    t.index ["tag_id"], name: "index_taggings_on_tag_id"
  end

  create_table "tags", charset: "utf8mb4", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name"], name: "index_tags_on_name", unique: true
  end

  create_table "team_users", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "team_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["team_id"], name: "index_team_users_on_team_id"
    t.index ["user_id", "team_id"], name: "index_team_users_on_user_id_and_team_id", unique: true
    t.index ["user_id"], name: "index_team_users_on_user_id"
  end

  create_table "teams", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "owner_id", null: false
    t.bigint "idea_id", null: false
    t.integer "status", default: 0, null: false
    t.string "requirement", null: false
    t.string "offer", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["idea_id"], name: "index_teams_on_idea_id"
    t.index ["owner_id"], name: "index_teams_on_owner_id"
    t.index ["status", "owner_id"], name: "index_teams_on_status_and_owner_id"
  end

  create_table "users", charset: "utf8mb4", force: :cascade do |t|
    t.string "email"
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "name", limit: 30, default: ""
    t.string "description", limit: 200
    t.integer "point", default: 0
    t.string "icon"
    t.integer "definition", limit: 2
    t.string "twitter_id"
    t.string "provider"
    t.string "uid"
    t.string "remote_url"
    t.string "site_url"
    t.boolean "defined"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "comments", "ideas"
  add_foreign_key "comments", "users"
  add_foreign_key "difficulties", "ideas"
  add_foreign_key "difficulties", "users"
  add_foreign_key "taggings", "ideas"
  add_foreign_key "taggings", "tags"
  add_foreign_key "teams", "ideas"
  add_foreign_key "teams", "users", column: "owner_id"
end
