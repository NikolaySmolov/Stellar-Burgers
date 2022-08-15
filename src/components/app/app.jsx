import { AppHeader } from '../app-header/app-header';
import { ConstructorPage } from '../../pages/constructor/constructor';
import { LoginPage } from '../../pages/authorisation/login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { RegisterPage } from '../../pages/authorisation/register';
import { ForgotPasswordPage } from '../../pages/authorisation/forgot-password';
import { ResetPasswordPage } from '../../pages/authorisation/reset-password';

export default function App() {
  return (
    <Router>
      <AppHeader />
      <Switch>
        <Route path="/" exact={true}>
          <ConstructorPage />
        </Route>
        <Route path="/login" exact={true}>
          <LoginPage />
        </Route>
        <Route path="/register" exact={true}>
          <RegisterPage />
        </Route>
        <Route path="/forgot-password" exact={true}>
          <ForgotPasswordPage />
        </Route>
        <Route path="/reset-password" exact={true}>
          <ResetPasswordPage />
        </Route>
      </Switch>
    </Router>
  );
}
