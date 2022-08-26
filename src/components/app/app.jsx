import { AppHeader } from '../app-header/app-header';
import { ConstructorPage } from '../../pages/constructor/constructor';
import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
} from '../../pages';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route';
import { IngredientPage } from '../../pages/ingredient/ingredient';
import { NotFoundPage } from '../../pages/not-found';

export default function App() {
  const location = useLocation();
  const background = location.state?.background;

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
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
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </>
  );
}
