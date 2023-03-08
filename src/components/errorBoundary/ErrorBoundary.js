import {Component} from 'react';
import {ErrorMessage} from "../errorMessage/ErrorMessage.js";

export class ErrorBoundary extends Component {
    state = {
        error: false,
    }

    componentDidCatch(error, errorMessage) {
        console.log(error, errorMessage);
        this.setState({error: true});
    }

    render () {
        if (this.state.error === true) {
            return <ErrorMessage/>
        }
        return  this.props.children;
    }
}