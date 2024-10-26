import Finance from './pages/Finance';
import { Test } from './pages/Test';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import ProtectedRoute from './ProtectedRoute';
import { useRoutes } from "react-router-dom";
import Register from './pages/Register';

const App = () => {
   const routesArray = [
      {
        path: "*",
        element: <Login />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/finance",
        element: (
          <ProtectedRoute>
            <Finance />
          </ProtectedRoute>
        ),
      },
      {
         path: "/test",
         element: <Test />,
       },
    ];
    let routesElement = useRoutes(routesArray);
    
    return (
      <AuthProvider>
        <div className="w-full h-screen flex flex-col">{routesElement}</div>
      </AuthProvider>
    );
};

export default App;
