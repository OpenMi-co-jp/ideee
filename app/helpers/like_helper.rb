module LikeHelper
  def own_object?(object)
    'disable-click' if current_user&.own?(object)
  end
end
