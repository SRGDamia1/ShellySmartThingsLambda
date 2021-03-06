'use strict';

const log = require('../local/log');
// const db = require('../local/db');
const shelly = require('../api/shelly');
const util = require('../api/util');

const config = require('config');
const appName = config.get('connector.appName');
// const shellyOauthEndpoint = config.get('shelly.oauthEndpoint');
// const shellyClientId = config.get('shelly.clientId');

/**
 * CONFIGURATION lifecycle event handling
 */
module.exports = {

    /**
     * Return scopes and other data about this app
     */
    initialize: function (configurationData, callback) {
        let config = {
            initialize: {
                name: 'Shelly Cloud Connector',
                description: 'Creates Shelly Cloud devices in SmartThings',
                id: "app",
                permissions: ['i:deviceprofiles', 'r:devices:*', 'w:devices:*', 'x:devices:*', 'r:locations:*'],
                firstPageId: 'mainPage'
            }
        };
        log.response(callback, { statusCode: 200, configurationData: config });
    },

    /**
     * Return the configuration page for the app - the link to log into Shelly
     */
    page: function (configurationData, callback) {
        noConfigNeeded(configurationData, callback);
        // if (shellyClientId) {
        //     if (state && state.shellyAccessToken) {
        //         // Authenticated, display page to select location
        //         locationsPage(configurationData, callback)
        //     }
        // }
        // else {
        //     // No client ID. Prompt for direct entry of access token
        //     tokenPage(configurationData, callback);
        // }
    }
};

/**
 * An empty page with completed configuration
 */
function noConfigNeeded(configurationData, callback) {
    let connectorAppId = configurationData.installedAppId;
    let configPage = {
        page: {
            pageId: 'mainPage',
            name: 'All Configuration Complete',
            nextPageId: null,
            previousPageId: null,
            complete: true,
            sections: [
                {
                    name: "Test Note",
                    settings: [
                        {
                            type: "PARAGRAPH",
                            id: "text",
                            name: "This app is in test mode. To use it you should enter your test access token from the Shelly developer site. "
                        }
                    ]
                }
            ]
        }
    };
    log.response(callback, { statusCode: 200, configurationData: configPage });
}

// /**
//  * Page that links to Shelly for login
//  */
// function authPage(configurationData, callback) {
//     let connectorAppId = configurationData.installedAppId;
//     let url = `${shellyOauthEndpoint}/authorize?client_id=${shellyClientId}&state=${connectorAppId}&scope=remote_control:all&response_type=code`;
//     log.debug("AUTH URL="+ url);
//     let config = {
//         page: {
//             pageId: 'mainPage',
//             name: 'Connect to Shelly',
//             nextPageId: null,
//             previousPageId: null,
//             complete: false,
//             sections: [
//                 {
//                     name: "Remote service authorization",
//                     settings: [
//                         {
//                             type: "OAUTH",
//                             id: "OAuth",
//                             name: "Connect to Shelly",
//                             required: false,
//                             urlTemplate: url
//                         }
//                     ]
//                 }
//             ]
//         }
//     };
//     log.response(callback, {statusCode: 200, configurationData: config});
// }

// /**
//  * Page that allows entry of a personal API token for testing purposes (in cases where OAuth client credentials
//  * are not available.
//  */
// function tokenPage(configurationData, callback) {
//     let connectorAppId = configurationData.installedAppId;
//     log.debug("AUTH URL="+ url);
//     let config = {
//         page: {
//             pageId: 'mainPage',
//             name: 'Connect to Shelly',
//             nextPageId: "locationsPage",
//             previousPageId: null,
//             complete: false,
//             sections: [
//                 {
//                     name: "Remote service authorization",
//                     settings: [
//                         {
//                             type: "PARAGRAPH",
//                             id: "text",
//                             name: "This app is in test mode. To use it you should enter your test access token from the Shelly developer site. "
//                         },
//                         {
//                             type: "TEXT",
//                             id: "shellyAccessToken",
//                             name: "Enter your Shelly API token",
//                             description: "From the Shelly App or https://my.shelly.cloud/",
//                             required: true
//                         }
//                     ]
//                 },
//                 {
//                     settings: [
//                         {
//                             type: "LINK",
//                             id: "href",
//                             name: "Get a Shelly Personal Access Token >>",
//                             required: false,
//                             url: "https://my.shelly.cloud/"
//                         }
//                     ]
//                 }
//             ]
//         }
//     };
//     log.response(callback, {statusCode: 200, configurationData: config});
// }
