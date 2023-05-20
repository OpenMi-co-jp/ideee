# frozen_string_literal: true

20.times do |n|
  num = n + 1
  Tag.seed(
    :id,
    { id: num, name: Faker::App.unique.name }
  )
end
