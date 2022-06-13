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

  # デフォルトのOGPを設定して、OGPの記載がないページに設定
  def default_meta_tags
    return {} if Rails.env.test?

    {
      site: 'アイディー',
      title: 'ideee',
      reverse: true,
      charset: 'utf-8',
      description: 'アイデアと開発者のマッチング',
      keywords: 'アイデア,エンジニア,マッチング',
      canonical: request.original_url,
      separator: '|',
      og: {
        site_name: :site,
        title: :title,
        description: :description,
        type: 'website',
        url: request.original_url,
        locale: 'ja_JP',
        image: cloudinary_url('default_ogp.webp', sign_url: true, type: 'authenticated')
      },
      twitter: {
        card: 'summary_large_image',
        site: '@ideee_tech'
      }
    }
  end

  # Cloudinaryでの画像自動生成メソッド
  def return_ogp_url(title)
    return '' if Rails.env.test?

    title_len = title.length # 文字の大きさを調整
    size = get_ogp_font_size(title_len)
    transformation = [
      {
        x: 0, y: 0, gravity: 'center', color: '#202124', width: '500', overlay: {
          font_size: size,
          font_weight: 'bold',
          text_align: 'center',
          text: title,
          font_family: 'TakaoExGothic'
        }, crop: 'fit'
      }
    ]
    cloudinary_url('ideee_ogp_back.webp', sign_url: true, type: 'authenticated', transformation: transformation)
  end

  def get_ogp_font_size(title_len)
    image_width = 480
    max_font_size = 100

    size =  if title_len <= 9
              (image_width / title_len).floor
            elsif title_len <= 20
              (image_width / (title_len / 2.0).ceil).floor
            elsif title_len <= 36
              (image_width / (title_len / 3.0).ceil).floor
            else
              (image_width / (title_len / 4.0).ceil).floor
            end

    if size > max_font_size
      max_font_size
    else
      size
    end
  end

  def text_url_to_link(text)
    require 'uri'
    uri_reg = URI::DEFAULT_PARSER.make_regexp(%w[http https])
    sanitize(text.gsub(uri_reg) { "<a href='#{Regexp.last_match(0)}' target='_blank'\>#{Regexp.last_match(0)}</a>" })
  end

  def data_page
    "#{controller_path}-#{action_name}"
  end

  # svgをviewで使用する
  def embedded_svg(filename, options = {})
    file = File.read(Rails.root.join('app', 'assets', 'images', filename))
    doc = Nokogiri::HTML::DocumentFragment.parse file
    svg = doc.at_css 'svg'
    svg['class'] = options[:class] if options[:class].present?
    doc.to_html.html_safe
  end
end
