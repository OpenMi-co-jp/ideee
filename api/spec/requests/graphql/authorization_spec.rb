require 'rails_helper'

# 他人のリソースを操作・閲覧できないことを確認する
RSpec.describe 'GraphQL authorization' do
  subject(:graphql_post) do
    post graphql_path, params: { query:, variables: variables.to_json }, headers:, as: :json
  end

  let(:attacker)  { create(:user) }
  let(:victim)    { create(:user) }
  let(:headers)   { sign_in(attacker) }
  let(:variables) { {} }
  let(:res)       { response.parsed_body }

  describe 'destroyUser' do
    let(:query) do
      <<~GQL
        mutation($input: DestroyUserInput!) { destroyUser(input: $input) { success } }
      GQL
    end
    let(:variables) { { input: { id: victim.id } } }

    it '他人のユーザーは削除できない' do
      attacker
      victim
      expect { graphql_post }.not_to change(User, :count)
      expect(res['errors'][0]['message']).to eq('ユーザーの権限がありません')
    end
  end

  describe 'updateUser' do
    let(:query) do
      <<~GQL
        mutation($input: UpdateUserInput!) { updateUser(input: $input) { success errors } }
      GQL
    end
    let(:variables) { { input: { id: victim.id, name: 'hacked', definition: 'engineer' } } }

    it '他人のプロフィールは更新できない' do
      expect { graphql_post }.not_to(change { victim.reload.name })
      expect(res['data']['updateUser']['success']).to be false
    end

    context '自分のプロフィールのとき' do
      let(:variables) { { input: { id: attacker.id, name: 'renamed', definition: 'engineer' } } }

      it '更新できる' do
        graphql_post
        expect(res['data']['updateUser']['success']).to be true
        expect(attacker.reload.name).to eq('renamed')
      end
    end
  end

  describe 'updateIdea' do
    let(:idea) { create(:idea, user: victim) }
    let(:query) do
      <<~GQL
        mutation($input: UpdateIdeaInput!) { updateIdea(input: $input) { success errors } }
      GQL
    end
    let(:variables) do
      {
        input: {
          id: idea.id,
userId: attacker.id,
name: 'hacked',
background: 'b',
goal: 'g',
          stance: idea.stance,
publish: true,
tagList: []
        }
      }
    end

    it '他人のアイデアは更新も乗っ取りもできない' do
      graphql_post
      expect(res['data']['updateIdea']['success']).to be false
      expect(idea.reload.user_id).to eq(victim.id)
      expect(idea.name).not_to eq('hacked')
    end
  end

  describe 'User.email' do
    let(:query) do
      <<~GQL
        query($id: ID!) { user(id: $id) { email } }
      GQL
    end

    context '他人のユーザーのとき' do
      let(:variables) { { id: victim.id } }

      it 'メールアドレスは返さない' do
        graphql_post
        expect(res['data']['user']['email']).to be_nil
      end
    end

    context '未ログインのとき' do
      let(:headers)   { {} }
      let(:variables) { { id: victim.id } }

      it 'メールアドレスは返さない' do
        graphql_post
        expect(res['data']['user']['email']).to be_nil
      end
    end

    context '自分のユーザーのとき' do
      let(:variables) { { id: attacker.id } }

      it 'メールアドレスを返す' do
        graphql_post
        expect(res['data']['user']['email']).to eq(attacker.email)
      end
    end
  end

  describe 'チームのメッセージ' do
    let(:team) { create(:team, idea: create(:idea, user: victim), owner_id: victim.id) }

    before { team.room.messages.create!(user: victim, content: 'secret') }

    describe 'messages' do
      let(:query) do
        <<~GQL
          query($teamId: ID!) { messages(teamId: $teamId) { content } }
        GQL
      end
      let(:variables) { { teamId: team.id } }

      it 'メンバー以外は読めない' do
        graphql_post
        expect(res['data']['messages']).to eq([])
      end

      context 'オーナーのとき' do
        let(:headers) { sign_in(victim) }

        it '読める' do
          graphql_post
          expect(res['data']['messages'].pluck('content')).to eq(['secret'])
        end
      end
    end

    describe 'createMessage' do
      let(:query) do
        <<~GQL
          mutation($input: CreateMessageInput!) { createMessage(input: $input) { success } }
        GQL
      end
      let(:variables) { { input: { teamId: team.id, content: 'spam' } } }

      it 'メンバー以外は投稿できない' do
        expect { graphql_post }.not_to change(Message, :count)
        expect(res['errors'][0]['message']).to eq('チームに参加していません')
      end
    end
  end

  describe '下書きアイデアの漏えい' do
    let(:draft) { create(:idea, user: victim, draft: true) }

    describe 'createLike' do
      let(:query) do
        <<~GQL
          mutation($input: CreateLikeInput!) { createLike(input: $input) { success } }
        GQL
      end
      let(:variables) { { input: { likableType: 'Idea', likableId: draft.id } } }

      it '下書きにはいいねできない' do
        expect { graphql_post }.not_to change(Like, :count)
        expect(res['errors'][0]['message']).to eq('いいねできない対象です')
      end

      context '許可されていないタイプのとき' do
        let(:variables) { { input: { likableType: 'User', likableId: victim.id } } }

        it 'いいねできない' do
          expect { graphql_post }.not_to change(Like, :count)
        end
      end
    end

    describe 'likedIdeas' do
      let(:query) do
        <<~GQL
          query($userId: ID!) { likedIdeas(userId: $userId) { nodes { id } } }
        GQL
      end
      let(:variables) { { userId: attacker.id } }

      it '下書きは含めない' do
        Like.create!(user: attacker, likable: draft)
        graphql_post
        expect(res['data']['likedIdeas']['nodes']).to eq([])
      end
    end

    describe 'createComment' do
      let(:query) do
        <<~GQL
          mutation($input: CreateCommentInput!) { createComment(input: $input) { success errors } }
        GQL
      end
      let(:variables) { { input: { ideaId: draft.id, description: 'hi' } } }

      it '下書きにはコメントできない' do
        expect { graphql_post }.not_to change(Comment, :count)
        expect(res['data']['createComment']['success']).to be false
      end
    end
  end

  describe 'AIブラッシュアップ・レビュー' do
    let(:idea) { create(:idea, user: victim) }

    describe 'ideaAiBrushUp' do
      let(:query) do
        <<~GQL
          mutation($input: IdeaAiBrushUpInput!) { createAiBrushUp(input: $input) { success errors } }
        GQL
      end
      let(:variables) { { input: { ideaId: idea.id } } }

      it '他人のアイデアには実行できない' do
        expect { graphql_post }.not_to change(AiLog, :count)
        expect(res['data']['createAiBrushUp']['success']).to be false
      end
    end

    describe 'ideaAiReview' do
      let(:query) do
        <<~GQL
          mutation($input: IdeaAiReviewInput!) { createAiReview(input: $input) { success errors } }
        GQL
      end
      let(:variables) { { input: { ideaId: idea.id } } }

      it '他人のアイデアには実行できない' do
        expect { graphql_post }.not_to change(AiLog, :count)
        expect(res['data']['createAiReview']['success']).to be false
      end
    end
  end

  describe 'createDifficulty' do
    let(:idea) { create(:idea, user: victim) }
    let(:query) do
      <<~GQL
        mutation($input: CreateDifficultyInput!) { createDifficulty(input: $input) { success } }
      GQL
    end
    let(:variables) { { input: { ideaId: idea.id, userId: victim.id, level: 'easy' } } }

    it '他人になりすまして投票できない' do
      graphql_post
      expect(Difficulty.find_by(idea:).user_id).to eq(attacker.id)
    end
  end

  describe 'ログイン必須のクエリ' do
    let(:headers) { {} }
    let(:query)   { 'query { draftIdeas { nodes { id } } }' }

    it '未ログインでは認証エラーになる' do
      graphql_post
      expect(res['errors'][0]['message']).to eq('Authentication required')
    end
  end
end
