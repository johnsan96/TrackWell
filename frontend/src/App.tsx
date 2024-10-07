import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Finance from './pages/Finance';
 
const App = () => {
   return (
      <>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/finance" element={<Finance />} />
          
         </Routes>
      </>
   );
};
 
export default App;
