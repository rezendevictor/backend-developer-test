export class JobNotFoundError extends Error{
    constructor(msg?: string) {
        super(msg);
    }
}
