import React from 'react';
import './App.css';
import LoginPage from './LOGINCRUD';
//import MEDCRUD from './MEDCRUD';
//import AdminCRUD from './ADMINCRUD';




function App() {
  /* const { user } = useAuth();

  
  if (!user) {
    return <LoginPage />;
  }

  
  if (user.role === 'Administrator') {
    return <AdminCRUD />;
  } */

  
  return( 
  <LoginPage/>

  
  )
}

export default App;