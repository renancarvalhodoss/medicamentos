import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import Login from './Login/Login';
import Registro from './Login/Registro';


const PrivateRoute = ({ component: Component, ...rest }) =>{
    const token = useSelector(state => state.token);
    return(
    <Route {...rest} render={ props => token != null ?
        ( <Component {...props}/>) :
        (<Redirect to={{pathname:'/login', state: {from: props.location} }}/>)
      }/>
)};

const LoginRoute = ({ component: Component, ...rest }) => {
    const token = useSelector(state => state.token)
    return (
        <Route
            {...rest}
            render={props =>
                token == null ? (
                    <Component {...props} />
                ) : (
                        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                    )
            }
        />);
};


const Routes = () =>{ 
    const token = useSelector(state => state.token);
    return(
    <BrowserRouter>
        <Switch>
            <LoginRoute exact path="/login" component={(props)=> <Login {...props}/>} />
            <Route exact path="/registro" component={(props)=> <Registro {...props}/>} />
            <PrivateRoute  path="/" component={(props)=> <Home {...props} />}/>

        </Switch>
    </BrowserRouter>
)};

export default Routes;