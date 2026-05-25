export class TXT {
  static ttip = (french: string, english: string): React.ReactNode => (
    <span className="ttip" data-tooltip={english}>{french}</span>
  )

  static trans = (french: string, english: string): React.ReactNode => (
    <span>{french} <span className="text-muted-foreground">({english})</span></span>
  )

  static bold = (content: React.ReactNode): React.ReactNode => (
    <span className="font-semibold">{content}</span>
  )
}
