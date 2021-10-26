require 'rails_helper'

RSpec.describe Like, type: :model do
  it 'モデルの作成が有効であること' do
    expect(build(:like)).to be_valid
  end
end
