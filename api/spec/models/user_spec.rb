# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User do
  it 'モデルの作成が有効であること' do
    expect(FactoryBot.build(:user)).to be_valid
  end

  describe 'validations' do
    it 'nameが31文字以上あればユーザー登録に失敗すること' do
      user = FactoryBot.build(:user, name: 'a' * 26)
      user.valid?
      expect(user.errors[:name]).to include('は25文字以内で入力してください')
    end

    it 'emailがなかったら、ユーザー登録に失敗すること' do
      user = FactoryBot.build(:user, email: nil)
      user.valid?
      expect(user.errors[:email]).to include('を入力してください')
    end

    it 'emailが重複する時ユーザー登録に失敗すること' do
      user1 = FactoryBot.create(:user)
      user2 = FactoryBot.build(:user)
      user2.email = user1.email
      user2.valid?
      expect(user2.errors[:email]).to include('はすでに存在します')
    end

    it 'descriptionが200文字以上の場合、ユーザー登録に失敗すること' do
      user = FactoryBot.build(:user, description: 'a' * 201)
      user.valid?
      expect(user.errors[:description]).to include('は200文字以内で入力してください')
    end

    describe 'site_url' do
      it 'URL形式ではない場合、ユーザー登録に失敗すること' do
        user = FactoryBot.build(:user, site_url: 'hogehoge.com')
        user.valid?
        expect(user.errors[:site_url]).to include('は不正な値です')
      end

      it '空白の場合、正常にユーザー登録ができること' do
        user = FactoryBot.build(:user, site_url: '')
        expect(user).to be_valid
      end
    end
  end

  describe 'own?' do
    subject { user.own?(object) }

    let(:user) { FactoryBot.create(:user) }

    context 'ユーザーに紐づいたideaかどうかの判定' do
      let(:object) { FactoryBot.create(:idea) }

      context '紐づいたideaの場合' do
        let(:user) { object.user }

        it { is_expected.to be true }
      end

      context '紐づかないideaの場合' do
        it { is_expected.to be false }
      end
    end

    context 'ユーザーに紐づいたlikeかどうかの判定' do
      let(:object) { FactoryBot.create(:like, :idea) }

      context '紐づいたlikeの場合' do
        let(:user) { object.user }

        it { is_expected.to be true }
      end

      context '紐づかないlikeの場合' do
        it { is_expected.to be false }
      end
    end

    context 'ユーザーに紐づいたteamかどうかの判定' do
      let(:object) { FactoryBot.create(:team) }

      context '紐づいたteamの場合' do
        let(:user) { object.user }

        it { is_expected.to be true }
      end

      context '紐づかないteamの場合' do
        it { is_expected.to be false }
      end
    end
  end

  describe 'like?' do
    context 'アイデアに対するlike' do
      subject { user.like?(idea) }

      context '存在する場合' do
        let(:like) { FactoryBot.create(:like, :idea) }
        let(:idea) { like.likable }
        let(:user) { like.user    }

        it { is_expected.to be true }
      end

      context '存在しない場合' do
        let(:idea) { FactoryBot.create(:idea) }
        let(:user) { idea.user }

        it { is_expected.to be false }
      end
    end

    context 'コメントに対するlike' do
      subject { user.like?(comment) }

      context '存在する場合' do
        let(:like) { FactoryBot.create(:like, :comment) }
        let(:comment) { like.likable }
        let(:user)    { like.user    }

        it { is_expected.to be true }
      end

      context '存在しない場合' do
        let(:comment) { FactoryBot.create(:comment) }
        let(:user) { comment.user }

        it { is_expected.to be false }
      end
    end
  end

  describe 'voted?' do
    subject { user.voted?(idea) }

    context 'アイデアの難易度を投稿済みの場合' do
      let(:difficulty) { FactoryBot.create(:difficulty, :middle) }
      let(:user) { difficulty.user }
      let(:idea) { difficulty.idea }

      it { is_expected.to be true }
    end

    context 'アイデアの難易度を投稿していない場合' do
      let(:user) { FactoryBot.create(:user) }
      let(:idea) { FactoryBot.create(:idea) }

      it { is_expected.to be false }
    end
  end

  describe 'create_comment' do
    subject(:create_comment) { user.create_comment(comment_params) }

    let(:idea) { FactoryBot.create(:idea) }
    let(:user)           { idea.user                          }
    let(:description)    { 'hoge'                             }
    let(:comment_params) { { idea_id: idea.id, description: } }

    context 'アイデアに初めてコメントするユーザーの場合' do
      it 'コメントが作成される' do
        create_comment
        expect(user.comments.where(**comment_params)).to exist
      end
    end

    context 'アイデアに既にコメントしているユーザー' do
      before { FactoryBot.create(:comment, user_id: user.id, idea_id: idea.id, description:) }

      context '投稿したコメントが重複していない場合' do
        let(:comment_params) { { idea_id: idea.id, description: 'fuga' } }

        it 'コメントが作成される' do
          create_comment
          expect(user.comments.where(**comment_params)).to exist
        end
      end

      context '同一内容のコメントが存在する場合' do
        it { is_expected.to be_nil }
      end
    end
  end

  describe 'point_update' do
    subject(:update_user_point) { user.point_update }

    context 'アイデア投稿、コメント投稿、いいね何もしていない場合' do
      let(:user) { FactoryBot.create(:user) }

      it 'pointは0' do
        update_user_point
        expect(user.point).to eq 0
      end
    end

    context 'アイデア投稿1件、アイデアのいいね1件の場合' do
      let(:user) { FactoryBot.create(:user, :idea) }

      it 'pointは3' do
        update_user_point
        expect(user.point).to eq 3
      end
    end

    context 'アイデア投稿1件、アイデアのいいね1件、いいね2件の場合' do
      let(:user) { FactoryBot.create(:user, :idea, :like) }

      it 'pointは4' do
        update_user_point
        expect(user.point).to eq 4
      end
    end

    context 'アイデア投稿1件、アイデアのいいね1件、いいね2件、コメント1件の場合' do
      let(:user) { FactoryBot.create(:user, :idea, :like, :comment) }

      it 'pointは5' do
        update_user_point
        expect(user.point).to eq 5
      end
    end
  end

  describe 'fix_ids' do
    subject(:update_user_ids) { user.fix_ids }

    context 'twitter_id' do
      context 'urlが含まれたtwitter_idで更新しようとした場合' do
        let(:twitter_id) { 'hoge'                                                                    }
        let(:user)       { FactoryBot.create(:user, twitter_id: "https://twitter.com/#{twitter_id}") }

        it 'id部分のみが抽出される' do
          update_user_ids
          expect(user.twitter_id).to eq twitter_id
        end
      end

      context '@が含まれたtwitter_idで更新しようとした場合' do
        let(:twitter_id) { 'fuga' }
        let(:user) { FactoryBot.create(:user, twitter_id: "@#{twitter_id}") }

        it 'id部分のみが抽出される' do
          update_user_ids
          expect(user.twitter_id).to eq twitter_id
        end
      end
    end

    context 'urlが含まれたgithub_idで更新しようとした場合' do
      let(:github_id) { 'hogefuga' }
      let(:user) { FactoryBot.create(:user, github_id: "https://github.com/#{github_id}") }

      it 'id部分のみが抽出される' do
        update_user_ids
        expect(user.github_id).to eq github_id
      end
    end
  end
end
