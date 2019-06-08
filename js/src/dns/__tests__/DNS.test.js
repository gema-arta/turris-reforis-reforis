/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from 'react';
import {render, fireEvent, getByLabelText, wait} from 'customTestRender';

import {dnsFixture} from './__fixtures__/dns';
import {mockedWS} from 'mockWS';
import mockAxios from 'jest-mock-axios';

import DNS from '../DNS';


describe('<DNS/>', () => {
    let dnsContainer;
    beforeEach(async () => {
        const mockWebSockets = new mockedWS();
        const {container} = render(<DNS ws={mockWebSockets}/>);
        mockAxios.mockResponse({data: dnsFixture()});
        await wait(() => getByLabelText(container, 'Use forwarding'));
        dnsContainer = container;
    });

    it('Test with snapshot.', () => {
        expect(dnsContainer).toMatchSnapshot()
    });

    it('Test with snapshot forwarding.', () => {
        fireEvent.click(getByLabelText(dnsContainer, 'Use forwarding'));
        expect(dnsContainer).toMatchSnapshot()
    });

    it('Test with snapshot DHCP.', () => {
        fireEvent.click(getByLabelText(dnsContainer, 'Enable DHCP clients in DNS'));
        expect(dnsContainer).toMatchSnapshot()
    });
});
