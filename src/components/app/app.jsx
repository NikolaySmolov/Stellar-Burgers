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
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../modal/modal';
import { getIngredients } from '../../services/actions/burger';
import IngredientDetails from '../ingredient-details/ingredient-details';
import ModalError from '../modal-error/modal-error';
import { useEffect } from 'react';
import { Loader } from '../loader/loader';
import { FeedPage } from '../../pages/feed/feed';
import { CardOrderDetails } from '../card-order-details/card-order-details';
import {
  WS_CONNECTION_START,
  WS_PROFILE_CONNECTION_START,
} from '../../services/actions/web-socket';

export default function App() {
  const { ingredientsRequest, ingredientsFailed } = useSelector((store) => store.burger);
  const dispatch = useDispatch();

  const location = useLocation();
  const history = useHistory();
  const background = location.state?.background;

  const handleCloseModal = () => {
    history.goBack();
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
        <Route path="/feed" exact>
          <FeedPage />
        </Route>
        <Route path="/feed/:id">
          <OrderDetailsPage connectAction={WS_CONNECTION_START} />
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
          <OrderDetailsPage connectAction={WS_PROFILE_CONNECTION_START} />
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
