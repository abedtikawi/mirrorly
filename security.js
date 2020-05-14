let jwt = require('jsonwebtoken');
module.exports = async (req, res, next) => {
    jwt.sign({
        foo: 'bar'
    }, privateKey, {
        algorithm: 'RS256'
    }, function (err, token) {
        console.log(token);
    });
    let token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({
            status: 'error',
            data: {
                message: 'Not authenticated'
            }
        })
    }

    if (token.startsWith('Bearer')) {
        // Splice token and remove the word bearer and get the whole token
        token = token.slice(7, token.length).trimLeft();
    }

    try {
        // Verify that the passed token is valid with the system JWT Secret

        req.user = decodedToken.user;

        let decodedToken = jwt.verify(token, cert, {
            algorithms: ['RS256']
        }, function (err, payload) {
            // if token alg != RS256,  err == invalid signature
            return res.status(401).json({
                status: 'error',
                data: {
                    message: 'Not authenticated'
                }
            })
        });;
        req.user = decodedToken.user;
        next();

    } catch (error) {
        res.status(401).json({
            status: 'error',
            data: {
                message: 'Invalid Token'
            }
        })
    }







}