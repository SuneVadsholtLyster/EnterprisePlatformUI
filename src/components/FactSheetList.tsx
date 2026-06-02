import React, { useEffect, useState } from 'react'
import { fetchFactSheets, FactSheet } from '../utils/dataAdapter'

const TypeIcon: Record<string, string> = {
  Application: '⬚',
  'IT Component': '◆',
  'Business Capability': '▲',
  Template: '◇',
  'business-capabilities': '▲',
  applications: '⬚',
  'it-components': '◆',
  initiatives: '□',
  platforms: '●',
  organizations: '◉',
  'business-contexts': '◭',
  'data-objects': '⬡',
  interfaces: '↔',
  objectives: '🎯',
  providers: '⊕',
  'tech-categories': '⊡',
}

export default function FactSheetList() {
  const [items, setItems] = useState<FactSheet[]>([])

  useEffect(() => {
    let mounted = true
    fetchFactSheets().then((data) => {
      if (mounted) setItems(data)
    })
    return () => {
      mounted = false
    }
  }, [])

  const getIcon = (type: string): string => TypeIcon[type] || '◆'
  const formatDate = (dateStr: string): string => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    } catch {
      return dateStr
    }
  }

  return (
    <div>
      {items.length === 0 && (
        <div style={{ color: 'var(--muted)', fontSize: '13px', padding: '16px', textAlign: 'center' }}>
          No fact sheets found. Provide an API or mount EnterpriseTransformation templates.
        </div>
      )}
      {items.map((i) => (
        <div key={i.id} className="list-item" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ fontSize: '18px', color: 'var(--brand)', minWidth: '24px', textAlign: 'center' }}>{getIcon(i.type)}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 600, color: 'var(--accent)', fontSize: '14px', marginBottom: '2px' }}>{i.title}</div>
            <div style={{ fontSize: '12px', color: 'var(--muted)', textTransform: 'capitalize' }}>{i.type}</div>
          </div>
          <div style={{ color: 'var(--muted)', fontSize: '12px', whiteSpace: 'nowrap' }}>{formatDate(i.updated)}</div>
        </div>
      ))}
    </div>
  )
}
