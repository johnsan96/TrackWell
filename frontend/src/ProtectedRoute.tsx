import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { currentUser } = useAuth();

    // Falls der Benutzer nicht eingeloggt ist, navigiere zu /login
    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    // Falls eingeloggt, zeige die geschützte Komponente an
    return <>{children}</>;
};

export default ProtectedRoute;
