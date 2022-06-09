const axios = require('axios');

function interceptors(serverReq, serverRes) {
    let isRefreshingToken   = false;
    let pendingRequests     = [];

    axios.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        const reqOriginal   = error.config;
        const reqStatus     = error.response ? error.response.status : null;
        const session       = (typeof serverReq.session == 'undefined' || serverReq.session == '') ? null : serverReq.session;
        const hostAPI       = (typeof process.env.NEXT_API_URL == 'undefined' || process.env.NEXT_API_URL == '') ? null : process.env.NEXT_API_URL;
        // console.log(`interceptors.reqOriginal._retry: ${JSON.stringify(reqOriginal._retry)}`);
        // console.log(`interceptors.pendingRequests.length: ${pendingRequests.length}`);
        if (session == null) {
            serverRes.redirect('/auth');
        } else {
            if (hostAPI != null && reqStatus == 401) {
                if (!isRefreshingToken) {
                    console.log(`interceptors.isRefreshingToken: false`);
                    isRefreshingToken = true;

                    try {
                        return axios.post(`${hostAPI}/v1/auth/refresh-token/`, 
                        { 
                            refresh_token: session.refreshToken, 
                        }, 
                        {
                            responseType: 'json',
                            crossdomain : true,
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        }).then((res) => {
                            console.log('refreshToken.response: ' + JSON.stringify(res.data));
                            const resData       = res.data.data;
                            const accessToken   = resData.access_token;
    
                            // Process pending requests and wire responses back through promise.
                            if (pendingRequests.length > 0) {
                                pendingRequests.forEach((pendingRequest) => {
                                    const updatedRequest    = {...pendingRequest.request};
                                    
                                    updatedRequest.headers.Authorization = `Bearer ${accessToken}`;
    
                                    axios(updatedRequest)
                                        .then((res) => pendingRequest.resolve(res))
                                        .catch((err) => pendingRequest.reject(err));
                                });
                            }
    
                            // Update auth and process original request
                            pendingRequests.length  = 0;
                            isRefreshingToken       = false;
    
                            const updatedRequest = {...error.config};
                            updatedRequest.headers.Authorization = `Bearer ${accessToken}`;
    
                            // if (serverReq.session.hasOwnProperty('accessToken')) 
                            //     serverReq.session.accessToken = accessToken;
    
                            return axios(updatedRequest);
                        });
                        // .catch((err) => {
                        //     console.log('refreshToken.error: ' + JSON.stringify(err));
                        //     // Refresh token login failed.. reject all.
                        //     pendingRequests.forEach((pendingRequest) => {
                        //         pendingRequest.reject(err);
                        //     });
    
                        //     pendingRequests.length  = 0;
                        //     isRefreshingToken       = false;
    
                        //     if (serverReq.session.hasOwnProperty('accessToken')) 
                        //         delete serverReq.session['accessToken'];
                            
                        //     if (serverReq.session.hasOwnProperty('refreshToken')) 
                        //         delete serverReq.session['refreshToken'];
    
                        //     serverReq.session.destroy;
    
                        //     // error.status            = 400;
                        //     // error.response.status   = 400;
                        //     // error.response.data     = { logout: true };
    
                        //     serverRes.redirect('/auth');
                        //     // return Promise.reject(error);
                        // });
                    } catch(errCatch) {
                        console.log(`interceptors.errCatch: ${JSON.stringify(errCatch)}`);
                        pendingRequests.forEach((pendingRequest) => {
                            pendingRequest.reject(err);
                        });

                        pendingRequests.length  = 0;
                        isRefreshingToken       = false;

                        return Promise.reject(error);
                    }
                } else {
                    console.log(`interceptors.isRefreshingToken: true`);
                    return new Promise((resolve, reject) => {
                        pendingRequests.push({
                            resolve, reject, request: error.config
                        });
                    });
                }
            } else {
                console.log('!401.error: ' + JSON.stringify(error));
                return Promise.reject(error);
            }
        }
    });
}

function checkRefreshToken(serverReq, serverRes, errorConfig) {
    const session   = (typeof serverReq.session == 'undefined' || serverReq.session == '') ? null : serverReq.session;
    const hostAPI   = (typeof process.env.NEXT_API_URL == 'undefined' || process.env.NEXT_API_URL == '') ? null : process.env.NEXT_API_URL;

    axios.post(`${hostAPI}/v1/auth/refresh-token/`, 
    { 
        refresh_token: session.refreshToken, 
    }, 
    {
        responseType: 'json',
        crossdomain : true,
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((res) => {
        console.log('refreshToken.response: ' + JSON.stringify(res.data));
        const resData       = res.data.data;
        const accessToken   = resData.access_token;

        const updatedRequest = {...errorConfig};
        updatedRequest.headers.Authorization = `Bearer ${accessToken}`;

        if (serverReq.session.hasOwnProperty('accessToken')) 
            serverReq.session.accessToken = accessToken;

        axios(updatedRequest)
        .then((updateRes) => {
            // console.log('updateRes: ' + JSON.stringify(updateRes.data));
            const resData   = updateRes.data.data;
            const _error    = 0;
            const payload   = resData;

            serverRes.status(200).json({ _error, payload });
        });
    })
    .catch((err) => {
        // console.log('refreshToken.error: ' + JSON.stringify(err));

        if (serverReq.session.hasOwnProperty('accessToken')) 
            delete serverReq.session['accessToken'];
        
        if (serverReq.session.hasOwnProperty('refreshToken')) 
            delete serverReq.session['refreshToken'];

        serverReq.session.destroy;

        serverRes.redirect(`http://localhost:3000/auth`);
    });
}

module.exports = {
    interceptors,
    checkRefreshToken,
}