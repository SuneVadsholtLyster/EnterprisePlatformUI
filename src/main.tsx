import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { applyTokens } from './theme/tokens'

const container = document.getElementById('root')!
createRoot(container).render(
  <React.StrictMode>
    {applyTokens()}
    <App />
  </React.StrictMode>
)
