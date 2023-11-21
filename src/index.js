import { React } from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import './index.css';
import { Provider } from 'react-redux';
import { persistor, store } from 'redux/store';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { StrictMode } from 'react';
// import dotenv from 'dotenv';
// dotenv.config();

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename="/commercial-locations">
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
