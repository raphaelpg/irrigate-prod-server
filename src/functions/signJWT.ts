import jwt from 'jsonwebtoken';
import IUser from '../interfaces/user';
import 'dotenv/config';

const jwtSecret = process.env.JWT_KEY || 'secret';

const signJWT = (user: IUser) => {
  let timeSinceEpoch = new Date().getTime();
  let expirationTime = timeSinceEpoch + Number(600) *  100000;
  let expirationTimeInSeconds = Math.floor(expirationTime / 1000);

  try {
    jwt.sign({ email: user.email }, jwtSecret, { algorithm: 'HS256', expiresIn: expirationTimeInSeconds }, (error, token) => {
      if (error) {
        return error;
      } else if (token) {
        console.log(token)
        return token;
      }
    })
  } catch (error) {
    return error;
  }
}

// const signJWT = (user: IUser, callback: (error: Error | null, token: string | null) => void): void => {
//   let timeSinceEpoch = new Date().getTime();
//   let expirationTime = timeSinceEpoch + Number(600) *  100000;
//   let expirationTimeInSeconds = Math.floor(expirationTime / 1000);

//   try {
//     jwt.sign({ email: user.email }, jwtSecret, { algorithm: 'HS256', expiresIn: expirationTimeInSeconds }, (error, token) => {
//       if (error) {
//         callback(error, null);
//       } else if (token) {
//         callback(null, token);
//       }
//     })
//   } catch (error) {
//     callback(error, null);
//   }
// }

export default signJWT;
