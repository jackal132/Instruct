import { Component } from "react";
import PrivateRoute from './PrivateRoute'
class Main extends Component {

    render(){
        return (
            <PrivateRoute/>
        )
    }
}

export default Main;