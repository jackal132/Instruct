import { Route, Redirect, BrowserRouter } from 'react-router-dom';
import Login from './Login';
import Room from './Room';

const PrivateRoute = () => {

    let loggedIn = window.sessionStorage.getItem('_id') ? true : false;
    
    return (
        <BrowserRouter>
            <Route path="/">
                {loggedIn ? <Redirect to="/room"/> : <Redirect to="/login"/>}
            </Route>
            <Route path="/login" component={Login}/>
            <Route path="/room" component={Room}/>
        </BrowserRouter>
    );
    
};

export default PrivateRoute;