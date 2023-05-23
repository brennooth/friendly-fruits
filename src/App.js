import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Products from './Products';
import Login from './Login';
import useToken from './hooks/useToken';

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="wrapper">
      <h1 className="title">The friendly fruit shop</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Products} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
