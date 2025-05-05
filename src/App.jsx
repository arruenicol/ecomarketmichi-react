import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { ThemeProvider } from './context/themeContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// Páginas
import Tienda from './pages/Tienda'
import Ropa from './pages/Ropa'
import Hogar from './pages/Hogar'
import Comida from './pages/Comida'
import Nosotros from './components/Nosotros/Nosotros'
import ProductoForm from './components/Producto/ProductoForm'
import EnProceso from './pages/EnProceso'

function App() {

  return (
    <>
    <ThemeProvider>
        <div className="App">
          <Navbar />
            <Routes>
                <Route path='/' element={<Tienda />}></Route>
                <Route path='/tienda' element={<Tienda />}></Route>
                <Route path="/tienda/:categoria" element={<Tienda />} />
                <Route path='/proceso' element={<EnProceso />}></Route>
                <Route path='/nosotros' element={<Nosotros />}></Route>
                <Route path='/agregarProducto' element={<ProductoForm />}></Route>
            </Routes>
          <Footer />
        </div>
      </ThemeProvider>
    </>
  )
}

export default App
