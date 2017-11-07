export const isDev = function() {
  let _isDev = true;
  const env = process.env.NODE_ENV;
  if (env && env !== 'development') {
    _isDev = false;
  }
  return _isDev;
};

export function isPromise<T>(
  value: T | PromiseLike<T>,
): value is PromiseLike<T> {
  if (!value) {
    return false;
  }
  if (typeof value !== 'object' && typeof value !== 'function') {
    return false;
  }
  return typeof (value as PromiseLike<T>).then === 'function';
}

export function createPromiseCallback() {
   let cb;
   const promise = new Promise((resolve, reject) => {
     cb = function(err, data) {
       if (err) {
         return reject(err);
       }
       return resolve(data);
     };
   });
   cb.promise = promise;
   return cb;
}
