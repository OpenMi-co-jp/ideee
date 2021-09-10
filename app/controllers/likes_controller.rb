class LikesController < ApplicationController
  def create
    @idea = Idea.find(params[:idea])
    current_user.like(@idea)
  end

  def destroy
    @idea = Idea.find(params[:idea]).idea
    current_user.unlike(@idea)
  end
end
