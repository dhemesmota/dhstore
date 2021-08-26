import { Route, Switch } from 'react-router-dom';

import { Cart } from '../pages/Cart';
import { Home } from '../pages/Home';

function Router() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>

      <Route path="/cart">
        <Cart />
      </Route>

      <Route path="*">
        <h1>Ops! Erro 404</h1>
        <p>Página não encontrada.</p>
      </Route>
    </Switch>
  );
}

export { Router };
