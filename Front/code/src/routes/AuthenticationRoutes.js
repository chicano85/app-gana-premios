import { Navigate } from 'react-router-dom';

// project imports
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/Page404';
import Lopd from '../pages/Lopd';

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <LogoOnlyLayout />,
  children: [
    { path: 'login', element: <Login /> },
    { path: 'register', element: <Register /> },
    { path: '404', element: <NotFound /> },
    { path: '/', element: <Navigate to="/dashboard" /> },
    { path: '*', element: <Navigate to="/404" /> },
    { path: '/lopd', element: <Lopd /> }
  ]
};

export default AuthenticationRoutes;
