/* eslint-disable no-console */
const jwt = require('jsonwebtoken');

module.exports = {
  verifyToken: (req, res, next) => {
    // El objeto req.headers contiene adentro el atributo "authorization" y viene asi:
    // Authorization:
    // Bearer
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
    // .eyJpZCI6IjVlZTAzNjEzYzJmOTUxMzNhY2RiNDVmMiIs
    // ImVtYWlsIjoicnVwZUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiUmF1bCIsImlhdCI6MTU5MTc1NzMwMX0
    // .1838I8nga-RM_WPJruGUgHs9a5GxTnTZS51aizYAZR8
    try {
      const { authorization } = req.headers;
      // => [ "Bearer", "eyJhbG..." ]
      const token = authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      req.decoded = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Auth error', error });
    }
  },
};
