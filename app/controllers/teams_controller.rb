class TeamsController < ApplicationController
  before_action :authenticate_user!, except: %i[index]
  before_action :defined_check, except: %i[index]
  before_action :set_team, only: %i[show edit update destroy]

  def index
    idea_list = Team.where(status: :active).pluck(:idea_id)
    list = Idea.where(id: idea_list).includes(%i[idea_tags user])
    @active_team_ideas = Kaminari.paginate_array(list).page(params[:page])
  end

  def show; end

  def new
    @idea = Idea.find_by!(id: params[:idea_id])
    @team = Team.new
  end

  def create
    @team = Team.find_or_create_by(team_params)
    redirect_to URI.parse(@team), notice: t('.success')
  end

  def edit; end

  def update
    @team.update(team_params)
    redirect_to URI.parse(@team), notice: t('.success')
  end

  def destroy
    # メソッドごと変えるので無視
    redirect_to @idea, notice: t('.success')
  end

  def join
    SendEmail.new.join_team(current_user, @idea) if Rails.env.production?
    redirect_to @idea, notice: t('.success')
  end

  def complete
    redirect_to @idea, notice: t('.success')
  end

  private

  def set_team
    @team = Team.find_by!(id: params[:idea_id])
  end

  def team_params
    params.require(:team).permit(:offer, :requirement, :status, :idea_id)
  end
end
