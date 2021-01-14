import React from 'react';
import {withTranslation} from 'react-i18next'

class Content extends React.Component {
    render() {
        return (
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                {this.props.page}
            </main>
        );
    }
}

export default withTranslation('general')(Content);