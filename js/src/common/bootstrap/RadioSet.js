/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from 'react';
import propTypes from 'prop-types';
import {useUID} from 'react-uid/dist/es5/index';

import {formFieldsSize} from './constants';


RadioSet.propTypes = {
    /** Name attribute of the input HTML tag.*/
    name: propTypes.string.isRequired,
    /** RadioSet label .*/
    label: propTypes.string,
    /** Choices .*/
    choices: propTypes.arrayOf(propTypes.shape({
        /** Choice lable .*/
        label: propTypes.string.isRequired,
        /** Choice value .*/
        value: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
    })).isRequired,
    /** Initial value .*/
    value: propTypes.string,
    /** Help text message .*/
    helpText: propTypes.string,
};

export default function RadioSet({name, label, choices, value, helpText, ...props}) {
    const uid = useUID();
    const radios = choices.map((choice, key) =>
        <Radio
            id={`${name}-${key}`}
            key={key}
            name={name}
            label={choice.label}
            value={choice.value}
            helpText={choice.helpText}
            checked={choice.value === value}

            {...props}
        />
    );

    return <div className={`form-group ${formFieldsSize}`} style={{marginBottom: '1rem'}}>
        {label ?
            <label className='form-control-label col-12' htmlFor={uid} style={{paddingLeft: '0'}}>
                {label}
            </label>
            : null}
        {radios}
        {helpText ? <small className="form-text text-muted">{helpText}</small> : null}
    </div>;
}

Radio.propTypes = {
    label: propTypes.string.isRequired,
    id: propTypes.string.isRequired,
};

function Radio({label, id, helpText, ...props}) {
    return <>
        <div className='form-check form-check-inline'>
            <input
                id={id}
                className='form-check-input'
                type='radio'

                {...props}
            />
            <label className='form-check-label' htmlFor={id}>{label}</label>
        </div>
        {helpText ? <small className="form-text text-muted">{helpText}</small> : null}
    </>
}
