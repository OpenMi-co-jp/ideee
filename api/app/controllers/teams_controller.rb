# frozen_string_literal: true

class TeamsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_idea, only: %i[stop join leave activate finish]
  before_action :check_owner, only: %i[stop activate finish]

  def join
    @team.team_users.create!(user: current_user)
    Notifications::JoinTeamJob.perform_later(current_user, @idea)
    redirect_to @idea, notice: t('.success')
  end

  def leave
    team_user = @team.team_users.find_by!(user_id: current_user.id)
    team_user.update!(left: true)
    Notifications::LeaveTeamJob.perform_later(current_user, @idea)
    redirect_to @idea, notice: t('.success')
  end

  def stop
    @team.status_stop!
    redirect_to @idea, notice: t('.success')
  end

  def activate
    @team.status_active!
    redirect_to @team, notice: t('.success')
  end

  def finish
    @team.status_finished!
    redirect_to @idea, notice: t('.success')
  end

  private

  def set_idea
    @idea =
      if params[:idea_id].present?
        Idea.find(params[:idea_id])
      else
        @team.idea
      end
  end

  def check_owner
    return if current_user == @team&.owner

    redirect_to @idea, notice: 'オーナー権限がありません'
  end
end
