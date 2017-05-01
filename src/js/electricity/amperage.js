import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  withRouter
} from 'react-router-dom';

import ReactEcharts from 'echarts-for-react';
import axios from 'axios';



class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            time : props.time
        };

        this.hostname = window.location.hostname;

        this.getLineChartData();

    }

    getLineChartData(){
        var currentDate = new Date();

        var first = currentDate.getDate() - currentDate.getDay();
        var last = first + 6; // last day is the first day + 6

        var firstday = new Date(currentDate.setDate(first));
        var lastday = new Date(currentDate.setDate(last));


        var first = firstday.getFullYear() + '-' + (firstday.getMonth()+1) + '-' + firstday.getDate();
        var last = lastday.getFullYear() + '-' + (lastday.getMonth()+1) + '-' + lastday.getDate();
        var url = `http://${this.hostname}:8080/api/datalogs/GetByTarget/electricity.amperage.a.int/`;
        url += first + '/' + last;

        // axios({
        //     method:'get',
        //     url: url,
        //     responseType:'json'
        // })
        // .then(function(response) {
        //     if(response.status == 200){
        //         var data = response.data;
        //         //console.log(data);
        //     }
        // });
    }

    changeTime(time){

        this.setState({
            time : time
        });
    }

    renderGaugeChart(value){
        var height = 480;
        var option = {
            series : [
               {
                   min:0,
                   max:800,
                   name:'',
                   type:'gauge',
                   detail : {formatter:'{value}A'},
                   data:[{value: value, name: ''}],
               }
           ]
       };
        return (
            <ReactEcharts
                style={{
                    height:height
                }}
                option={option}
                notMerge={true}
                lazyUpdate={true}
            />
        )
    }

    gaugeChart(){
        let {amperage} = this.props;

        return(
            <div className="flex_wrap detail_chart_wrap">
                <div className="flex_1">
                    <h4>Phase A</h4>
                    {this.renderGaugeChart(amperage.a)}
                </div>

                <div className="flex_1">
                    <h4>Phase B</h4>
                    {this.renderGaugeChart(amperage.b)}
                </div>

                <div className="flex_1">
                    <h4>Phase C</h4>
                    {this.renderGaugeChart(amperage.c)}
                </div>
            </div>
        )
    }

    lineChart(){
        let {time} = this.state;


        let xAxisData = [
            {
                type : 'category',
                boundaryGap : false,
                data : null
            }
        ];
        let seriesData = [
            {
                name:'2016',
                type:'line',
                stack: 'stack',
                data: null,
            },
            {
                 name:'2017',
                 type:'line',
                 stack: 'stack',
                 data: null
             }
        ];



        switch (time) {
            case 'week':
                xAxisData[0].data = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
                seriesData[0].data = [120, 132, 101, 134, 90, 230, 210];
                seriesData[1].data = [220, 182, 191, 234, 290, 330, 310];
                break;

            case 'month':
                xAxisData[0].data = [1,2,3,4,5,6,7,8,9,10,11,12];
                seriesData[0].data = [20, 132, 101, 134, 90, 230, 210, 1, 782, 231];
                seriesData[1].data = [490, 182, 191, 234, 290, 330, 310, 92, 123, 231];
                break;

            case 'year':
                xAxisData[0].data = [1,2,3,4,5,6,7,8,9,10,11,12];
                break;

            default:
        }

        let option = {
            legend: {
                data:['2016','2017']
            },
            toolbox: {
                show : true,
                feature : {
                }
            },
            calculable : true,
            xAxis : xAxisData,
            yAxis : [
               {
                   type : 'value'
               }
            ],
            series : seriesData
        };

        var height = 460;

        return(
            <div className="flex_wrap detail_chart_wrap">
                <div className="flex_1">
                    <h4>Phase A</h4>
                    <ReactEcharts
                        style={{
                            height:height
                        }}
                        option={option}
                        notMerge={true}
                        lazyUpdate={true}
                    />
                </div>
                <div className="flex_1">
                    <h4>Phase B</h4>
                    <ReactEcharts
                        style={{
                            height:height
                        }}
                        option={option}
                        notMerge={true}
                        lazyUpdate={true}
                    />
                </div>
                <div className="flex_1">
                    <h4>Phase C</h4>
                    <ReactEcharts
                        style={{
                            height:height
                        }}
                        option={option}
                        notMerge={true}
                        lazyUpdate={true}
                    />
                </div>
            </div>
        )
    }

    render(){
        let {time} = this.state;
        let renderChart = "";

        if(time == 'currently'){
            renderChart = this.gaugeChart();
        }else{
            renderChart = this.lineChart();
        }

        return (
            <div>
                {renderChart}

                <div className="text-center btn-time-wrap">
                    <button type="button" className={"btn" + (time=='currently'?' active':'')} onClick={this.changeTime.bind(this, 'currently')}>Currently</button>
                    <button type="button" className={"btn" + (time=='week'?' active':'')} onClick={this.changeTime.bind(this, 'week')}>Week</button>
                    <button type="button" className={"btn" + (time=='month'?' active':'')} onClick={this.changeTime.bind(this, 'month')}>Month</button>
                    <button type="button" className={"btn" + (time=='year'?' active':'')} onClick={this.changeTime.bind(this, 'year')}>Year</button>
                </div>
            </div>
        );
    }
}

App.defaultProps = {
    time : "currently"
}

function mapStateToProps(state){
    return {
        amperage: state.reducers.electricityData.data.amperage
    }
}

export default withRouter(connect(mapStateToProps)(App));
