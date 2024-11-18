

export default function defaultFunction(
    action: () => Promise<any>,
    {
        maxRetry: number
    }
) {
    console.log('hello');
}