# frozen_string_literal: true

module Slack
  class SendApplyJob < ApplicationJob
    queue_as :default

    def perform(idea, url)
      # 承認済みか申請中、もしくはURLがない場合はスキップ
      return if idea.approved? || idea.applying? || idea.product_url&.strip.blank?

      SlackNotifier.new.apply_send(idea, url)
      SendEmail.new.confirm_apply(idea)
    end
  end
end
