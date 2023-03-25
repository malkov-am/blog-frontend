import { Route, Routes } from 'react-router';
import Header from '../Header/Header.component';
import Posts from '../Posts/Posts.component';
import Login from '../Login/Login.component';
import Register from '../Register/Register.component';
import TextEditor from '../TextEditor/TextEditor.component';
import './App.styles.scss';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Андрей',
      content:
        '<h1>Block Styling</h1><p>Within <code>Editor</code>, some block types are given default CSS styles to limit the amount of basic configuration required to get engineers up and running with custom editors.</p><p>By defining a <code>blockStyleFn</code> prop function for an <code>Editor</code>, it is possible to specify classes that should be applied to blocks at render time.</p>',
    },
  ]);
  const handleLogin = (userData) => {
    console.log(userData);
  };

  return (
    <div className="page">
      <Header isLoggedIn={isLoggedIn} />
      <main className="main">
        <Routes>
          <Route exact path="/" element={<Posts posts={posts} isLoggedIn={isLoggedIn} />} />
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
          <Route exact path="/edit" element={<TextEditor />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
