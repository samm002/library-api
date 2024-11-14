const isPublic = () => (req, res, next) => {
  req.isPublic = true;
  next();
};

module.exports = isPublic;
