import Finance from './pages/Finance';
import { Test } from './pages/Test';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import ProtectedRoute from './ProtectedRoute';
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import Register from './pages/Register';

const App = () => {
  /* onst routesArray = [
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
      path: "/",
      element: (
        <ProtectedRoute>
          <div> 
            <Outlet /> 
          </div>
        </ProtectedRoute>
      ),
      children: [
        {
          path: "", 
          element: <Navigate to="finance" replace />, 
        },
        {
          path: "finance",
          element: <Finance />,
        },
        {
          path: "test",
          element: <Test />,
        },
      ],
    },
  ];
  

    let routesElement = useRoutes(routesArray); */

  return (
    /*   <AuthProvider>
        <div className="w-full h-screen flex flex-col">{Finance}</div>
      </AuthProvider> */
    <div
      style={{
        display: 'flex',
        justifyContent: 'center', // Zentriert horizontal
        alignItems: 'center', // Zentriert vertikal
        minHeight: '100vh', // Volle Höhe des Viewports
        backgroundColor: '#f0f4f8', // Hintergrundfarbe der App
        margin: 0,
      }}
    >
      <Finance />
    </div>


  );
};

export default App;
