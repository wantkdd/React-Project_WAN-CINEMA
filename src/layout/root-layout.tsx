import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar.tsx';
import { PropsWithChildren } from 'react';

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-gray-800">
      <Navbar />
      <hr className="border-white" />
      {children || <Outlet />}
    </div>
  );
};

export default RootLayout;
