import ReactDOM from 'react-dom/client'
import RouteSwitch from './Pages/RouteSwitch'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import './main.css'
import { StrictMode } from 'react'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <RouteSwitch />
  </StrictMode>
)
