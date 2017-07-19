declare namespace ClassBase {
    export class class_EventEmitter {
        on: (event: string, cb: Function) => this
        once: (event: string, cb: Function) => this
        off: (event: string, cb?: Function) => this
        emit: (event: string, ...args: any[]) => this
        trigger: (event: string, ...args: any[]) => this
        pipe: (eventName: string) => (...args) => void         
    }

    export function class_create<T>(prototype: IClassDeclaration<T> & T): new (...args: any[]) => IClassDeclaration<T> & T;

    interface IClassDeclaration<T> {
        constructor?: (...args) => T
        [x: string]: any
    }


    export class class_Dfr<T> extends Promise<T> {
        done (done: (result: T) => void | class_Dfr<any>): this
        fail (fail: (error: any | Error) => void): this
        reject(error: any | Error) 
        resolve(result?: T): this
        always (always: Function): this

        defer (): this
        isResolved (): boolean
        isRejected (): boolean
        isBusy (): boolean
        resolveDelegate (): (result: T | any) => void | any
        rejectDelegate (): (result: Error | any) => void | any

        static run<T> (fn: (resolve: Function, reject?: Function) => void, ctx?: any): class_Dfr<T>        
    }

    export class class_Uri {
        constructor (path)

        protocol: string		
        value: string
        path: string
        file: string
        extension: string
        
        cdUp (): this
        combine (path: string): class_Uri
        toString (): string
        toLocalFile (): string
        toLocalDir (): string
        toPathAndQuery (): string
        /**
         * @return Current Uri Path{String} that is relative to @arg1 Uri
         */
        toRelativeString (uri: class_Uri): string
        
        isRelative (): boolean
        getName (): string

        static combine (...paths: string[]): string
    }

}