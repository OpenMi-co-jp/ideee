require 'rails_helper'

RSpec.describe Comment, type: :model do
  it '有効なファクトリを持つこと' do
    expect(build(:comment)).to be_valid
  end
end
