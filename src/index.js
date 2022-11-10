import React from 'react';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';

import Landing from './pages/landing/Landing';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Accounts from './pages/reddit/accounts/Accounts';
import Bots from './pages/reddit/bots/Bots';
import Posts from './pages/reddit/posts/Posts';
import MassDm from './pages/reddit/massdm/MassDm';
import NoMatch from './pages/nomatch/NoMatch';
import Upvotes from './pages/reddit/upvotes/Upvotes';
import Register from './pages/register/Register';
import AccountPermissions from './pages/admin/account-permissions/AccountPermissions';
import Flairs from './pages/reddit/flairs/Flairs';
import Logs from './pages/admin/logs/Logs';

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Dashboard />} />
      <Route path="landing" element={<Landing />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="reddit/accounts" element={<Accounts />} />
      <Route path="reddit/bots" element={<Bots />} />
      <Route path="reddit/upvotes" element={<Upvotes />} />
      <Route path="reddit/posts" element={<Posts />} />
      <Route path="reddit/flairs" element={<Flairs />} />
      <Route path="reddit/messages" element={<MassDm />} />
      <Route path="admin/permissions" element={<AccountPermissions />} />
      <Route path="admin/logs" element={<Logs />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
