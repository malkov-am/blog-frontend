import { Route, Routes, useNavigate } from 'react-router';
import Header from '../Header/Header.component';
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
  getDeferredPosts,
  register,
} from '../../utils/Api';
import { UNAUTHORIZED_ERROR_CODE, POPUP_DELAY_TIME } from '../../utils/constants';
import InfoPopup from '../InfoPopup/InfoPopup.component';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { firebaseConfig } from '../../utils/firebase';
import { initializeApp } from 'firebase/app';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main.component';
import Posts from '../Posts/Posts.component';

function App() {
  // Переменные состояния
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [deferredPosts, setDeferredPosts] = useState([]);
  const [infoPopupMessage, setInfoPopupMessage] = useState('');
  const [infoPopupType, setInfoPopupType] = useState('');
  const [isInfoPopupShown, setIsInfoPopupShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);

  // Хуки
  const navigate = useNavigate();

  // Firebase storage
  const firebaseApp = initializeApp(firebaseConfig);
  const storage = getStorage();

  // Получение текущей даты
  const currentDate = new Date().toISOString().slice(0, 10);

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

  useEffect(() => {
    isLoggedIn &&
      getDeferredPosts(token)
        .then((deferredPosts) => {
          setDeferredPosts(deferredPosts.reverse());
        })
        .catch((err) => {
          handleError(err);
        });
  }, [isLoggedIn]);

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
    setDeferredPosts([]);
    setCurrentUser({});
    navigate('/signin');
  }

  // Обработчик публикации нового поста
  const handleCreatePost = (postData) => {
    createPost(postData, token)
      .then((newPost) => {
        if (currentDate >= newPost.pubdate.slice(0, 10)) {
          setPosts([newPost, ...posts]);
        } else {
          setDeferredPosts([newPost, ...deferredPosts]);
        }
        navigate('/');
        showInfoPopup('success', 'Пост опубликован');
      })
      .catch((err) => handleError(err))
      .finally(() => setIsLoading(false));
  };

  // Обработчик редактирования поста
  const handleEditPost = (postData, postId, originalPost) => {
    editPost(postData, postId, token)
      .then((updatedPost) => {
        if (currentDate >= originalPost.pubdate.slice(0, 10)) {
          if (currentDate >= updatedPost.pubdate.slice(0, 10)) {
            setPosts(posts.map((post) => (post._id === postId ? updatedPost : post)));
          } else {
            setPosts(posts.filter((post) => post._id !== postId));
            setDeferredPosts([updatedPost, ...deferredPosts]);
          }
        } else {
          if (currentDate >= updatedPost.pubdate.slice(0, 10)) {
            setPosts([updatedPost, ...posts]);
            setDeferredPosts(deferredPosts.filter((post) => post._id !== postId));
          } else {
            setDeferredPosts(
              deferredPosts.map((post) => (post._id === postId ? updatedPost : post)),
            );
          }
        }
        navigate('/');
        showInfoPopup('success', 'Пост отредактирован');
      })
      .catch((err) => handleError(err))
      .finally(() => setIsLoading(false));
  };

  const handlePost = (postData, postId, originalPost) => {
    if (postId) {
      handleEditPost(postData, postId, originalPost);
    } else {
      handleCreatePost(postData);
    }
  };

  const uploadFile = (file) => {
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        function (snapshot) {},
        function (err) {
          reject(err);
        },
        function () {
          return getDownloadURL(uploadTask.snapshot.ref).then((filelink) => resolve(filelink));
        },
      );
    });
  };

  // Обработчик отправки формы текстового редактора
  const handleTextEditorSubmit = (content, postId, file, pubdate, originalPost) => {
    setIsLoading(true);
    if (file) {
      uploadFile(file)
        .then((filelink) => {
          const postData = { content, filename: file.name, filelink, pubdate };
          handlePost(postData, postId, originalPost);
        })
        .catch((err) => handleError(err));
    } else {
      const postData = { content, pubdate };
      handlePost(postData, postId, originalPost);
    }
  };

  // Обработчик удаления поста
  const handleDeletePost = (post) => {
    const { _id: postId, pubdate } = post;
    deletePost(postId, token)
      .then(() => {
        if (currentDate >= pubdate.slice(0, 10)) {
          setPosts(posts.filter((post) => post._id !== postId));
        } else {
          setDeferredPosts(deferredPosts.filter((post) => post._id !== postId));
        }
        showInfoPopup('success', 'Пост удален');
      })
      .catch((err) => handleError(err));
  };

  // Не рендерим страницу, пока не получили пользователя
  if (isLoggedIn === undefined) return null;

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <main className="page">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Main
                  posts={posts}
                  deferredPosts={deferredPosts}
                  isLoggedIn={isLoggedIn}
                  onDeletePost={handleDeletePost}
                  isLoadingPosts={isLoadingPosts}
                />
              }
            />
            <Route
              exact
              path="/signup"
              element={
                <Register
                  onRegister={handleRegister}
                  isLoggedIn={isLoggedIn}
                  isLoading={isLoading}
                />
              }
            />
            <Route
              exact
              path="/signin"
              element={
                <Login onLogin={handleLogin} isLoggedIn={isLoggedIn} isLoading={isLoading} />
              }
            />
            <Route
              exact
              path="/edit"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <TextEditor onSubmit={handleTextEditorSubmit} isLoading={isLoading} />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/deferred"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Posts
                    posts={deferredPosts}
                    onDeletePost={handleDeletePost}
                    isLoadingPosts={isLoadingPosts}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </CurrentUserContext.Provider>
      <InfoPopup message={infoPopupMessage} isActive={isInfoPopupShown} type={infoPopupType} />
    </div>
  );
}

export default App;
