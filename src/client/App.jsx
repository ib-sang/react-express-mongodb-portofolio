import React, { Component } from 'react';
import {BrowserRouter, Route, Router, Switch} from 'react-router-dom';

// Styles
import './main.scss';

// Pages
import AbouteMePage from './pages/AboutMePage';
import ContactMePage from './pages/ContactMePage';
import HomePage from './pages/HomePage';
import ServicePage from './pages/ServicePage';
import DashboardPage from './pages/DashboardPage';
import ManagementPage from './pages/ManagementPage';

// Laouts
import AdminLayout from './layouts/AdminLayout';
import MainLayout from './layouts/MainLayout';
import GestLayout from './layouts/GestLayout';


const App =() => {

    return (
        <BrowserRouter>
            <Switch>
                

                <Route  exact path='/' render = {() => (
                    <MainLayout>
                        <HomePage/>
                        <div>un autre</div>
                    </MainLayout>
                )} />

                <Route path='/aboutme' render = { () => (
                    <MainLayout>
                        <AbouteMePage/>
                    </MainLayout>
                )}/>

                <Route path='/services' render = { () => (
                    <MainLayout>
                        <ServicePage/>
                    </MainLayout>
                )}/>

                <Route path='/contactme' render = { () => (
                    <MainLayout>
                        <ContactMePage/>
                    </MainLayout>
                )}/>

                <Route path = '/dashbord' render = { () => (
                    <AdminLayout>
                        <DashboardPage/>
                    </AdminLayout>
                )}
                
                />

                <Route path = '/management' render = { () => (
                    <GestLayout>
                        <ManagementPage/>
                    </GestLayout>
                ) }
                
                />

                
            </Switch>
        </BrowserRouter>
        
    );
}

export default App;