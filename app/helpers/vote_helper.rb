module VoteHelper
  def difficulty_tag(object)
    object.not_yet? ? 'Vote' : object.difficulty.capitalize
  end
end
