class IdeasController < ApplicationController
  prepend_before_action :set_idea, only: %i[ show edit update destroy ]
  before_action :authenticate_user!, except: %i[ index show search ]
  before_action :own_user_check, only: %i[ edit update destroy ]
  before_action :defined_check, except: %i[ index show search ]

  # GET /ideas or /ideas.json
  def index
    @ideas = Idea.all
    @latest_ideas = Idea.all.order(created_at: "DESC").first(10)
    @liked_ideas = Idea.all.sort_by { |v| -v.like_users&.count }.first(5)
    @most_viewed_ideas = Idea.all.order(view: "DESC").first(5)
    @featured_users = User.all.order(point: "DESC").first(5)
  end

  # GET /ideas/1 or /ideas/1.json
  def show
    @title = @idea.name
    @user = User.find_by(id: @idea.user_id)
    if Rails.env.production?
      @idea.views_update(params[:id])
      @time_on_page = Analytics.new.report_count('avgTimeOnPage', params[:id]) || '-'
    else
      @time_on_page = '-'
    end
    gon.idea_id = @idea.id
  end

  # GET /ideas/new
  def new
    @idea = Idea.new(note: t('.default_set'))
  end

  # GET /ideas/1/edit
  def edit; end

  # POST /ideas or /ideas.json
  def create
    @idea = Idea.new(idea_params.merge(user_id: current_user.id))
    if @idea.save
      SlackNotifier.new.send(@idea, request.url) if Rails.env.production?
      redirect_to @idea, notice: t('.success')
    else
      flash.now[:alert] = t('.fail')
      render :new
    end
  end

  # PATCH/PUT /ideas/1 or /ideas/1.json
  def update
    if @idea.update(idea_params.merge(user_id: current_user.id))
      redirect_to @idea, notice: t('.success')
    else
      flash.now[:alert] = t('.fail')
      render :edit
    end
  end

  # DELETE /ideas/1 or /ideas/1.json
  def destroy
    @idea.destroy
    redirect_to ideas_url, notice: t('.success')
  end

  def search
    @searched_ideas = Idea.search(params[:keyword]).sort_by { |v| -v.like_users&.count }.first(20)
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_idea
      @idea = Idea.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def idea_params
      params.require(:idea).permit(:name, :icon, :note, :view, :user_id)
    end

    def own_user_check
      unless current_user.own?(@idea)
        redirect_to root_path
        flash[:alert] = t('default.message.unauthorized')
      end
    end
end
