module.exports = function(server, app, clientAPI) {

    server.get('/', (req, res) => {
        const isDesktop = req.useragent.isDesktop;
        
        const session               = req.session;
        const sessionAccessToken    = (typeof session.accessToken === 'undefined' || session.accessToken === '') ? null : session.accessToken;
        
        if (sessionAccessToken !== null) {
            res.redirect('/dashboard');
        } else {
            if (isDesktop) return app.render(req, res, '/index');
            else return app.render(req, res, '/mobiles');
        }
    });

}
