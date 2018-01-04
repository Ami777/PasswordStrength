import React, {Fragment} from "react";
import {
    Card, CardActions, CardTitle,
} from "react-mdl";
import PwdInput from "./pwdInput.jsx";
import {translate} from "react-i18next";

export default translate('translations')(class extends React.Component{
    render() {
        const {t} = this.props;
        return <Card className="main">
                <CardTitle expand style={{alignItems: 'flex-start', color: '#fff'}}>
                    <h2>
                        {t('home.title')}
                    </h2>
                </CardTitle>
                <p dangerouslySetInnerHTML={{__html: t('home.welcome')}}/>
                <p dangerouslySetInnerHTML={{__html: t('home.description')}}/>
                <CardActions border>
                    <PwdInput onCheck={this.props.onCheck}/>
                </CardActions>
            </Card>;
    }
})