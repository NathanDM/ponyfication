var React = require('react');
let Firebase = require('firebase');
let ReactFireMixin = require('reactfire');
/**
 * This class builds the react Application.
 *
 * @author $Author$
 */
var NotificationForm = React.createClass({
    mixins: [ReactFireMixin],
    getInitialState: function () {
        return {authorName : "",messageText :""};
    },

    componentWillMount: function () {
        var firebaseRef = new Firebase("https://torrid-heat-623.firebaseio.com/items");
        this.bindAsArray(firebaseRef.limitToLast(3), 'items');
    },

    render: function () {
        return (
            <form onSubmitt={this.handleSubmit}>

                <div className="group">
                    <input type="text" onChange={this.onAuthorChange} required/>
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Name</label>
                </div>

                <div className="group">
                    <input type="text" onKeyDown={this.onKeyDown} onChange={this.onMessageChange} required/>
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Message</label>
                </div>
            </form>
        );
    },

    onMessageChange: function (event) {
        this.setState({messageText: event.target.value});
    },

    onAuthorChange: function (event) {
        this.setState({authorName: event.target.value});
    },

    onKeyDown: function (event) {
        var charCode = event.keyCode || event.charCode;
        if (charCode === 13) {
            event.preventDefault();
            this.props.onToggle(event);
            this.handleSubmit(event);
        }
    },

    handleSubmit: function (event) {
        event.preventDefault();
        if (this.state.messageText && this.state.messageText.trim().length !== 0) {
            this.firebaseRefs['items'].push({
                id: Math.random(),
                author: this.state.authorName,
                content: this.state.messageText
            });
            this.setState({
                messageText: ''
            });
        }
    }
});

module.exports = NotificationForm;