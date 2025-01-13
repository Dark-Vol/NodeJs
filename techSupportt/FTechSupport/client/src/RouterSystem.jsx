import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from "./pages/Home/Home"
import Admin from './pages/Admin/Admin'
import Ticket from './pages/Admin/Ticket/Ticket'

const RouterSystem = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home />}/> 
            <Route path='/admin' element={<Admin />}/> 
            <Route path='/admin/ticket/:id' element={<Ticket />}/> 
        </Routes>
    </BrowserRouter>
  )
}

export default RouterSystem