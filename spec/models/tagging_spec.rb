require 'rails_helper'

RSpec.describe Tagging do
  it 'モデルの作成が有効であること' do
    expect(FactoryBot.build(:tagging)).to be_valid
  end
end
