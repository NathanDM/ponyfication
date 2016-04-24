var React = require('react');
let ListItems = require('./ListItems');
let MenuBtn = require('./MenuBtn');
/**
 * This class builds the react Application.
 *
 * @author $Author$
 */
var App = React.createClass({
    render: function () {
        return (
            <div>
                <ListItems></ListItems>
                <MenuBtn></MenuBtn>
            </div>
        );
    }
});

module.exports = App;