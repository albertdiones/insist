
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


for (let i=0; i<=9; i++) {
    await waitThenCount();
}


for (let i=0; i<=19; i++) {
    await waitThenCount2();
}




