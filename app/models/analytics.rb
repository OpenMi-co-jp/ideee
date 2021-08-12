require 'google/apis/analyticsreporting_v4'

class Analytics < ApplicationRecord
  def initialize(_)
    @view_id  = '246703226'
    @analytics = Google::Apis::AnalyticsreportingV4
    auth
  end

  def report_views_count(idea_id)
    date_range = @analytics::DateRange.new(start_date: '2021-07-01', end_date: 'today')
    metric = @analytics::Metric.new(expression: 'ga:pageviews', alias: 'pageviews')
    dimension = @analytics::Dimension.new(name: 'ga:pagePath')
    request = @analytics::GetReportsRequest.new(
      report_requests: [@analytics::ReportRequest.new(
        view_id: @view_id, metrics: [metric], dimensions: [dimension], date_ranges: [date_range]
      )]
    )
    response = @client.batch_get_reports(request)
    data = response.reports.first.data
    puts "累計View数: #{data.totals.first.values.first}"
    puts '------------------'
    res_data = data.rows.find {|i| i.dimensions == ["/ideas/#{idea_id}"]}
    return res_data.metrics.first.values.first
  end

  private

  def auth
    scope = ['https://www.googleapis.com/auth/analytics.readonly']
    @client = @analytics::AnalyticsReportingService.new
    @client.authorization = Google::Auth::ServiceAccountCredentials.make_creds(
      json_key_io: File.open('analytics-auth.json'),
      scope: scope
    )
  end

end
