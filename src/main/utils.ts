export const isDev = function() {
  let _isDev = true;
  const env = process.env.NODE_ENV;
  if (env && env !== 'development') {
    _isDev = false;
  }
  return _isDev;
};
