import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { connect } from 'react-redux';

import {
  withRouter
} from 'react-router-dom';

const Temperature = (type, input) => {

    const inputMax = 100;
    const heightFull = 287;
    const heightPercent = (input / inputMax) * 100;
    const heightPx = Math.round((heightFull * heightPercent) / 100);

    const mrTop = heightFull - heightPx;

    return (
        <div className={`detail-index temperature ${type}`}>
            <div className="temp">
                <div className="fill" style={{height:heightPx, marginTop:mrTop}}>
                    <img src="/img/temp/temp_indoor.png" className="fill" />
                </div>
            </div>
            <div className="value_wrap">
                <div className="value">
                    {input}
                </div>
                <span className="unit">℉</span>
            </div>
        </div>
    )
}

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            time : props.time
        };
    }

    changeTime(time){

        this.setState({
            time : time
        });
    }

    getOptions(){
        let {time} = this.state;
        var xAxisData = [];
        var seriesData1 = [];
        var seriesData2 = [];

        switch (time) {
            case "week":
                xAxisData =['SUN','MON','TUE','WED','THU','FRI','SAT'];
                seriesData1 = Array.from(new Array(7), () => Math.round(Math.random() * 1000));
                seriesData2 = Array.from(new Array(7), () => Math.round(Math.random() * 1000));
                break;
            case "month":
                xAxisData = Array.from(new Array(30), (x,i) => i); //[1,2,3,4];
                seriesData1 = Array.from(new Array(30), () => Math.round(Math.random() * 1000));
                seriesData2 = Array.from(new Array(30), () => Math.round(Math.random() * 1000));
                break;

            case "year":
                xAxisData = Array.from(new Array(12), (x,i) => i);
                seriesData1 = Array.from(new Array(12), () => Math.round(Math.random() * 1000));
                seriesData2 = Array.from(new Array(12), () => Math.round(Math.random() * 1000));
                break;
        }



        return {
            legend: {
                data:['2016','2017']
            },
            calculable : true,
            xAxis : [
               {
                   type : 'category',
                   //boundaryGap : false,
                   data : xAxisData
               }
            ],
            yAxis : [{type : 'value'}],
            series : [
               {
                   name:'2016',
                   type:'bar',
                   data: seriesData1
               },
               {
                    name:'2017',
                    type:'bar',
                    data: seriesData2
                }
           ]
       };
    }

    render(){
        var {match, temperature} = this.props;
        let {time} = this.state;
        let renderHtml = "";

        var indoorInput = temperature.indoor;
        var outdoorInput = temperature.outdoor;


        switch (time) {
           case "currently":
            renderHtml = (
                <div className="flex_wrap detail_chart_wrap">
                    <div className="flex_1">
                        {Temperature('indoor', indoorInput)}
                    </div>
                    <div className="flex_1">
                        {Temperature('outdoor', outdoorInput)}
                    </div>
                </div>
            );
           break;

           case "week":

           case "month":

           case "year":
               renderHtml = (
                   <div className="flex_wrap detail_chart_wrap temperature">
                       <div className="flex_1">
                           <ReactEcharts
                                className="bar_chart"
                               option={this.getOptions()}
                               notMerge={true}
                               lazyUpdate={true}
                           />
                       </div>
                       <div className="flex_1">
                           <ReactEcharts
                                className="bar_chart"
                               option={this.getOptions()}
                               notMerge={true}
                               lazyUpdate={true}
                           />
                       </div>
                   </div>
               );
               break
       }

       return(
            <div>
                <h2 className="sub_title temperature">Temperature</h2>

                <div className="temperature">
                    <div className="flex_wrap place">
                        <h3 className="flex_1">Indoor</h3>
                        <h3 className="flex_1">Outdoor</h3>
                    </div>
                    {renderHtml}
                </div>

                <div className="btn-time-wrap">
                    <button type="button" className={"btn" + (time=='currently'?' active':'')} onClick={this.changeTime.bind(this, 'currently')}>Currently</button>
                    <button type="button" className={"btn" + (time=='week'?' active':'')} onClick={this.changeTime.bind(this, 'week')}>Week</button>
                    <button type="button" className={"btn" + (time=='month'?' active':'')} onClick={this.changeTime.bind(this, 'month')}>Month</button>
                    <button type="button" className={"btn" + (time=='year'?' active':'')} onClick={this.changeTime.bind(this, 'year')}>Year</button>
                </div>
            </div>
        )
    }
}

App.defaultProps = {
    time : "currently"
}

function mapStateToProps(state){
    return {
        temperature: state.reducers.temperatureData.data
    }
}

export default withRouter(connect(mapStateToProps)(App));
