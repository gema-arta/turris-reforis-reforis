/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Redirect, Switch } from "react-router";
import PropTypes from "prop-types";

import { REFORIS_URL_PREFIX } from "foris";
import { Portal } from "foris";
import RouterStateHandler from "routerStateHandler/RouterStateHandler";
import Navigation from "navigation/Navigation";

import TopBar from "./TopBar";
import RouteWithSubRoutes from "./routing";
import getPages from "./pages";
import { REDIRECT_404_PAGE } from "./constants";

Main.propTypes = {
    ws: PropTypes.object.isRequired,
};

export default function Main({ ws }) {
    const pages = getPages();
    return (
        <BrowserRouter basename={REFORIS_URL_PREFIX}>
            <Portal containerId="navigation-container">
                <Navigation pages={pages} />
            </Portal>
            <Portal containerId="topbar-container">
                <TopBar ws={ws} />
            </Portal>

            <Switch>
                {pages.map((route, i) => <RouteWithSubRoutes key={i} ws={ws} {...route} />)}
                <Redirect to={REDIRECT_404_PAGE} />
            </Switch>
        </BrowserRouter>
    );
}
