# frozen_string_literal: true

module EmailEscapable
  extend ActiveSupport::Concern

  private

  # メール本文に埋め込むユーザー入力は必ずエスケープする
  def h(text)
    ERB::Util.html_escape(text.to_s)
  end

  # 改行だけは <br> として反映し、それ以外はエスケープする
  def xss_support(text)
    return if text.nil?

    text.gsub(/\R/, '<br>')
        .gsub('&', '&amp;')
        .gsub('<', '&lt;')
        .gsub('>', '&gt;')
        .gsub('"', '&quot;')
        .gsub("'", '&#39;')
        .gsub('&lt;br&gt;', '<br>')
  end
end
