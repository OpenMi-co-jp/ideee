require 'rails_helper'

RSpec.describe Tag, type: :model do
  it 'モデルの作成が有効であること' do
    expect(build(:tag)).to be_valid
  end
end
