exports.protect = async (req, res, next) => {
    console.log("check protect middleware");
    let accessToken, refreshToken;
    console.log(req.cookies);
    try {
        // 1) getting token and check of it's there
        if (req.headers.authorization && req.headers.authorization.includes('Bearer')) {
            accessToken = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.jwt) {
            token = req.cookies.jwt;
        } else if (req.cookies.refreshJwt) {
            refToken = req.cookies.refreshJwt;
        }

        if (!token & !refToken) {
            return sendErrorMessage(res, 400, "you are not login. please login");
        }

        // 2) verification token
        let decoded;
        if (token) {
            //verification the access token (when token are present)
            decoded = await promisify(jwt.verify)(token, process.env.jwt_SECRET);
        } else {
            //verification the refresh token 
            decoded = await promisify(jwt.verify)(refToken, process.env.jwt_REFRESH_SECRET);

            // check the refresh Token are vaild (using sessionid store in redis) 
            let refSessionid;
            // const refSessionid = await client.get(`sid.${decoded.id}`);

            if (!refSessionid || refSessionid !== decoded.sid) {
                return sendErrorMessage(res, 401, "Your session has expired. Please log in again.");
            }
        }

        // 3) check if user still exits
        const currentUser = await User.findOne({ email: decoded.id });
        if (!currentUser) {
            return sendErrorMessage(res, 401, "Your session has expired. Please log in again.");
        }

        // 4) check if user changed password after the jwt was issused
        if (await currentUser.changedPasswordAfter(decoded.iat)) {
            return sendErrorMessage(res, 401, "user recently changed password! please login again");
        }

        // send the new access-token and refresh-token
        if (refToken) {
            createSendToken(res, currentUser, 200, 'send access token');
        }

        // grant access to protected routes
        req.user = currentUser;
        // res.locals.user = currentUser;

    } catch (err) {
        console.log(err);
        return sendErrorMessage(res, 401, "invalid token");
    }

    next();
};
