import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ isauthenticated, children }) => {
    return isauthenticated ? children : <Navigate to="/login" />
}