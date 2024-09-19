import { jwtDecode } from 'jwt-decode';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

export const hasToken = () => {
    const token: string | null = sessionStorage.getItem('hes_token');
    if (token) {
        const decodedToken: { exp: number } = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp > currentTime;
    }
    return false
};

const HesOutlet = () => {
    const { pathname, search } = useLocation();
    const redirectUrl = `${pathname}${search}`

    return hasToken() ? <Outlet /> : <Navigate to='/login' state={{ redirectUrl: redirectUrl }} />;
}

export default HesOutlet