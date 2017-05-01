import React, { Component } from 'react';
import { connect } from 'react-redux';


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hours:"00",
            minutes:"00",
            ampm: ""
        }
    }

    componentDidMount() {
        var intervalId = setInterval(this.formatAMPM.bind(this), 1000);
        // store intervalId in the state so it can be accessed later:
        this.setState({intervalId: intervalId});
    }

    componentWillUnmount() {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.intervalId);
    }

    getMonth(mon){
        switch (mon) {
            case 1:
                return "January";
            case 2:
                return "February";
            case 3:
                return "March";
            case 4:
                return "April";
            case 5:
                return "May";
            case 6:
                return "June";
            case 7:
                return "July";
            case 8:
                return "August";
            case 9:
                return "September";
            case 10:
                return "October";
            case 11:
                return "November";
            case 12:
                return "December";
        }
    }

    formatAMPM() {
        var date = new Date();

        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : "00"; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;

        this.setState({
            hours : hours,
            minutes : minutes,
            ampm: ampm
        })
    }

    getCurrentDate(){
        var currentdate = new Date();
        var datetime = currentdate.getDate() + " "
                + this.getMonth(currentdate.getMonth()+1) + " "
                + currentdate.getFullYear();
        return datetime;
    }

    render(){
        let {color} = this.props;
        let {hours, minutes, ampm} = this.state;
        let {outdoor} = this.props.temperature;

        return(
            <nav className="navbar_top navbar-light">
                <h1 className="nav_title" style={{"color":color}}>Middle & High School</h1>

                <div className="right_info">
                    <span className="temperature" style={{"color":color}}>
                        {outdoor}
                        <span>℉</span>
                    </span>
                    <span className="seperator" style={{"color":color}}>|</span>
                    <span style={{"color":color}}>{this.getCurrentDate()} </span>
                    <span className="seperator" style={{"color":color}}>|</span>

                    <span style={{"color":color}}>
                        {hours} : {minutes}
                        <span className="ampm">{ampm}</span>
                    </span>
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {
        temperature:state.reducers.temperatureData.data
    }
}

export default connect(mapStateToProps)(App);
