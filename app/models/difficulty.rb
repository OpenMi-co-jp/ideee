class Difficulty < ApplicationRecord
  belongs_to :user
  belongs_to :idea
  enum level: {easy: 0, middle: 1, hard: 2}
end
