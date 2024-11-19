# insist
Repeat a promise until no error has been thrown

Todos:
 * [x] rename maxRetry to maxRetries
 * logger support
 * custom condition for retrying
 * throw an error if maxRetries is exhausted, but still fails
 * [x] all options should be optional/not required
 

```
import insist from 'insist';

insist(
  () => fetch('http://google.com/') // repeat until successful,
  {
    maxRetries: 5
  }
).then(
   // deal with success
)
```
