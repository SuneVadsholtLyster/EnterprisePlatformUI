import React, { useState, useEffect } from 'react'
import { fetchFolderStructure, GitHubItem } from '../utils/githubApi'

interface MenuSection {
  title: string
  items: GitHubItem[]
}

export default function Sidebar() {
  const [sections, setSections] = useState<MenuSection[]>([])
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadStructure = async () => {
      try {
        setLoading(true)
        const items = await fetchFolderStructure()

        // Organize items into sections
        const newSections: MenuSection[] = [
          {
            title: 'Fact Sheets',
            items: items,
          },
        ]

        setSections(newSections)
        setError(null)
      } catch (err) {
        console.error('Failed to load folder structure:', err)
        setError('Failed to load menu')
        // Fallback to static structure
        setSections([
          {
            title: 'Fact Sheets',
            items: [
              { name: 'Applications', type: 'dir', path: 'fact-sheets/Applications' },
              { name: 'IT Components', type: 'dir', path: 'fact-sheets/IT Components' },
              { name: 'Business Capabilities', type: 'dir', path: 'fact-sheets/Business Capabilities' },
              { name: 'Initiatives', type: 'dir', path: 'fact-sheets/Initiatives' },
              { name: 'Organizations', type: 'dir', path: 'fact-sheets/Organizations' },
            ],
          },
          {
            title: 'Governance',
            items: [
              { name: 'Naming Rules', type: 'file', path: 'governance/naming-rules.md' },
              { name: 'Review Cycles', type: 'file', path: 'governance/review-cycles.md' },
              { name: 'Metadata', type: 'file', path: 'governance/metadata.md' },
              { name: 'Relations', type: 'file', path: 'governance/relations.md' },
            ],
          },
          {
            title: 'Reports',
            items: [
              { name: 'Analytics', type: 'file', path: 'reports/analytics.md' },
              { name: 'Dashboards', type: 'file', path: 'reports/dashboards.md' },
              { name: 'Summaries', type: 'file', path: 'reports/summaries.md' },
            ],
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    loadStructure()
  }, [])

  const toggleSection = (sectionTitle: string) => {
    setExpandedSection(expandedSection === sectionTitle ? null : sectionTitle)
  }

  if (loading) {
    return (
      <div>
        <h2 style={{ color: 'var(--brand)', fontSize: '16px', marginBottom: '24px', fontWeight: 700 }}>
          EXPLORER
        </h2>
        <div style={{ color: 'var(--muted)', fontSize: '12px' }}>Loading menu...</div>
      </div>
    )
  }

  return (
    <div>
      <h2 style={{ color: 'var(--brand)', fontSize: '16px', marginBottom: '24px', fontWeight: 700 }}>EXPLORER</h2>
      {error && <div style={{ color: 'var(--accent)', fontSize: '11px', marginBottom: '16px' }}>⚠️ {error}</div>}
      {sections.map((section) => (
        <nav key={section.title} style={{ marginBottom: '24px' }}>
          <div
            onClick={() => toggleSection(section.title)}
            style={{
              color: 'var(--muted)',
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              padding: '8px 0',
              transition: 'color 0.15s ease',
              userSelect: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--brand)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--muted)'
            }}
          >
            {section.title} [{section.items.length}]
          </div>
          {expandedSection === section.title && (
            <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0 0 0' }}>
              {section.items.map((item) => (
                <li
                  key={item.path}
                  style={{
                    padding: '8px 0',
                    fontSize: '13px',
                    color: 'var(--accent)',
                    cursor: 'pointer',
                    transition: 'color 0.15s ease',
                    borderLeft: '2px solid transparent',
                    paddingLeft: '8px',
                    opacity: item.type === 'dir' ? 1 : 0.8,
                    fontStyle: item.type === 'file' ? 'italic' : 'normal',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--brand)'
                    e.currentTarget.style.borderLeftColor = 'var(--brand)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--accent)'
                    e.currentTarget.style.borderLeftColor = 'transparent'
                  }}
                >
                  {item.type === 'dir' ? '📁 ' : '📄 '}
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </nav>
      ))}
    </div>
  )
}
