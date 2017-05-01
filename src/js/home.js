import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Route,
  Link,
  Switch,
  withRouter
} from 'react-router-dom';

import Websocket from 'react-websocket';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';

import {updateNotice} from "./actions";

import Navi from './navi';

var timer = null;
class App extends Component {

    constructor(props) {
        super(props);
        if(!props.notice.Id) {
            this.getNoticeFromApi();
        };

    }

    componentDidMount() {
    }

    componentWillUnMount(){
        clearInterval(timer);
    }

    getNoticeFromApi(){
        var self = this;
        var {dispatch} = this.props;

        // timer = setInterval(function(){
        //
        // }, 5000);
        var hostname = window.location.hostname;
        // console.log('hostname', hostname);
        axios({
            method:'get',
            url:`http://${hostname}:8080/api/notices/0/1`,
            responseType:'json'
        })
        .then(function(response) {
            if(response.status == 200){
                var data = response.data.Data;
                if(data && Array.isArray(data) && data[0]){
                    var notice = data[0];
                    // self.setState({
                    //     notice:{
                    //         id: notice.Id,
                    //         createdAt: notice.CreatedAt,
                    //         title:notice.Title,
                    //         content:notice.Content
                    //     }
                    // })
                    //console.log(notice);
                    dispatch( updateNotice(notice) );
                }
            }
        });

    }

    getValueForHumidity(value){
        const inputMax = 100;
        const heightFull = 254;
        const heightPercent = (value / inputMax) * 100;
        const heightPx = Math.round((heightFull * heightPercent) / 100);

        return {
            marginTop : heightFull - heightPx,
            height : heightPx,
            value: Math.round(value)
        };
    }

    getValueForTemperature(value){
        const inputMax = 100;
        const heightFull = 287;
        const heightPercent = (value / inputMax) * 100;
        const heightPx = Math.round((heightFull * heightPercent) / 100);

        return {
            marginTop : heightFull - heightPx,
            height : heightPx,
            value: Math.round(value)
        }
    }

    render(){
        let {electricity, gas, water, temperature, humidity, notice} = this.props;

        //console.log(temperature);

        var indoorData = this.getValueForTemperature(temperature.indoor);
        var outdoorData = this.getValueForTemperature(temperature.outdoor);
        var humidityData = this.getValueForHumidity(humidity);

        return(
            <div id="home">
                <Navi outdoor={outdoorData.value} />
                <div className="wrap">
                    <div className="item_wrap">
                        <div className="item eletricity">
                            <div className="box">
                                <h2>
                                    Electricity
                                    <div>Electricity amount used</div>
                                </h2>

                                <div className="content">
                                    <img src='/img/main/concent1.png' className="left-icon" alt="eletricity" />
                                    <span className="value">{electricity}</span>
                                    <span className="unit">KWH</span>
                                </div>
                                <div className="more">
                                    <Link to="/detail/electricity/Amperage">
                                        more
                                        <span className="arrow"></span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="item gas">
                            <div className="box">
                                <h2>
                                    Gas
                                    <div>Gas amount used</div>
                                </h2>

                                <div className="content">
                                    <img src="/img/main/gas.png" className="left-icon" alt="" />
                                    <span className="value">{gas}</span>
                                    <span className="unit">m3</span>
                                </div>
                                <div className="more">
                                    <Link to="/detail/gas">
                                        more
                                        <span className="arrow"></span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="item water">
                            <div className="box">
                                <h2>
                                    Water
                                    <div>Water amount used</div>
                                </h2>

                                <div className="content">
                                    <img src="/img/main/water.png" className="left-icon" />
                                    <span className="value">{water}</span>
                                    <span className="unit">GAL</span>
                                </div>
                                <div className="more">
                                    <Link to="/detail/water">
                                        more
                                        <span className="arrow"></span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="item temperature">
                            <div className="box">
                                <h2>Temperature</h2>
                                <div className="content">
                                    <div className="indoor">
                                        <div className="">
                                            <div className="top">indoor</div>
                                            <div className="bottom">{indoorData.value}<span>˚F</span></div>
                                        </div>
                                        <div className="temp">
                                            <div className="fill" style={{marginTop:indoorData.marginTop, height:indoorData.height}}>
                                                <img src="/img/temp/temp_indoor.png" className="temperature" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="outdoor">
                                        <div className="">
                                            <div className="top">outdoor</div>
                                            <div className="bottom">{outdoorData.value}<span>˚F</span></div>
                                        </div>
                                        <div className="temp">
                                            <div className="fill" style={{marginTop:outdoorData.marginTop, height:outdoorData.height}}>
                                                <img src="/img/temp/temp_indoor.png" className="temperature" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="more">
                                    <Link to="/detail/temperature">
                                        more
                                        <span className="arrow"></span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="item humidity">
                            <div className="box">
                                <h2>Humidity</h2>
                                <div className="content">
                                    <div className="fill" style={{marginTop:humidityData.marginTop, height:humidityData.height}}>
                                        <img src="/img/main/humidity-fill.png" className="humidity" alt="" />
                                    </div>
                                    <div className="valueLabel">
                                        {humidityData.value}
                                    </div>
                                </div>
                                <div className="more">
                                    <Link to="/detail/humidity">
                                        more
                                        <span className="arrow"></span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="item notice">
                            <div className="box">
                                <h2>Notice</h2>
                                <div className="content">
                                    <div className="title">{notice.Title}</div>
                                    <div className="message">{ ReactHtmlParser(notice.Content) }</div>
                                </div>
                                <div className="more">
                                    <Link to="/detail/notice">
                                        more
                                        <span className="arrow"></span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

App.defaultProps = {
}

function mapStateToProps(state){

    return {
        electricity: state.reducers.electricityData.data.total,
        gas: state.reducers.gasData.data,
        water: state.reducers.waterData.data,
        temperature: state.reducers.temperatureData.data,
        humidity: state.reducers.humidityData.data,
        notice: state.reducers.noticeData.data,
    };
}

export default withRouter(connect(mapStateToProps)(App));
