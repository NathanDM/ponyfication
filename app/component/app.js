let React = require('react');
let ListItems = require('./ListItems');
let RssListItems = require('./RssListItems');
let JenkinsApiListItems = require('./JenkinsApiListItems');
let MenuBtn = require('./MenuBtn');
let Dashboard = require('./Dashboard');

/**
 * This class builds the react Application.
 *
 * @author $Author$
 */
var App = React.createClass({
    getInitialState: function () {
      return {collection : "teams"};
    },
    render: function () {

        return (
            <div>
               <Dashboard onCollectionChange={this.onCollectionChange} collection={this.state.collection}/>
            </div>
        );
    },
    onCollectionChange: function (collection) {
        this.setState({collection: collection});
    }

});

module.exports = App;