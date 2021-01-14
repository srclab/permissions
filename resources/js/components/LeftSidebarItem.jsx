import React from 'react';
import {withTranslation} from 'react-i18next'

class LeftSidebarItem extends React.Component {
    render() {
        return (
            <li className="nav-item">
                <a className={this.props.page === this.props.target_page ? "nav-link active" : "nav-link"} role="button" onClick={() => this.props.changePage(this.props.target_page)}>{this.props.t('view.'+this.props.target_page)}</a>
            </li>
        );
    }
}

export default withTranslation('general')(LeftSidebarItem);