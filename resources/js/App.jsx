import React from 'react';
import Navbar from './components/Navbar';
import LeftSidebar from "./components/LeftSidebar/LeftSidebar";
import Content from "./components/Content";

export default class App extends React.Component {
    render() {
        return (
            <>
                <Navbar />
                <LeftSidebar />
                <Content />
            </>
        )
    }
}