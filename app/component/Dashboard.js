let React = require('react');
let Firebase = require('firebase');
let ReactFireMixin = require('reactfire');
let JenkinsList = require('./JenkinsApiListItems');

/**
 * This class builds the react Application.
 *
 * @author $Author$
 */
let Dashboard = React.createClass({
    mixins: [ReactFireMixin],
    propTypes: {
        collection: React.PropTypes.string
    },

    getInitialState: function () {
        return {teams: [], team: null}
    },
    getDefaultProps: function () {
        return {
            collection: "teams"
        };
    },
    componentWillMount: function () {
        let firebaseRef = new Firebase("https://torrid-heat-623.firebaseio.com/" + this.props.collection);
        this.bindAsArray(firebaseRef, this.props.collection);
    },

    componentWillReceiveProps(props){
        "use strict";
        let firebaseRef = new Firebase("https://torrid-heat-623.firebaseio.com/" + props.collection);
        this.bindAsArray(firebaseRef, props.collection);
    },

    //initFields : function () {
    //    let retval = {};
    //    const zeroItem = this.state[this.props.collection][0];
    //    for(let attr in zeroItem) {
    //        if (zeroItem.hasOwnProperty(attr)) {
    //            if (attr.startsWith("_")) {
    //                //Copy private value
    //                retval[attr] = zeroItem[attr];
    //            } else if (attr.startsWith('.')) {
    //                //don't touch firebase's values
    //            } else {
    //                //Init field with null value
    //                retval[attr] = null;
    //            }
    //        }
    //    }
    //
    //    return retval;
    //},

    render: function () {
        let additionalCard;
            if (this.props.collection === "teams") {

                additionalCard =  <div className="card">
                    <input type="input"
                           onChange={this.onMessageChange}
                           required/>

                    <div className="card-btn card-btn-add" onClick={this.addItem}><span className="card-text">add</span>
                    </div>
                </div>
            }
        return (
            <div>
                {this.state[this.props.collection].map((team, i) => {
                    let retval;
                    switch (team.component){
                        case "notification" :
                            retval =  <JenkinsList url={team.url} key={"dashItem_" + i}/>;
                            break;
                        default :
                            retval = <div className="card" onClick={this.onClick.bind(this,team.children, team.name)}><span
                                className="card-text">{team.name}</span></div>;

                    }
                    return retval;
                })}
                {additionalCard}
            </div>
        );
    },

    onMessageChange: function (event) {
        this.setState({messageText: event.target.value});
    },


    addItem: function (e) {
        if (this.state[this.props.collection][0] && this.state.messageText.length) {
            this.firebaseRefs[this.props.collection].push({
                name: this.state.messageText,
                children: this.state[this.props.collection][0].children
            });
        }
    },

    onClick: function (childrenCollection, actualCollection) {
        if (this.props.collection === "widgets") {
            childrenCollection = actualCollection + this.state.team;
        } else if (this.props.collection === "teams") {
            this.state.team = actualCollection;
        }
        this.props.onCollectionChange(childrenCollection);
    }
});

module.exports = Dashboard;