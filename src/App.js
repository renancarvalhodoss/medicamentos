import React from 'react';
import { useDispatch } from 'react-redux';
import Routes from './routes';

const  App = ()=> {
  const dispatch = useDispatch();
  let token = localStorage.getItem('token');
  let user =localStorage.getItem('user');
  if(user==null || user == undefined){
    user = {};
  }else{
    user=JSON.parse(user);
  }
  console.log(token);

  dispatch({type:'login',payload:{token:token,user:user}});
  return (
    <Routes/>
  );
}

export default App;
