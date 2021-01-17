import React from 'react';
import {withTranslation} from 'react-i18next'
import {connect} from 'react-redux'
import pages from "./Pages/pages";

class Content extends React.Component {
    render() {

        const page = this.props.app.get('page'),
            content_component = pages[page];

        return (
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                {content_component}
            </main>
        )
    }
}

function mapStateToProps(state) {
    return {
        app: state.get('app'),
    }
}

export default withTranslation('general')(connect(mapStateToProps)(Content));