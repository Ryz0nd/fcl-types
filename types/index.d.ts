declare module "@onflow/types" {
    interface T {
      label: any;
      asArgument: any;
      asInjection: any;
    }
  
    export let Identity: T,
      UInt: T,
      UInt8: T,
      UInt16: T,
      UInt32: T,
      UInt64: T,
      UInt128: T,
      UInt256: T,
      Int: T,
      Int8: T,
      Int16: T,
      Int32: T,
      Int64: T,
      Int128: T,
      Int256: T,
      Word8: T,
      Word16: T,
      Word3: T,
      Word64: T,
      UFix64: T,
      Fix64: T,
      String: T,
      Character: T,
      Bool: T,
      Address: T,
      Void: T,
      Path: T,
      Reference: T;
  
    export function Optional(children: T): T;
    export function Array(children: T | T[]): T;
    export function Dictionary(
      children: { key: T; value: T } | { key: T; value: T }[]
    ): T;
    export function Event(id: string, fields: { value: T }[]): T;
    export function Resource(id: string, fields: { value: T }[]): T;
    export function Struct(id: string, fields: { value: T }[]): T;
  }
  