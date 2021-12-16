carriwave_path = "./app/assets/images/ideee-tech-logo.svg"

15.times do |n|
  num = n + 1
  Idea.seed(
    :id,
    { id: num, name: Faker::JapaneseMedia::Doraemon.gadget , note: Faker::Lorem.paragraph(sentence_count: 20), icon: File.open(carriwave_path) , user: User.find(num), view: (0..200).to_a.sample, published_at: Faker::Date.between(from: 10.days.ago, to: 5.days.ago) },
  )
  Idea.seed(
    :id,
    { id: num + 15, name: Faker::JapaneseMedia::Doraemon.gadget , note: Faker::Lorem.paragraph(sentence_count: 20), user: User.find(num + 15), view: (0..200).to_a.sample, published_at: Faker::Date.between(from: 10.days.ago, to: 5.days.ago)},
  )
end
