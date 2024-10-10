import { FC } from 'react';
import { Footer, Header, Home } from './components/shared';

const App: FC = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-between h-screen">
        <Header />
        <Home />
        <Footer />
      </div>
    </>
  );
};

export default App;
