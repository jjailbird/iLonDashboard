import React, { Component } from 'react';

import ReactEcharts from 'echarts-for-react';

class App extends Component {
    render(){

        let options = {
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
            xAxis : [
               {
                   type : 'category',
                   boundaryGap : false,
                   data : ['SUN','MON','TUE','WED','THU','FRI','SAT']
               }
            ],
            yAxis : [
               {
                   type : 'value'
               }
            ],
            series : [
               {
                   name:'2016',
                   type:'line',
                   stack: 'stack',
                   data:[120, 132, 101, 134, 90, 230, 210],
               },
               {
                    name:'2017',
                    type:'line',
                    stack: 'stack',
                    data:[220, 182, 191, 234, 290, 330, 310]
                }
           ]
        }

        return(
            <div className="flex_wrap detail_chart_wrap chart_line">
                <div className="flex_1">
                    <ReactEcharts
                        option={options}
                        notMerge={true}
                        lazyUpdate={true}
                    />
                </div>
                <div className="flex_1">
                    <ReactEcharts
                        option={options}
                        notMerge={true}
                        lazyUpdate={true}
                    />
                </div>
                <div className="flex_1">
                    <ReactEcharts
                        option={options}
                        notMerge={true}
                        lazyUpdate={true}
                    />
                </div>
            </div>
        )
    }
}


export default App;
