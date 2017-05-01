import React, { Component } from 'react';

import ReactEcharts from 'echarts-for-react';

class App extends Component {
    render(){
        return (
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
        );
    }
}


export default App;
