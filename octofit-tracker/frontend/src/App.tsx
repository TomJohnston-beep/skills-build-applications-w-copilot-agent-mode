import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiBaseUrl = codespaceName && codespaceName.trim() !== ''
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

function Home() {
  return (
    <div className="container py-5">
      <h1>OctoFit Tracker</h1>
      <p>Track workouts, teams, activities, users, and leaderboard standings with a Codespaces-aware API.</p>
      <div className="alert alert-info">
        <p className="mb-1">Frontend API base URL:</p>
        <code>{apiBaseUrl}/api/[resource]</code>
      </div>
      <p>
        Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for GitHub Codespaces.
        When it is unset, the app falls back to <code>http://localhost:8000</code>.
      </p>
    </div>
  );
}

function About() {
  return (
    <div className="container py-5">
      <h2>About OctoFit</h2>
      <p>Modern fitness tracker built with React 19, Vite, and a TypeScript API backend.</p>
      <p>
        The frontend uses environment variables through <code>import.meta.env.VITE_CODESPACE_NAME</code>.
      </p>
    </div>
  );
}

const activeClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'nav-link active' : 'nav-link';

export default function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <NavLink className="navbar-brand" to="/">OctoFit</NavLink>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className={activeClass} to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={activeClass} to="/users">Users</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={activeClass} to="/teams">Teams</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={activeClass} to="/activities">Activities</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={activeClass} to="/workouts">Workouts</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={activeClass} to="/leaderboard">Leaderboard</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={activeClass} to="/about">About</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}
