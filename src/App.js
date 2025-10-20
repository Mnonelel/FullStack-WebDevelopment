import React from 'react';
import './App.css';
import MEDCRUD from './MEDCRUD';
import AdminCRUD from './ADMINCRUD';
import LoginPage from './LOGINCRUD';
import { useAuth } from './AuthContext';


function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner"></div>
        <p>Loading Nelson Mandela Academic Hospital System...</p>
      </div>
    );
  }

  // Role-based component rendering
  const renderAuthorizedComponent = () => {
    if (!user) return <LoginPage />;

    switch (user.role) {
      case 'Administrator':
        return <AdminCRUD />;
      case 'Doctor':
      case 'Assistant':
        return <MEDCRUD />;
      default:
        return (
          <div className="unauthorized-container">
            <div className="unauthorized-message">
              <h2>Access Denied</h2>
              <p>Your role ({user.role}) does not have access to this system.</p>
              <p>Please contact administrator.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="App">
      {renderAuthorizedComponent()}
    </div>
  );
}

export default App;