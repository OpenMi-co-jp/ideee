require 'rails_helper'

RSpec.describe Like, type: :model do
  it '有効なファクトリを持つこと' do
    expect(build(:like)).to be_valid
  end
end
