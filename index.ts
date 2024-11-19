import Repeater from "add_repeater"


export default function insist(
    action: () => Promise<any>,
    options: {
        maxRetries?: number,
        timeout?: number
    } = {}
) {
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
            }
        )
    );

    // repeater.stop();
    return repeater.continuous(
        options.timeout ?? 500,
        options.maxRetries ?? null
    ).then(
        () => {
            if (!success) {
                throw `Insist: ${repeater.runs}/${options.maxRetries}  retries exhausted`;
            }
        }
    );
}