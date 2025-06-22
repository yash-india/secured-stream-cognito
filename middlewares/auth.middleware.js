import jwt from "jsonwebtoken";
import jwksRsa from "jwks-rsa";
import { env } from "../config/env.js";
import { logger } from "../utils/logger.js";

const client = jwksRsa({
  jwksUri: `https://cognito-idp.${env.COGNITO_REGION}.amazonaws.com/${env.COGNITO_USER_POOL_ID}/.well-known/jwks.json`,
  cache: true,
  cacheMaxEntries: 10,
  cacheMaxAge: 10 * 60 * 1000, // 10 minutes
  rateLimit: true,
  jwksRequestsPerMinute: 10,
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) return callback(err);
    callback(null, key.getPublicKey());
  });
}

export const validateToken = (req, res, next) => {
  const token = req.query.auth;
  if (!token) return res.status(401).send("Missing token");

  jwt.verify(
    token,
    getKey,
    {
      audience: env.COGNITO_CLIENT_ID,
      issuer: `https://cognito-idp.${env.COGNITO_REGION}.amazonaws.com/${env.COGNITO_USER_POOL_ID}`,
    },
    (err, decoded) => {
      if (err) {
        logger.warn("Invalid token", err);
        return res.status(403).send("Invalid token");
      }
      req.user = decoded;
      next();
    },
  );
};
