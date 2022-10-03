# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require_relative 'config/application'

Rails.application.load_tasks

# migrateのタスクをフックする
Rake::Task['db:migrate'].enhance do
  if Rails.env.development?
    Rake::Task[:after_migrate].invoke
  end
end

# migrateの後のタスク
task after_migrate: :environment do
  Rake::Task[:create_erd].invoke
end

# ER図を作成
task create_erd: :environment do
  # attributes=foreign_keys,primary_keys (属性は主キー、外部キー)
  # filename=erd_pic (ファイル名)
  # filetype=png (ファイル拡張子)
  sh 'bundle exec erd --attributes=foreign_keys,primary_keys,content --filename=ideee_erd --filetype=png'
end
