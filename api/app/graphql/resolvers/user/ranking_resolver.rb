module Resolvers
  class User::RankingResolver < BaseResolver
    graphql_name 'GetUserRanking'

    type [Types::UserType], null: false

    def resolve
      Rails.cache.fetch('user_ranking', expires_in: 2.hours) do
        one_month_ago = 1.month.ago
        bot_user_id = 3375

        # 直近1ヶ月のアクティビティを持つユーザーIDとポイントを取得
        active_users = ActiveRecord::Base.connection.select_all(<<~SQL.squish)
          SELECT
            users.id as user_id,
            COUNT(DISTINCT comment_id) * 1 as comment_points,
            COUNT(DISTINCT idea_id) * 2 as idea_points,
            COUNT(DISTINCT like_id) * 1 as like_points,
            (COUNT(DISTINCT comment_id) * 1 +
             COUNT(DISTINCT idea_id) * 2 +
             COUNT(DISTINCT like_id) * 1) as total_points
          FROM users
          LEFT JOIN (
            SELECT user_id, id as comment_id, NULL as idea_id, NULL as like_id
            FROM comments
            WHERE created_at >= '#{one_month_ago.to_fs(:db)}'
            UNION ALL
            SELECT user_id, NULL as comment_id, id as idea_id, NULL as like_id
            FROM ideas
            WHERE created_at >= '#{one_month_ago.to_fs(:db)}'
            UNION ALL
            SELECT user_id, NULL as comment_id, NULL as idea_id, id as like_id
            FROM likes
            WHERE created_at >= '#{one_month_ago.to_fs(:db)}'
          ) as activities ON users.id = activities.user_id
          WHERE users.id != #{bot_user_id}
          GROUP BY users.id
          HAVING total_points > 0
          ORDER BY total_points DESC
          LIMIT 5
        SQL

        user_ids = active_users.rows.map(&:first)

        # ユーザー情報を取得し、ポイント順にソート
        ::User.where(id: user_ids)
              .sort_by { |user| -active_users.find { |row| row['user_id'] == user.id }['total_points'] }
      end
    end
  end
end
