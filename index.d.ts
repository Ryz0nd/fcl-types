declare module "@onflow/fcl" {
  /**
   * Calling this method will authenticate the current user via any wallet that supports FCL.
   *
   * Once called, FCL will initiate communication with the configured `discovery.wallet` endpoint which lets the user select a wallet to authenticate with.
   *
   * Once the wallet provider has authenticated the user, FCL will set the values on the current user object for future use and authorization.
   */
  export function authenticate(opts?: Authenticate): void;
  /**
   * Logs out the current user and sets the values on the current user object to null.
   */
  export function unauthenticate(): void;
  /**
   * A convenience method that calls `fcl.unauthenticate()`
   *
   * and then `fcl.authenticate()` for the current user.
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
   * A convenience method that produces the needed authorization details for the current user to submit transactions to Flow.
   *
   * It defines a signing function that connects to a user's wallet provider to produce signatures to submit transactions.
   */
  export const authz: (...args: any) => any;
  /**
   * Holds the current user, if set, and offers a set of functions to manage the authentication and authorization of the user.
   */
  export function currentUser(): CurrentUser;
  /**
   * An alternative to Discovery Wallet (a pre-built service list for authentication)
   * where dapp developers can access services in directly in their code in order to build customized authentication experiences.
   */
  export const discovery: Discovery;
  /**
   * Allows you to submit scripts to query the blockchain.
   * @param cadence A valid cadence script.
   * @param args Any arguments to the script if needed should be supplied via a function that returns an array of arguments.
   * @param limit Compute (Gas) limit for query.
   */
  export function query({ cadence, args }: QueryArgs): Promise<any>;
  /**
   * Allows you to submit transactions to the blockchain to potentially mutate the state.
   * @param cadence A valid cadence transaction.
   * @param args Any arguments to the script if needed should be supplied via a function that returns an array of arguments.
   * @limit Compute (Gas) limit for query.
   * @proposer The authorization function that returns a valid AuthorizationObject for the proposer role.
   */
  export function mutate({
    cadence,
    args,
    limit,
    proposer,
    payer,
    authorizations,
  }: MutateArgs): Promise<string>;
  /**
   * A method allowing applications to cryptographically verify the ownership of a Flow account
   * by verifying a message was signed by a user's private key/s.
   *
   * This is typically used with the response from `currentUser().signUserMessage`.
   * @param message `A hexadecimal string`
   * @param compositeSignatures An Array of `CompositeSignatures`
   */
  export function verifyUserSignatures(
    message: string,
    compositeSignatures: CompositeSignature[]
  ): Promise<boolean>;
  /**
   * Sends arbitrary scripts, transactions, and requests to Flow.
   *
   * This method consumes an array of builders that are to be resolved and sent.
   *
   * The builders required to be included in the array depend on the interaction that is being built.
   * @param builders
   * @param opts `Object`
   */
  export function send(builders: Builder[], opts: any): Promise<ResponseObject>;
  /**
   * Decodes the response from `fcl.send()` into the appropriate JSON representation of any values returned from Cadence code.
   * @param response Should be the response returned from `fcl.send([...])`
   */
  export function decode(response: ResponseObject): Promise<any>;
  /**
   * A builder function that returns the interaction to get an account by address.
   * @param address Address of the user account with or without a prefix (both formats are supported).
   */
  export function getAccount(address: Address): Promise<(...args: any) => any>;
  /**
   * A builder function that returns the interaction to get the latest block.
   * @param isSealed If the latest block should be sealed or not.
   */
  export function getBlock(isSealed?: boolean): Promise<BlockObject>;
  /**
   * A builder function that returns a partial interaction to a block at a specific height.
   * @param blockHeight The height of the block to execute the interaction at.
   */
  export function atBlockHeight(blockHeight: number): Promise<any>;
  /**
   * A builder function that returns a partial interaction to a block at a specific block ID.
   * @param blockId The ID of the block to execute the interaction at.
   */
  export function atBlockId(blockId?: string): Promise<any>;
  /**
   * A builder function that returns the interaction to get a block header.
   * @param isSealed If the latest block should be sealed or not.
   */
  export function getBlockHeader(
    isSealed?: boolean
  ): Promise<BlockHeaderObject>;
  /**
   * A builder function that returns all instances of a particular event (by name) within a height range.
   */
  export function getEventsAtBlockHeightRange<EventData>(
    eventName: EventName,
    fromBlockHeight: number,
    toBlockHeight: number
  ): Promise<EventObject<EventData>[]>;
  /**
   * A builder function that returns all instances of a particular event (by name) within a set of blocks, specified by block ids.
   * @param eventName	The name of the event.
   * @param blockIds The ids of the blocks to scan for events.
   */
  export function getEventsAtBlockIds<EventData>(
    eventName: EventName,
    blockIds?: string[]
  ): Promise<EventObject<EventData>[]>;
  /**
   * A builder function that returns all a collection containing a list of transaction ids by its collection id.
   * @param collectionId The id of the collection.
   */
  export function getCollection(
    collectionId?: string
  ): Promise<CollectionObject>;
  /**
   * A builder function that returns the status of transaction.
   * @param transactionId
   * The transactionID returned when submitting a transaction.
   *
   * Example: `9dda5f281897389b99f103a1c6b180eec9dac870de846449a302103ce38453f3`
   */
  export function getTransactionStatus<EventData>(
    transactionId: string
  ): Promise<TransactionStatus<EventData>>;
  /**
   * A builder function that returns a transaction object once decoded.
   * @param transactionId
   * The transactionID returned when submitting a transaction.
   *
   * Example: `9dda5f281897389b99f103a1c6b180eec9dac870de846449a302103ce38453f3`
   */
  export function getTransaction<EventData>(
    transactionId: string
  ): Promise<Transaction<EventData>>;
  /**
   * A builder function
   */
  export function limit(computeLimit: number): Promise<any>;
  /**
   * A builder function
   */
  export function payer(
    authz: AuthorizationObject | AuthorizationFunction
  ): Promise<any>;
  /**
   * A builder function
   */
  export function proposer(
    authz: AuthorizationObject | AuthorizationFunction
  ): Promise<any>;
  /**
   * A builder function
   */
  export function authorizations(
    ax: Array<AuthorizationObject | AuthorizationFunction>
  ): Promise<any>;
  /**
   * A utility builder to be used with `fcl.args[...]` to create FCL supported arguments for interactions.
   * @param value Any value that you are looking to pass to other builders.
   * @param type A type supported by Flow.
   */
  export function arg(value: any, type: FType): Promise<ArgumentObject>;
  /**
   * A utility builder to be used with other builders to pass in arguments with a value and supported type.
   * @param args An array of arguments that you are looking to pass to other builders.
   */
  export function args(args: Promise<ArgumentObject>[]): Promise<any>;
  /**
   * A template builder to use a Cadence script for an interaction.
   * @param code Should be valid Cadence script.
   */
  export function script(code: string): Promise<any>;
  /**
   * A template builder to use a Cadence transaction for an interaction.
   * @param code Should be valid a Cadence transaction.
   */
  export function transaction(code: string): Promise<any>;
  /**
   * A pre-built interaction that returns the details of an account from their public address.
   * @param address Address of the user account with or without a prefix (both formats are supported).
   */
  export function account(address: Address): Promise<AccountObject>;
  /**
   * A pre-built interaction that returns the latest block (optionally sealed or not).
   * @param isSealed If the latest block should be sealed or not.
   */
  export function latestBlock(isSealed: boolean): Promise<BlockObject>;
  /**
   * A utility function that lets you set the transaction to get subsequent status updates (via polling) and the finalized result once available.
   * @param transactionId A valid transaction id.
   */
  export function tx<T>(transactionId: string): Tx<T>;
  /**
   * A utility function that lets you set the transaction to get subsequent status updates (via polling) and the finalized result once available.
   * @param eventName A valid event name.
   */
  export function events(eventName: string): Events;

  export function config(value?: { [key: string]: any }): ConfigMethod;

  export function withPrefix(address?: string): string;
  export function sansPrefix(address?: string): string;

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

  export interface ArgumentObject {
    value: any;
    xform: FType;
  }

  type ArgumentFunction = (
    arg: (value: any, type: FType) => ArgumentObject,
    t: Record<FTypes, FType>
  ) => ArgumentObject[];

  interface QueryArgs {
    cadence: string;
    args?: ArgumentFunction;
    limit?: number;
  }

  /**
   * A valid Flow address should be 16 characters in length.
   * A `0x` prefix is optional during inputs.
   * `eg. f8d6e0586b0a20c1`
   */
  export type Address = string;
  /**
   * A formatted string that is a valid cadence contract.
   */
  export type Contract = string;

  export interface KeyObject {
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

  export interface AccountObject {
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

  export interface AuthorizationAccountObject {
    kind: string;
    tempId: string;
    addr: string | null;
    keyId: number | null;
    sequenceNum: number | null;
    signature: string | null;
    /**
     * A function that allows FCL to sign using the authorization details and produce a valid signature.
     */
    signingFunction: (
      signable: Signable
    ) => Promise<Pick<this, "addr" | "keyId" | "signature">> | null;
    resolve: () => void | null;
    role: Role;
  }

  export interface AuthorizationObject {
    kind: string | null;
    tempId: string | null;
    signature: string | null;
    resolve: () => void | null;
    role: Role;
    /**
     * The address of the authorizer
     */
    addr: Address | null;
    /**
     * A function that allows FCL to sign using the authorization details and produce a valid signature.
     */
    signingFunction: (
      signable: Signable
    ) => Promise<Pick<this, "addr" | "keyId" | "signature">> | null;
    /**
     * 	The index of the key to use during authorization. (Multiple keys on an account is possible).
     */
    keyId: number | null;
    /**
     * A number that is incremented per transaction using they keyId.
     */
    sequenceNum: number | null;
  }

  export type Role = {
    proposer: boolean;
    authorizer: boolean;
    payer: boolean;
    param: boolean;
  };

  export type AuthorizationFunction = (
    account: AuthorizationAccountObject
  ) => AuthorizationObject;

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

  export interface CompositeSignature {
    f_type: string;
    f_vsn: string;
    addr: string;
    keyId: number;
    signature: string;
  }

  interface CurrentUser {
    /**
     * The callback passed to subscribe will be called when the user authenticates and un-authenticates,
     * making it easy to update the UI accordingly.
     */
    subscribe: (callback: (value: CurrentUserObject) => void) => void;
    /**
     * Returns the current user object.
     *
     * This is the same object that is set and available on `fcl.currentUser().subscribe(callback)`.
     */
    snapshot: () => CurrentUserObject;
    /**
     * Equivalent to `fcl.authenticate`.
     */
    authenticate: (opts?: Authenticate) => void;
    /**
     * Equivalent to `fcl.unauthenticate`.
     */
    unauthenticate: () => void;
    /**
     * Equivalent to `fcl.authz`.
     */
    authorization: AuthorizationObject;
    /**
     * A method to use allowing the user to personally sign data via FCL Compatible Wallets/Services.
     */
    signUserMessage: (message: string) => Promise<CompositeSignature>;
  }

  export interface Authn {
    result: any;
  }

  interface Discovery {
    authn: {
      snapshot: () => Promise<Authn>;
      subscribe: (callback: (value: Authn) => void) => void;
    };
  }

  export interface Signable {
    /**
     * The encoded string which needs to be used to produce the signature.*/

    message: string;
    /**  The address of the Flow Account this signature is to be produced for.*/
    addr: Address | null;
    /** The keyId of the key which is to be used to produce the signature. */
    keyId: number | null;
    roles: {
      /** A Boolean representing if this signature to be produced for a proposer. */
      proposer: boolean;
      /** A Boolean representing if this signature to be produced for a authorizer.*/
      authorizer: boolean;
      /** A Boolean representing if this signature to be produced for a payer.*/
      payer: boolean;
    };
    /** The raw transactions information, can be used to create the message for additional safety and lack of trust in the supplied message.*/
    voucher: any;
  }
  interface MutateArgs extends QueryArgs {
    /**
     * Default is `fcl.authz`
     */
    proposer?: AuthorizationObject | AuthorizationFunction;
    /**
     * Default is `fcl.authz`
     */
    payer?: AuthorizationObject | AuthorizationFunction;
    /**
     * Default is `[fcl.authz]`
     */
    authorizations?: Array<AuthorizationObject | AuthorizationFunction>;
  }

  export enum TransactionStatusCode {
    /**
     * Unknown
     */
    Unknown = 0,
    /**
     * Transaction Pending - Awaiting Finalization
     */
    Pending,
    /**
     * Transaction Finalized - Awaiting Execution
     */
    Finalized,
    /**
     * Transaction Executed - Awaiting Sealing
     */
    Executed,
    /**
     * Transaction Sealed - Transaction Complete. At this point the transaction
     * result has been committed to the blockchain.
     */
    Sealed,
    /**
     * Transaction Expired
     */
    Expired,
  }


  export enum GRPCStatus {
    
    /**
     * OK - Not an error; returned on success.
     */
    OK = 0,
    /**
     * CANCELLED - 	The operation was cancelled, typically by the caller.
     */
    CANCELLED,
    /**
     * UNKNOWN - Unknown error. For example, this error may be returned when a
     * Status value received from another address space belongs to an error
     * space that is not known in this address space. Also errors raised by APIs
     * that do  not return enough error information may be converted to this
     * error.
     */
    UNKNOWN,
    /**
     * INVALID_ARGUMENT - The client specified an invalid argument. Note that
     * this differs from FAILED_PRECONDITION. INVALID_ARGUMENT indicates
     * arguments that are problematic regardless of the state of the system
     * (e.g., a malformed file name).
     */
    INVALID_ARGUMENT,
    /**
     * DEADLINE_EXCEEDED - The deadline expired before the operation could
     * complete. For operations that change the state of the system, this error
     * may be returned even if the operation has completed successfully. For
     * example, a successful response from a server could have been delayed
     * long.
     */
    DEADLINE_EXCEEDED,
    /**
     * NOT_FOUND - Some requested entity (e.g., file or directory) was not
     * found. Note to server developers: if a request is denied for an entire
     * class of users, such as gradual feature rollout or undocumented
     * allowlist, NOT_FOUND may be used. If a request is denied for some users
     * within a class of users, such as user-based access control,
     * PERMISSION_DENIED must be used.
     */
    NOT_FOUND,
    /**
     * ALREADY_EXISTS - The entity that a client attempted to create (e.g., file
     * or directory) already exists.
     */
    ALREADY_EXISTS,
    /**
     * PERMISSION_DENIED - The caller does not have permission to execute the
     * specified operation. PERMISSION_DENIED must not be used for rejections
     * caused by exhausting some resource (use RESOURCE_EXHAUSTED instead for
     * those errors). PERMISSION_DENIED must not be used if the caller can not
     * be identified (use UNAUTHENTICATED instead for those errors). This error
     * code does not imply the request is valid or the requested entity exists
     * or satisfies other pre-conditions.
     */
    PERMISSION_DENIED,
    /**
     * RESOURCE_EXHAUSTED - Some resource has been exhausted, perhaps a per-user
     * quota, or perhaps the entire file system is out of space.
     */
    RESOURCE_EXHAUSTED,
    /**
     * FAILED_PRECONDITION - The operation was rejected because the system is
     * not in a state required for the operation's execution. For example, the
     * directory to be deleted is non-empty, an rmdir operation is applied to a
     * non-directory, etc. Service implementors can use the following guidelines
     * to decide between FAILED_PRECONDITION, ABORTED, and UNAVAILABLE: (a) Use
     * UNAVAILABLE if the client can retry just the failing call. (b) Use
     * ABORTED if the client should retry at a higher level (e.g., when a
     * client-specified test-and-set fails, indicating the client should restart
     * a read-modify-write sequence). (c) Use FAILED_PRECONDITION if the client
     * should not retry until the system state has been explicitly fixed. E.g.,
     * if an "rmdir" fails because the directory is non-empty,
     * FAILED_PRECONDITION should be returned since the client should not retry
     * unless the files are deleted from the directory.
     */
    FAILED_PRECONDITION,
    /**
     * ABORTED - The operation was aborted, typically due to a concurrency issue
     * such as a sequencer check failure or transaction abort. See the
     * guidelines above for deciding between FAILED_PRECONDITION, ABORTED, and
     * UNAVAILABLE.
     */
    ABORTED,
    /**
     * OUT_OF_RANGE - The operation was attempted past the valid range. E.g.,
     * seeking or reading past end-of-file. Unlike INVALID_ARGUMENT, this error
     * indicates a problem that may be fixed if the system state changes. For
     * example, a 32-bit file system will generate INVALID_ARGUMENT if asked to
     * read at an offset that is not in the range [0,2^32-1], but it will
     * generate OUT_OF_RANGE if asked to read from an offset past the current
     * file size. There is a fair bit of overlap between FAILED_PRECONDITION and
     * OUT_OF_RANGE. We recommend using OUT_OF_RANGE (the more specific error)
     * when it applies so that callers who are iterating through a space can
     * easily look for an OUT_OF_RANGE error to detect when they are done.
     */
    OUT_OF_RANGE,
    /**
     * UNIMPLEMENTED - The operation is not implemented or is not
     * supported/enabled in this service.
     */
    UNIMPLEMENTED,
    /**
     * INTERNAL - Internal errors. This means that some invariants expected by
     * the underlying system have been broken. This error code is reserved for
     * serious errors.
     */
    INTERNAL,
    /**
     * UNAVAILABLE - The service is currently unavailable. This is most likely a
     * transient condition, which can be corrected by retrying with a backoff.
     * Note that it is not always safe to retry non-idempotent operations.
     */
    UNAVAILABLE,
    /**
     * DATA_LOSS - Unrecoverable data loss or corruption.
     */
    DATA_LOSS,
    /**
     * UNAUTHENTICATED - The request does not have valid authentication
     * credentials for the operation.
     */
    UNAUTHENTICATED,
  }
    
    
    export interface TransactionStatus<EventData> {
    /**
     * An array of events that were emitted during the transaction.
     */
    events: EventObject<EventData>[];
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

  export type Transaction<T> = Omit<TransactionStatus<T>, "statusString">;

  interface Authenticate {
    service?: any;
    redir?: boolean;
  }

  interface ResponseEvent {
    type: string;
    transactionId: number;
    transactionIndex: number;
    eventIndex: number;
    payload: Uint8Array;
  }

  interface ResponseKey {
    index: number;
    publicKey: string;
    signAlgo: number;
    hashAlgo: number;
    weight: number;
    sequenceNumber: number;
  }

  interface ResponseSignature {
    sequenceNumber: string;
    keyId: number;
    signature: string;
  }
  export interface ResponseObject {
    tag: number | null;
    transaction: {
      script: string;
      args: string[];
      referenceBlockId: string;
      gasLimit: number;
      proposalKey: ResponseKey;
      payer: string;
      proposer: string;
      authorizers: string[];
      payloadSignatures: ResponseSignature[];
      envelopeSignatures: ResponseSignature[];
    } | null;
    transactionStatus: {
      status: number;
      statusCode: number;
      errorMessage: string;
      events: ResponseEvent[];
    } | null;
    transactionId: string | null;
    encodedData: Uint8Array | null;
    events: {
      results: ResponseEvent[];
    } | null;
    account: {
      address: string;
      code: string;
      keys: ResponseKey[];
    } | null;
    block: {
      id: string;
      parentId: string;
      height: number;
      timestamp: string;
      collectionGuarantees: CollectionGuaranteeObject[];
      blockSeals: {
        blockId: string;
        executionReceiptId: string;
        executionReceiptSignatures: string[];
        resultApprovalSignatures: string[];
      };
      signatures: string[];
    } | null;
    blockHeader: {
      id: string;
      parentId: string;
      height: number;
      timestamp: string;
    } | null;
    collection: {
      id: string;
      transactionIds: string[];
    } | null;
  }

  type Builder = Promise<any>;

  export interface CollectionGuaranteeObject {
    collectionId: string;
    signatures: any[];
  }

  export interface BlockObject {
    id: string;
    parentId: string;
    height: number;
    timestamp: Record<string, any>;
    collectionGuarantees: CollectionGuaranteeObject[];
    blockSeals: any[];
    signatures: Uint8Array;
  }

  export type BlockHeaderObject = Pick<
    BlockObject,
    "id" | "parentId" | "height" | "timestamp"
  >;

  /**
   * A event name in Flow must follow the format
   *
   * `A.{AccountAddress}.{ContractName}.{EventName}`
   * `eg. A.ba1132bc08f82fe2.Debug.Log`
   */
  type EventName = string;

  export interface EventObject<Data> {
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
    data: Data;
  }

  export interface TxSubscribe<EventData> {
    status: TransactionStatusCode;
    statusCode: number;
    errorMessage: string;
    events: Pick<
      EventObject<EventData>,
      "data" | "eventIndex" | "transactionId" | "transactionIndex" | "type"
    >[];
  }

  export interface CollectionObject {
    /**
     * The id of the collection.
     */
    id: string;
    /**
     * The ids of the transactions included in the collection.
     */
    transactionIds: string[];
  }

  interface Tx<EventData> {
    snapshot: () => void;
    subscribe: (callback: (response: TxSubscribe<EventData>) => void) => void;
    onceFinalized: () => Promise<Transaction<EventData>>;
    onceExecuted: () => Promise<Transaction<EventData>>;
    onceSealed: () => Promise<Transaction<EventData>>;
  }

  interface Events {
    subscribe: (callback: any) => void;
  }

  interface ConfigMethod {
    get: (key: string, value: any) => Promise<any>;
    put: (key: string, value: any) => Omit<this, "get">;
  }
}

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
