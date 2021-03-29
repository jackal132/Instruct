import { Route, Redirect, BrowserRouter } from 'react-router-dom';
import Login from './Login';
import RoomMain from './RoomMain';
import Room from './Room';

import Test from './Test';

const PrivateRoute = () => {

    let loggedIn = window.sessionStorage.getItem('_id') ? true : false;

    return (
        <BrowserRouter>
            <Route exact path="/">
                { loggedIn ? <Redirect to="/room"/> : <Redirect to="/login"/>}
            </Route>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/room" component={RoomMain}/>
            <Route exact path="/room/:roomId" component={Room}/>
            <Route exact path="/test" component={Test}/>
        </BrowserRouter>
    );
     
};

export default PrivateRoute;