require 'rails_helper'

RSpec.describe Tag do
  it 'モデルの作成が有効であること' do
    expect(FactoryBot.build(:tag)).to be_valid
  end
end
