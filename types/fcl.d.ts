declare module "@onflow/fcl" {
  /**
   * Calling this method will authenticate the current user via any wallet that supports FCL.
   *
   * Once called, FCL will initiate communication with the configured `discovery.wallet` endpoint which lets the user select a wallet to authenticate with.
   *
   * Once the wallet provider has authenticated the user, FCL will set the values on the current user object for future use and authorization.
   */
  export function authenticate({ service, redir }: Authenticate): void;
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
  export const authz: AuthorizationObject;
  /**
   * Holds the current user, if set, and offers a set of functions to manage the authentication and authorization of the user.
   */
  export const currentUser: CurrentUser;
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
   */
  export function send(builders: Builder[]): Promise<ResponseObject>;
  /**
   * Decodes the response from `fcl.send()` into the appropriate JSON representation of any values returned from Cadence code.
   * @param response Should be the response returned from `fcl.send([...])`
   */
  export function decode(response: ResponseObject): Promise<any>;
  /**
   * A builder function that returns the interaction to get an account by address.
   * @param address Address of the user account with or without a prefix (both formats are supported).
   */
  export function getAccount(address: Address): Promise<AccountObject>;
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
   */
  export function getBlockHeader(): Promise<BlockHeaderObject>;
  /**
   * A builder function that returns all instances of a particular event (by name) within a height range.
   */
  export function getEventsAtBlockHeightRange(
    eventName: EventName,
    fromBlockHeight: number,
    toBlockHeight: number
  ): Promise<EventObject[]>;
  /**
   * A builder function that returns all instances of a particular event (by name) within a set of blocks, specified by block ids.
   * @param eventName	The name of the event.
   * @param blockIds The ids of the blocks to scan for events.
   */
  export function getEventsAtBlockIds(
    eventName: EventName,
    blockIds: number
  ): Promise<EventObject[]>;
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
  export function getTransactionStatus(
    transactionId: string
  ): Promise<TransactionStatus>;
  /**
   * A builder function that returns a transaction object once decoded.
   * @param transactionId
   * The transactionID returned when submitting a transaction.
   *
   * Example: `9dda5f281897389b99f103a1c6b180eec9dac870de846449a302103ce38453f3`
   */
  export function getTransaction(transactionId: string): Promise<Transaction>;
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
  export function args(args: Promise<ArgumentObject[]>): Promise<any>;
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
  export function tx(transactionId: string): Tx;
  /**
   * A utility function that lets you set the transaction to get subsequent status updates (via polling) and the finalized result once available.
   * @param eventName A valid event name.
   */
  export function events(eventName: string): Events;

  export function config(value?: { [key: string]: any }): ConfigMethod;

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
    arg: (value: any, type: FType) => void,
    t: Record<FTypes, FType>
  ) => void[];

  interface QueryArgs {
    cadence: string;
    args?: ArgumentFunction;
    limit?: number;
  }

  /**
   * A valid Flow address should be 16 characters in length.
     A `0x` prefix is optional during inputs.
     `eg. f8d6e0586b0a20c1`
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

  export interface AuthorizationObject {
    /**
     * The address of the authorizer
     */
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
    subscribe: (callback: (value: CurrentUserObject) => void) => void;
    snapshot: CurrentUserObject;
    authenticate: ({ service, redir }: Authenticate) => void;
    unauthenticate: () => void;
    authorization: AuthorizationObject;
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

  export interface TransactionStatus {
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

  export type Transaction = Omit<TransactionStatus, "statusString">;

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
   * `A.{AccountAddress}.{ContractName}.{EventName}`
   * `eg. A.ba1132bc08f82fe2.Debug.Log`
   */
  type EventName = string;

  export interface EventObject {
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

  interface Tx {
    snapshot: () => void;
    subscribe: (callback: (response: TxSubscribe) => void) => void;
    onceFinalized: () => Promise<Transaction>;
    onceExecuted: () => Promise<Transaction>;
    onceSealed: () => Promise<Transaction>;
  }

  interface Events {
    subscribe: (callback: any) => void;
  }

  interface ConfigMethod {
    get: (key: string, value: any) => Promise<any>;
    put: (key: string, value: any) => Omit<this, "get">;
  }
}
