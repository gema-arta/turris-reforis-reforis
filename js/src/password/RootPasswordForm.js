/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from 'react';
import propTypes from 'prop-types'

import {ForisURLs} from '../common/constants';
import PasswordInput from '../common/bootstrap/PasswordInput';
import SubmitButton from '../formContainer/SubmitButton';
import {FORM_STATES} from '../formContainer/hooks';

RootPasswordForm.propTypes = {
    formData: propTypes.shape(
        {newRootPassword: propTypes.string}
    ).isRequired,
    formState: propTypes.oneOf(
        Object.keys(FORM_STATES).map(key => FORM_STATES[key])
    ).isRequired,
    formErrors: propTypes.shape({}),
    setFormValue: propTypes.func.isRequired,
    postRootPassword: propTypes.func.isRequired,
};

export default function RootPasswordForm({formData, formState, formErrors, setFormValue, postRootPassword,...props}) {
    return <form onSubmit={postRootPassword}>
        <h4>{_('Advanced administration (root) password')}</h4>
        <p
            dangerouslySetInnerHTML={{
                __html: babel.format(`
                            In order to access the advanced configuration options which are not available here, you must
                            set the root user\'s password. The advanced configuration options can be managed either 
                            through the <a href="%s">LuCI web interface</a> or via SSH.
                    `, ForisURLs.luci)
            }}
        />
        <PasswordInput
            withEye={true}
            label={_('New advanced administration password')}
            value={formData.newRootPassword}
            error={formErrors.newRootPassword}

            onChange={setFormValue(
                value => ({newRootPassword: {$set: value}})
            )}

            {...props}
        />
        <SubmitButton
            state={formState}
            disabled={!!formErrors.newRootPassword}
        />
    </form>
}