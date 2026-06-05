import { useAxios } from '@/hooks/useAxios';
import { Navigate } from 'react-router-dom';


export function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAxios();

    if (!isAuthenticated()) {
        // Redirect to login page, save the location they tried to access
        return <Navigate to="/login" replace />;
    }

    return children;
}