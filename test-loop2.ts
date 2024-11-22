
import Repeater from "add_repeater";
let x= 0;
async function waitThenCount() {
    return Bun.sleep(1000).then(
        () => console.log('A:', x++)
    )
}

let x2= 0;
async function waitThenCount2() {
    return Bun.sleep(500).then(
        () => console.log('B:', x2++)
    )
}


const repeater = new Repeater(
    () => waitThenCount()
);

Bun.sleep(1000).then( () => repeater.continuous(1000,10) )



const repeater2 = new Repeater(
    () => waitThenCount2()
);

repeater2.continuous(0,20);





