module ApplicationHelper
  def full_title(page_title = '')
    base_title = 'ideee'
    if page_title.empty?
      base_title
    else
      "#{page_title} | #{base_title}"
    end
  end

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
        image: cloudinary_url('main_ogp.jpg', sign_url: true, type: 'authenticated')
      },
      twitter: {
        card: 'summary_large_image',
        site: '@ideee_tech',
      }
    }
  end

  def return_ogp_url(title)
    title_len = title.length
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
end
