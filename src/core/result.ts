export interface Failure<T>{
    error: T,
    status : 'failure'
}

export interface Success<T>{
    data: T,
    status : 'success'
}

export type Result<S, E > = Failure<E> | Success<S>

export function failure<T>(error: T): Failure<T>{
    return {error: error, status : 'failure'}
}

export function success<T>(data: T): Success<T>{
    return {data: data, status: 'success'}
}

