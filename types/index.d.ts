declare module "@onflow/types" {
    interface T {
      label: any;
      asArgument: any;
      asInjection: any;
    }
  
    enum FTypes {
      Identity,
      UInt,
      UInt8,
      UInt16,
      UInt32,
      UInt64,
      UInt128,
      UInt256,
      Int,
      Int8,
      Int16,
      Int32,
      Int64,
      Int128,
      Int256,
      Word8,
      Word16,
      Word3,
      Word64,
      UFix64,
      Fix64,
      String,
      Character,
      Bool,
      Address,
      Void,
      Path,
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
  
    export function Optional(children: FTypes): T;
    export function Array(children: FTypes | FTypes[]): T;
    export function Dictionary(
      children: { key: FTypes; value: FTypes } | { key: FTypes; value: FTypes }[]
    ): T;
    export function Event(id: string, fields: { value: FTypes }[]): T;
    export function Resource(id: string, fields: { value: FTypes }[]): T;
    export function Struct(id: string, fields: { value: FTypes }[]): T;
  }
  