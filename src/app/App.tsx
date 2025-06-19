import { AppRouter } from 'app/router/AppRouter.tsx';
import './styles/index.scss';
import { Provider, useDispatch } from 'react-redux';
import { type AppDispatch, store } from 'app/store';
import { type ReactElement, useEffect } from 'react';
import { updateUser } from 'entities/User/slice';
import { BrowserRouter } from 'react-router-dom';

function App(): ReactElement {
  return (
    <Provider store={store}>
      <AppWithData />
    </Provider>
  );
}

function AppWithData() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(updateUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
