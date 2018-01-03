import React, {Fragment} from "react";
import {} from "react-mdl";
import {DIRECTORY_URL_PREFIX} from "../config/config";
import { translate, Trans } from 'react-i18next';

const LANGUAGES = {
    en : 'English',
    pl : 'j. polski',
};

export default translate('translations')(class extends React.Component{
    render(){
        const { i18n } = this.props;
        const langs = Object.keys(LANGUAGES).map(lang => (
            <a href="javascript:;" key={lang} className={"flag " + (lang === i18n.language ? 'selected' : '')} onClick={e => this.handleLangChange(lang)}>
                <img src={DIRECTORY_URL_PREFIX + `locales/${lang}/flag.png`} alt={LANGUAGES[lang]} title={LANGUAGES[lang]}/>
            </a>
        ));

        return <Fragment>
            {langs}
        </Fragment>;
    }

    handleLangChange = (lang) => {
        const { i18n } = this.props;
        i18n.changeLanguage(lang);
    };
})