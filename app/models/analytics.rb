require 'google/apis/analyticsreporting_v4'

class Analytics
  def initialize
    @view_id = '246703226'
    @analytics = Google::Apis::AnalyticsreportingV4
    auth
  end

  def idea_report(demention, idea_id)
    date_range = @analytics::DateRange.new(start_date: '2021-07-01', end_date: 'today') # ideeeを作ってから本日までの期日範囲
    data = analytics_data(date_range, demention)
    res_data = data&.rows.find { |i| i.dimensions == ["/ideas/#{idea_id}"] }
    res_data&.metrics&.first&.values&.first
  end

  def daily_total_count(demention)
    date_range = @analytics::DateRange.new(start_date: 'yesterday', end_date: 'yesterday') # 昨日から今日まで
    data = analytics_data(date_range, demention)
    data.totals.first&.values&.first.to_i
  end

  def analytics_data(date_range, demention)
    metric = @analytics::Metric.new(expression: "ga:#{demention}", alias: demention) # dementionは確認したい項目
    dimension = @analytics::Dimension.new(name: 'ga:pagePath')
    request = @analytics::GetReportsRequest.new(
      report_requests: [@analytics::ReportRequest.new(
        view_id: @view_id, metrics: [metric], dimensions: [dimension], date_ranges: [date_range]
      )]
    )
    response = @client.batch_get_reports(request)
    response.reports.first.data
  end

  private

  def auth
    scope = ['https://www.googleapis.com/auth/analytics.readonly']
    @client = @analytics::AnalyticsReportingService.new
    @client.authorization = Google::Auth::ServiceAccountCredentials.make_creds(
      json_key_io: File.open('analytics-auth.json'),
      scope:
    )
  end
end
