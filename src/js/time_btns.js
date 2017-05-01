import React, { Component } from 'react';



class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            time : props.time
        };
    }

    changeTime(time){
        console.log(time);
        this.setState({
            time : time
        });
    }

    render(){
        let {time} = this.state;

        return(
            <div className="text-center btn-time-wrap">
                <button type="button" className={"btn" + (time=='currently'?' active':'')} onClick={this.changeTime.bind(this, 'currently')}>Currently</button>
                <button type="button" className={"btn" + (time=='week'?' active':'')} onClick={this.changeTime.bind(this, 'week')}>Week</button>
                <button type="button" className={"btn" + (time=='month'?' active':'')} onClick={this.changeTime.bind(this, 'month')}>Month</button>
                <button type="button" className={"btn" + (time=='year'?' active':'')} onClick={this.changeTime.bind(this, 'year')}>Year</button>
            </div>
        )
    }

}

App.defaultProps = {
    time : "currently"
}

export default App;
