class EventHub {
    _handlers: Record<string, Array<(...args: unknown[]) => void>>;
    constructor() {
        this._handlers = {};
    }

    on(event: string, fn: (...args: unknown[]) => void) {
        if (this._handlers[event] === undefined) {
            this._handlers[event] = [];
        }
        this._handlers[event].push(fn);
    }

    dispatch(event: string, ...args: unknown[]) {
        const handlers = this._handlers[event];
        if (handlers === undefined) return;
        for (const handler of handlers) {
            handler(...args);
        }
    }

    static dispatch(event: string) {
        EventHub.dispatch(event);
    }
}

export const Events = new EventHub();
