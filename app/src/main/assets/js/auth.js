/**
 * Auth Module - Handles user session and mock authentication
 */
const Auth = (() => {
    const AUTH_KEY = 'fintech_pro_auth';

    const login = (user) => {
        localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    };

    const logout = () => {
        localStorage.removeItem(AUTH_KEY);
    };

    const getUser = () => {
        const user = localStorage.getItem(AUTH_KEY);
        return user ? JSON.parse(user) : null;
    };

    const isAuthenticated = () => {
        return !!getUser();
    };

    return {
        login,
        logout,
        getUser,
        isAuthenticated
    };
})();
