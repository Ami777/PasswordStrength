import React, {Fragment} from "react";
import {
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
    };

    handlePwdCheckResults = results => {
        this.setState({
            mainCard : <Results results={results} onBack={this.handleBackFromResults}/>
        })
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