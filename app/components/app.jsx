import React, {Fragment} from "react";
import {
    Card,
    CardTitle,
    Footer, FooterLinkList, FooterSection, Header, Layout, Navigation
} from "react-mdl";
import Home from "./home.jsx";
import Results from "./results.jsx";
import LangSelector from "./langSelector.jsx";
import {translate} from "react-i18next";

export default translate('translations')(class extends React.Component{
    _genHomeCard = () => {
        return <Home onCheck={r => this.handlePwdCheckResults(r)}/>;
    };

    state = {
        mainCard : this._genHomeCard(),
    };

    handleBackFromResults = () => {
        this.setState({
            mainCard : this._genHomeCard(),
        });
        window.scrollTo(0,0);
    };

    handlePwdCheckResults = results => {
        this.setState({
            mainCard : <Results results={results} onBack={this.handleBackFromResults}/>
        });
        window.scrollTo(0,0);
    };

    render() {
        const { t, i18n } = this.props;

        return <Fragment>
            <div style={{}}>
                <Layout fixedHeader>
                    <Header title={<strong>{t('title')}</strong>}>
                        <Navigation>
                            <LangSelector/>
                        </Navigation>
                    </Header>
                </Layout>
            </div>

            {this.state.mainCard}

            <Card>
                <CardTitle expand style={{alignItems: 'flex-start', color: '#fff'}}>
                    <h2>
                        {t('rules.title')}
                    </h2>
                </CardTitle>
                <p>
                    {t('rules.description')}
                    <ul>
                        <li>
                            {t('rules.rule.sample')}
                        </li>
                        <li>
                            {t('rules.rule.different')}
                        </li>
                        <li>
                            {t('rules.rule.change')}
                        </li>
                        <li>
                            {t('rules.rule.doNotStore')}
                        </li>
                        <li>
                            {t('rules.rule.hardToGuess')}
                        </li>
                        <li>
                            {t('rules.rule.chars')}
                        </li>
                        <li>
                            {t('rules.rule.notSimple')}
                        </li>
                        <li>
                            {t('rules.rule.dontTell')}
                        </li>
                    </ul>
                </p>
            </Card>

            <Footer size="mini">
                <FooterSection type="left" logo={t('title')}>
                    <FooterLinkList>
                        <a href="htts://www.safelly.com">{t('safellyName')}</a>
                        <a href="https://github.com/Ami777/PasswordStrength">{t('gitHubRepo')}</a>
                    </FooterLinkList>
                </FooterSection>
            </Footer>
        </Fragment>;
    }
})