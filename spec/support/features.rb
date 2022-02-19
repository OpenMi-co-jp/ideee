module Features
  module SessionHelpers
    def sign_in(user = nil)
      user ||= FactoryBot.create(:user)
      visit new_user_session_path
      within 'form' do
        fill_in 'user[login]', with: user.email
        fill_in 'user[password]', with: user.password
        click_on 'ログイン'
      end
    end
  end
end
