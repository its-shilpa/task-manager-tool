import Icon from './Icon'

export default function EmptyState({ icon = 'inbox', title, text, children }) {
  return (
    <div className="card flex flex-col items-center px-6 py-14 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-2 text-muted">
        <Icon name={icon} className="h-7 w-7" />
      </span>
      <h3 className="mt-4 text-lg font-bold">{title}</h3>
      {text && <p className="mt-1 max-w-sm text-sm text-muted">{text}</p>}
      {children && <div className="mt-5">{children}</div>}
    </div>
  )
}
