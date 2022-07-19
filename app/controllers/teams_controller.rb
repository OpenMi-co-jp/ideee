class TeamsController < ApplicationController
  prepend_before_action :set_team, except: %i[new create]
  before_action :authenticate_user!
  before_action :defined_check, except: %i[show]
  before_action :set_idea, only: %i[new edit stop join activate finish]
  before_action :check_owner, only: %i[edit update stop activate finish]

  def show
    @idea = @team.idea
  end

  def new
    return redirect_to @idea, notice: t('.exist') if Team.find_by(idea_id: params[:idea_id])

    @team = Team.new
  end

  def create
    @team = Team.new(team_params)
    if current_user == @team.owner
      @team.status = :active
      @team.save!
      redirect_to idea_path(@team.idea_id, share: true), notice: t('.success')
    else
      redirect_to @team, notice: t('.not_owner')
    end
  end

  def edit; end

  def update
    @team.update(team_params)
    redirect_to @team, notice: t('.success')
  end

  def join
    @team.team_users.create(user: current_user)
    Notifications::JoinTeamJob.perform_later(current_user, @idea)
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

  def set_team
    @team = Team.find_by!(id: params[:id])
  end

  def set_idea
    @idea =
      if params[:idea_id].present?
        Idea.find_by!(id: params[:idea_id])
      else
        @team.idea
      end
  end

  def team_params
    params.require(:team).permit(:offer, :requirement, :status, :idea_id, :owner_id)
  end

  def check_owner
    return if current_user == @team&.owner

    redirect_to @idea, notice: 'オーナー権限がありません'
  end
end
