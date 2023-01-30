import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthenticatorServices from './services/authenticatorServices';
export default PrivateRoute;

function PrivateRoute({ children }) {
    const isAuthenticated = AuthenticatorServices.isAuthenticated;
    // const { user: authUser } = useSelector(x => x.auth);

    if (!isAuthenticated) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" replace={true} />
    }

    // authorized so return child components
    return children;
}


