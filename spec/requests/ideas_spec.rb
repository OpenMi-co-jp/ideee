require 'rails_helper'

RSpec.describe "Ideas", type: :request do
  let!(:idea) { create(:idea) }

  describe "GET #index" do
    it "リクエストが成功すること" do
      get ideas_path
      expect(response.status).to eq 200
    end
  end

  describe 'GET #show' do
    context 'アイデアが存在する場合' do
      it 'リクエストが成功すること' do
        get idea_path(idea)
        expect(response.status).to eq 200
      end

      it 'アイデアの名前が表示されていること' do
        get idea_path(idea)
        expect(response.body).to include idea.name
      end
    end

    context 'アイデアが存在しない場合' do
      subject { -> { get idea_path 100 } }

      it { is_expected.to raise_error ActiveRecord::RecordNotFound }
    end
  end

  describe 'GET #new' do
    it 'リクエストが成功すること' do
      sign_in idea.user
      get new_idea_path
      expect(response.status).to eq 200
    end
  end

  describe 'GET #edit' do
    before { sign_in idea.user }
    it 'リクエストが成功すること' do
      get edit_idea_path(idea)
      expect(response.status).to eq 200
    end

    it 'アイデアの名前が表示されていること' do
      get edit_idea_path(idea)
      expect(response.body).to include idea.name
    end
  end

  describe 'POST #create' do
    before { sign_in idea.user }
    context 'パラメータが妥当な場合' do
      it 'リクエストが成功すること' do
        post ideas_path, params: { idea: attributes_for(:idea) }
        expect(response.status).to eq 302
      end

      it 'アイデアが登録されること' do
        expect do
          post ideas_path, params: { idea: attributes_for(:idea) }
        end.to change(Idea, :count).by(1)
      end

      it '詳細ページにリダイレクトすること' do
        post ideas_path, params: { idea: attributes_for(:idea) }
        expect(response).to redirect_to Idea.last
      end
    end

    context 'パラメータが不正な場合' do
      it 'アイデアが登録されないこと' do
        expect do
          post ideas_path, params: { idea: attributes_for(:idea, :empty_name) }
        end.to_not change(Idea, :count)
      end

      it 'エラーが表示されること' do
        post ideas_path, params: { idea: attributes_for(:idea, :empty_name) }
        expect(response.body).to include 'アイデアの登録に失敗しました'
        expect(response.body).to include 'アイデア名を入力してください'
      end
    end
  end

  describe 'PUT #update' do
    before { sign_in idea.user }
    context 'パラメータが妥当な場合' do
      it 'リクエストが成功すること' do
        put idea_path(idea), params: { idea: attributes_for(:idea, :updated_idea) }
        expect(response.status).to eq 302
      end

      it 'アイデア名が更新されること' do
        expect do
          put idea_path(idea), params: { idea: attributes_for(:idea, :updated_idea) }
        end.to change { Idea.find(idea.id).name }.from(idea.name).to('updated idea')
      end

      it 'リダイレクトすること' do
        put idea_path(idea), params: { idea: attributes_for(:idea, :updated_idea) }
        expect(response).to redirect_to Idea.find(idea.id)
      end
    end

    context 'パラメータが不正な場合' do
      it 'アイデア名が変更されないこと' do
        expect do
          put idea_path(idea), params: { idea: attributes_for(:idea, :empty_name) }
        end.to_not change(Idea.find(idea.id), :name)
      end

      it 'エラーが表示されること' do
        put idea_path(idea), params: { idea: attributes_for(:idea, :empty_name) }
        expect(response.body).to include 'アイデアの更新に失敗しました'
        expect(response.body).to include 'アイデア名を入力してください'
      end
    end
  end

  describe 'DELETE #destroy' do
    before { sign_in idea.user }
    it 'リクエストが成功すること' do
      delete idea_path(idea)
      expect(response.status).to eq 302
    end

    it 'アイデアが削除されること' do
      expect do
        delete idea_path(idea)
      end.to change(Idea, :count).by(-1)
    end

    it 'アイデア一覧にリダイレクトすること' do
      delete idea_path(idea)
      expect(response).to redirect_to(ideas_path)
    end
  end

  describe 'GET #search' do
    it 'リクエストが成功すること' do
      get search_ideas_path, params: { keyword: idea.name }
      expect(response.status).to eq 200
    end

    it '検索したアイデアが表示されていること' do
      get search_ideas_path, params: { keyword: idea.name }
      expect(response.body).to include idea.name
    end
  end
end
