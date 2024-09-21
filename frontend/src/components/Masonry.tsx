export default function Masonry({ columns, spacing, children }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns.xs}, 1fr)`, gap: spacing }}>
      {children}
    </div>
  )
}
