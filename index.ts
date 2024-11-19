import Repeater from "add_repeater"


export default function insist(
    action: () => Promise<any>,
    options: {
        maxRetries?: number,
        timeout?: number
    } = {}
) {
    const repeater = new Repeater(
        () => action().then(
            (result) => {
                repeater.stop();
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
    );
}