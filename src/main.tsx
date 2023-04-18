import React from 'react'
import ReactDOM from 'react-dom/client'
import RouteSwitch from './app/RouteSwitch'
import App from './app/App'
import './main.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <RouteSwitch />
  // </React.StrictMode>,
)
