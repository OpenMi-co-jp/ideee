import React, { useEffect } from 'react'

interface TwitterTimelineProps {
  href: string
}

export const TwitterTimeline: React.FC<TwitterTimelineProps> = ({ href }) => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://platform.twitter.com/widgets.js'
    script.async = true
    script.charset = 'utf-8'
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <a className="twitter-timeline" href={href} target="_blank" rel="noopener">
      Tweets
    </a>
  )
}
