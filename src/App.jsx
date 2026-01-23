// src/App.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import SquireAuth from './screens/auth/SquireAuth';
import Booking from './screens/Booking';
import BarbershopLanding from './screens/LandingPage';

const router = createBrowserRouter(
  [
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
      element: <div>404 - Page not found</div>,
    },
  ],
  {
    basename: import.meta.env.BASE_URL,   // ← this is the key line
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;