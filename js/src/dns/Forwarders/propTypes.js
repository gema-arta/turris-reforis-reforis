/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import PropTypes from "prop-types";

const forwarderPropTypes = PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    ipaddresses: PropTypes.shape({
        ipv4: PropTypes.string,
        ipv6: PropTypes.string,
    }),
    tls_type: PropTypes.oneOf(["no", "hostname", "pin"]),
    tls_hostname: PropTypes.string,
    tls_pin: PropTypes.string,
});

export default forwarderPropTypes;
