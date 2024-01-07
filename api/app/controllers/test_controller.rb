class TestController < ApplicationController
  def create
    render json: { message: 'テスト成功です' }, status: :ok
  rescue => e
    render json: { message: "テスト失敗です#{e.message}" }, status: :internal_server_error
  end
end
