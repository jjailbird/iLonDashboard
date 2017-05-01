import React, { Component } from 'react';
import { connect } from 'react-redux';

import {updateElectricity, updateGas, updateWater, updateTemperature, updateHumidity} from "./actions";

import {
  Route,
  Link,
  Switch,
  withRouter
} from 'react-router-dom';


import Navi from './navi';
import Home from './home';
import Detail from './detail';

import Websocket from 'react-websocket';
import IdleTimer from 'react-idle-timer';

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var timer = null;
class Root extends Component {

    constructor(props) {
        super(props);

        var locations = ['/', '/detail/electricity/Amperage', '/detail/gas', '/detail/water', '/detail/temperature', '/detail/humidity', '/detail/notice'];

        //props.location.pathname
        //console.log( props.location.pathname );
        let currentIdx = locations.findIndex((row, idx)=>{
            if(row == props.location.pathname){
                return idx;
            }
        });

        this.state = {
            locations: locations,
            idx: currentIdx
        }

        this.hostname = window.location.hostname;

    }

    handleData(data) {
        var {dispatch} = this.props;
        var jsonObj = JSON.parse(data);

        if ( Array.isArray(jsonObj) ) {
            var electricity = {
                amperage: {
                    a: 0,
                    b: 0,
                    c: 0
                },
                voltage: {
                    a: 0,
                    b: 0,
                    c: 0
                },
                power:{
                    power:0,
                    frequency:0,
                    power_fator_avg:0,
                    peak_damand: 0,
                    time_of_peak_demand: 0
                },
                total:0,
                totalized_energ:0
            };

            var temperature = {
                indoor:0,
                outdoor: 0
            };


            for(let data of jsonObj){

                console.log(data);
                switch (data.target) {
                    case "electricity.totalpower.1.int":
                        if( data.tagValue.indexOf("e") > -1 ){
                            electricity.total = numberWithCommas(parseInt(data.tagValue * 32767, 10));
                            electricity.totalized_energ = parseInt(data.tagValue * 32767, 10);
                        }else{
                            electricity.total = numberWithCommas(Math.round(data.tagValue));
                            electricity.totalized_energ = (Math.round(data.tagValue) * 10) / 10;
                        }
                        break;
                    case "electricity.amperage.a.int":
                        if( data.tagValue.indexOf("e") > -1 ){
                            electricity.amperage.a = parseInt(data.tagValue * 32767, 10);
                        }else{
                            electricity.amperage.a = Math.round(data.tagValue * 100) / 100;
                        }
                        break;
                    case "electricity.amperage.b.int":
                        if( data.tagValue.indexOf("e") > -1 ){
                            electricity.amperage.b = parseInt(data.tagValue * 32767, 10);
                        }else{
                            electricity.amperage.b = Math.round(data.tagValue * 100) / 100;
                        }
                        break;
                    case "electricity.amperage.c.int":
                        if( data.tagValue.indexOf("e") > -1 ){
                            electricity.amperage.c = parseInt(data.tagValue * 32767, 10);
                        }else{
                            electricity.amperage.c = Math.round(data.tagValue * 100) / 100;
                        }
                        break;
                    case "electricity.voltage.a.int":
                        if( data.tagValue.indexOf("e") > -1 ){
                            electricity.voltage.a = parseInt(data.tagValue * 32767, 10);
                        }else{
                            electricity.voltage.a = Math.round(data.tagValue * 100) / 100;
                        }
                        break;
                    case "electricity.voltage.b.int":
                        if( data.tagValue.indexOf("e") > -1 ){
                            electricity.voltage.b = parseInt(data.tagValue * 32767, 10);
                        }else{
                            electricity.voltage.b = Math.round(data.tagValue * 100) / 100;
                        }
                        break;
                    case "electricity.voltage.c.int":
                        if( data.tagValue.indexOf("e") > -1 ){
                            electricity.voltage.c = parseInt(data.tagValue * 32767, 10);
                        }else{
                            electricity.voltage.c = Math.round(data.tagValue * 100) / 100;
                        }
                        break;
                    case "electricity.power.fixed(2)":
                        if( data.tagValue.indexOf("e") > -1 ){
                            electricity.power.power = parseInt(data.tagValue * 32767, 10);
                        }else{
                            electricity.power.power = Math.round(data.tagValue * 100) / 100;
                        }
                        break;
                    case "electricity.frequency.int":
                        if( data.tagValue.indexOf("e") > -1 ){
                            electricity.power.frequency = parseInt(data.tagValue * 32767, 10);
                        }else{
                            electricity.power.frequency = Math.round(data.tagValue * 100) / 100;
                        }
                        break;
                    case "electricity.powerfactor.fixed(2)":
                        if( data.tagValue.indexOf("e") > -1 ){
                            electricity.power.power_fator_avg = parseInt(data.tagValue * 32767, 10);
                        }else{
                            electricity.power.power_fator_avg = Math.round(data.tagValue * 100) / 100;
                        }
                        //console.log(data.tagValue);
                        break;
                    case "electricity.peakdemand.int":
                        if( data.tagValue.indexOf("e") > -1 ){
                            electricity.power.peak_damand = parseInt(data.tagValue * 32767, 10);
                        }else{
                            electricity.power.peak_damand = Math.round(data.tagValue * 100) / 100;
                        }
                        break;
                    case "electricity.timeofpeakdemend.int":
                        if( data.tagValue.indexOf("e") > -1 ){
                            electricity.power.time_of_peak_demand = parseInt(data.tagValue * 32767, 10);
                        }else{
                            electricity.power.time_of_peak_demand = Math.round(data.tagValue * 100) / 100;
                        }

                        dispatch( updateElectricity(electricity) );
                        break;

                    case "gas.int":
                        dispatch( updateGas(numberWithCommas(data.tagValue)) );
                        break;
                    case "water.int":
                        //console.log(data);
                        dispatch( updateWater(numberWithCommas(data.tagValue)) );
                        break;

                    case "temp.outdoor.fixed(1)":
                        temperature.outdoor = Math.round(data.tagValue);
                        break;
                    case "temp.indoor.fixed(1)":
                        temperature.indoor = Math.round(data.tagValue);
                        dispatch( updateTemperature(temperature) );
                        break;
                    case "Humidity.fixed(1)":
                        dispatch( updateHumidity(data.tagValue) );
                        break;
                }
            }


        }
    }

    _onActive(){
        console.log('active');

        //onActive => idle은 죽인다.
        if(timer){
            clearInterval(timer);
        }
    }

    _onIdle(){
        console.log('idle');

        var self = this;
        var {idx, locations} = this.state;
        let {history} = this.props;


        timer = setInterval(()=> {
            idx = ++idx;
            if(idx > 6){
                idx = 0;
            }

            history.replace( locations[idx] );

            self.setState({
                idx: idx
            })

        }, 2000);
    }

    render(){


        return(
            <div>
                <Websocket url={`ws://${this.hostname}:8181/`} onMessage={this.handleData.bind(this)} debug={true}/>
                <IdleTimer
                    ref="idleTimer"
                    activeAction={this._onActive.bind(this)}
                    idleAction={this._onIdle.bind(this)}
                    timeout={5000}
                    format="MM-DD-YYYY HH:MM:ss.SSS"
                >
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/detail" component={Detail} />
                    </Switch>
                </IdleTimer>
            </div>
        )
    }
}


function mapStateToProps(state){
    return state;
}

export default withRouter(connect(mapStateToProps)(Root));
