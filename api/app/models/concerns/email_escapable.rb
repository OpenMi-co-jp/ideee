# frozen_string_literal: true

module EmailEscapable
  extend ActiveSupport::Concern

  private

  # メール本文に埋め込むユーザー入力は必ずエスケープする
  def h(text)
    ERB::Util.html_escape(text.to_s)
  end
end
