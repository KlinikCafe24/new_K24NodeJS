export function createOTP(req, res, next) {
    userService.createOTP(req.body, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Success",
                data: results
            })
        }
    });
};

export function verifyOTP(req, res, next) {
    userService.verifyOTP(req.body, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Success",
                data: results
            })
        }
    });
};