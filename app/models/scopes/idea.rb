module Scopes::Idea
  extend ActiveSupport::Concern

  included do
    # ransackのソートに対応したscope
    ['ASC', 'DESC'].each do |order|
      I18n.t('activerecord.sorts').keys.each do |item|
        Idea.classs_eval { scope item, -> { order("#{item}": order) }
      end
    end
  end
end
