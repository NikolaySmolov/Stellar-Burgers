import { AppHeader } from '../app-header/app-header';
import { ConstructorPage } from '../../pages/constructor/constructor';
import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  IngredientPage,
  NotFoundPage,
} from '../../pages';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../modal/modal';
import { CLOSE_INGREDIENT_DETAILS, getIngredients } from '../../services/actions/burger';
import IngredientDetails from '../ingredient-details/ingredient-details';
import ModalError from '../modal-error/modal-error';
import { useEffect } from 'react';
import { Loader } from '../loader/loader';

export default function App() {
  const { ingredientsRequest, ingredientsFailed, ingredientDetails } = useSelector(
    store => store.burger
  );
  const dispatch = useDispatch();

  const location = useLocation();
  const history = useHistory();
  const background = ingredientDetails && location.state?.background;

  const handleCloseModal = () => {
    dispatch({ type: CLOSE_INGREDIENT_DETAILS });

    history.replace({ pathname: '/' });
  };

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  if (ingredientsRequest) {
    return <Loader />;
  } else if (ingredientsFailed) {
    return <ModalError />;
  }

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
