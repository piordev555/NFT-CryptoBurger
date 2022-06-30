import React from 'react';
//@ts-ignore
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ToastProvider } from 'react-toast-notifications';
import buildStore from './store'
import { Provider } from 'react-redux'
// import App from './pages/Home';
import App from './App';

declare global {
  interface Window {
    REDUX_DATA: any;
  }
}

const store = buildStore(null, window.REDUX_DATA || undefined)
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastProvider>
          <App />
        </ToastProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
