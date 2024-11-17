interface ILove<T>{
    name: string,
    data: T
}

function seryozhaEatingSum<T>(arg: T): ILove<T>{
    return {name: '0000', data: arg}
}

seryozhaEatingSum<string>('10')
seryozhaEatingSum<number>(10)

interface Masha{
    name: string,
    age: 19
}

interface IMasha<T>{
    data: T
}

function massiveReturn<T extends Masha[]>(): IMasha<T> {
    return {data: [{name: 'aaaa', age: 19}, {name: 'bbbb', age: 19}, {name: 'cccc', age: 19}] as T}
}

function oneMasha<T>(): IMasha<T> {
    return {name: 'ggg', age: 19}
}