"use strict";

let React = require('react');
let Firebase = require('firebase');
let RssFeedParser = require('../mixin/RssFeedParser.mixin');


/**
 * This class builds the react Application.
 *
 * @author $Author$
 */
var ListItems = React.createClass({
    mixins: [RssFeedParser],

    propTypes: {
        color: React.PropTypes.string,
        rssUrl: React.PropTypes.string
    },

    getDefaultProps: function () {
        return {
            color: 'blue',
            rssUrl : "http://frparpicdbx:8080/view/my3D%20VVM/job/VVM-DEV-DEPLOY/rssAll"
        };
    },

    getInitialState: function () {
        return {feedItems: []}
    },

    componentWillMount: function () {
        this.readRss(this.props.rssUrl);
    },

    componentWillReceiveProps : function(nextProps) {
        this.readRss(nextProps.rssUrl);
    },

    render: function () {
        return (
            <div className="wrapper">
                {this.state.feedItems.map((item,i) => {
                    return (
                        <div className={"notification " + this.props.color} key={"rssItem_" + i}>
                            <div className="info">
                                <h1>{item.title}</h1>

                                <p>{item.meta.title}</p>
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