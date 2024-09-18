import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import router from './router';
import './styles/index.css';
import './styles/loader.css';


createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <div className='main'>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </div>
  // </StrictMode>,
);
