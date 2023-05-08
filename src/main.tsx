import ReactDOM from 'react-dom/client'
import RouteSwitch from './Pages/RouteSwitch'
import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'
import './main.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouteSwitch />
)
