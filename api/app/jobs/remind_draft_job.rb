# frozen_string_literal: true

class RemindDraftJob < ApplicationJob
  queue_as :default

  def perform(id)
    idea = Idea.find(id)
    return unless idea.draft
    return unless idea.user.draft_remind_email

    SendEmail.new.draft_remind(idea.user_id, id)
  end
end
