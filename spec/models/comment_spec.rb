require 'rails_helper'

RSpec.describe Comment, type: :model do
  it 'モデルの作成が有効であること' do
    expect(FactoryBot.build(:comment)).to be_valid
  end
end
