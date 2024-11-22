import Repeater from "add_repeater"

interface LoggerInterface {
    log(...messages: any[]): void;
    error(...messages: any[]): void;
    warn(...messages: any[]): void;
    info(...messages: any[]): void;
    debug(...messages: any[]): void;
}

export default function insist(
    action: () => Promise<any>,
    options: {
        maxRetries?: number,
        timeout?: number,
        logger?: LoggerInterface
    } = {}
): Promise<any> {
    const {logger = console} = options;

    let success = false;
    let promiseResult;
    const repeater = new Repeater(
        () => action().then(
            (result) => {
                repeater.stop();
                success = true;
                promiseResult=result;
                return result;
            }
        ).catch(
            (error) => {
                // console.warn("caught error", error)
                // this.logger.warn(error);
                // ignore for now
            }
        ),
        { logger: logger }
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
            return promiseResult;
        }
    );
}