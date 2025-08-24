# frozen_string_literal: true

# lib配下のファイルを自動読み込みパスに追加
Rails.application.config.eager_load_paths += [Rails.root.join('lib')]
Rails.application.config.autoload_paths += [Rails.root.join('lib')]
