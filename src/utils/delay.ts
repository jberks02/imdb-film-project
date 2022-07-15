export function delay(seconds: number): Promise<void> {
    return new Promise((res, _) => {
        setTimeout(() => {
            res()
        }, seconds * 1000);
    })
}