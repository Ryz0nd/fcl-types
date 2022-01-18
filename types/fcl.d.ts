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
    xform: FType;
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
    proposer?: AuthorizationObject;
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

  export function authenticate({ service, redir }: Authenticate): void;
  /**
   * Logs out the current user and sets the values on the current user object to null.
   */
  export function unauthenticate(): void;
  /**
   * A convenience method that calls fcl.unauthenticate() and then fcl.authenticate() for the current user.
   */
  export function reauthenticate(opts?: Record<string, any>): void;
  /**
   * A convenience method that calls and is equivalent to fcl.authenticate().
   */
  export function signUp(opts?: Record<string, any>): void;
  /**
   * A convenience method that calls and is equivalent to `fcl.authenticate()`.
   */
  export function logIn(opts?: Record<string, any>): void;

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

  export interface Authn {
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
   * A method allowing applications to cryptographically verify the ownership of a Flow account by verifying a message was signed by a user's private key/s.
   * This is typically used with the response from `currentUser().signUserMessage`.
   * @param message `A hexadecimal string`
   * @param compositeSignatures `An Array of `CompositeSignatures`
   */
  export function verifyUserSignatures(
    message: string,
    compositeSignatures: CompositeSignature[]
  ): Promise<boolean>;

  interface ResponseObject {
    tag: number | null;
    transaction: {
      script: string;
      args: string[];
      referenceBlockId: string;
      gasLimit: number;
    } | null;
  }

  type Builder = Promise<any>;

  export function send(builders: Builder[]): Promise<ResponseObject>;
  export function decode(response: ResponseObject): Promise<any>;
  export function getAccount(address: Address): Promise<AccountObject>;

  interface CollectionGuaranteeObject {
    collectionId: string;
    signatures: any[];
  }

  interface BlockObject {
    id: string;
    parentId: string;
    height: number;
    timestamp: Record<string, any>;
    collectionGuarantees: CollectionGuaranteeObject[];
    blockSeals: any[];
    signatures: any[];
  }

  export function getBlock(isSealed?: boolean): Promise<BlockObject>;
  export function atBlockHeight(blockHeight: number): Promise<any>;
  export function atBlockId(blockId?: string): Promise<any>;

  type BlockHeaderObject = Pick<
    BlockObject,
    "id" | "parentId" | "height" | "timestamp"
  >;
  export function getBlockHeader(): Promise<BlockHeaderObject>;

  /**
   * A event name in Flow must follow the format
   * `A.{AccountAddress}.{ContractName}.{EventName}`
   * `eg. A.ba1132bc08f82fe2.Debug.Log`
   */
  type EventName = string;

  interface EventObject {
    /**
     * 	ID of the block that contains the event.
     */
    blockId: string;
    /**
     * Height of the block that contains the event.
     */
    blockHeight: number;
    /**
     * The timestamp of when the block was sealed in a `DateString` format. `eg. '2021-06-25T13:42:04.227Z'`
     */
    blockTimestamp: string;
    /**
     * 	A string containing the event name.
     */
    type: EventName;
    /**
     * Can be used to query transaction information, eg. via a Flow block explorer.
     */
    transactionId: string;
    /**
     * Used to prevent replay attacks. Used to prevent replay attacks.
     */
    transactionIndex: number;
    /**
     * Used to prevent replay attacks.
     */
    eventIndex: number;
    /**
     * The data emitted from the event.
     */
    data: any;
  }

  export function getEventsAtBlockHeightRange(
    eventName: EventName,
    fromBlockHeight: number,
    toBlockHeight: number
  ): Promise<EventObject[]>;

  export function getEventsAtBlockIds(
    eventName: EventName,
    blockIds: number
  ): Promise<EventObject[]>;

  /**
   * 0: `Unknown`
   *
   * 1: `Transaction Pending - Awaiting Finalization`
   *
   * 2: `	Transaction Finalized - Awaiting Execution`
   *
   * 3: `Transaction Executed - Awaiting Sealing`
   *
   * 4: `Transaction Sealed - Transaction Complete. At this point the transaction result has been committed to the blockchain.`
   *
   * 5: `Transaction Expired`
   */
  enum TransactionStatusCode {
    "Unknown" = 0,
    "Pending" = 1,
    "Finalized" = 2,
    "Executed" = 3,
    "Sealed" = 4,
    "Expired" = 5,
  }
  type GRPCStatus = any;

  interface TransactionStatus {
    /**
     * An array of events that were emitted during the transaction.
     */
    events: EventObject[];
    /**
     * The status of the transaction on the blockchain.
     */
    status: TransactionStatusCode;
    /**
     * The `status` as as descriptive text (e.g. "FINALIZED").
     */
    statusString: TransactionStatusCode;
    /**
     * An error message if it exists. Default is an empty string `''`.
     */
    errorMessage: string;
    /**
     * 	The status from the GRPC response.
     */
    statusCode: GRPCStatus;
  }

  /**
   *
   * @param transactionId The transactionID returned when submitting a transaction. Example: `9dda5f281897389b99f103a1c6b180eec9dac870de846449a302103ce38453f3`
   */
  export function getTransactionStatus(
    transactionId: string
  ): Promise<TransactionStatus>;

  type Transaction = Omit<TransactionStatus, "statusString">;

  export function getTransaction(transactionId: string): Promise<Transaction>;

  export function arg(value: any, type: FType): Promise<ArgumentObject>;

  export function args(args: Promise<ArgumentObject[]>): Promise<any>;

  export function script(code: string): Promise<any>;

  export function transaction(code: string): Promise<any>;

  export function account(address: Address): Promise<AccountObject>;

  export function latestBlock(isSealed: boolean): Promise<BlockObject>;

  export interface TxSubscribe {
    status: TransactionStatusCode;
    statusCode: number;
    errorMessage: string;
    events: {
      data: {
        amount: string;
        from: string;
      };
      eventIndex: number;
      transactionId: string;
      transactionIndex: number;
      type: string;
    }[];
  }

  interface Tx {
    snapshot: () => void;
    subscribe: (callback: (response: TxSubscribe) => void) => void;
    onceFinalized: () => Promise<Transaction>;
    onceExecuted: () => Promise<Transaction>;
    onceSealed: () => Promise<Transaction>;
  }

  export function tx(transactionId: string): Tx;

  interface Events {
    subscribe: (callback: any) => void;
  }

  export function events(eventName: string): Events;

  interface ConfigMethod {
    get: (key: string, value: any) => Promise<any>;
    put: (key: string, value: any) => Omit<this, "get">;
  }

  export function config(value?: { [key: string]: any }): ConfigMethod;
}
