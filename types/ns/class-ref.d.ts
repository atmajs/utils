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


    type DfrRunner =  (resolve: Function, reject?: Function) => void | class_Dfr
    export class class_Dfr {
        constructor (runner?: DfrRunner | any)
        then(onOk: (...args: any[]) => void | class_Dfr | PromiseLike<any>, onFail?: (...args: any[]) => void | class_Dfr | PromiseLike<any>)
        done (done: (...args: any[]) => void | class_Dfr): this
        fail (fail: (error: any | Error) => void): this
        reject(error: any | Error) : this
        resolve(...args: any[]): this
        always (always: Function): this

        defer (): this
        isResolved (): boolean
        isRejected (): boolean
        isBusy (): boolean
        resolveDelegate (): (result: any) => void | any
        rejectDelegate (): (result: Error | any) => void | any

        static run (fn: DfrRunner, ctx?: any): class_Dfr
        static resolve (...args: any[]): class_Dfr
        static reject (...args: any[]): class_Dfr
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