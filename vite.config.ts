import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { promises as fs } from 'fs'
import path from 'path'

function enterpriseAdapter(): Plugin {
  return {
    name: 'enterprise-adapter',
    configureServer(server) {
      server.middlewares.use('/api/factsheets', async (req, res, next) => {
        try {
          const base = '/workspaces/EnterpriseTransformation'
          const templatesDir = path.join(base, 'templates')
          const factSheetsDir = path.join(base, 'fact-sheets')
          const items: Array<Record<string, any>> = []

          // Read templates folder
          try {
            const files = await fs.readdir(templatesDir)
            for (const f of files) {
              if (!f.endsWith('.md')) continue
              const filePath = path.join(templatesDir, f)
              const stat = await fs.stat(filePath)
              const title = f.replace(/\.md$/, '')
              items.push({ id: `template/${title}`, title, type: 'Template', updated: stat.mtime.toISOString(), path: filePath })
            }
          } catch (e) {
            // ignore if templates not present
          }

          // Read fact-sheets subfolders
          try {
            const types = await fs.readdir(factSheetsDir, { withFileTypes: true })
            for (const dirent of types) {
              if (!dirent.isDirectory()) continue
              const typeName = dirent.name
              const folder = path.join(factSheetsDir, typeName)
              const files = await fs.readdir(folder)
              for (const f of files) {
                if (f === '.keep') continue
                const filePath = path.join(folder, f)
                const stat = await fs.stat(filePath)
                const title = f.replace(/\.md$/, '')
                items.push({ id: `fact-sheets/${typeName}/${title}`, title, type: typeName, updated: stat.mtime.toISOString(), path: filePath })
              }
            }
          } catch (e) {
            // ignore if fact-sheets not present
          }

          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(items))
        } catch (err) {
          res.statusCode = 500
          res.end(JSON.stringify({ error: String(err) }))
        }
      })
    }
  }
}

export default defineConfig({
  plugins: [react(), enterpriseAdapter()],
  server: {
    port: 5173
  }
})
