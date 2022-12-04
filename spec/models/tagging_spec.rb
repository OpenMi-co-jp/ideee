require 'rails_helper'

RSpec.describe Tagging, type: :model do
  it 'モデルの作成が有効であること' do
    expect(build(:tagging)).to be_valid
  end
end
