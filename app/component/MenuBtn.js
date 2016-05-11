"use strict";

let React = require('react');
let NotificationForm = require('./NotificationForm');


let MenuBtn = React.createClass({
    getInitialState: function () {
        return {isOpen: false}
    },

    getDefaultProps: function () {
        return {
            onClickItem: () => {console.log("nolistener on this btn")}
        };
    },

    render: function () {
        var wrapperClass = "menu-wrapper",
            overlayClass = "overlay",
            overlayIcon = this.state.isOpen ? "-" : "+";

        overlayClass += this.state.isOpen ? " on-overlay" : "";
        wrapperClass += this.state.isOpen ? " opened" : "";

        return (
            <div className="corner-menu">
                <button onClick={this._onToggle}>{overlayIcon}</button>

                <section className={wrapperClass}>
                    <ul>
                        <li><a onClick={this._onClick.bind(this,1)}><span> <i className="fa fa-comment-o"></i></span></a></li>
                        <li><a onClick={this._onClick.bind(this,2)}><span> <i className="fa fa-server"></i></span></a></li>
                        <li><a onClick={this._onClick.bind(this,3)}><span> <i className="fa fa-gitlab"></i></span></a></li>
                    </ul>
                </section>

                <div className={overlayClass}>
                    <NotificationForm onToggle={this._onToggle}></NotificationForm>
                </div>
            </div>
        );
    },
    _onClick: function (idx, e) {
        this.props.onClickItem(idx);
        this._onToggle(e);
    },
    _onToggle: function (event) {
        event.stopPropagation();
        this.setState({isOpen: !this.state.isOpen});
    }
});

module.exports = MenuBtn;