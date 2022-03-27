module CooperationsHelper
  def modal_link(method, color)
    link_to(
      t("default.team.#{method}"),
      '#modal_team',
      data: { turbolinks: false },
      class: "waves-effect waves-light btn #{color} modal-trigger",
      id: 'modal-trigger-team'
    )
  end
end
