import React, { Component } from 'react';
import { connect } from 'react-redux';
import {updateNotice} from "../actions";

import {
  withRouter
} from 'react-router-dom';

import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            text: "",

            notices: [],
            active:null
        };
        this.hostname = window.location.hostname;
       
        this.getNoticeFromApi();
    }

    renderNotice(idx){
        let {dispatch} = this.props;
        let {notices} = this.state;

        if(notices[idx]){
            var notice = notices[idx];
                notice.idx = idx;
            this.setState({
                title: notice.Title,
                content: notice.Content,
                active: idx
            });
            // console.log('notice:', notice);

            dispatch( updateNotice(notice) );
        }

    }
    getNoticeFromApi(){
        var self = this;
        // console.log('notice.idx', this.props.notice.idx);
        var noticeIdx = this.props.notice.idx ? this.props.notice.idx : 0;
        
        axios({
            method:'get',
            url: `http://${this.hostname}:8080/api/notices/0/7`,
            responseType:'json'
        })
        .then(function(response) {
            if(response.status == 200){
                var data = response.data.Data;
                if( data && Array.isArray(data) ){
                    self.setState({
                        notices: data
                    });

                    self.renderNotice(noticeIdx);
                }
            }
        });

    }
    
    closeWindow() {
        var ws = new WebSocket(`ws://${this.hostname}:8181/`);
        this.send = function (message, callback) {
            this.waitForConnection(function () {
                ws.send(message);
                ws.close();
                if (typeof callback !== 'undefined') {
                    callback();
                }
            }, 1000);
        };

        this.waitForConnection = function (callback, interval) {
            if (ws.readyState === 1) {
                callback();
            } else {
                var that = this;
                // optional: implement backoff for interval here
                setTimeout(function () {
                    that.waitForConnection(callback, interval);
                }, interval);
            }
        };
        
        if (confirm('Close the window?')) {
            // window.open('', '_self', ''); //bug fix
            // window.close();
            // open(location, '_self').close();
            // alert(`ws://${this.hostname}:8181/`);
           this.send('kill-chrome');
        }
    }

    render(){
        let {notices, active} = this.state;

        return(
            <div>
                <h2 className="sub_title notice" onClick={this.closeWindow.bind(this)}>Notice</h2>
                {/*<button className="btn" onClick={this.openModal.bind(this, true)}>open</button>*/}

                <div className="flex_wrap detail_chart_wrap notice">
                    <div className="box">
                        <h3 className="title">
                            {this.state.title}
                        </h3>
                        <div className="message_content">
                            { ReactHtmlParser(this.state.content) }
                        </div>
                    </div>
                    <ul className="list">
                        {
                            notices.map((row, idx) => {
                                return (
                                    <li key={idx}>
                                        <button className={'btn ' + (idx == active?'active':'')} onClick={this.renderNotice.bind(this, idx)}>
                                            <span>{row.Title}</span>
                                        </button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        notice: state.reducers.noticeData.data
    }
}
export default withRouter(connect(mapStateToProps)(App));
