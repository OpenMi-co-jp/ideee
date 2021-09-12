module IdeasHelper
  def image_set(idea)
    if idea&.icon.file.nil?
      image_tag(return_ogp_url(idea.name))
    else
      image_tag(idea.icon.to_s)
    end
  end
end
