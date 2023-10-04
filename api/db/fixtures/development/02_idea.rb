# frozen_string_literal: true

20.times do |n|
  num = n + 1
  attributes = {
    name: Faker::JapaneseMedia::Doraemon.gadget,
    published_at: Faker::Date.between(from: 10.days.ago, to: 5.days.ago),
    view: (0..200).to_a.sample,
    background: Faker::Lorem.paragraph(sentence_count: 20),
    goal: Faker::Lorem.paragraph(sentence_count: 20),
    wish_function: Faker::Lorem.paragraph(sentence_count: 20),
    hypothesis: Faker::Lorem.paragraph(sentence_count: 20),
    target: Faker::Lorem.paragraph(sentence_count: 20),
    monetize: Faker::Lorem.paragraph(sentence_count: 20),
    similar: Faker::Lorem.paragraph(sentence_count: 20),
    github_url: Faker::Internet.url,
    product_url: Faker::Internet.url
  }
  Idea.seed(
    :id,
    {
      id: num,
      user: User.find(num),
      **attributes
    }
  )
  Idea.seed(
    :id,
    {
      id: num + 20,
      user: User.find(num + 20),
      **attributes
    }
  )
end
