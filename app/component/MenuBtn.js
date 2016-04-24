var React = require('react');
var NotificationForm = require('./NotificationForm');


var MenuBtn = React.createClass({
    getInitialState: function () {
        return {isOpen: false}
    },

    render: function () {
        var wrapperClass = "menu-wrapper",
            overlayClass = "overlay",
            overlayIcon = this.state.isOpen ? "-" : "+";

        overlayClass += this.state.isOpen ? " on-overlay" : "";
        wrapperClass += this.state.isOpen ? " opened" : "";

        return (
            <div className="corner-menu">
                <button onClick={this.onToggle}>{overlayIcon}</button>

                <section className={wrapperClass}>
                    <ul>
                        <li><a onClick={this.clickAdd}><span> <i className="fa fa-film"></i></span></a></li>
                        <li><a onClick={this.clickEdit}><span> <i className="fa fa-play-circle"></i></span></a></li>
                        <li><a onClick={this.clickRemove}><span> <i className="fa fa-map-marker"></i></span></a></li>
                    </ul>
                </section>

                <div className={overlayClass}>
                    <NotificationForm onToggle={this.onToggle}></NotificationForm>
                </div>
            </div>
        );
    },
    clickAdd: function (event) {
        event.stopPropagation();
    },
    clickEdit: function (event) {
        event.stopPropagation();
    },
    clickRemove: function (event) {
        event.stopPropagation();
    },
    onToggle: function (event) {
        event.stopPropagation();
        this.setState({isOpen: !this.state.isOpen});
    }
});

module.exports = MenuBtn;