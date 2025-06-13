import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from 'app/router/AppRouter.tsx';
import './styles/index.scss';

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
