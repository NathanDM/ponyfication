var React = require('react');
let Firebase = require('firebase');
let ReactFireMixin = require('reactfire');
/**
 * This class builds the react Application.
 *
 * @author $Author$
 */
var ListItems = React.createClass({
    mixins: [ReactFireMixin],
    getInitialState: function () {
        return {}
    },

    componentWillMount: function () {
        var firebaseRef = new Firebase("https://torrid-heat-623.firebaseio.com/items");
        this.bindAsArray(firebaseRef.limitToLast(3), 'items');
    },

    componentWillUnmount: function () {

    },

    render: function () {
        return (
                <div className="wrapper">
                    {this.state.items.map((item) => {
                        return (
                            <div className="notification blue" key={item.id}>
                                <div className="info">
                                    <h1>{item.author}</h1>

                                    <p>{item.content}</p>
                                </div>
                                <div className="icon">
                                    <img src="../img/pony.png"/>
                                </div>
                            </div>
                        )
                    })}
                </div>
        );
    }
});

module.exports = ListItems;