class RemindDraftJob < ApplicationJob
  queue_as :default

  def perform(id)
    idea = Idea.find(id)
    return unless idea.draft

    SendEmail.new.draft_remind(idea.user_id, id)
  end
end
