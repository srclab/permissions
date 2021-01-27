import React from 'react'
import PropTypes from 'prop-types'
import {withTranslation} from "react-i18next";

class PreloaderButton extends React.Component {

    render() {

        let {is_loading, type, className, onClick} = this.props;

        return (
            <button type={type} className={className} onClick={onClick}>
                {
                    is_loading ?
                    (
                        <>
                            <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" />
                        </>
                    )
                    :
                    this.props.children
                }
            </button>
        )
    }
}

PreloaderButton.defaultProps = {
    is_loading: false
};

PreloaderButton.propTypes = {
    is_loading: PropTypes.bool,
    button_text: PropTypes.string
};

export default withTranslation('general')(PreloaderButton);