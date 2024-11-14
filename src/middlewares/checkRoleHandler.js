const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    if (req.isPublic) {
      return next();
    }

    console.log(req.user);

    if (!req.user) {
      console.log('fail here no user');
      return res
        .status(401)
        .json({ status: 'failed', message: 'Unauthorized' });
    }

    // Check if the user's role matches the required role
    if (req.user.role_id !== requiredRole) {
      console.log('fail here not correct role');
      return res.status(403).json({ status: 'failed', message: 'Forbidden' });
    }

    // If the user has the required role, proceed
    next();
  };
};

module.exports = authorizeRole;
