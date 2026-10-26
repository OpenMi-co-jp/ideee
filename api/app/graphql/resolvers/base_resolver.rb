# frozen_string_literal: true

module Resolvers
  class BaseResolver < GraphQL::Schema::Resolver
    # include GraphqlErrorCode

    class << self
      # ログインユーザー専用のリゾルバで宣言する
      def login_required
        @login_required = true
      end

      def login_required?
        @login_required == true
      end
    end

    def authorized?(**args)
      raise GraphQL::ExecutionError, 'Authentication required' if self.class.login_required? && context[:current_user].nil?

      super
    end
  end
end
