# frozen_string_literal: true

module ApplicationHelper
  # OGPで使われるタイトルの設定
  def full_title(page_title = '')
    if page_title.empty?
      'ideee'
    else
      "#{page_title} | ideee"
    end
  end

  # 現在のドメインを文字列として表示
  def full_url(path = nil)
    domain = if Rails.env.development?
               'http://localhost:3000'
             else
               'https://www.ideee.tech'
             end
    "#{domain}#{path}"
  end

  def image_url(path)
    domain = if Rails.env.development?
               'http://localhost:3000'
             else
               'https://ideee-bucket.s3.ap-northeast-1.amazonaws.com'
             end
    "#{domain}#{path}"
  end

  def text_url_to_link(text)
    require 'uri'
    uri_reg = URI::DEFAULT_PARSER.make_regexp(%w[http https])
    sanitize(text.gsub(uri_reg) { "<a href='#{Regexp.last_match(0)}' target='_blank'>#{Regexp.last_match(0)}</a>" })
  end

  def data_page
    "#{controller_path}-#{action_name}"
  end

  # svgをviewで使用する
  def embedded_svg(filename, options = {})
    file = Rails.root.join('app', 'assets', 'images', filename).read
    doc = Nokogiri::HTML::DocumentFragment.parse file
    svg = doc.at_css 'svg'
    svg['class'] = options[:class] if options[:class].present?
    doc.to_html.html_safe
  end
end
