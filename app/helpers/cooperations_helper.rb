module CooperationsHelper
  def modal_link(method, color)
    link_to(
      t("default.cooperation.#{method}"),
      '#modal_cooperation',
      data: { turbolinks: false },
      class: "waves-effect waves-light btn #{color} modal-trigger",
      id: 'modal-trigger-cooperation',
    )
  end
end
