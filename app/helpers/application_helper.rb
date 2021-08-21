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

  def show_meta_tags
    if display_meta_tags.blank?
      assign_meta_tags
    end
    display_meta_tags
  end

  def assign_meta_tags(options = {})
    defaults = t('meta_tags.defaults')
    options.reverse_merge!(defaults)

    site = options[:site]
    title = options[:title]
    description = options[:description]
    keywords = options[:keywords]
    image = options[:image].presence || return_ogp_url

    configs = {
      separator: '|',
      reverse: true,
      site: site,
      title: title,
      description: description,
      keywords: keywords,
      canonical: request.original_url,
      og: {
        type: 'article',
        title: title.presence || site,
        description: description,
        url: request.original_url,
        image: image,
        site_name: site
      },
      twitter: {
        site: '@1026NT',
        card: 'summary_large_image',
      }
    }

    set_meta_tags(configs)
  end
  # def assign_meta_tags(options = {})
  #   {
  #     site: 'ideee.tech',
  #     title: 'ideee',
  #     reverse: true,
  #     charset: 'utf-8',
  #     description: 'アイデアと開発者のマッチング',
  #     keywords: 'アイデア,エンジニア,マッチング',
  #     canonical: request.original_url,
  #     separator: '|',
  #     og: {
  #       site_name: :site,
  #       title: :title,
  #       description: :description,
  #       type: 'website',
  #       url: request.original_url,
  #       locale: 'ja_JP',
  #       image: return_ogp_url
  #     },
  #     twitter: {
  #       card: 'summary_large_image',
  #       site: '@1026NT',
  #     }
  #   }
  # end

  def return_ogp_url
    title = if controller_name == 'ideas' && action_name == 'show'
              @idea.name
            else
              'ideee'
            end
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
