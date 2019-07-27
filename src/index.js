export function waitNotToThrow(cb, timeout=100) {
  let errorMessage = '';
  return new Promise((resolve, reject) => {
    let timeCounter = 0;
    const interval = 2;
    const intervalId = setInterval(() => {
      try {
        cb();
        clearInterval(intervalId);
        return resolve();
      } catch (e) {
        errorMessage = e.message;
        timeCounter += interval;
        if(timeCounter >= timeout) {
          clearInterval(intervalId);
          return reject(new Error('Still rejecting after ' + timeout + 'ms: ' + errorMessage));
        }
      }
    }, interval);
  })
}