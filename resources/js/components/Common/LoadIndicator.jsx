import React from 'react';
import {withTranslation} from "react-i18next";

class LoadIndicator extends React.Component {
    render() {
        return this.props.error ? <div className="alert alert-danger">{this.props.error}</div> : <div className="alert alert-primary">{this.props.t('view.loading')}</div>
    }
}

export default withTranslation('general')(LoadIndicator);