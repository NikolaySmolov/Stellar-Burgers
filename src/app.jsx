import { AppHeader } from './components/app-header/app-header';
import { ConstructorPage } from './pages/constructor/constructor';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
} from './pages';
import { ProtectedRoute } from './components/protected-route';

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
        <ProtectedRoute path="/profile">
          <ProfilePage />
        </ProtectedRoute>
      </Switch>
    </Router>
  );
}
