# frozen_string_literal: true

# == Schema Information
#
# Table name: notification_configs
#
#  id                   :bigint           not null, primary key
#  comment_email        :boolean          default(TRUE), not null
#  comment_web          :boolean          default(TRUE), not null
#  draft_remind_email   :boolean          default(TRUE), not null
#  event_email          :boolean          default(TRUE), not null
#  heart_email          :boolean          default(TRUE), not null
#  heart_to_comment_web :boolean          default(TRUE), not null
#  heart_web            :boolean          default(TRUE), not null
#  team_join_email      :boolean          default(TRUE), not null
#  team_join_web        :boolean          default(TRUE), not null
#  team_leave_email     :boolean          default(TRUE), not null
#  team_message_email   :boolean          default(TRUE), not null
#  vote_web             :boolean          default(TRUE), not null
#  weekly_email         :boolean          default(TRUE), not null
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  user_id              :bigint           not null
#
# Indexes
#
#  index_notification_configs_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class NotificationConfig < ApplicationRecord
  belongs_to :user

  def self.default
    new(
      comment_email: true,
      draft_remind_email: true,
      event_email: true,
      heart_email: true,
      team_join_email: true,
      team_leave_email: true,
      team_message_email: true,
      weekly_email: true
    )
  end
end
