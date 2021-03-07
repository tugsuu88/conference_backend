const auth = (req, res, next) => {
    try {
        //// check authorization
        // console.log('check auth');
        next();
    }
    catch(err) {
        return res.status(500).json({intResult: 1, msg: 'error on auth', data: err});
    }
}

module.exports = auth;