function isLoginRequest(url: string): boolean {
    const legalUrls: Array<string> = ['login'];
    return legalUrls.indexOf(url) !== -1;
}

function checkCookie(req, res, next) {
    // expired and is not a login request
    if (req.session.isNew && !isLoginRequest(req.originalUrl)) {
        res.statusCode = 401;
        res.send('Session expired, please login again');
    }
    // not expired, reset a field to reset the expire time
    else {
        req.session.spinner = !req.session.spinner;
        next();
    }
}

export default checkCookie;