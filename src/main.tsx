import ReactDOM from 'react-dom/client'
import RouteSwitch from './Pages/RouteSwitch'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import './main.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouteSwitch />
)
