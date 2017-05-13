import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

import {
  withRouter
} from 'react-router-dom';

import { connect } from 'react-redux';

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            time : props.time
        };
    }

    changeTime(time){
        // /console.log(this.state.time);
        this.setState({
            time : time
        });
    }

    lineChart(){
        let {time} = this.state;
        let xAxisData = [
            {
                type : 'category',
                boundaryGap : false,
                data : ['SUN','MON','TUE','WED','THU','FRI','SAT']
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
                    //mark : {show: true},
                    //dataView : {show: true, readOnly: false},
                    //magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                    //restore : {show: true},
                    //saveAsImage : {show: true}
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

    gaugeChart(){
        let {totalized_energ} = this.props;
        //console.log(totalized_energ);
        return(
            <div className="flex_wrap detail_chart_wrap">
                <div className="flex_1"
                    style={{
                        background:'#fff url(/img/detail/total_energ_current_bg.png) 0 bottom no-repeat'
                    }}>
                    <ReactEcharts
                        style={{
                            height:480
                        }}
                        option={{
                            series : [
                               {
                                   min:0,
                                   max:120,
                                   name:'',
                                   type:'gauge',
                                   detail : {formatter:'{value} HZ'},
                                   data:[{value: totalized_energ, name: ''}],
                               }
                           ]
                        }}
                        notMerge={true}
                        lazyUpdate={true}
                    />
                </div>
            </div>
        )
    }

    render(){
        let {time} = this.state;
        let {totalized_energ} = this.props;
        let renderChart = "";
        /*
        if(time == 'currently'){
            renderChart = this.gaugeChart();
        }else{
            renderChart = this.lineChart();
        }
        */

        return (
            
            <div className="flex_wrap detail_chart_wrap totalized">
                <div className="flex_1">
                    

                    <div className="detail-index totalized">
                        <div className="value_wrap">
                            <span className="value">{numberWithCommas(totalized_energ)}</span>
                            <span className="unit">KWH</span>
                        </div>
                        
                    </div>
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
        totalized_energ: state.reducers.electricityData.data.totalized_energ
    }
}

export default withRouter(connect(mapStateToProps)(App));
