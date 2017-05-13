import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

import {
  withRouter
} from 'react-router-dom';

import { connect } from 'react-redux';
import { addDays, getDateStringOnly } from '../utils/dateFunctions.js';
import { getDialogApiUrl } from '../utils/getConstants.js';

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            time : props.time,
            loading1: true,
            option1: {},
        };
        this.hostname = window.location.hostname;
    }

    getOption() {
        let xAxisDataBase = {
            type : 'category',
            boundaryGap : false,
            data : null
        };

        let seriesDataBase = {
            name:'Phase',
            type:'line',
            stack: 'stack',
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
                            type:'line',
                            stack: 'stack',
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

            sApiUrl = sApiUrlBase + "GetAvgGroupByTargetDate/electricity.totalpower.1.int/" + weekDateString[0] + "/" + weekDateString[6];
            this.setOption(1, time, sApiUrl, weekday, weekDateString); 
        }
        
        else if(time == 'month') {
            const yearToday = today.getFullYear();
            let years = [];
             
            for (let i = 2; i >= 0; i-- ) {
                years.push(yearToday - i);
            }
            const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            
            sApiUrl = sApiUrlBase + "GetAvgGroupByTargetMonth/electricity.totalpower.1.int/" + years[0] + "/" + years[years.length -1];
            this.setOption(1, time, sApiUrl, months, years); 
        } 

        else if (time == 'year') {
            sApiUrl = sApiUrlBase + "GetAvgGroupByTargetYear/electricity.totalpower.1.int/";
            this.setOption(1, time, sApiUrl);
        }

        this.setState({
            time : time,
            loading1: true,
            option1: this.getOption(),
        });
    }

    lineChart(){
        
        let {time} = this.state;

        var height = 420;

        return(
            <div className="flex_wrap detail_chart_wrap power">
                <div className="flex_1">
                    <ReactEcharts
                        className="line_chart"
                        option={this.state.option1}
                        showLoading={this.state.loading1}
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
        )
    }

    render(){
        let {time} = this.state;
        let {totalized_energ} = this.props;
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
        totalized_energ: state.reducers.electricityData.data.totalized_energ
    }
}

export default withRouter(connect(mapStateToProps)(App));
