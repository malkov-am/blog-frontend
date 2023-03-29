import { Route, Routes, useNavigate } from 'react-router';
import Header from '../Header/Header.component';
import Posts from '../Posts/Posts.component';
import Login from '../Login/Login.component';
import Register from '../Register/Register.component';
import TextEditor from '../TextEditor/TextEditor.component';
import './App.styles.scss';
import { useEffect, useState } from 'react';
import {
  authorize,
  checkToken,
  createPost,
  deletePost,
  editPost,
  getPosts,
  register,
} from '../../utils/Api';
import { UNAUTHORIZED_ERROR_CODE, POPUP_DELAY_TIME } from '../../utils/constants';
import InfoPopup from '../InfoPopup/InfoPopup.component';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  // Переменные состояния
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [infoPopupMessage, setInfoPopupMessage] = useState('');
  const [infoPopupType, setInfoPopupType] = useState('');
  const [isInfoPopupShown, setIsInfoPopupShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);

  // Хуки
  const navigate = useNavigate();

  // Чтение локального хранилища
  const token = localStorage.getItem('token');

  // Действия при загрузке приложения: проверяем токен
  useEffect(() => {
    token ? handleTokenCheck(token) : setIsLoggedIn(false);
    setIsLoadingPosts(true);
    getPosts()
      .then((posts) => {
        setPosts(posts.reverse());
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => setIsLoadingPosts(false));
  }, []);

  // Обработчик проверки токена
  function handleTokenCheck(token) {
    checkToken(token)
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        handleError(err);
      });
  }

  // Обработка ошибок
  function handleError(err) {
    err.message
      ? showInfoPopup('error', err.message)
      : err
          .json()
          .then((message) =>
            showInfoPopup('error', message?.validation?.body?.message || message.message),
          );
    if (err.status === UNAUTHORIZED_ERROR_CODE) handleLogout();
  }

  // Отобразить попап
  function showInfoPopup(type, message) {
    setInfoPopupType(type);
    setInfoPopupMessage(message);
    setIsInfoPopupShown(true);
    setTimeout(() => setIsInfoPopupShown(false), POPUP_DELAY_TIME);
  }

  // Обработчик логина
  function handleLogin(userData) {
    setIsLoading(true);
    authorize(userData)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          handleTokenCheck(data.token);
          navigate('/');
        }
      })
      .catch((err) => handleError(err))
      .finally(() => setIsLoading(false));
  }

  // Обработчик регистрации
  function handleRegister(userData) {
    const { email, password } = userData;
    setIsLoading(true);
    register(userData)
      .then(() => {
        handleLogin({ email, password });
      })
      .catch((err) => handleError(err))
      .finally(() => setIsLoading(false));
  }

  // Обработчик выхода из профиля
  function handleLogout() {
    localStorage.clear();
    setIsLoggedIn(false);
    setCurrentUser({});
    navigate('/signin');
  }

  // Обработчик публикации нового поста
  const handleCreatePost = (postData) => {
    setIsLoading(true);
    createPost(postData, token)
      .then((newPost) => {
        setPosts([newPost, ...posts]);
        showInfoPopup('success', 'Пост опубликован');
        navigate('/');
      })
      .catch((err) => handleError(err))
      .finally(() => setIsLoading(false));
  };

  // Обработчик редактирования поста
  const handleEditPost = (postData, postId) => {
    setIsLoading(true);
    editPost(postData, postId, token)
      .then((updatedPost) => {
        setPosts(posts.map((post) => (post._id === postId ? updatedPost : post)));
        showInfoPopup('success', 'Пост отредактирован');
        navigate('/');
      })
      .catch((err) => handleError(err))
      .finally(() => setIsLoading(false));
  };

  // Обработчик отправки формы текстового редактора
  const handleTextEditorSubmit = (content, postId) => {
    const postData = { content };
    if (postId) {
      handleEditPost(postData, postId);
    } else {
      handleCreatePost(postData);
    }
  };

  // Обработчик удаления поста
  const handleDeletePost = (postId) => {
    deletePost(postId, token)
      .then(() => {
        setPosts(posts.filter((post) => post._id !== postId));
        showInfoPopup('success', 'Пост удален');
      })
      .catch((err) => handleError(err));
  };

  // Не рендерим страницу, пока не получили пользователя
  if (isLoggedIn === undefined) return null;

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <main className="main">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Posts posts={posts} isLoggedIn={isLoggedIn} onDeletePost={handleDeletePost} isLoadingPosts={isLoadingPosts} />
              }
            />
            <Route
              exact
              path="/signup"
              element={<Register onRegister={handleRegister} isLoggedIn={isLoggedIn} isLoading={isLoading} />}
            />
            <Route
              exact
              path="/signin"
              element={<Login onLogin={handleLogin} isLoggedIn={isLoggedIn} isLoading={isLoading} />}
            />
            <Route exact path="/edit" element={<TextEditor onSubmit={handleTextEditorSubmit} isLoading={isLoading} />} />
          </Routes>
        </main>
      </CurrentUserContext.Provider>
      <InfoPopup message={infoPopupMessage} isActive={isInfoPopupShown} type={infoPopupType} />
    </div>
  );
}

export default App;
