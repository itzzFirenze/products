const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
   try {
      const token = jwt.sign({ id: id, role: role }, process.env.JWT_SECRET_KEY, {
         expiresIn: '30d'
      });
      return token;
   } catch (error) {
      console.error("Error generating token:", error);
   }
}

module.exports = generateToken;