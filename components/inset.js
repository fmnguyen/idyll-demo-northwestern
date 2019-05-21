const React = require('react');

class Inset extends React.PureComponent {
    render() {
        const {
            idyll,
            hasError,
            updateProps,
            ...props
        } = this.props;


        return ( <
            div className = "inset" > {
                this.props.children
            } <
            /div>
        );
    }
}

module.exports = Inset;