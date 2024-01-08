class TestsController < ApplicationController
  protect_from_forgery except: :create

  def show
    render json: { message: 'showテスト成功です' }, status: :ok
  rescue StandardError => e
    render json: { message: "showテスト失敗です#{e.message}" }, status: :internal_server_error
  end

  def create
    render json: { message: 'createテスト成功です' }, status: :ok
  rescue StandardError => e
    render json: { message: "createテスト失敗です#{e.message}" }, status: :internal_server_error
  end
end
