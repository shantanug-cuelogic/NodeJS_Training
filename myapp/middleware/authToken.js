import userModel from '../models/user';
import jwt from 'jsonwebtoken';


require('dotenv').config();

class authToken {

    authenticateToken(req, res, next) {

        jwt.verify(req.body.userToken, process.env.SECRETKEY, (err, decoded) => {

            if (err) {

                res.boom.unauthorized(err)
            }
            else {
                userModel.findOne({ _id: decoded.userId }, (err, result) => {

                    if (result === null) {
                        res.boom.unauthorized()
                    }
                    else {
                        req.body.userId = decoded.userId;
                        next();
                    }
                });
            }
        });
    }
}
export default new authToken(); 