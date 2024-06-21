
import React from 'react';
import PostList from './assets/features/post/PostList'
import PostForm from './assets/features/post/PostForm'
import './App.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
   Route,
   RouterProvider} from "react-router-dom"
import Layout from './components/Layout'
import NotFound from './components/NotFound'
import Error from './components/Error';
import { Provider } from 'react-redux';
import {store} from "./store"
import { fetchURL } from './assets/features/post/postSlice';
import SinglePost from './assets/features/post/SinglePost';
import EditPost from './assets/features/post/EditPost';


store.dispatch(fetchURL())




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route
        path="/"
        element={<PostList />}
        errorElement={<Error />}
      />
      <Route path='/post' >
        <Route  index   element={<PostForm />}/>
       <Route  path=':id' element={<SinglePost />}  errorElement={<Error />}/>
       <Route  path=':id/edit' element={<EditPost />}/>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
)

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}