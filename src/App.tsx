import { FC } from 'react';
import { Footer, Header, Home } from './components/shared';

const App: FC = () => {
  return (
    <div className='flex flex-col items-center justify-between h-screen p-4'>
      <Header />
      <Home/>
      <Footer />
    </div>
  );
};

export default App;
