import { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './i18n';

import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './components/App';

import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
