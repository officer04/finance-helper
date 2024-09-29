import { FC } from 'react';
import { Footer, Header, Home } from './components/shared';

const App: FC = () => {
  return (
    <div className="text-center">
      <Header />
      <Home/>
      <Footer />
    </div>
  );
};

export default App;
