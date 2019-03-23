/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from 'react';
import {ForisAPI} from "../api/api";
import NotificationsButton from "./NotificationsButton";
import NotificationsDropdown from "./NotificationsDropdown";


export default class Notifications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
            newNotification: false,
        }
    }

    componentDidMount() {
        this.loadNotifications();
        window.forisWS
            .subscribe('router_notifications')
            .bind('router_notifications', 'create', msg => {
                this.loadNotifications();
                this.setState({newNotification: true})
            })
    }

    loadNotifications() {
        ForisAPI.notifications.get()
            .then(data => {
                const nonDisplayedNotifications = data.notifications.filter(
                    notification => !notification.displayed
                );
                this.setState({notifications: nonDisplayedNotifications})
            });
    }

    dismissHandler = (notificationId) => {
        this.markNotificationAsDisplayed(notificationId);
        this.setState({
                notifications: this.state.notifications.filter((n) => n.id !== notificationId)
            }
        )
    };

    dismissAllHandler = (e) => {
        this.markNotificationsAsDisplayed(
            this.state.notifications.map(notification => notification.id)
        );
        this.setState({notifications: []})
    };

    markNotificationAsDisplayed(notificationId) {
        this.markNotificationsAsDisplayed([notificationId,]);
    }

    markNotificationsAsDisplayed(notificationIds) {
        const data = {ids: notificationIds};
        ForisAPI.notifications.post(data)
            .then(result => console.log(result));
    }


    render() {
        return <div id='notifications' className="dropdown btn-group">
            <NotificationsButton
                notificationsCount={this.state.notifications.length}
                newNotification={this.state.newNotification}

                disableNewNotification={e => this.setState({newNotification: false})}
            />
            <NotificationsDropdown
                notifications={this.state.notifications}

                dismissHandler={this.dismissHandler}
                dismissAllHandler={this.dismissAllHandler}
            />
        </div>
    }
}
