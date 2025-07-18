import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BugForm from './components/BugForm';
import BugList from './components/BugList';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import './index.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/bugs"
          element={
            <PrivateRoute>
              <>
                <h1>🐞 Bug Tracker</h1>
                <BugForm />
                <hr />
                <BugList />
              </>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
