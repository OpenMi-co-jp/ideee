class IdeasController < ApplicationController
  prepend_before_action :set_idea, only: %i[ show edit update destroy ]
  before_action :authenticate_user!, except: %i[ index show ]
  before_action :own_user_check, only: %i[ edit update destroy ]
  skip_before_action :defined_check, only: %i[ index show ]

  # GET /ideas or /ideas.json
  def index
    @ideas = Idea.all
    @latest_ideas = Idea.all.order(created_at: "DESC").first(3)
    @liked_ideas = Idea.all.sort_by { |v| -v.like_users&.count }.first(5)
    @most_viewed_ideas = Idea.all.order(view: "DESC").first(5)
    @featured_users = User.first(5)
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
  end

  # GET /ideas/new
  def new
    @idea = Idea.new
  end

  # GET /ideas/1/edit
  def edit
  end

  # POST /ideas or /ideas.json
  def create
    @idea = Idea.new(idea_params.merge(user_id: current_user.id))

    respond_to do |format|
      if @idea.save
        format.html { redirect_to @idea, notice: "Idea was successfully created." }
        format.json { render :show, status: :created, location: @idea }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @idea.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /ideas/1 or /ideas/1.json
  def update
    respond_to do |format|
      if @idea.update(idea_params.merge(user_id: current_user.id))
        format.html { redirect_to @idea, notice: "Idea was successfully updated." }
        format.json { render :show, status: :ok, location: @idea }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @idea.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /ideas/1 or /ideas/1.json
  def destroy
    @idea.destroy
    respond_to do |format|
      format.html { redirect_to ideas_url, notice: "Idea was successfully destroyed." }
      format.json { head :no_content }
    end
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
        flash[:alert] = "権限がないのでリダイレクトされました"
      end
    end
end
