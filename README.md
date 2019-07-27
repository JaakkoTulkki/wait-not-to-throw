# Wait-Not-To-Throw

`npm install wait-not-to-throw`

## wait-not-to-throw
Utility function to work with async code. Pass in a function into the `waitNotToThrow()`
and it will wait for a set time period to see if your function stops throwing.

Once it stops throwing, it will immediately resolve; otherwise the promise is rejected.

## Syntax
`waitNotToThrow(cb, timeout)`
### cb
Function that you want to wait to stop throwing.

### timeout (optional)
Time in milliseconds you want to wait.

## Examples

```
import waitNotToThrow from "wait-not-to-throw";

function failing() {
    throw new Error(':(');
}
function succeeding() {
    return ':)';
}

waitNotToThrow(failing).then(() => {
    // this will never be reached
}).catch(err => {
    console.log(err); // Error: Still rejecting after 100ms: :(
});

waitNotToThrow(succeeding).then(() => {
    console.log('function did not throw');
});

```

See `src/wait-not-to-throw.test.js` for more examples.