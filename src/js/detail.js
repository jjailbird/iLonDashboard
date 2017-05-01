import React, { Component } from 'react';

import {
  Route,
  Link,
  Switch,
  NavLink
} from 'react-router-dom';

import IdleTimer from 'react-idle-timer';

import Navi from './navi';
import Electricity from './electricity/';
import Gas from './gas/';
import Water from './water/';

import Temperature from './temperature/';
import Humidity from './humidity/';
import Notice from './notice';

class App extends Component {

    constructor(props) {
        super(props);

        
    }



    render(){
        var match = this.props.match;

        return(
            <div id="detail">
                <Navi color="#dae4fb" />
                <div className="wrap detail">
                    <div className="content">
                        <Switch>
                            <Route path={`${match.url}/electricity/`} component={Electricity}/>
                            <Route path={`${match.url}/gas`} component={Gas}/>
                            <Route path={`${match.url}/water`} component={Water}/>
                            <Route path={`${match.url}/temperature`} component={Temperature}/>
                            <Route path={`${match.url}/humidity`} component={Humidity}/>
                            <Route path={`${match.url}/notice`} component={Notice}/>
                        </Switch>
                    </div>


                    <div className="right_menu">
                        <ul className="menus">
                            <li className="electricity">
                                <NavLink to="/detail/electricity/" className="right-btn">Electricity</NavLink>
                            </li>
                            <li className="gas">
                                <NavLink to="/detail/gas" className="right-btn">Gas</NavLink>
                            </li>
                            <li className="water">
                                <NavLink to="/detail/water" className="right-btn">Water</NavLink>
                            </li>
                            <li className="temperature">
                                <NavLink to="/detail/temperature" className="right-btn">Temperature</NavLink>
                            </li>
                            <li className="humidity">
                                <NavLink to="/detail/humidity" className="right-btn">Humidity</NavLink>
                            </li>
                            <li className="notice">
                                <NavLink to="/detail/notice" className="right-btn">Notice</NavLink>
                            </li>
                            <li className="main">
                                <Link to="/" className="right-btn">Main</Link>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        )
    }
}




export default App;
