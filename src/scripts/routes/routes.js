import Home from '../views/pages/home';
import Like from '../views/pages/like';
import Detail from '../views/pages/detail';

const routes = {
  '/': Home,
  '/favorite': Like,
  '/restaurant/:id': Detail,
};

export default routes;
