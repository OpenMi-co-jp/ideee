import { DonutChart, DonutChartCell } from '@mantine/charts'
import '@mantine/charts/styles.css'

interface CustomDonutChartProps {
  data: DonutChartCell[]
  label: string
  size?: number
}

export const CustomDonutChart = ({
  data,
  label,
  size = 150,
}: CustomDonutChartProps) => {
  const chartData: DonutChartCell[] = data.map(({ value, name, color }) => ({
    value,
    name,
    color,
  }))

  return (
    <DonutChart
      data={chartData}
      chartLabel={label}
      startAngle={90}
      endAngle={450}
      thickness={30}
      size={size}
    />
  )
}
