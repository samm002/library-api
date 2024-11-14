module.exports = {
  authorizeRole: require('./checkRoleHandler'),
  errorHandler: require('./errorHandler'),
  authenticateJwtToken: require('./jwtAuthHandler'),
  isPublic: require('./publicHandler'),
  undefinedEndpointHandler: require('./undefinedEnpointHandler'),
};
