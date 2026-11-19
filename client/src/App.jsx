import { Routes, Route, Link, Navigate } from 'react-router-dom'; import { useAuth } from './context/AuthContext.jsx';
import Auth from './pages/Auth.jsx'; import Profile from './pages/Profile.jsx'; import Generate from './pages/Generate.jsx'; import History from './pages/History.jsx'; import Admin from './pages/Admin.jsx';
function Protected({ children, role }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />; if (role && user.role !== role) return <Navigate to="/profile" />; return children;
}
export default function App() {
  const { user, logout } = useAuth();
  return (<>
    <nav><b>CareerCoach</b>
      {user ? <><Link to="/profile">Profile</Link><Link to="/generate">Generate</Link><Link to="/history">History</Link>
        {user.role === 'admin' && <Link to="/admin">Admin</Link>}<a onClick={logout}>Logout</a></>
        : <><Link to="/login">Login</Link><Link to="/register">Register</Link></>}</nav>
    <div className="page"><Routes><Route path="/login" element={<Auth mode="login" />} /><Route path="/register" element={<Auth mode="register" />} />
      <Route path="/profile" element={<Protected><Profile /></Protected>} /><Route path="/generate" element={<Protected><Generate /></Protected>} />
      <Route path="/history" element={<Protected><History /></Protected>} /><Route path="/admin" element={<Protected role="admin"><Admin /></Protected>} />
      <Route path="*" element={<Navigate to="/login" />} /></Routes></div></>);
}