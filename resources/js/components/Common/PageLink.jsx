import React from 'react';
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {changePage} from "../../redux/actions";

class PageLink extends React.Component {

    constructor(props) {

        super(props);

        this.changePage = this.changePage.bind(this);

    }

    /**
     * Change page.
     */
    changePage() {
        this.props.appActions.changePage(this.props.page, this.props.search, this.props.id);
    }

    render() {
        return <a className={"link "+this.props.class_name} role="button" onClick={this.changePage}>{this.props.children}</a>
    }

}

function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators({
            changePage
        }, dispatch),
    }
}

export default withTranslation('general')(connect(null, mapDispatchToProps)(PageLink));