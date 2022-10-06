import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Providers } from './Providers';
import { Home } from './pages';

function App() {
  return (
    <Providers>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </Providers>
  );
}

export default App;
