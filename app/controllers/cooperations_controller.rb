class CooperationsController < ApplicationController
  before_action :authenticate_user!, except: %i[ ongoing ]
  before_action :defined_check, except: %i[ ongoing ]
  before_action :set_idea, except: %i[ ongoing ]

  def create
    current_user.cooperations.find_or_create_by(idea: @idea)
    redirect_to @idea, notice: t('.success')
  end

  def destroy
    current_user.cooperations.find_by(idea: @idea).destroy
    redirect_to @idea, notice: t('.success')
  end

  def ongoing
    list = Idea.where(cooperation: :ongoing)
    @cooperation_ongoing_ideas = Kaminari.paginate_array(list).page(params[:page])
  end

  def join_confirm
    redirect_to @idea if current_user.cooperation_joined?(@idea)
  end

  def start_confirm
    redirect_to @idea if !@idea.cooperation_not_started?
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
    @idea.cooperation_ongoing!
    redirect_to @idea, notice: t('.success')
  end

  private

  def set_idea
    @idea = Idea.find(params[:idea_id])
  end
end
