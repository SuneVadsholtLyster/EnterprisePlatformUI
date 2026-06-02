export const tokens = {
  colors: {
    bg: '#0f1720',
    panel: '#111418',
    muted: '#9aa4ad',
    accent: '#c4c9cb',
    brand: '#7c92a3',
  },
  radius: '8px',
}

export function applyTokens() {
  const root = document.documentElement
  root.style.setProperty('--bg', tokens.colors.bg)
  root.style.setProperty('--panel', tokens.colors.panel)
  root.style.setProperty('--muted', tokens.colors.muted)
  root.style.setProperty('--accent', tokens.colors.accent)
  root.style.setProperty('--brand', tokens.colors.brand)
  root.style.setProperty('--radius', tokens.radius)
}
