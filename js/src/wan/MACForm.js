/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import Select from "../bootstrap/Select";

export default class MACForm extends React.PureComponent {
    onFormChange = (event) => {
        //    TODO:
    };

    render() {
        // const errors = this.props.errors ? this.props.errors : {};

        // const wanFields = this.props.enabled ? (
        //     <div>
        //
        //     </div>
        // ) : null;

        return (
            <>
                {/*<Select*/}
                    {/*name='wan_type'*/}
                    {/*label={_('IPv4 protocol')}*/}
                    {/*value={this.props.wan_type}*/}
                    {/*choices={WAN_CHOICES}*/}
                    {/*disabled={this.props.disabled}*/}
                    {/*onChange={this.onFormChange}*/}
                {/*/>*/}
                {/*{macFields}*/}
            </>
        );
    }
}