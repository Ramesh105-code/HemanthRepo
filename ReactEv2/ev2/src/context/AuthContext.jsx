export const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const login = (email, password) => {
    if (email === 'alice@example.com' && password === '123456') {
      setUser({ email });
      return true;
    }
    return false;
  };
  const logout = () => setUser(null);
  return <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>{children}</AuthContext.Provider>;
}