import { Route, Routes } from 'react-router';
import Header from '../Header/Header.component';
import Posts from '../Posts/Posts.component';
import Login from '../Login/Login.component';
import Register from '../Register/Register.component';
import TextEditor from '../TextEditor/TextEditor.component';
import './App.styles.scss';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const handleLogin = (userData) => {
    console.log(userData);
  };
  return (
    <div className="page">
      <Header isLoggedIn={isLoggedIn} />
      <main className="main">
        <Routes>
          <Route exact path="/" element={<Posts isLoggedIn={isLoggedIn} />} />
          <Route
            exact
            path="/signup"
            element={<Register onRegister={handleLogin} isLoggedIn={isLoggedIn} />}
          />
          <Route
            exact
            path="/signin"
            element={<Login onLogin={handleLogin} isLoggedIn={isLoggedIn} />}
          />
          <Route exact path="/editor" element={<TextEditor />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
