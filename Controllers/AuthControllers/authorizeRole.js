const authorizeRole = (role) => {
    return (req, res, next) => {
      if (req.role !== role) {
        return res.status(403).json({ message: 'Access forbidden' });
      }
      next();
    };
};
  
module.exports = authorizeRole;
  