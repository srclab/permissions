import React from 'react';
import Navbar from './components/Navbar';
import LeftSidebar from "./components/LeftSidebar";
import Content from "./components/Content";

export default class App extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            page: 'permissions',
        }

        this.changePage = this.changePage.bind(this);

    }

    render() {
        return (
            <>
                <Navbar page={this.state.page} />
                <LeftSidebar page={this.state.page} changePage={this.changePage} />
                <Content page={this.state.page} />
            </>
        )
    }

    /**
     * Смена страницы.
     *
     * @param page
     */
    changePage(page) {
        this.setState({page: page});
    }
}