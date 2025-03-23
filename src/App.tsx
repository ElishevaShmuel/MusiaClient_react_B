
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { myRouter } from './Router'
import Store from './store/store'
import { Provider } from "react-redux";

  function App() {
    return (
      <Provider store={Store}>
        <div className="App">
          <RouterProvider router={myRouter} />
        </div>
      </Provider>
    );
  }

export default App
