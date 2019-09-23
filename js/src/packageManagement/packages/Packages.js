/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import PropTypes from "prop-types";

import API_URLs from "common/API";
import { Alert, ForisURLs, ForisForm } from "foris";

import LanguageForm from "./LanguageForm";
import PackagesForm from "./PackagesForm";

export default function Packages() {
    return (
        <>
            <h1>{_("Packages")}</h1>
            <p>
                {_(`
Apart from the standard installation, you can optionally select bundles of additional software that'd be installed on 
the router. This software can be selected from the following list. Please note that only software that is part of 
TurrisOS or that has been installed from a package list is maintained by automatic updates system. Software that has 
been installed manually or using opkg is not affected.
        `)}
            </p>
            <ForisForm
                forisConfig={{ endpoint: API_URLs.packages }}
                prepData={prepData}
                prepDataToSubmit={prepDataToSubmit}
                validator={validator}
            >
                <DisableIfUpdaterIsDisabled>
                    <PackagesForm />
                    <LanguageForm />
                </DisableIfUpdaterIsDisabled>
            </ForisForm>
        </>
    );
}

DisableIfUpdaterIsDisabled.propTypes = {
    formData: PropTypes.shape({ enabled: PropTypes.bool.isRequired }),
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

export function DisableIfUpdaterIsDisabled({ children, formData, ...props }) {
    const isDisabled = !formData.enabled;
    const childrenWithFormProps = React.Children.map(
        children,
        (child) => React.cloneElement(child, { ...props, formData, disabled: isDisabled }),
    );

    if (!isDisabled) return childrenWithFormProps;

    return (
        <>
            <DisabledUpdaterAlert />
            <div className="text-muted">
                {childrenWithFormProps}
            </div>
        </>
    );
}

DisabledUpdaterAlert.propTypes = {
    formData: PropTypes.shape({ enabled: PropTypes.bool.isRequired }),
};

function DisabledUpdaterAlert() {
    const message = _(
        `Please enable <a href="${ForisURLs.packageManagement.updateSettings}">automatic updates</a> to manage packages and languages.`,
    );
    return (
        <Alert type="warning">
            <span dangerouslySetInnerHTML={{ __html: message }} />
        </Alert>
    );
}

function prepData(formData) {
    formData.user_lists = formData.user_lists
        .filter((_package) => !_package.hidden);
    return formData;
}

function prepDataToSubmit(formData) {
    const packages = formData.user_lists
        .filter((_package) => _package.enabled)
        .map((_package) => _package.name);

    const languages = formData.languages
        .filter((language) => language.enabled)
        .map((language) => language.code);

    return { languages, user_lists: packages };
}

// Hack to disable submit button
function validator(formData) {
    if (!formData.enabled) return { enabled: true };
    return null;
}