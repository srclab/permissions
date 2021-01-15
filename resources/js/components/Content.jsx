import React from 'react';
import {withTranslation} from 'react-i18next'
import Permissions from "./Permissions";
import Groups from "./Groups";
import Users from "./Users";

class Content extends React.Component {
    render() {

        const content_component = this.props.page === 'permissions' ? <Permissions /> : (this.props.page === 'groups' ? <Groups /> : <Users />);

        return (
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                {content_component}
            </main>
        );
    }
}

export default withTranslation('general')(Content);