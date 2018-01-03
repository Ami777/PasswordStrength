import React, {Fragment} from "react";
import {
    Button,
    Textfield
} from "react-mdl";
import Loader from "./loader.jsx";
import PstrFramework from "../../pstrFramework/framework";
import {translate} from "react-i18next";

export default translate('translations')(class extends React.Component{
    state = {
        pwd : '',
        loader : <Loader type="indeterminate" description={this.props.t('loading')}/>,
    };

    handleBtnClick = async () => {
        const {pwd} = this.state;
        this.setState({
            pwd : '',
            loader : <Loader type="simple" />,
        }, async () => {
            //Important to do it here, as this will more likely leave input empty, for security reasons

            const results = await this.pstr.validatePassword(pwd);

            if (typeof this.props.onCheck === 'function'){
                this.props.onCheck(results);
            }
        });
    };

    render(){
        const {t} = this.props;
        return <div className="pwdInput">
            <Textfield
                onChange={e => this.setState({pwd : e.target.value })}
                value={this.state.pwd}
                label={t('password')}
                type="password"
                floatingLabel
                autoComplete="off"
            />
            <div className="text-center">
                <Button raised colored ripple onClick={this.handleBtnClick} disabled={this.state.pwd.trim() === ''}>
                    {t('check')}
                </Button>
            </div>
            {this.state.loader}
        </div>;
    }

    updatePreloadProgress = (filesLeft, filesTotal) => {
        const {t} = this.props;
        this.setState({
            loader : <Loader description={t('loadingExtData')} type="progress" max={filesTotal} curr={filesTotal-filesLeft}/>,
        });
    };

    componentDidMount(){
        this.pstr = new PstrFramework(this.updatePreloadProgress);
        this.pstr.preload().then(() => {
            this.setState({
                loader : null,
            });
        });
    }
})