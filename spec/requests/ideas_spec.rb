# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Ideas' do
  let!(:idea) { FactoryBot.create(:idea) }

  before { sign_in idea.user }

  describe 'GET #index' do
    it 'リクエストが成功すること' do
      get ideas_path
      expect(response).to have_http_status :ok
    end
  end

  describe 'GET #show' do
    context 'アイデアが存在する場合' do
      it 'リクエストが成功すること' do
        get idea_path(idea)
        expect(response).to have_http_status :ok
      end

      it 'アイデアの名前が表示されていること' do
        get idea_path(idea.id)
        expect(response.body).to include idea.name
      end
    end

    context 'アイデアが存在しない場合' do
      subject { -> { get idea_path(idea.id + 100) } }

      it { is_expected.to raise_error ActiveRecord::RecordNotFound }
    end
  end

  describe 'GET #new' do
    it 'リクエストが成功すること' do
      get new_idea_path
      expect(response).to have_http_status :ok
    end
  end

  describe 'GET #edit' do
    it 'リクエストが成功すること' do
      get edit_idea_path(idea)
      expect(response).to have_http_status :ok
    end

    it 'アイデアの名前が表示されていること' do
      get edit_idea_path(idea)
      expect(response.body).to include idea.name
    end
  end

  describe 'POST #create' do
    subject(:create_idea) { post ideas_path, params: }

    context 'パラメータが妥当な場合' do
      let(:params) { { idea: attributes_for(:idea) } }

      it 'リクエストが成功すること' do
        create_idea
        expect(response).to have_http_status :found
      end

      it 'アイデアが登録されること' do
        expect do
          create_idea
        end.to change(Idea, :count).by(1)
      end

      it '詳細ページにリダイレクトすること' do
        create_idea
        expect(response).to redirect_to("http://www.example.com/ideas/#{Idea.last.id}?share=true")
      end
    end

    context 'パラメータが不正な場合' do
      let(:params) { { idea: attributes_for(:idea, name: '') } }

      it 'アイデアが登録されないこと' do
        expect do
          create_idea
        end.not_to change(Idea, :count)
      end

      it 'エラーが表示されること' do
        create_idea
        expect(response.body).to include 'アイデアの登録に失敗しました'
        expect(response.body).to include 'アイデア名を入力してください'
      end
    end
  end

  describe 'PUT #update' do
    subject(:update_idea) { put idea_path(idea), params: }

    context 'パラメータが妥当な場合' do
      let(:params) { { idea: attributes_for(:idea, name: 'updated idea') } }

      it 'リクエストが成功すること' do
        update_idea
        expect(response).to have_http_status :found
      end

      it 'アイデア名が更新されること' do
        expect do
          update_idea
        end.to change { Idea.find(idea.id).name }.from(idea.name).to('updated idea')
      end

      it 'リダイレクトすること' do
        update_idea
        expect(response).to redirect_to Idea.find(idea.id)
      end
    end

    context 'パラメータが不正な場合' do
      let(:params) { { idea: attributes_for(:idea, name: '') } }

      it 'アイデア名が変更されないこと' do
        expect do
          update_idea
        end.not_to change(Idea.find(idea.id), :name)
      end

      it 'エラーが表示されること' do
        update_idea
        expect(response.body).to include 'アイデアの更新に失敗しました'
        expect(response.body).to include 'アイデア名を入力してください'
      end
    end
  end

  describe 'DELETE #destroy' do
    subject(:destroy_idea) { delete idea_path(idea) }

    it 'リクエストが成功すること' do
      destroy_idea
      expect(response).to have_http_status :found
    end

    it 'アイデアが削除されること' do
      expect do
        destroy_idea
      end.to change(Idea, :count).by(-1)
    end

    it 'アイデア一覧にリダイレクトすること' do
      destroy_idea
      expect(response).to redirect_to(ideas_path)
    end
  end

  describe 'GET #search' do
    context 'キーワードで検索した場合' do
      subject(:get_search_ideas) { get search_ideas_path, params: }

      let(:params) { { q: { name_or_idea_tags_name_cont: idea.name } } }

      it 'リクエストが成功すること' do
        get_search_ideas
        expect(response).to have_http_status :ok
      end

      it '検索したアイデアが表示されていること' do
        get_search_ideas
        expect(response.body.encode!).to include idea.name
      end
    end
    context '難易度で検索した場合' do
      # DifficultyがEsayとMiddleのIdeaレコードを1件ずつ作成する
      let!(:idea_with_easy) { FactoryBot.create(:idea,difficulty:0) }
      let!(:idea_with_middle) { FactoryBot.create(:idea,difficulty:1) }

      subject(:get_search_ideas) { get search_ideas_path, params: }
      
      context '難易度「すべて」で検索した場合' do
        let(:params) { { q: { difficulty_eq: '' } } }
        it 'リクエストが成功すること' do
          get_search_ideas
          expect(response).to have_http_status :ok
        end

        it 'EasyとMiddleのアイデアの両方が表示されていること' do
          get_search_ideas
          expect(response.body.encode!).to include idea_with_easy.name
          expect(response.body.encode!).to include idea_with_middle.name
        end
      end
      context '難易度「Easy」で検索した場合' do
        let(:params) { { q: { difficulty_eq: 0 } } }
        it 'リクエストが成功すること' do
          get_search_ideas
          expect(response).to have_http_status :ok
        end

        it 'Easyのアイデアのみが表示されていること' do
          get_search_ideas
          expect(response.body.encode!).to include idea_with_easy.name
          expect(response.body.encode!).to_not include idea_with_middle.name
        end
      end
    end

    context 'Teamステータスで検索した場合' do
      # 下記にて、Teamステータスがactiveとstopのideaレコードを生成したい
      # ideaのみは生成できるが、そのideaに紐づいたTeamレコードの生成の仕方が分からない
      let!(:idea_with_active) { FactoryBot.create(:idea) }
      let!(:idea_with_stop) { FactoryBot.create(:idea) }

      subject(:get_search_ideas) { get search_ideas_path, params: }

      let(:params) { { q: { team_status_eq: '' } } }

      context 'Teamステータス「すべて」で検索した場合' do
        it 'リクエストが成功すること' do
          get_search_ideas
          expect(response).to have_http_status :ok
        end

        it 'ActiveとStopのアイデアの両方が表示されていること' do
          get_search_ideas
          expect(response.body.encode!).to include idea_with_active.name
          expect(response.body.encode!).to include idea_with_stop.name
        end
      end
      context 'Teamステータス「Active」で検索した場合' do
        it 'リクエストが成功すること' do
          get_search_ideas
          expect(response).to have_http_status :ok
        end

        it 'Activeのアイデアのみが表示されていること' do
          get_search_ideas
          # expect(response.body.encode!).to include idea_with_active.name
          # expect(response.body.encode!).to_not include idea_with_stop.name
        end
      end
    end
  end
end
