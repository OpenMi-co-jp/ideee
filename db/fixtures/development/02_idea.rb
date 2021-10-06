carriwave_path = "./app/assets/images/ideee-tech-logo.png"

Idea.seed(
  :id,
  { id: 1, name: Faker::App.name , note: Faker::Lorem.paragraph(sentence_count: 10), icon: File.open(carriwave_path) , user: User.find(1) },
  { id: 2, name: Faker::App.name , note: Faker::Lorem.paragraph(sentence_count: 10), icon: File.open(carriwave_path) ,user: User.find(1) },
  { id: 3, name: Faker::App.name , note: Faker::Lorem.paragraph(sentence_count: 10), icon: File.open(carriwave_path) ,user: User.find(2) },
  { id: 4, name: Faker::App.name , note: Faker::Lorem.paragraph(sentence_count: 10), icon: File.open(carriwave_path) ,user: User.find(2) },
  { id: 5, name: Faker::App.name , note: Faker::Lorem.paragraph(sentence_count: 10), icon: File.open(carriwave_path) ,user: User.find(3) },
  { id: 6, name: Faker::App.name , note: Faker::Lorem.paragraph(sentence_count: 10), icon: File.open(carriwave_path) ,user: User.find(3) },
  { id: 7, name: Faker::App.name , note: Faker::Lorem.paragraph(sentence_count: 10), icon: File.open(carriwave_path) ,user: User.find(4) },
  { id: 8, name: Faker::App.name , note: Faker::Lorem.paragraph(sentence_count: 10), icon: File.open(carriwave_path) ,user: User.find(4) },
  { id: 9, name: Faker::App.name , note: Faker::Lorem.paragraph(sentence_count: 10), icon: File.open(carriwave_path) ,user: User.find(5) },
  { id: 10, name: Faker::App.name , note: Faker::Lorem.paragraph(sentence_count: 10), icon: File.open(carriwave_path) ,user: User.find(5) },
)