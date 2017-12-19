/**
 *  APPLICATION MESSAGE SERVICE.
 *
 *  A service to handle common Display of Messages within Application.
 *
 * @version 1.0
 * @author Tom Toppel
 * @since 12/19/2017
 * @package app
 */
angular.module('TriangleApp')
    .service('AppMessageService',
        function ($rootScope, growl) {
            'use strict';

            this.growlMessage = function (method, sourceName, sourceDetail) {
                var msg = new Array();
                if (sourceName) {
                    msg.push(sourceName);
                }
                if (sourceDetail) {
                    msg.push(sourceDetail);
                }
                method(msg.join(" "));
            };

            this.success = function (sourceName, sourceDetail) {
                this.growlMessage(growl.success, sourceName, sourceDetail);
            };
            this.error = function (sourceName, sourceDetail) {
                this.growlMessage(growl.error, sourceName, sourceDetail);
            };
            this.warning = function (sourceName, sourceDetail) {
                this.growlMessage(growl.warning, sourceName, sourceDetail);
            };
            this.info = function (sourceName, sourceDetail) {
                this.growlMessage(growl.info, sourceName, sourceDetail);
            };

            this.httpError = function (error, sourceName, sourceDetail) {
                var msg = new Array();
                if (sourceName) {
                    msg.push(sourceName);
                }
                if (sourceDetail) {
                    msg.push("(");
                    msg.push(sourceDetail);
                    msg.push(")");
                }
                else {
                    msg.push("Error:");
                }

                if (error) {
                    if (error.name && error.message) {
                        msg.push(error.name);
                        msg.push(error.message);
                    }
                    else if (error.status < 0 && error.xhrStatus) {
                        msg.push("Network Connection");
                    }
                    else {
                        if (error.status) {
                            msg.push(error.status);
                        }
                        if (error.statusText) {
                            msg.push(error.statusText);
                        }
                    }

                    if (error.data) {
                        if (error.data.error && error.data.error.message) {
                            msg.push("Reason:")
                            msg.push(error.data.error.message);
                        }
                        else if (error.data.errmsg) {
                            msg.push("Reason:")
                            msg.push(error.data.errmsg);
                        }
                        else if (!error.data.error) {
                            msg.push("Reason:")
                            msg.push(error.data);
                        }
                    }
                }
                growl.error(msg.join(" "));
            };
        });