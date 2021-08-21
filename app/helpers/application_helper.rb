module ApplicationHelper
  def full_title(page_title = '')
    base_title = 'ideee'
    if page_title.empty?
      base_title
    else
      "#{page_title} | #{base_title}"
    end
  end

  def full_url(path)
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
      site: 'ideee',
      title: 'ideee-title',
      reverse: true,
      charset: 'utf-8',
      description: 'アイデアと開発者のマッチング',
      keywords: 'アイデア',
      canonical: request.original_url,
      separator: '|',
      og: {
        site_name: 'ideee',
        title: 'ideee',
        description: 'アイデアと開発者のマッチング',
        type: 'website',
        url: request.original_url,
        locale: 'ja_JP',
        image: return_ogp_url('ideee')
      }
    }
  end

  def return_ogp_url(title)
    transformation = [
      {
        x: 0, y: 0, gravity: 'center', color: '#202124', width: '500',  overlay: {
          font_size: 30,
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
