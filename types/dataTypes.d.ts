declare module "@onflow/types" {
  interface FType {
    label: any;
    asArgument: any;
    asInjection: any;
  }

  export let Identity: FType,
    UInt: FType,
    UInt8: FType,
    UInt16: FType,
    UInt32: FType,
    UInt64: FType,
    UInt128: FType,
    UInt256: FType,
    Int: FType,
    Int8: FType,
    Int16: FType,
    Int32: FType,
    Int64: FType,
    Int128: FType,
    Int256: FType,
    Word8: FType,
    Word16: FType,
    Word3: FType,
    Word64: FType,
    UFix64: FType,
    Fix64: FType,
    String: FType,
    Character: FType,
    Bool: FType,
    Address: FType,
    Void: FType,
    Path: FType,
    Reference: FType;

  export function Optional(children: FType): FType;
  export function Array(children: FType | FType[]): FType;
  export function Dictionary(
    children: { key: FType; value: FType } | { key: FType; value: FType }[]
  ): FType;
  export function Event(id: string, fields: { value: FType }[]): FType;
  export function Resource(id: string, fields: { value: FType }[]): FType;
  export function Struct(id: string, fields: { value: FType }[]): FType;
}
