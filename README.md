# insist
Repeat a promise until no error has been thrown

Todos:
 * rename maxRetry to maxRetries
 * logger support
 * custom condition for retrying
 

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