import React from 'react';
import LeftSidebarItem from "./LeftSidebarItem";

export default class LeftSidebar extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                        <div className="sidebar-sticky">
                            <ul className="nav flex-column">
                                {/*todo вынести в конфиг*/}
                                <LeftSidebarItem page={this.props.page} target_page="permissions" changePage={this.props.changePage} />
                                <LeftSidebarItem page={this.props.page} target_page="groups" changePage={this.props.changePage} />
                                <LeftSidebarItem page={this.props.page} target_page="users" changePage={this.props.changePage} />
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        );
    }
}