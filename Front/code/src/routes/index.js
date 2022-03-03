import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
//

import DashboardApp from '../pages/DashboardApp';
import Products from '../pages/Products';
import Blog from '../pages/Blog';
import User from '../pages/User';

import AuthenticationRoutes from './AuthenticationRoutes';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> }
      ]
    },
    AuthenticationRoutes,
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
