import { ReactNode, CSSProperties } from 'react'

interface CardProps {
  children: ReactNode
  style?: CSSProperties
  padding?: number
}

/**
 * Standard surface card with rounded corners, white bg, subtle border.
 */
const Card = ({ children, style, padding = 20 }: CardProps) => (
  <div
    className="bg-bg-card rounded-2xl border border-border-light"
    style={{ padding, ...style }}
  >
    {children}
  </div>
)

export default Card
