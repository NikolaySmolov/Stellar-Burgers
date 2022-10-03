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
  OrderDetailsPage,
} from '../../pages';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { ModalError } from '../modal-error/modal-error';
import { useEffect } from 'react';
import { Loader } from '../loader/loader';
import { FeedPage } from '../../pages/feed/feed';
import { CardOrderDetails } from '../card-order-details/card-order-details';
import {
  selectIngredients,
  selectIngredientsFailed,
  selectIngredientsRequest,
} from '../../services/selectors/ingredients';
import { fetchIngredients } from '../../services/actions/ingredients';
import { OrderDetails } from '../order-details/order-details';
import { resetConstructor } from '../../services/actions/constructor';
import { closeOrderDetails } from '../../services/actions/order';
import { ORDER_PATH } from '../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../services/redux-hooks';
import { TLocation } from '../../services/types';

export function App() {
  const ingredientsRequest = useAppSelector(selectIngredientsRequest);
  const ingredients = useAppSelector(selectIngredients);
  const ingredientsFailed = useAppSelector(selectIngredientsFailed);

  const dispatch = useAppDispatch();

  const location = useLocation<TLocation<'background'>>();
  const history = useHistory();
  const background = location.state?.background;

  const handleCloseModal = () => {
    if (location.pathname.includes(ORDER_PATH)) {
      dispatch(resetConstructor());
      dispatch(closeOrderDetails());
      history.push({ pathname: '/' });
    } else {
      history.goBack();
    }
  };

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  if (ingredientsRequest || ingredients.length === 0) {
    return <Loader />;
  } else if (ingredients.length === 0 && ingredientsFailed) {
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
        <Route path="/feed" exact>
          <FeedPage />
        </Route>
        <Route path="/feed/:id">
          <OrderDetailsPage />
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
        <ProtectedRoute path="/profile/orders/:id">
          <OrderDetailsPage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile">
          <ProfilePage />
        </ProtectedRoute>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
      {background ? (
        <>
          <Modal onClose={handleCloseModal}>
            <Route path="/ingredients/:id">
              <IngredientDetails />
            </Route>
            <Route
              path="/order/:number"
              render={({ match }) => <OrderDetails orderNumber={match.params.number} />}
            />
            <Route path="/feed/:id">
              <CardOrderDetails />
            </Route>
            <Route path="/profile/orders/:id">
              <CardOrderDetails />
            </Route>
          </Modal>
        </>
      ) : null}
    </>
  );
}
