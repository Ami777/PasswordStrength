import React, {Fragment} from "react";
import {
    Button,
    Card, CardActions, CardTitle, Icon, List, ListItem, ListItemContent,
} from "react-mdl";
import {translate} from "react-i18next";

export default translate('translations')(class extends React.Component{
    handleBackBtnClick = () => {
        if (typeof this.props.onBack === 'function'){
            this.props.onBack();
        }
    };

    render() {
        const {t} = this.props;
        const {severity} = this.props.results;
        const severities = ['ok', 'notice', 'warning', 'danger'];
        const icons = {
            ok : 'done_all',
            notice : 'done',
            warning : 'error',
            danger : 'warning',
        };
        const msgs = [...this.props.results.msgs].sort((a, b) => {
            return severities.indexOf(b.severity) - severities.indexOf(a.severity);
        });
        let description;
        switch (severity){
            case 'ok':
                description = t('result.ok');
                break;
            case 'notice':
                description = t('result.notice');
                break;
            case 'warning':
                description = t('result.warning');
                break;
            default:
                description = t('result.danger');
                break;
        }
        return <Card>
                <CardTitle expand style={{alignItems: 'flex-start', color: '#fff'}}>
                    <h2>
                        {t('home.title')}
                    </h2>
                </CardTitle>
                <CardActions border>
                    <div className={`results ${severity}`}>
                        <big><Icon name={icons[severity]} /> {description}</big>
                        <br/><small>{t('rememberAboutRules')}</small>
                    </div>
                    <List style={{width: '100%'}} className="results-details">
                        {msgs.map((msg, index) => (
                            <ListItem twoLine key={index}>
                                <ListItemContent avatar={icons[msg.severity]} subtitle={t('msgs.' + msg.msg.key, msg.msg.data)} className={msg.severity}>
                                    {t('severity.' + msg.severity)}
                                </ListItemContent>
                            </ListItem>
                        ))}
                    </List>
                </CardActions>
                <CardActions border className="text-center">
                    <Button raised colored ripple onClick={this.handleBackBtnClick}>
                        {t('goBack')}
                    </Button>
                </CardActions>
            </Card>;
    }
})