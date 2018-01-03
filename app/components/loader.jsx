import React, {Fragment} from "react";
import {ProgressBar, Spinner} from "react-mdl";

export default class extends React.Component{
    render(){
        let loadingEl;

        switch(this.props.type){
            case 'simple':
                loadingEl = <Spinner />;
                break;
            case 'indeterminate':
                loadingEl = <ProgressBar indeterminate />;
                break;
            case 'progress':
                loadingEl = <ProgressBar progress={this.props.curr / this.props.max * 100} />;
                break;
            default:
                throw new Error('Invalid loader type!');
        }

        return <div className="loader">
            {loadingEl}
            <p>{this.props.description || ''}</p>
        </div>;
    }
}