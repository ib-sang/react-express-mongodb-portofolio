import React from 'react';
import {Route, Switch} from 'react-router-dom';

// Styles
import './main.scss';

// Pages
import AbouteMePage from './pages/AboutMePage';
import ContactMePage from './pages/ContactMePage';
import HomePage from './pages/HomePage';
import ServicePage from './pages/ServicePage';
import ManagementPage from './pages/ManagementPage';
// Admin pages
import DashboardPage from './pages/admin/DashboardPage';
import SignInPage from './pages/admin/SignInPage';

// Laouts
import AdminLayout from './layouts/AdminLayout';
import MainLayout from './layouts/MainLayout';
import GestLayout from './layouts/GestLayout';
import AdminSignLayout from './layouts/AdminSignLayout';

// Auth
import WithAdminAuth from "./hoc/WithAdminAuth";


const App =() => {

    return (
        <Switch>   

            <Route  exact path='/' render = {() => (
                <MainLayout>
                    <HomePage/>
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

            <Route path = '/dashboard' render = { () => (
                <AdminLayout>
                    <DashboardPage/>
                </AdminLayout>
            )}/>

            <Route path = '/management' render = { () => (
                <GestLayout>
                    <ManagementPage/>
                </GestLayout>
                ) }
                    
            />

            <Route path='/signin' render = { () => (
                <AdminSignLayout>
                    <SignInPage/>
                </AdminSignLayout>
            )}/>

            <Route exact path = '/ibfolio-sansoftic'
                render = {()=>(
                    <WithAdminAuth>
                        <AdminLayout>
                            <DashbordPage/>
                        </AdminLayout>
                    </WithAdminAuth>
                )}
                    
            />

                    
        </Switch>
        
        
    );
}

export default App;