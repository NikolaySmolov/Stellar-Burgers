import ReactDOM from 'react-dom/client';
import { App } from './components/app/app';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './services/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <Router basename="/stellar-burgers-frontend">
      <App />
    </Router>
  </Provider>
);
