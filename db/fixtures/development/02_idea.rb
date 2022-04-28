attributes = {
  name: Faker::JapaneseMedia::Doraemon.gadget,
  background: Faker::Lorem.paragraph(sentence_count: 20),
  goal: Faker::Lorem.paragraph(sentence_count: 20),
  published_at: Faker::Date.between(from: 10.days.ago, to: 5.days.ago),
  view: (0..200).to_a.sample
}

20.times do |n|
  num = n + 1
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
