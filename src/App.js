import React, { Fragment } from 'react'
import { useQuery } from '@tanstack/react-query';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { routes } from './routes'; 
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import { useEffect } from "react";
import axios from "axios";
import { isJsonString } from './utils';
import { jwtDecode } from 'jwt-decode';
import { useDispatch,useSelector } from 'react-redux';
import * as UserService from "./services/UserService";
import { updateUser } from './redux/slice/userSlide';


function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const { storageData, decoded } = handleDecoded();
    
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData);
    }
  }, []);

  const handleDecoded = () => {
    let storageData;
    let decoded = {};
  
    storageData = localStorage.getItem("access_token");
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
  
    return { decoded, storageData };
  };
  
  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      // Do something before request is sent
      const currentTime = new Date();
      const { decoded } = handleDecoded();
  
      if (decoded?.exp < currentTime.getTime() / 1000) {
        const data = await UserService.refreshToken();
        config.headers["token"] = `Bearer ${data?.access_token}`;
      }
  
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  const handleGetDetailsUser = async (id, token) => {
    try {
      const res = await UserService.getDetailsUser(id, token);
      dispatch(updateUser({ ...res?.data, access_token: token }));
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  return (
    <div>
      
      <Router>
        <Routes>
          {routes.map((route)=> {
            const Page = route.page
            const ischeckAuth = !route.isPrivate || (user?.isAdmin && user?.access_token);
            const Layout = route.isShowHeader ? DefaultComponent :Fragment
            return (
              <Route key={route.path} path={ischeckAuth ? route.path : undefined} element={
                <Layout>
                  <Page />
                </Layout>
              } />
            )
          })}
        </Routes>
      </Router>
    </div>
  )
}
export default App