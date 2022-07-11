class RemindDraftJob < ApplicationJob
  queue_as :default

  def perform(id)
    idea = Idea.find(id)
    return unless idea.draft

    draft_ideas = Idea.find_by(draft: true)
    SendEmail.new.draft_remind(idea.user_id)
  end
end
