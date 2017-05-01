import React, { Component } from 'react';

//import Gauge from './electricity/gauge';
//import Line from './electricity/line';

import Amperage from './amperage';
import Voltage from './voltage';
import Power from './power';
import Totalized_energ from './totalized_energ';

class App extends Component {

    constructor(props) {
        super(props);


    }

    render(){
        var {match} = this.props;
        var id = match.params.id;
        let renderChart;

        //console.log(match);

        switch (id) {
            case "Amperage":
                renderChart = <Amperage id={id} />;
                break;
            case "Voltage":
                renderChart = <Voltage id={id} />;
                break;
            case "Power":
                renderChart = <Power id={id} />;
                break;
            case "Totalized_Energ":
                id = "Totalized Energ";
                renderChart = <Totalized_energ />;
                break;
        }

        return(
            <div className="eletricity">
                <h3 className="sub_cate_title">{id}</h3>
                <div>
                    {renderChart}
                </div>
            </div>
        )
    }

}

export default App;
