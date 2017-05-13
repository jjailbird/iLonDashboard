import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { connect } from 'react-redux';

import {
  withRouter
} from 'react-router-dom';

import { addDays, getDateStringOnly } from '../utils/dateFunctions.js';
import { getDialogApiUrl } from '../utils/getConstants.js';

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
            time : props.time,
            loading1: true,
            loading2: true,
            option1: {},
            option2: {},
        };
        this.hostname = window.location.hostname;
    }

    changeTime(time){

        let today = new Date();

        const sApiUrlBase = getDialogApiUrl();
        // const sApiUrlBase = `http://${this.hostname}:8080/api/datalogs/`;
        // const sApiUrlBase = `http://${this.hostname}:50993/api/datalogs/`;
        // const sApiUrlBase = `http://192.168.147.34:8080/api/datalogs/`;  
        let sApiUrl = "";
        let seriesData = [];

        if (time == 'week') {
            const weekday = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
            const weekToday = today.getDay();
            var weekDate = new Array(7);
            var weekDateString = new Array(7);

            weekDate[0] = addDays(today, -weekToday);
            var n = weekday[weekToday];
            for(let i = 0;i < 7; i++) {
                weekDate[i] = addDays(weekDate[0], i);
                weekDateString[i] = getDateStringOnly(weekDate[i].toDateString()); // + 'T00:00:00'; 
            }

            sApiUrl = sApiUrlBase + "GetAvgGroupByTargetDate/temp.indoor.fixed(1)/" + weekDateString[0] + "/" + weekDateString[6];
            this.setOption(1, time, sApiUrl, weekday, weekDateString); 
          
            sApiUrl = sApiUrlBase + "GetAvgGroupByTargetDate/temp.outdoor.fixed(1)/" + weekDateString[0] + "/" + weekDateString[6];
            this.setOption(2, time, sApiUrl, weekday, weekDateString); 
            
        }
        
        else if(time == 'month') {
            const yearToday = today.getFullYear();
            let years = [];
             
            for (let i = 2; i >= 0; i-- ) {
                years.push(yearToday - i);
            }
            const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            
            sApiUrl = sApiUrlBase + "GetAvgGroupByTargetMonth/temp.indoor.fixed(1)/" + years[0] + "/" + years[years.length -1];
            this.setOption(1, time, sApiUrl, months, years); 

            sApiUrl = sApiUrlBase + "GetAvgGroupByTargetMonth/temp.outdoor.fixed(1)/" + years[0] + "/" + years[years.length -1];
            this.setOption(2, time, sApiUrl, months, years); 

        } 

        else if (time == 'year') {
            sApiUrl = sApiUrlBase + "GetAvgGroupByTargetYear/temp.indoor.fixed(1)/";
            this.setOption(1, time, sApiUrl);
            
            sApiUrl = sApiUrlBase + "GetAvgGroupByTargetYear/temp.outdoor.fixed(1)/";
            this.setOption(2, time, sApiUrl);

        }

        this.setState({
            time : time,
            loading1: true,
            loading2: true,
            loading3: true,
            option1: this.getOption(),
            option2: this.getOption(),
        });

    }
    getOption() {
        let xAxisDataBase = {
            type : 'category',
            // boundaryGap : false,
            data : null
        };

        let seriesDataBase = {
            name:'Phase',
            type:'bar',
            // stack: 'stack',
            data: null,
        };

        const option = {
            legend: {
                data:[]
            },
            toolbox: {
                show : true,
                feature : {
                }
            },
            calculable : true,
            xAxis : [ xAxisDataBase ],
            yAxis : [
               {
                   type : 'value'
               }
            ],
            series : [ seriesDataBase ]
        };

        return option;
    }
    getSeriesData(time,json,dataRange) {
        let seriesData;
        if (time == 'week') {
            seriesData = new Array(7);
            let tmpData = {};
            for(let i=0;i<7; i++) {
                tmpData = json.Data.find(x => x.Date == dataRange[i] + 'T00:00:00');
                if (tmpData)
                    seriesData[i] = tmpData.Average;//.toFixed(0);
                
            }
 
        }
        else if (time == 'month') {
            seriesData = new Array(12);
            let tempData = {};
            let tmpData = {};
            // console.log('dateRange', dataRange);
            for(let i=0;i<12; i++) {
                tmpData = json.Data.find(x => (x.Month == i+1 && x.Year == dataRange));
                // console.log(json.Data, tempData);
                if (tmpData)
                    seriesData[i] = tmpData.Average;//.toFixed(0);
                
            }
            

        }
        // console.log('seriesData', seriesData);
        return seriesData;
    }
    setOption(no, time, sApiUrl, xRange, dataRange) {
        
        fetch(sApiUrl)
        .then((response) => {
            return response.json() 
        })   
        .then((json) => {
            let chartOption = this.getOption();

            if (time == 'year')
                xRange = json.Data.map(x => x.Year);
            
            chartOption.xAxis[0].data = xRange;

            if (time == 'month' && dataRange) {
                let yearsrc = json.Data.map(x => x.Year);
                let years = [...new Set(yearsrc)];
                // console.log('years rc', yearsrc);
                // console.log('years', years);
                
                for(let i = 0; i<years.length; i++) {
                    chartOption.legend.data.push(years[i].toString());
                }

                for(let i = 0;i < dataRange.length;i++) {
                    if (i == 0) {
                        chartOption.series[0].name = dataRange[i].toString();
                        chartOption.series[0].data = this.getSeriesData(time, json, dataRange[i]);
                    }
                    else {
                        let seriesDataBase = {
                            name:'Phase',
                            type:'bar',
                            // stack: 'stack',
                            data: null,
                        };

                        seriesDataBase.name = dataRange[i].toString();
                        seriesDataBase.data = this.getSeriesData(time, json, dataRange[i]);
                        chartOption.series.push(seriesDataBase);
                    }
                }
                // console.log(no.toString() + '.' + time + ':', chartOption);
            
            } 
            else if (time == 'year') {
                // let years = json.Data.map(x => x.Year);
                chartOption.series[0].data = json.Data.map(x => x.Average);
            }
            else {
                chartOption.series[0].data = this.getSeriesData(time, json, dataRange);
            }

            // console.log(no.toString() + '.' + time + ':', chartOption.series[0].data);
            // console.log(no.toString() + '.' + time + ':', chartOption);
            this.setOptionState(no, chartOption);
        })
        .catch((error) => {
            let chartError = this.getOption();
            chartError.title = { text: error, x: 'center', y: 'center' };
    
            this.setOptionState(no, chartError);
            console.log(no.toString() + '.' + time + ':error:', error);
        });
    }
    setOptionState(no, chartOption) {
        switch(no) {
            case 1:
                this.setState({
                    loading1: false,
                    option1: chartOption
                });
                break;
            case 2:
                this.setState({
                    loading2: false,
                    option2: chartOption
                });
                break;                
            case 3:
                this.setState({
                    loading3: false,
                    option3: chartOption
                });
                break;
        }        
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
                                option={this.state.option1}
                                showLoading={this.state.loading1}
                                notMerge={true}
                                lazyUpdate={true}
                           />
                       </div>
                       <div className="flex_1">
                           <ReactEcharts
                                className="bar_chart"
                                option={this.state.option2}
                                showLoading={this.state.loading2}
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
