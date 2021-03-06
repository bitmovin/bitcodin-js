/****************************************************************************
 * Copyright (C) 2015, bitmovin GmbH, All Rights Reserved
 *
 * Created on: 6/19/15
 * Author: Daniel Weinberger <daniel.weinberger@bitmovin.net>
 *
 * This source code and its use and distribution, is subject to the terms
 * and conditions of the applicable license agreement.
 ****************************************************************************/

var Bitcodin = function (apiKey) {
    if (!apiKey || typeof apiKey !== 'string') {
        throw new Error('No bitcodin API key given');
    }

    var BASE_URL = 'http://portal.bitcodin.com/api/';
    var API_VERSION = 'v1';
    var defaultHeaders = {
        'Content-Type': 'application/json',
        'bitcodin-api-version': API_VERSION,
        'bitcodin-api-key': apiKey
    };

    var restClient = new RestClient(BASE_URL, defaultHeaders);

    return {
        input: {
            /**
             * Create a new input.
             * @link http://docs.bitcodinrestapi.apiary.io/reference/inputs/create-inputs/create-an-input
             *
             * @param {String | Object} source The URL as string, or a HTTP input config object
             * @param {String} [username] Basic Auth username
             * @param {String} [password] Basic Auth password
             * @returns {Promise}
             */
            create: function (source, username, password) {
                if (typeof source === 'string') {
                    source = {
                        "url": source
                    };

                    if (username && password) {
                        source.username = username;
                        source.password = password;
                    }
                }

                return restClient.post('input/create', source);
            },
            /**
             * Create a new input asynchronous
             * @link https://jsapi.apiary.io/apis/bitcodinrestapi/reference/inputs/asynchronous-inputs.html
             *
             * @param {String | Object} source The URL as string, or a HTTP input config object
             * @param {String} [username] Basic Auth username
             * @param {String} [password] Basic Auth password
             * @returns {Promise}
             */
            createAsync: function (source, username, password) {
                if (typeof source === 'string') {
                    source = {
                        "url": source
                    };

                    if (username && password) {
                        source.username = username;
                        source.password = password;
                    }
                }
                return restClient.post('input/createasync', source);
            },
            /**
             *
             *
             * @param id
             */
            getAsyncStatus: function (id) {
                return restClient.get('input/'+id+'/asyncstatus');
            },
            /**
             * Analyze an existing input.
             * @link http://docs.bitcodinrestapi.apiary.io/reference/inputs/analyze-inputs/analyze-an-input
             *
             * @param {int} id
             * @returns {Promise}
             */
            analayze: function (id) {
                return restClient.patch('input/' + id + '/analyze');
            },
            /**
             * List all inputs. 10 inputs per page are returned.
             * @link http://docs.bitcodinrestapi.apiary.io/reference/inputs/list-inputs/list-all-inputs
             *
             * @param {int} [pageNumber]
             * @returns {Promise}
             */
            list: function (pageNumber) {
                pageNumber = pageNumber !== undefined && !isNaN(pageNumber) ? '/' + pageNumber : '';
                return restClient.get('inputs' + pageNumber);
            },
            /**
             * Get the input details for the input specified by id.
             * @link http://docs.bitcodinrestapi.apiary.io/reference/inputs/input-details/get-input-details
             *
             * @param {int} id
             * @returns {Promise}
             */
            get: function (id) {
                return restClient.get('input/' + id);
            },
            /**
             * Delete the input specified by id
             * @link http://docs.bitcodinrestapi.apiary.io/reference/inputs/input-details/delete-input
             *
             * @param {int} id
             * @returns {Promise}
             */
            delete: function (id) {
                return restClient.delete('input/' + id);
            }
        },
        output: {
            s3: {
                /**
                 * Create a new Amazon S3 output
                 * @link http://docs.bitcodinrestapi.apiary.io/reference/output/create-output/create-an-s3-output
                 *
                 * @param {Object} s3OutputConfig
                 * @returns {Promise}
                 */
                create: function (s3OutputConfig) {
                    if (!s3OutputConfig.hasOwnProperty('type')) {
                        s3OutputConfig.type = 's3';
                    }
                    return restClient.post('output/create', s3OutputConfig);
                }
            },
            gcs: {
                /**
                 * Create a new Google Cloud Storage (GCS) output
                 * @link http://docs.bitcodinrestapi.apiary.io/reference/output/create-output/create-an-gcs-output
                 *
                 * @param {Object} gcsOutputConfig
                 * @returns {Promise}
                 */
                create: function (gcsOutputConfig) {
                    if (!gcsOutputConfig.hasOwnProperty('type')) {
                        gcsOutputConfig.type = 'gcs';
                    }
                    return restClient.post('output/create', gcsOutputConfig);
                }
            },
            ftp: {
                /**
                 * Create a new FTP output
                 * @link http://docs.bitcodinrestapi.apiary.io/reference/output/create-output/create-an-ftp-output
                 *
                 * @param {Object} ftpOutputConfig
                 * @returns {Promise}
                 */
                create: function (ftpOutputConfig) {
                    if (!ftpOutputConfig.hasOwnProperty('type')) {
                        ftpOutputConfig.type = 'ftp';
                    }
                    return restClient.post('output/create', ftpOutputConfig);
                }
            },
            /**
             * List existing outputs. 10 outputs per page are returned.
             * @link http://docs.bitcodinrestapi.apiary.io/reference/output/list-outputs/list-outputs
             *
             * @param {int} [pageNumber]
             * @returns {Promise}
             */
            list: function (pageNumber) {
                pageNumber = pageNumber !== undefined && !isNaN(pageNumber) ? '/' + pageNumber : '';
                return restClient.get('outputs' + pageNumber);
            },
            /**
             * Get output details
             * @link http://docs.bitcodinrestapi.apiary.io/reference/output/output-details/get-output-details
             *
             * @param {int} id
             * @returns {Promise}
             */
            getDetails: function (id) {
                return restClient.get('output/' + id);
            },
            /**
             * Delete an existing output
             * @link http://docs.bitcodinrestapi.apiary.io/reference/output/output-details/delete-output
             *
             * @param {int} id
             * @returns {Promise}
             */
            delete: function (id) {
                return restClient.delete('output/' + id);
            }
        },
        encodingProfile: {
            /**
             * Create a new encoding profile
             * @link http://docs.bitcodinrestapi.apiary.io/reference/encoding-profiles/create-encoding-profiles/create-an-encoding-profile
             *
             * @param {Object} encodingProfile
             * @returns {Promise}
             */
            create: function (encodingProfile) {
                return restClient.post('encoding-profile/create', encodingProfile);
            },

            /**
             * List existing encoding profiles. 10 encoding profiles per page are returned.
             * @link http://docs.bitcodinrestapi.apiary.io/reference/encoding-profiles/list-encoding-profiles/list-encoding-profiles
             *
             * @param {int} [pageNumber]
             * @returns {Promise}
             */
            list: function (pageNumber) {
                pageNumber = pageNumber !== undefined && !isNaN(pageNumber) ? '/' + pageNumber : '';
                return restClient.get('encoding-profiles' + pageNumber);
            },

            /**
             * Get encoding profile details.
             * @link http://docs.bitcodinrestapi.apiary.io/reference/encoding-profiles/get-encoding-profile/get-specific-encoding-profile
             *
             * @param {int} id
             * @returns {Promise}
             */
            get: function (id) {
                return restClient.get('encoding-profile/' + id);
            },

            /**
             * Delete an encoding profile.
             * @link http://docs.bitcodinrestapi.apiary.io/reference/encoding-profiles/get-encoding-profile/get-specific-encoding-profile
             *
             * @param {int} id
             * @returns {Promise}
             */
            delete: function (id) {
                return restClient.delete('encoding-profile/' + id);
            }
        },
        job: {
            /**
             *
             * @link http://docs.bitcodinrestapi.apiary.io/reference/jobs/job/create-a-job
             *
             * @param {Object} jobConfig
             * @returns {Promise}
             */
            create: function (jobConfig) {
                return restClient.post('job/create', jobConfig);
            },

            /**
             *
             * @link http://docs.bitcodinrestapi.apiary.io/reference/jobs/list-jobs/list-all-jobs
             *
             * @param {int} [pageNumber]
             * @returns {Promise}
             */
            list: function (pageNumber) {
                pageNumber = pageNumber !== undefined && !isNaN(pageNumber) ? '/' + pageNumber : '';
                return restClient.get('jobs' + pageNumber);
            },

            /**
             *
             * @link http://docs.bitcodinrestapi.apiary.io/reference/jobs/job-details/get-job-details
             *
             * @param {int} id
             * @returns {Promise}
             */
            getDetails: function (id) {
                return restClient.get('job/' + id);
            },

            /**
             *
             * @link http://docs.bitcodinrestapi.apiary.io/reference/jobs/job-status/get-current-job-status
             *
             * @param {int} id
             * @returns {Promise}
             */
            getStatus: function (id) {
                return restClient.get('job/' + id + '/status');
            },
            transfer: {
                /**
                 *
                 * @link http://docs.bitcodinrestapi.apiary.io/reference/jobs/transfer-job/create-a-transfer-job
                 *
                 * @param {Object} transferJobConfig
                 * @returns {Promise}
                 */
                create: function (transferJobConfig) {
                    return restClient.post('job/transfer', transferJobConfig);
                },

                /**
                 *
                 * @link http://docs.bitcodinrestapi.apiary.io/reference/jobs/list-transfer-jobs/list-a-transfer-job
                 *
                 * @param {int} id
                 * @returns {Promise}
                 */
                list: function (id) {
                    return restClient.get('job/' + id + '/transfers');
                }
            }
        },
        statistic: {
            /**
             *
             * @link http://docs.bitcodinrestapi.apiary.io/reference/statistics/statistics/get-current-output-status
             *
             * @returns {Promise}
             */
            get: function () {
                return restClient.get('statistics');
            },

            /**
             *
             * @link http://docs.bitcodinrestapi.apiary.io/reference/statistics/jobs/get-job-statistics-in-given-time-window
             *
             * @param {String} from
             * @param {String} to
             * @returns {Promise}
             */
            jobs: function (from, to) {
                return restClient.get('statistics/jobs/' + from + '/' + to);
            }
        },
        payment: {
            invoice: {
                /**
                 *
                 * @link http://docs.bitcodinrestapi.apiary.io/reference/payment-routes/invoice-info/update-invoice-infos
                 *
                 * @param {Object} invoiceInfo
                 * @returns {Promise}
                 */
                updateInfo: function (invoiceInfo) {
                    return restClient.post('payment/invoiceinfo', invoiceInfo);
                },

                /**
                 *
                 * @link http://docs.bitcodinrestapi.apiary.io/reference/payment-routes/invoice-info/get-invoice-infos
                 *
                 * @returns {Promise}
                 */
                getInfo: function () {
                    return restClient.get('payment/invoiceinfo');
                }
            }
        },
        wallet: {
            /**
             *
             * @link http://docs.bitcodinrestapi.apiary.io/reference/wallet-routes/wallet/get-wallet-information
             *
             * @returns {Promise}
             */
            get: function () {
                return restClient.get('payment/user');
            },

            /**
             *
             * @link http://docs.bitcodinrestapi.apiary.io/reference/wallet-routes/deposits/get-a-list-of-all-deposits
             *
             * @param {int} [pageNumber]
             * @returns {Promise}
             */
            listDeposits: function (pageNumber) {
                pageNumber = pageNumber !== undefined && !isNaN(pageNumber) ? '/' + pageNumber : '';
                return restClient.get('payment/deposits' + pageNumber);
            },

            /**
             *
             * @link http://docs.bitcodinrestapi.apiary.io/reference/wallet-routes/bills/get-a-list-of-all-bills
             *
             * @param {int} [pageNumber]
             * @returns {Promise}
             */
            listBills: function (pageNumber) {
                pageNumber = pageNumber !== undefined && !isNaN(pageNumber) ? '/' + pageNumber : '';
                return restClient.get('payment/bills' + pageNumber);
            }
        },
        thumbnail: {
            /**
             *
             * @link http://docs.bitcodinrestapi.apiary.io/#reference/thumbnails/thumbnail/get-thumbnail
             *
             * @param {String} id
             * @returns {Promise}
             */
            get: function (id) {
                return restClient.get('thumbnail/' + id);
            },

            /**
             *
             * @link http://docs.bitcodinrestapi.apiary.io/#reference/thumbnails/thumbnail/create-a-thumbnail-async
             *
             * @param {Object} thumbnailConfig
             * @returns {Promise}
             */
            create: function(thumbnailConfig) {
                return restClient.post('thumbnail', thumbnailConfig)
            }
        },
        sprite: {
            /**
             *
             * @link http://docs.bitcodinrestapi.apiary.io/#reference/thumbnails/thumbnail/get-sprite
             *
             * @param {String} id
             * @returns {Promise}
             */
            get: function (id) {
                return restClient.get('sprite/' + id);
            },

            /**
             *
             * @link http://docs.bitcodinrestapi.apiary.io/#reference/thumbnails/sprite/create-a-sprite-async
             *
             * @param {Object} spriteConfig
             * @returns {Promise}
             */
            create: function(spriteConfig) {
                return restClient.post('sprite', spriteConfig)
            }
        }
    };
};
