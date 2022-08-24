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
import { IngredientPage } from './pages/ingredient/ingredient';

export default function App() {
  return (
    <Router>
      <AppHeader />
      <Switch>
        <Route path="/" exact>
          <ConstructorPage />
        </Route>
        <Route path="/ingredients/:id">
          <IngredientPage />
        </Route>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/register" exact>
          <RegisterPage />
        </Route>
        <Route path="/forgot-password" exact>
          <ForgotPasswordPage />
        </Route>
        <Route path="/reset-password" exact>
          <ResetPasswordPage />
        </Route>
        <ProtectedRoute path="/profile">
          <ProfilePage />
        </ProtectedRoute>
      </Switch>
    </Router>
  );
}
