# frozen_string_literal: true

module UserJob
  class UpdatePointJob < ApplicationJob
    queue_as :default

    def perform(user)
      user.point_update
    end
  end
end
