# frozen_string_literal: true

class TeamActivityReporter
  REPO = 'naru20181117/ideee'
  private_constant :REPO

  GITHUB_TOKEN = Rails.application.config.github_token
  private_constant :GITHUB_TOKEN

  def initialize(since)
    @since = since
  end

  def report
    prs = fetch_pull_requests
    activity = {}

    prs.each do |pr|
      update_activity(activity, pr)
    end

    activity
  end

  private

  def fetch_pull_requests
    url = "https://api.github.com/repos/#{REPO}/pulls"
    params = { state: 'all', sort: 'updated', direction: 'desc', per_page: 100 }
    github_api_request(url, params:)
  end

  def update_activity(activity, pr)
    updated_at = Time.zone.parse(pr['updated_at']).to_i
    return if updated_at < @since.to_time.to_i

    author = pr['user']['login']
    activity[author] ||= { merged_prs: 0, reviews: 0 }

    update_merged_prs(activity, author, pr)
    update_reviews(activity, pr)
  end

  def update_merged_prs(activity, author, pr)
    return unless pr['merged_at'] && Time.zone.parse(pr['merged_at']).to_i >= @since.to_time.to_i

    activity[author][:merged_prs] += 1
  end

  def update_reviews(activity, pr)
    review_url = "https://api.github.com/repos/#{REPO}/pulls/#{pr['number']}/reviews"
    reviews = github_api_request(review_url)

    reviews.each do |review|
      reviewer = review['user']['login']
      activity[reviewer] ||= { merged_prs: 0, reviews: 0 }
      if review['submitted_at'] && Time.zone.parse(review['submitted_at']).to_i >= @since.to_time.to_i
        activity[reviewer][:reviews] += 1
      end
    end
  end

  def github_api_request(url, params: {})
    uri = URI(url)
    uri.query = URI.encode_www_form(params)

    req = Net::HTTP::Get.new(uri)
    req['Authorization'] = "Bearer #{GITHUB_TOKEN}"
    req['Accept'] = 'application/vnd.github.v3+json'

    res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|
      http.request(req)
    end

    JSON.parse(res.body)
  end
end
