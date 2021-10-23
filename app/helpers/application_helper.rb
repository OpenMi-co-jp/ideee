module ApplicationHelper
  # OGPで使われるタイトルの設定
  def full_title(page_title = '')
    base_title = 'ideee'
    if page_title.empty?
      base_title
    else
      "#{page_title} | #{base_title}"
    end
  end

  # 現在のドメインを文字列として表示
  def full_url(path=nil)
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
    {
      site: 'ideee.tech',
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
        # image: cloudinary_url('main_ogp.jpg', sign_url: true, type: 'authenticated')
      },
      twitter: {
        card: 'summary_large_image',
        site: '@ideee_tech',
      }
    }
  end

  # Cloudinaryでの画像自動生成メソッド
  def return_ogp_url(title)
    title_len = title.length # 文字の大きさを調整
    size =  if title_len < 10
              100
            elsif 10 <= title_len && title_len <= 24
              60
            else
              40
            end
    transformation = [
      {
        x: 0, y: 0, gravity: 'center', color: '#202124', width: '500',  overlay: {
          font_size: size,
          font_weight: 'bold',
          text_align: 'center',
          text: title,
          font_family: 'TakaoExGothic'
        }, crop: "fit"
      }
    ]
    cloudinary_url('ideee_ogp.jpg', sign_url: true, type: 'authenticated', transformation: transformation)
  end

  def text_url_to_link(text)
    require 'uri'
    uri_reg = URI.regexp(%w[http https])
    return text.gsub(uri_reg) {"<a href='#{$&}' target='_blank'\>#{$&}</a>"}
  end

  def data_page
    "#{controller_path}-#{action_name}"
  end
end
