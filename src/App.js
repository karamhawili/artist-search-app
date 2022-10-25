import GlobalStyles from './styles/globalStyles';
import ArtistSearch from './pages/ArtistSearch';
import ArtistAlbums from './pages/ArtistAlbums';
import Login from './pages/Login';
import Home from './pages/Home';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSpotify } from './hooks/useSpotify';
import AuthRedirect from './pages/AuthRedirect';

const App = () => {
  const { isLoggedIn } = useSpotify();

  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="home" element={<Home />}>
          <Route index element={<ArtistSearch />} />
          <Route path="artist-search" element={<ArtistSearch />} />
          <Route path="artist-albums" element={<ArtistAlbums />} />
        </Route>
        <Route path="auth-redirect" element={<AuthRedirect />} />
        <Route
          path="/"
          element={!isLoggedIn() ? <Login /> : <Navigate replace to="/home" />}
        />
      </Routes>
    </>
  );
};

export default App;
