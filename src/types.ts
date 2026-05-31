import type { ReactNode } from 'react'

export interface ContentItem {
  term?: ReactNode
  detail: ReactNode
}

export interface Section {
  icon: ReactNode
  title: string
  content: ContentItem[]
  variant?: 'red'
}
