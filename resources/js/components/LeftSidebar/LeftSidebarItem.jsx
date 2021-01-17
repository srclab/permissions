import React from 'react';
import {withTranslation} from 'react-i18next'
import PageLink from "../Common/PageLink";
import {connect} from "react-redux";

class LeftSidebarItem extends React.Component {
    render() {

        const page = this.props.app.get('page');

        return (
            <li className="nav-item">
                <PageLink class_name={page === this.props.target_page ? "nav-link active" : "nav-link"} page={this.props.target_page}>
                    {this.props.t('view.'+this.props.target_page)}
                </PageLink>
            </li>
        );
    }
}

function mapStateToProps(state) {
    return {
        app: state.get('app'),
    }
}

export default withTranslation('general')(connect(mapStateToProps)(LeftSidebarItem));