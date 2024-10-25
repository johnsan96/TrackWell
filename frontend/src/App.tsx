import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Finance from './pages/Finance';

const App = () => {
   return (
      <>
         <Routes>
            <Route path="/" element={<Finance />} />
            <Route path="/tracking" element={<Home />} />

         </Routes>
      </>
   );
};

export default App;
