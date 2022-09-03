require 'rails_helper'

RSpec.describe 'Ideas', type: :request do
  let!(:idea) { FactoryBot.create(:idea) }
  before { sign_in idea.user }

  describe 'GET #index' do
    it 'リクエストが成功すること' do
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
      expect(response.status).to eq 200
    end
  end

  describe 'GET #edit' do
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
    subject { post ideas_path, params: params }
    context 'パラメータが妥当な場合' do
      let(:params) { { idea: attributes_for(:idea) } }
      it 'リクエストが成功すること' do
        subject
        expect(response.status).to eq 302
      end

      it 'アイデアが登録されること' do
        expect do
          subject
        end.to change(Idea, :count).by(1)
      end

      it '詳細ページにリダイレクトすること' do
        subject
        expect(response).to redirect_to("http://www.example.com/ideas/#{Idea.last.id}?share=true")
      end
    end

    context 'パラメータが不正な場合' do
      let(:params) { { idea: attributes_for(:idea, :empty_name) } }
      it 'アイデアが登録されないこと' do
        expect do
          subject
        end.to_not change(Idea, :count)
      end

      it 'エラーが表示されること' do
        subject
        expect(response.body).to include 'アイデアの登録に失敗しました'
        expect(response.body).to include 'アイデア名を入力してください'
      end
    end
  end

  describe 'PUT #update' do
    subject { put idea_path(idea), params: params }
    context 'パラメータが妥当な場合' do
      let(:params) { { idea: attributes_for(:idea, :updated_idea) } }
      it 'リクエストが成功すること' do
        subject
        expect(response.status).to eq 302
      end

      it 'アイデア名が更新されること' do
        expect do
          subject
        end.to change { Idea.find(idea.id).name }.from(idea.name).to('updated idea')
      end

      it 'リダイレクトすること' do
        subject
        expect(response).to redirect_to Idea.find(idea.id)
      end
    end

    context 'パラメータが不正な場合' do
      let(:params) { { idea: attributes_for(:idea, :empty_name) } }
      it 'アイデア名が変更されないこと' do
        expect do
          subject
        end.to_not change(Idea.find(idea.id), :name)
      end

      it 'エラーが表示されること' do
        subject
        expect(response.body).to include 'アイデアの更新に失敗しました'
        expect(response.body).to include 'アイデア名を入力してください'
      end
    end
  end

  describe 'DELETE #destroy' do
    subject { delete idea_path(idea) }
    it 'リクエストが成功すること' do
      subject
      expect(response.status).to eq 302
    end

    it 'アイデアが削除されること' do
      expect do
        subject
      end.to change(Idea, :count).by(-1)
    end

    it 'アイデア一覧にリダイレクトすること' do
      subject
      expect(response).to redirect_to(ideas_path)
    end
  end

  describe 'GET #search' do
    subject { get search_ideas_path, params: params }
    let(:params) { { keyword: idea.name } }
    it 'リクエストが成功すること' do
      subject
      expect(response.status).to eq 200
    end

    it '検索したアイデアが表示されていること' do
      subject
      expect(response.body).to include idea.name
    end
  end
end
