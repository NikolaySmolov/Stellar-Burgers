import { AppHeader } from '../app-header/app-header';
import { ConstructorPage } from '../../pages/constructor/constructor';
import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
} from '../../pages';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route';
import { IngredientPage } from '../../pages/ingredient/ingredient';
import { NotFoundPage } from '../../pages/not-found';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../modal/modal';
import { CLOSE_INGREDIENT_DETAILS } from '../../services/actions/burger';
import IngredientDetails from '../ingredient-details/ingredient-details';

export default function App() {
  const { ingredientDetails } = useSelector(store => store.burger);
  const dispatch = useDispatch();

  const location = useLocation();
  const history = useHistory();
  const background = ingredientDetails && location.state?.background;

  const handleCloseModal = () => {
    dispatch({ type: CLOSE_INGREDIENT_DETAILS });

    history.replace({ pathname: '/' });
  };

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
      {background ? (
        <Route path="/ingredients/:id">
          <Modal onClose={handleCloseModal}>
            <IngredientDetails {...ingredientDetails} />
          </Modal>
        </Route>
      ) : null}
    </>
  );
}
