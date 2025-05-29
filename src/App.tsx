import './App.css';
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import RootLayout from './layout/root-layout';
import HomePage from './pages/home-page';
import PopularMoviesPage from './pages/popular-movies';
import UpcomingMoviesPage from './pages/upcoming-movies';
import TopRatedMoviesPage from './pages/top-rated-movies';
import NowPlayingMoviesPage from './pages/now-playing-movies';
import DetailPage from './pages/detail-page';
import LoginPage from './pages/login-page';
import SignupPage from './pages/signup-page';
import { AuthProvider } from './context/AuthContext';
import MyPage from './pages/my-page';
import ProtectedLayout from './layout/ProtectedLayout';
import GoogleLoginRedirectPage from './pages/googleLoginRedirect-page';

const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/movies/popular',
        element: <PopularMoviesPage />,
      },
      {
        path: '/movies/upcoming',
        element: <UpcomingMoviesPage />,
      },
      {
        path: '/movies/top-rated',
        element: <TopRatedMoviesPage />,
      },
      {
        path: '/movies/now_playing',
        element: <NowPlayingMoviesPage />,
      },
      {
        path: 'movie/:movieId',
        element: <DetailPage />,
      },
      {
        path: '/login-page',
        element: <LoginPage />,
      },
      {
        path: '/signup-page',
        element: <SignupPage />,
      },
      { path: 'v1/auth/google/callback', element: <GoogleLoginRedirectPage /> },
    ],
  },
];

const protectedRoutes: RouteObject[] = [
  {
    element: <ProtectedLayout />,
    children: [{ path: '/my-page', element: <MyPage /> }],
  },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
