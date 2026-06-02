export type FactSheet = {
  id:string
  title:string
  type:string
  updated:string
}

// Simple adapter: returns sample data. For real usage, set the environment
// variable `VITE_FACT_SHEETS_API` to point to a JSON endpoint that returns FactSheet[]
export async function fetchFactSheets(): Promise<FactSheet[]>{
  const api = import.meta.env.VITE_FACT_SHEETS_API as string | undefined
  if (api) {
    try {
      const res = await fetch(api)
      if (res.ok) {
        const json = await res.json()
        return json as FactSheet[]
      }
    } catch (e) {
      console.warn('Failed to fetch external fact sheets', e)
    }
  }

  // Try local dev adapter exposed by Vite at /api/factsheets
  try {
    const res = await fetch('/api/factsheets')
    if (res.ok) {
      const json = await res.json()
      return json as FactSheet[]
    }
  } catch (e) {
    // ignore
  }

  // fallback: sample data reflecting templates in EnterpriseTransformation
  return [
    { id: 'app-1', title: 'Customer Portal', type: 'Application', updated: '2026-05-12' },
    { id: 'itc-3', title: 'Auth Service', type: 'IT Component', updated: '2026-04-21' },
    { id: 'bc-2', title: 'Payments Capability', type: 'Business Capability', updated: '2026-03-08' }
  ]
}
