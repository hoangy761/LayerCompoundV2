import React, { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import publicRoutes from './routes/public';
import DefaultLayout from './layouts/Default';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route, index) => {
          let Layout: React.ElementType = DefaultLayout;
          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
