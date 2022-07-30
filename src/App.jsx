import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './router';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {
          routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              //exact={route.exact}
              element={<route.component/>}
            ></Route>
          ))
        }
        <Route path='*' element={<Navigate to='/login'/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}
