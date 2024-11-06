import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { routes } from './routes'; 
import HeaderComponent from './components/HeaderComponent/HeaderComponent';


function App() {

  return (
    <div>
      <HeaderComponent />
      <Router>
        <Routes>
          {routes.map((route)=> {
            const Page = route.page
            return (
              <Route path={route.path} element={<Page />} />
            )
          })}
        </Routes>
      </Router>
    </div>
  )
}
export default App