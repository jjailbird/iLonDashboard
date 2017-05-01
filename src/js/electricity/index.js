import React, { Component } from 'react';

import {
  Route,
  Link,
  Switch,
  NavLink,
  Redirect
} from 'react-router-dom';

import Sub from './sub';


class App extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        var {match} = this.props;

        var pathArray = this.props.location.pathname.split('/');

        if(!pathArray.pop()){
            return(
                <Redirect to="/detail/electricity/Amperage"/>
            )
        }

        return(
            <div>
                <h2 className="sub_title electricity">Electricity</h2>
                <ul className="cates first">
                    <li>
                        <NavLink to="/detail/electricity/Amperage" className="btn">Amperage</NavLink>
                    </li>
                    <li>
                        <NavLink to="/detail/electricity/Voltage" className="btn">Voltage</NavLink>
                    </li>
                    <li>
                        <NavLink to="/detail/electricity/Power" className="btn">Power</NavLink>
                    </li>
                    <li>
                        <NavLink to="/detail/electricity/Totalized_Energ" className="btn">Totalized Energ</NavLink>
                    </li>
                </ul>

                <Route path={`${match.url}/:id/`} component={Sub} />
            </div>
        )
    }
}



export default App;
