/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from 'react';
import {fireEvent, getByLabelText, render, wait} from 'customTestRender';

import {mockedWS} from 'mockWS';
import mockAxios from 'jest-mock-axios';
import GuestNetwork from '../GuestNetwork';
import guestNetworkFixture from './__fixtures__/guestNetwork';
import {createPortalContainer} from 'portal';


describe('<GuestNetwork/>', () => {
    let guestNetworkContainer;

    beforeEach(async () => {
        createPortalContainer('guest_network_container');

        const mockWebSockets = new mockedWS();
        const {container} = render(<GuestNetwork ws={mockWebSockets}/>);
        mockAxios.mockResponse({data: guestNetworkFixture()});
        await wait(() => getByLabelText(container, 'Enable'));
        guestNetworkContainer = container
    });

    it('Snapshot disabled.', () => {
        expect(guestNetworkContainer).toMatchSnapshot();
    });

    it('Snapshot enabled.', () => {
        fireEvent.click(getByLabelText(guestNetworkContainer, 'Enable'));
        expect(guestNetworkContainer).toMatchSnapshot();
    });

    it('Snapshot enabled DHCP.', () => {
        fireEvent.click(getByLabelText(guestNetworkContainer, 'Enable'));
        fireEvent.click(getByLabelText(guestNetworkContainer, 'Enable DHCP'));
        expect(guestNetworkContainer).toMatchSnapshot();
    });

    it('Snapshot enabled QoS.', () => {
        fireEvent.click(getByLabelText(guestNetworkContainer, 'Enable'));
        fireEvent.click(getByLabelText(guestNetworkContainer, 'Enable QoS'));
        expect(guestNetworkContainer).toMatchSnapshot();
    });
});
