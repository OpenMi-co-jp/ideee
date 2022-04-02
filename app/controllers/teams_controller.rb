class TeamsController < ApplicationController
  prepend_before_action :set_team, only: %i[show edit update destroy stop]
  before_action :authenticate_user!, except: %i[index]
  before_action :defined_check, except: %i[index]
  before_action :set_idea, only: %i[new edit destroy stop]

  def index
    idea_list = Team.where(status: :active).pluck(:idea_id)
    list = Idea.where(id: idea_list).includes(%i[idea_tags user])
    @active_team_ideas = Kaminari.paginate_array(list).page(params[:page])
  end

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
      @team.status_active!
      @team.save!
      redirect_to @team, notice: t('.success')
    else
      redirect_to @team, notice: t('.not_owner')
    end
  end

  def edit; end

  def update
    @team.update(team_params)
    redirect_to @team, notice: t('.success')
  end

  def destroy
    # メソッドごと変えるので無視
    redirect_to @idea, notice: t('.success')
  end

  def join
    SendEmail.new.join_team(current_user, @idea) if Rails.env.production?
    redirect_to @idea, notice: t('.success')
  end

  def stop
    @team.status_stop!
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
end
