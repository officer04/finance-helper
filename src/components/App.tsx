import { FC } from 'react';
import { Footer, Header, Home } from './shared';
import { Route, Routes } from 'react-router-dom';
import { ProfileUser } from './shared/profile-user';
import { AppRoutes } from '../routes/app-routes';

const App: FC = () => {
  return (
    <div className="flex flex-col items-center justify-between h-screen">
      <Header />
      <AppRoutes />
      <Footer />
    </div>
  );
};

export default App;
