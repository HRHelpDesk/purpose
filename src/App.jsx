// src/App.jsx
import { createHashRouter, RouterProvider } from 'react-router-dom';

import SquireAuth from './screens/auth/SquireAuth';
import Booking from './screens/Booking';
import BarbershopLanding from './screens/LandingPage';

const router = createHashRouter([
  {
    path: '/',
    element: <BarbershopLanding />,
  },
  {
    path: '/square-auth',
    element: <SquireAuth />,
  },
  {
    path: '/booking',
    element: <Booking />,
  },
  {
    path: '*',
    element: <BarbershopLanding/>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;