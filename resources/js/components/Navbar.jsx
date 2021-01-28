import React from 'react';
import {withTranslation} from 'react-i18next'

class Navbar extends React.Component {
    render() {
        const back_url = document.getElementsByName('back-url');
        return (
            <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
                <a className="navbar-brand col-sm-3 col-md-2 mr-0" role="button">{this.props.t('view.navbar_title')}</a>
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                        <a className="nav-link" href={back_url}>{this.props.t('view.back_button')}</a>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default withTranslation('general')(Navbar);