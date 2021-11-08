class IdeasController < ApplicationController
  prepend_before_action :set_idea, only: %i[ show edit update destroy ]
  before_action :authenticate_user!, except: %i[ index show search ]
  before_action :own_user_check, only: %i[ edit update destroy ]
  before_action :defined_check, except: %i[ index show search ]

  def index
    @ideas = Idea.all # 一度定義することで何度もDBに値を取りに行くことを阻止
    @latest_ideas = @ideas.order(created_at: "DESC").first(10)
    @liked_ideas = @ideas.order(likes_num: "DESC").first(5)
    @most_viewed_ideas = @ideas.order(view: "DESC").first(5)
    @most_commented_ideas = @ideas.most_commented.first(5)
    @featured_users = User.where(defined: true).order(point: "DESC").first(5) # 定義がされているユーザーだけをポイントが高い準に5名
  end

  def show
    @title = @idea.name
    @user = User.find_by(id: @idea.user_id)
    @levels = Difficulty.levels
    if Rails.env.production?
      @idea.views_update(params[:id]) # 本番環境のみ、アイデアに対するView数をAPIで取得
      @time_on_page = Analytics.new.report_count('avgTimeOnPage', params[:id]) || '-' # 製作者にのみ見える、アイデアページの滞在時間を設定
    else
      @time_on_page = '-'
    end
    gon.idea_id = @idea.id # JSにアイデアのIDを渡す
  end

  def new
    @idea = Idea.new(note: t('.default_set')) # アイデア新規作成時のフォーマットを設定
  end

  def edit; end

  def create
    @idea = Idea.new(idea_params.merge(user_id: current_user.id))
    if @idea.save
      SlackNotifier.new.send(@idea, idea_url(@idea.id)) if Rails.env.production?
      redirect_to @idea, notice: t('.success')
    else
      flash.now[:alert] = t('.fail')
      render :new
    end
  end

  def update
    if @idea.update(idea_params.merge(user_id: current_user.id))
      redirect_to @idea, notice: t('.success')
    else
      flash.now[:alert] = t('.fail')
      render :edit
    end
  end

  def destroy
    @idea.destroy
    redirect_to ideas_url, notice: t('.success')
  end

  def search
    # アイデアに紐づくlikeの数を数えて、降順に並べる
    sort = params[:sort] || "likes_num"
    list = Idea.search(name: params[:keyword], difficulty: params[:difficulty]).order("#{sort}": "DESC")
    @searched_ideas = Kaminari.paginate_array(list).page(params[:page])
    current_page = params[:page].nil? ? 1 : params[:page].to_i
    @rank_num = (current_page - 1) * @searched_ideas.limit_value
  end

  def most_commented
    list = Idea.most_commented
    @searched_ideas = Kaminari.paginate_array(list).page(params[:page])
    # ビューを指定
    render 'search'
  end

  private
    def set_idea
      @idea = Idea.find(params[:id])
    end

    # ストロングパラメーターを設定
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
