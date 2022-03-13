require 'application_system_test_case'

class IdeasTest < ApplicationSystemTestCase
  setup do
    @idea = ideas(:one)
  end

  test 'visiting the index' do
    visit ideas_url
    assert_selector 'h1', text: 'Ideas'
  end

  test 'creating a Idea' do
    visit ideas_url
    click_on '新しいアイデア'

    fill_in 'Icon', with: @idea.icon
    fill_in 'Name', with: @idea.name
    fill_in 'Note', with: @idea.note
    fill_in 'View', with: @idea.view
    click_on 'Create Idea'

    assert_text 'Idea was successfully created'
  end

  test 'updating a Idea' do
    visit ideas_url
    click_on 'Edit', match: :first

    fill_in 'Icon', with: @idea.icon
    fill_in 'Name', with: @idea.name
    fill_in 'Note', with: @idea.note
    fill_in 'View', with: @idea.view
    click_on 'Update Idea'

    assert_text 'Idea was successfully updated'
  end

  test 'destroying a Idea' do
    visit ideas_url
    page.accept_confirm do
      click_on 'Destroy', match: :first
    end

    assert_text 'Idea was successfully destroyed'
  end
end
