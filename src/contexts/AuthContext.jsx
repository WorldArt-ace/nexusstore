import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        try { return JSON.parse(localStorage.getItem('user') || 'null'); }
        catch { return null; }
    });

    const login = (email, _password) => {
        const userData = {
            id: 1,
            name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
            email,
            avatar: `https://i.pravatar.cc/100?u=${email}`,
            joinDate: new Date().toLocaleDateString(),
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
    };

    const signup = (name, email, _password) => {
        const userData = {
            id: Date.now(),
            name,
            email,
            avatar: `https://i.pravatar.cc/100?u=${email}`,
            joinDate: new Date().toLocaleDateString(),
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
