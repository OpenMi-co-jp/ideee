module Mutations
  class Idea::AiBrushup < BaseMutation
    graphql_name 'IdeaAiBrushUp'
    include AiLoggable

    argument :idea_id, ID, required: true, description: 'アイデアID'

    field :job_id, String, null: true, description: 'ジョブID'
    field :success, Boolean, null: false, description: '成功フラグ'
    field :errors, [String], null: true, description: 'エラーリスト'

    AI_LIMIT = Rails.application.config.ai_limit
    LOCK_TTL = 10.minutes
    private_constant :AI_LIMIT, :LOCK_TTL
    def resolve(**args)
      idea = context[:current_user].ideas.find_by(id: args[:idea_id])
      return { success: false, errors: ['アイデアが見つかりません'] } if idea.nil?
      return { success: false, errors: ['アイデアが公開されていません'] } if idea.draft
      return { success: false, errors: ['アイデアが既にブラッシュアップされています'] } if brushup_exists?(idea)

      todays_logs_count = context[:current_user].todays_ai_log_count
      return { success: false, errors: ['本日のAI利用制限を超えています'] } if todays_logs_count >= AI_LIMIT
      # 同じアイデアへの多重実行（エイリアスでの連打など）を防ぐ
      return { success: false, errors: ['ブラッシュアップを実行中です'] } unless acquire_lock(idea)

      # 利用枠はジョブの完了ではなく受付時に消費する。
      # ジョブ側で記録すると、複数アイデアへ同時にリクエストして上限チェックをすり抜けられるため
      job_id = nil
      ActiveRecord::Base.transaction do
        create_ai_log(context[:current_user], 'brush_up', 'Idea', idea.id)
        todays_logs_count += 1

        job_id = AI::BrushupJob.perform_later(idea.id).job_id
      end

      {
        job_id:,
        success: true,
        errors: ["本日の残りAI利用回数：#{AI_LIMIT - todays_logs_count} 回"]
      }
    rescue StandardError => e
      Sentry.capture_exception(e)
      {
        success: false,
        errors: ['AIブラッシュアップの開始に失敗しました']
      }
    end

    private

    def brushup_exists?(idea)
      AiLog.exists?(loggable: idea, action: 'brush_up')
    end

    def acquire_lock(idea)
      Rails.cache.write("ai_brushup:idea:#{idea.id}", true, unless_exist: true, expires_in: LOCK_TTL)
    end
  end
end
