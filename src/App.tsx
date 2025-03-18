
import { RouterProvider } from 'react-router-dom'
import './App.css'
import { myRouter } from './Router'
import Home from './components/nav-bar/Home'
import Store from './store/store'
import { Provider } from "react-redux";
import NavBar from './components/nav-bar/NavBar'
import AppLayout from './components/nav-bar/AppLayout'
function App() {

  return (

 <> <Provider store={Store}>
      <div className="App">
        <NavBar />
        <AppLayout />
        <RouterProvider router={myRouter} />
      </div>
    </Provider>
    </>
  )
}

export default App
