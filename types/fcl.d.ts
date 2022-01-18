declare module "@onflow/fcl" {
    interface FType {
      label: any;
      asArgument: any;
      asInjection: any;
    }
  
    type FTypes =
      | "Identity"
      | "UInt"
      | "UInt8"
      | "UInt16"
      | "UInt32"
      | "UInt64"
      | "UInt128"
      | "UInt256"
      | "Int"
      | "Int8"
      | "Int16"
      | "Int32"
      | "Int64"
      | "Int128"
      | "Int256"
      | "Word8"
      | "Word16"
      | "Word3"
      | "Word64"
      | "UFix64"
      | "Fix64"
      | "String"
      | "Character"
      | "Bool"
      | "Address"
      | "Void"
      | "Path";
  
    interface ArgumentObject {
      value: any;
      type: FType;
    }
  
    type ArgumentFunction = (
      arg: (value: any, type: FType) => void,
      t: Record<FTypes, FType>
    ) => void[];
  
    interface QueryArgs {
      cadence: string;
      args?: ArgumentFunction;
      limit?: number;
    }
    export function query({ cadence, args }: QueryArgs): Promise<any>;
  
    interface MutateArgs extends QueryArgs {
      /**
       * Default is `fcl.authz`
       */
      proposer?: AuthorizationFunction | AuthorizationObject;
      /**
       * Default is `fcl.authz`
       */
      payer?: AuthorizationObject;
      /**
       * Default is `[fcl.authz]`
       */
      authorizations?: AuthorizationObject[];
    }
  
    export function mutate({
      cadence,
      args,
      limit,
      proposer,
    }: MutateArgs): Promise<string>;
  
    interface Authenticate {
      service?: any;
      redir?: boolean;
    }
  
    export function authenticate({ service, redir }: Authenticate);
    /**
     * Logs out the current user and sets the values on the current user object to null.
     */
    export function unauthenticate();
    /**
     * A convenience method that calls fcl.unauthenticate() and then fcl.authenticate() for the current user.
     */
    export function reauthenticate(opts?: Record<string, any>);
    /**
     * A convenience method that calls and is equivalent to fcl.authenticate().
     */
    export function signUp(opts?: Record<string, any>);
    /**
     * A convenience method that calls and is equivalent to `fcl.authenticate()`.
     */
    export function logIn(opts?: Record<string, any>);
  
    /**
     * A valid Flow address should be 16 characters in length.
       A `0x` prefix is optional during inputs.
       `eg. f8d6e0586b0a20c1`
     */
    type Address = string;
    type Contract = string;
  
    interface KeyObject {
      /**
       * The address of the account.
       */
      index: number;
      /**
       * The FLOW balance of the account in 10*6.
       */
      publicKey: string;
      /**
       * An index referring to one of `ECDSA_P256` or `ECDSA_secp256k1`
       */
      signAlgo: number;
      /**
       * An index referring to one of `SHA2_256` or `SHA3_256`
       */
      hashAlgo: number;
      /**
       * A number between 1 and 1000 indicating the relative weight to other keys on the account.
       */
      weight: number;
      /**
       * This number is incremented for every transaction signed using this key.
       */
      sequenceNumber: number;
      /**
       * If this key has been disabled for use.
       */
      revoked: boolean;
    }
  
    interface AccountObject {
      /**
       * The address of the account
       */
      address: Address;
      /**
       * The FLOW balance of the account in 10*6.
       */
      balance: number;
      /**
       * The code of any Cadence contracts stored in the account.
       */
      code: any;
      /**
       * An object with keys as the contract name deployed and the value as the the cadence string.
       */
      contracts: Record<string, Contract>;
      /**
       * Any contracts deployed to this account.
       */
      keys: KeyObject[];
    }
  
    interface AuthorizationFunction {
      account: AccountObject;
    }
  
    interface AuthorizationObject {
      addr: Address;
      /**
       * A function that allows FCL to sign using the authorization details and produce a valid signature.
       */
      siginingFunction: () => void;
      /**
       * 	The index of the key to use during authorization. (Multiple keys on an account is possible).
       */
      keyId: number;
      /**
       * A number that is incremented per transaction using they keyId.
       */
      sequenceNum: number;
    }
    export const authz: AuthorizationObject;
  
    export interface CurrentUserObject {
      /**
       * The public address of the current user
       */
      addr: Address | null;
      /**
       * Allows wallets to specify a content identifier for user metadata.
       */
      cid: string | null;
      /**
       * Allows wallets to specify a time-frame for a valid session.
       */
      expiresAt: number | "null";
      /**
       * A type identifier used internally by FCL. Default is `"USER"`
       */
      f_type: string;
      /**
       * FCL protocol version.
       */
      f_vsn: string;
      /**
       * 	If the user is logged in.
       */
      loggedIn: boolean | null;
      /**
       * Check return types here https://gist.github.com/orodio/a74293f65e83145ec8b968294808cf35#you-know-who-the-user-is!
       */
      services: any[];
    }
  
    interface CompositeSignature {
      f_type: string;
      f_vsn: string;
      addr: string;
      keyId: number;
      signature: string;
    }
  
    interface CurrentUser {
      subscribe: (callback: (value: CurrentUserObject) => void) => void;
      snapshot: CurrentUserObject;
      authenticate: ({ service, redir }: Authenticate) => void;
      unauthenticate: () => void;
      authorization: AuthorizationObject;
      signUserMessage: (message: string) => Promise<CompositeSignature>;
    }
    export const currentUser: CurrentUser;
  
    interface Authn {
      result: any;
    }
  
    interface Discovery {
      authn: {
        snapshot: () => Promise<Authn>;
        subscribe: (callback: (value: Authn) => void) => void;
      };
    }
    export const discovery: Discovery;
  
    /**
     * 메시지가 사용자의 개인 키로 서명되었는지 확인하여 애플리케이션이 Flow 계정의 소유권을 암호화 방식으로 확인할 수 있도록 하는 방법입니다.
     * 일반적으로 `currentUser().signUserMessage`의 응답과 함께 사용됩니다. 
     * @param message 16진수 문자열
     * @param compositeSignatures `currentUser().signUserMessage`의 Return 값
     */
    export function verifyUserSignatures(
      message: string,
      compositeSignatures: CompositeSignature[]
    ): Promise<boolean>;
  }
  