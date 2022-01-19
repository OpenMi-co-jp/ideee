class CooperationsController < ApplicationController
  before_action :authenticate_user!, except: %i[ index ]
  before_action :defined_check, except: %i[ index ]
  before_action :set_idea, except: %i[ index ]

  def index
    list = Idea.published.where(cooperation: :ongoing)
    @cooperation_ongoing_ideas = Kaminari.paginate_array(list).page(params[:page])
  end

  def new
    redirect_to @idea if !@idea.cooperation_not_started?
  end

  def create
    current_user.cooperations.find_or_create_by(idea: @idea)
    SendEmail.new.join_cooperation(current_user, @idea) if Rails.env.production?
    redirect_to @idea, notice: t('.success')
  end

  def destroy
    current_user.cooperations.find_by!(idea: @idea).destroy
    redirect_to @idea, notice: t('.success')
  end

  def start
    @idea.cooperation_ongoing!
    redirect_to @idea, notice: t('.success')
  end

  def complete
    @idea.cooperation_completed!
    redirect_to @idea, notice: t('.success')
  end

  def restart
    start
  end

  private

  def set_idea
    @idea = Idea.find(params[:idea_id])
  end
end
