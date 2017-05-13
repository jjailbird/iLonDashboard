import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  withRouter
} from 'react-router-dom';

import ReactEcharts from 'echarts-for-react';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            time: props.time
        }
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

        //Math.round(Math.random() * 1000)

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
            toolbox: {
                show : true,
                feature : {
                }
            },
            calculable : true,
            xAxis : [
               {
                   type : 'category',
                   boundaryGap : false,
                   data : xAxisData
               }
            ],
            yAxis : [{type : 'value'}],
            series : [
               {
                   name:'2016',
                   type:'line',
                   stack: 'stack',
                   data: seriesData1,
               },
               {
                    name:'2017',
                    type:'line',
                    stack: 'stack',
                    data:seriesData2
                }
           ]
       };
    }

    render(){
        var {time} = this.state;
        var {water} = this.props;
        var renderHtml = "";

        switch (time) {
           case "currently":
                renderHtml = (
                   <div className="detail-index water">
                        <div className="value_wrap">
                            <div className="value">
                                 {water}
                            </div>
                            <span className="unit">Gal</span>
                        </div>
                   </div>
               );
           break;

           case "week":

           case "month":

           case "year":
               renderHtml = (
                   <ReactEcharts
                       className="line_chart"
                       option={this.getOptions()}
                       notMerge={true}
                       lazyUpdate={true}
                   />
               );
               break
         }

         return(
            <div>
                <h2 className="sub_title water">Water</h2>

                <div className="flex_wrap detail_chart_wrap water">
                    <div className="flex_1">
                        {renderHtml}
                    </div>
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
        water: state.reducers.waterData.data
    }
}

export default withRouter(connect(mapStateToProps)(App));
