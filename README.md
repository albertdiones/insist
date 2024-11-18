# insist
Repeat a promise until no error has been thrown

```
import insist from 'insist';

insist(
  () => fetch('http://google.com/') // repeat until successful
).then(
   // deal with success
)
```
