import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from './Provider';
import { Router } from './Router';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<h1>Loading...</h1>}>
      <Provider>
        <Router />
      </Provider>
    </Suspense>
  </React.StrictMode>
);
