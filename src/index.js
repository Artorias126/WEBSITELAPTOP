import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Sử dụng @tanstack/react-query
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


const queryClient = new QueryClient();


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  // </React.StrictMode>
);
