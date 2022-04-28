module AnalyticsJob
  class UpdateViewsJob < ApplicationJob
    queue_as :default

    def perform(id)
      idea_view = Analytics.new.idea_report('pageviews', id)
      Idea.find_by!(id: id).update_column(:view, idea_view.to_i)
    end
  end
end
