import React from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import FactSheetList from './components/FactSheetList'

export default function App(){
  return (
    <div className="app">
      <aside className="sidebar">
        <Sidebar />
      </aside>
      <main className="main">
        <div className="header">
          <Header />
        </div>
        <div className="card">
          <h3>Fact Sheets</h3>
          <FactSheetList />
        </div>
      </main>
    </div>
  )
}
