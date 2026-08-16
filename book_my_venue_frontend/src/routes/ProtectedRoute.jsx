import { Navigate } from "react-router";

export default function ProtectedRoute({ allowedRoles, children }) {
    
    const token = sessionStorage.getItem("token");
    const user = JSON.parse(sessionStorage.getItem("user"));
    
    if (!token)
        return <Navigate to="/login" replace />;

    if (!allowedRoles.includes(user.role))
        return <Navigate to="/unauthorized" replace />;

    return children;
}