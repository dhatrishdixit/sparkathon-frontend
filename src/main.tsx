import React from 'react'
import ReactDOM from 'react-dom/client'
import 'regenerator-runtime/runtime';
import App from './App.tsx'
import './index.css'
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import { Chat } from './pages/Chat.tsx';
import { ProductPage } from './pages/ProductPage.tsx';


const router = createBrowserRouter([
   {
     path: "/",
     element: <App />,
   },
   {
     path:"/chat",
     element:<Chat/>
   },
   {
     path:"/product/:id" ,
     element:<ProductPage/>
   }
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
