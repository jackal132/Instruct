import { Component } from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './Login';
import Room from './Room';

class Main extends Component {

    render(){
        return (
            <BrowserRouter>
                <Route path="/login" component={Login}/>
                <Route path="/room" component={Room}/>
            </BrowserRouter>
        )
    }
}

export default Main;