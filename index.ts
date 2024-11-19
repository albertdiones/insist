import Repeater from "add_repeater"


export default function insist(
    action: () => Promise<any>,
    options: {
        maxRetries?: number,
        timeout?: number
    } = {}
) {
    const {maxRetries = null} = options;
    let success = false;
    const repeater = new Repeater(
        () => action().then(
            (result) => {
                repeater.stop();
                success = true;
                return result;
            }
        ).catch(
            (error) => {
                //console.warn("caught error", error)
                // this.logger.warn(error);
                // ignore for now
                if (maxRetries === null) {
                    return null
                }
                console.log('repeater.runs', repeater.runs);
                if (repeater.runs >= maxRetries) {
                    
                }
            }
        )
    );

    // repeater.stop();
    return repeater.continuous(
        options.timeout ?? 500,
        maxRetries
    ).then(
        () => {
            console.log("DONE!!!!!!!!!!!!", success);
            if (!success) {
                throw "Max retries exhausted for insist";
            }
        }
    )
}