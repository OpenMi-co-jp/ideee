# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CreateNotification, type: :helper do
  describe 'create_notification' do
    let(:idea) { FactoryBot.create(:idea) }
    let(:user) { FactoryBot.create(:user) }

    describe 'create_notification_with_notificationable_type' do
      context 'Likeideaのとき' do
        subject(:idea_like_notification) do
          user.create_notification_with_notificationable_type(idea, "Like#{like.likable_type}")
        end

        let(:like) { FactoryBot.create(:like, :idea) }

        it '通知を作成する' do
          expect do
            idea_like_notification
          end.to change(Notification, :count).by(+1)
        end

        it 'notificatable_typeが正しく設定される' do
          expect(idea_like_notification.notificatable_type).to eq('LikeIdea')
        end
      end

      context 'product_applyのとき' do
        subject(:product_apply_notification) do
          user.create_notification_with_notificationable_type(idea, 'product_apply')
        end

        it '通知を作成する' do
          expect do
            product_apply_notification
          end.to change(Notification, :count).by(+1)
        end

        it 'notificatable_typeが正しく設定される' do
          expect(product_apply_notification.notificatable_type).to eq('product_apply')
        end
      end
    end

    describe 'create_notification_comment' do
      let(:comment) { FactoryBot.create(:comment, idea:, user:) }

      context 'コメントを数えるとき' do
        subject(:comment_notification) { user.create_notification_comment(idea, comment) }

        let(:user1) { FactoryBot.create(:user) }
        let(:user2) { FactoryBot.create(:user) }

        before do
          FactoryBot.create(:comment, idea:, user: user1)
          FactoryBot.create(:comment, idea:, user: user2)
        end

        it '通知を作成する' do
          expect do
            comment_notification
          end.to change(Notification, :count).by(3)
        end
      end

      context 'コメントの中身を確認するとき' do
        before { user.create_notification_comment(idea, comment) }

        it 'notificatableが正しく設定される' do
          expect(Notification.last.notificatable_type).to eq('Comment')
          expect(Notification.last.notificatable_id).to eq(comment.id)
        end
      end
    end

    describe 'create_notification Idea' do
      context 'ideaのとき' do
        subject(:idea_notification) { user.create_notification(idea:, visited_id: user.id, notificatable: idea) }

        it '通知を作成する' do
          expect do
            idea_notification
          end.to change(Notification, :count).by(+1)
        end

        it 'notificatable_typeが正しく設定される' do
          expect(idea_notification.notificatable_type).to eq('Idea')
          expect(idea_notification.notificatable_id).to eq(idea.id)
        end
      end

      context 'team_userのとき' do
        subject(:team_user_notification) do
          user.create_notification(idea:, visited_id: user.id, notificatable: team_user)
        end

        let(:team) { FactoryBot.create(:team) }
        let(:team_user) { TeamUser.create(team:, user:) }

        it '通知を作成する' do
          expect do
            team_user_notification
          end.to change(Notification, :count).by(+1)
        end

        it 'notificatable_typeが正しく設定される' do
          expect(team_user_notification.notificatable_type).to eq('TeamUser')
          expect(team_user_notification.notificatable_id).to eq(team_user.id)
        end
      end

      context 'difficultyのとき' do
        subject(:difficulty_notification) do
          user.create_notification(
            idea: difficulty.idea, visited_id: difficulty.idea.user.id,
            notificatable: difficulty
          )
        end

        let(:difficulty) { FactoryBot.create(:difficulty, :easy) }

        it '通知を作成する' do
          expect do
            difficulty_notification
          end.to change(Notification, :count).by(+1)
        end

        it 'notificatable_typeが正しく設定される' do
          expect(difficulty_notification.notificatable_type).to eq('Difficulty')
          expect(difficulty_notification.notificatable_id).to eq(difficulty.id)
        end
      end
    end

    describe 'create_notification チーム開発' do
      let(:current_user) { FactoryBot.create(:user) }
      let(:team_user_id) { FactoryBot.create(:team_user).id }

      context 'チーム開発参加のとき' do
        subject(:join_team_user_notification) do
          current_user.create_notification(
            idea:, visited_id: idea.user_id, notificatable_id: team_user_id,
            notificatable_type:
          )
        end

        let(:notificatable_type) { 'join_team_user' }

        it '通知を作成する' do
          expect do
            join_team_user_notification
          end.to change(Notification, :count).by(+1)
        end

        it 'notificatable_id、notificatable_typeが正しく設定される' do
          expect(join_team_user_notification.notificatable_id).to eq(team_user_id)
          expect(join_team_user_notification.notificatable_type).to eq(notificatable_type)
        end
      end

      context 'チーム開発脱退のとき' do
        subject(:leave_team_user_notification) do
          current_user.create_notification(
            idea:, visited_id: idea.user_id, notificatable_id: team_user_id,
            notificatable_type:
          )
        end

        let(:notificatable_type) { 'leave_team_user' }

        it '通知を作成する' do
          expect do
            leave_team_user_notification
          end.to change(Notification, :count).by(+1)
        end

        it 'notificatable_id、notificatable_typeが正しく設定される' do
          expect(leave_team_user_notification.notificatable_id).to eq(team_user_id)
          expect(leave_team_user_notification.notificatable_type).to eq(notificatable_type)
        end
      end
    end
  end
end
