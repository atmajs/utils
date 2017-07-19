/// <reference path="./is-ref.d.ts" />
/// <reference path="./obj-ref.d.ts" />
/// <reference path="./class-ref.d.ts" />

type Methods<T> = {
    [P in keyof T]: T[P]; 
}

declare const Lib: Methods<typeof Is> 
    & Methods<typeof Obj>
    & Methods<typeof ClassBase>;
