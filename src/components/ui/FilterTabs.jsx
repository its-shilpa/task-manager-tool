// Row of filter buttons with a counter. Scrolls sideways on small screens.
export default function FilterTabs({ tabs, active, onChange }) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0" role="tablist">
      <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
        {tabs.map((tab) => {
          const isActive = tab.value === active
          return (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(tab.value)}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? 'border-transparent bg-linear-to-r from-indigo-600 to-fuchsia-600 text-white shadow-md shadow-violet-500/25'
                  : 'border-line bg-surface text-muted hover:text-fg'
              }`}
            >
              {tab.label}
              <span
                className={`rounded-full px-1.5 text-xs ${
                  isActive ? 'bg-white/25' : 'bg-surface-2'
                }`}
              >
                {tab.count}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
