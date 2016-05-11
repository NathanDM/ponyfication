"use strict";
let React = require('react');
let request = require('request');


/**
 * This class builds the react Application.
 *
 * @author $Author$
 */
let ListItems = React.createClass({

    propTypes: {
        color: React.PropTypes.string,
        url: React.PropTypes.string
    },

    getDefaultProps: function () {
        return {
            color: 'blue',
            url: "http://frparpicdbx:8080/view/my3D%20VVM/job/VVM-DEV-DEPLOY/lastBuild/api/json"
        };
    },

    getInitialState: function () {
        return {itemList: []}
    },

    componentWillMount: function () {
        this.callWS(this.props.url);
    },

    componentWillReceiveProps: function (nextProps) {
        if (nextProps.url !== this.props.url) {
            this.callWS(this.props.url);
        }
    },

    getColor: function (item) {
        switch (item) {
            case "SUCCESS" :
                return "green";
            case "UNKNOWN":
                return "blue";
            case "UNSTABLE":
                return "orange";
            case "FAILING":
                return "red";
            case "DISABLED":
                return "purple";
            default :
                return "purple";
        }

    },

    callWS: function (url) {
        const options = {
            url: url,
            headers: {

            }
        };
        let that = this;
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                that.state.itemList.push(JSON.parse(body));
                that.setState({itemList: that.state.itemList});

            }
        });
    },
    render: function () {
        return (
            <div className="wrapper">
                {this.state.itemList.map((item, i) => {

                    let color = this.getColor(item.result);

                    return (
                        <div className={"notification " + color} key={"item_" + i}>
                            <div className="info">
                                <h1>{item.fullDisplayName} ( {item.result} ) </h1>

                                <p>{item.actions[0].causes[0].userName}</p>
                            </div>
                            <div className="icon">
                                <img src="img/pony3.png"/>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
});

module.exports = ListItems;