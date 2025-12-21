# frozen_string_literal: true

module AnalyticsJob
  class UpdateViewsJob < ApplicationJob
    queue_as :default

    def perform(id)
      # Analytics functionality has been removed
      # View counting is no longer available
      Rails.logger.warn "UpdateViewsJob called for idea #{id} but analytics functionality has been removed"
    end
  end
end
