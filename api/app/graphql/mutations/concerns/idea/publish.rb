module Mutations
  module Concerns
    module Idea
      module Publish
        def sidekiq_jobs(idea)
          return unless Rails.env.production?

          idea_url = "#{Rails.application.config.frontend_url}/ideas/#{idea.id}"

          TwitterJob::Tweet.perform_later(idea, idea_url)
          Slack::SendNewJob.perform_later(idea, idea_url)
          Slack::SendApplyJob.perform_later(idea, idea_url)
        end
      end
    end
  end
end
