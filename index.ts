

export default function defaultFunction(
    action: () => Promise<any>,
    params: {
        maxRetry: number
    }
) {
    console.log('hello');
}