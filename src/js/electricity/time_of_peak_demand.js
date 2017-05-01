import React, { Component } from 'react';

import ReactEcharts from 'echarts-for-react';

import TimeBtns from '../time_btns';

class App extends Component {

    constructor(props) {
        super(props);

        // axios({
        //     method: 'post',
        //     url: '/api/amperage'
        // });

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
        return(
            <div className="flex_wrap detail_chart_wrap">
                <div className="flex_1">
                    <ReactEcharts
                        style={{
                            height:480
                        }}
                        option={{
                            series : [
                               {
                                   name:'',
                                   type:'gauge',
                                   detail : {formatter:'{value}KWH'},
                                   data:[{value: 50, name: ''}],
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

export default App;
