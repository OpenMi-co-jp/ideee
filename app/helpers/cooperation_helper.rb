module CooperationHelper
  def cooperation_link(path:, method:, name: ,color:)
    link_to name, path, method: method, class: "btn #{color}"
  end
end
