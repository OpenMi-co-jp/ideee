module Scopes
  class Idea
    extend ActiveSupport::Concern

    included do
      # ransackのソートに対応したscope
      %w[ASC DESC].each do |order|
        I18n.t('activerecord.sorts.ideas').each_key do |item|
          Idea.classs_eval { scope item, -> { order("#{item}": order) } }
        end
      end
    end
  end
end
