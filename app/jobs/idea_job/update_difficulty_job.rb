module IdeaJob
  class UpdateDifficultyJob < ApplicationJob
    queue_as :default

    def perform(id)
      idea = Idea.find_by!(id: id)
      # difficultyが一つしかなければ現在の値を代入
      level =
        if idea.difficultys.size == 1
          idea.difficultys[0].level
        else
          # 2つ以上であればgroup化して計算開始
          levels_hash = idea.difficultys.group(:level).size
          if levels_hash.length != 1 && levels_hash.values.max(2).uniq.length == 1
            # もし最も多く使われる値が2つ以上ある場合
            'middle'
          else
            # 最も多く使われる値が１つしかない場合
            levels_hash.max_by { |x| x[1] }[0]
          end
        end
      # ideaを出力されたlevelでupdate
      idea.update!(difficulty: level)
    end
  end
end
