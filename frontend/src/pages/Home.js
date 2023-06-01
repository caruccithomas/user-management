import React, { Fragment } from 'react';
import UsersTable from '../components/table/UsersTable';
import Navbar from '../layout/Navbar';

const Home = () => {

    return (
        <Fragment>
            <Navbar />
            <UsersTable />
        </Fragment>
    );
};

export default Home;