import { AsyncLocalStorage } from "async_hooks";

type AuthContext = {
    userId?: number;
    username?: string;
};

const requestContextStorage = new AsyncLocalStorage<AuthContext>();

export function runWithRequestContext<T>(callback: () => T) {
    return requestContextStorage.run({}, callback);
}

export function setAuthContext(partial: Partial<AuthContext>) {
    const store = requestContextStorage.getStore();
    if (!store) return;
    Object.assign(store, partial);
}

export function getAuthContext(): AuthContext | undefined {
    return requestContextStorage.getStore();
}

export function getUserId(): number | undefined {
    return requestContextStorage.getStore()?.userId;
}

export function getUsername(): string | undefined {
    return requestContextStorage.getStore()?.username;
}
