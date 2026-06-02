import React from 'react'

export default function Header() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div className="brand">Enterprise Platform UI</div>
        <div style={{ color: 'var(--muted)', fontSize: '12px', fontWeight: 500 }}>Industrial Minimalism · Governance-first</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', color: 'var(--muted)', fontSize: '12px', fontWeight: 500 }}>
        <span>v0.1.0</span>
      </div>
    </div>
  )
}
