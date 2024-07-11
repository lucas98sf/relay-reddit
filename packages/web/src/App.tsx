import { Loading } from "@relay-reddit/ui";
import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Providers } from "./Providers";
import { Home } from "./pages";

function App() {
  return (
    <Providers>
      <Suspense fallback={<Loading />}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </Suspense>
    </Providers>
  );
}

export default App;
