
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Lead
 * 
 */
export type Lead = $Result.DefaultSelection<Prisma.$LeadPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model TokenizedAsset
 * 
 */
export type TokenizedAsset = $Result.DefaultSelection<Prisma.$TokenizedAssetPayload>
/**
 * Model TokenHolder
 * 
 */
export type TokenHolder = $Result.DefaultSelection<Prisma.$TokenHolderPayload>
/**
 * Model Payment
 * 
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>
/**
 * Model Demo
 * 
 */
export type Demo = $Result.DefaultSelection<Prisma.$DemoPayload>
/**
 * Model SystemEvent
 * 
 */
export type SystemEvent = $Result.DefaultSelection<Prisma.$SystemEventPayload>
/**
 * Model SniperTarget
 * 
 */
export type SniperTarget = $Result.DefaultSelection<Prisma.$SniperTargetPayload>
/**
 * Model EmailEvent
 * 
 */
export type EmailEvent = $Result.DefaultSelection<Prisma.$EmailEventPayload>
/**
 * Model KnowledgeEmbedding
 * 
 */
export type KnowledgeEmbedding = $Result.DefaultSelection<Prisma.$KnowledgeEmbeddingPayload>
/**
 * Model Embedding
 * 
 */
export type Embedding = $Result.DefaultSelection<Prisma.$EmbeddingPayload>
/**
 * Model Account
 * Chart of Accounts — types: WALLET (asset), CLEARING (liability),
 * INCOME (revenue), EXPENSE (cost), EQUITY (capital).
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model LedgerTransaction
 * A single double-entry transaction. Every transaction
 * must have balanced entries (sum debits = sum credits).
 * State machine: PENDING → POSTED, PENDING → REVERSED, POSTED → REVERSED.
 */
export type LedgerTransaction = $Result.DefaultSelection<Prisma.$LedgerTransactionPayload>
/**
 * Model Entry
 * Individual entry leg. Each entry carries either a debit
 * amount (positive) or a credit amount (positive). For any
 * transaction, Σ(debits) must equal Σ(credits).
 */
export type Entry = $Result.DefaultSelection<Prisma.$EntryPayload>
/**
 * Model LedgerIdempotency
 * Optional dedicated table for idempotency lookups.
 * Avoids scanning LedgerTransaction for retried operations.
 */
export type LedgerIdempotency = $Result.DefaultSelection<Prisma.$LedgerIdempotencyPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Leads
 * const leads = await prisma.lead.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Leads
   * const leads = await prisma.lead.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.lead`: Exposes CRUD operations for the **Lead** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Leads
    * const leads = await prisma.lead.findMany()
    * ```
    */
  get lead(): Prisma.LeadDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tokenizedAsset`: Exposes CRUD operations for the **TokenizedAsset** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TokenizedAssets
    * const tokenizedAssets = await prisma.tokenizedAsset.findMany()
    * ```
    */
  get tokenizedAsset(): Prisma.TokenizedAssetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tokenHolder`: Exposes CRUD operations for the **TokenHolder** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TokenHolders
    * const tokenHolders = await prisma.tokenHolder.findMany()
    * ```
    */
  get tokenHolder(): Prisma.TokenHolderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.demo`: Exposes CRUD operations for the **Demo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Demos
    * const demos = await prisma.demo.findMany()
    * ```
    */
  get demo(): Prisma.DemoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.systemEvent`: Exposes CRUD operations for the **SystemEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SystemEvents
    * const systemEvents = await prisma.systemEvent.findMany()
    * ```
    */
  get systemEvent(): Prisma.SystemEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sniperTarget`: Exposes CRUD operations for the **SniperTarget** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SniperTargets
    * const sniperTargets = await prisma.sniperTarget.findMany()
    * ```
    */
  get sniperTarget(): Prisma.SniperTargetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.emailEvent`: Exposes CRUD operations for the **EmailEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmailEvents
    * const emailEvents = await prisma.emailEvent.findMany()
    * ```
    */
  get emailEvent(): Prisma.EmailEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.knowledgeEmbedding`: Exposes CRUD operations for the **KnowledgeEmbedding** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more KnowledgeEmbeddings
    * const knowledgeEmbeddings = await prisma.knowledgeEmbedding.findMany()
    * ```
    */
  get knowledgeEmbedding(): Prisma.KnowledgeEmbeddingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.embedding`: Exposes CRUD operations for the **Embedding** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Embeddings
    * const embeddings = await prisma.embedding.findMany()
    * ```
    */
  get embedding(): Prisma.EmbeddingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ledgerTransaction`: Exposes CRUD operations for the **LedgerTransaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LedgerTransactions
    * const ledgerTransactions = await prisma.ledgerTransaction.findMany()
    * ```
    */
  get ledgerTransaction(): Prisma.LedgerTransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.entry`: Exposes CRUD operations for the **Entry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Entries
    * const entries = await prisma.entry.findMany()
    * ```
    */
  get entry(): Prisma.EntryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ledgerIdempotency`: Exposes CRUD operations for the **LedgerIdempotency** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LedgerIdempotencies
    * const ledgerIdempotencies = await prisma.ledgerIdempotency.findMany()
    * ```
    */
  get ledgerIdempotency(): Prisma.LedgerIdempotencyDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Lead: 'Lead',
    User: 'User',
    TokenizedAsset: 'TokenizedAsset',
    TokenHolder: 'TokenHolder',
    Payment: 'Payment',
    Demo: 'Demo',
    SystemEvent: 'SystemEvent',
    SniperTarget: 'SniperTarget',
    EmailEvent: 'EmailEvent',
    KnowledgeEmbedding: 'KnowledgeEmbedding',
    Embedding: 'Embedding',
    Account: 'Account',
    LedgerTransaction: 'LedgerTransaction',
    Entry: 'Entry',
    LedgerIdempotency: 'LedgerIdempotency'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "lead" | "user" | "tokenizedAsset" | "tokenHolder" | "payment" | "demo" | "systemEvent" | "sniperTarget" | "emailEvent" | "knowledgeEmbedding" | "embedding" | "account" | "ledgerTransaction" | "entry" | "ledgerIdempotency"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Lead: {
        payload: Prisma.$LeadPayload<ExtArgs>
        fields: Prisma.LeadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LeadFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LeadFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          findFirst: {
            args: Prisma.LeadFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LeadFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          findMany: {
            args: Prisma.LeadFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>[]
          }
          create: {
            args: Prisma.LeadCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          createMany: {
            args: Prisma.LeadCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LeadCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>[]
          }
          delete: {
            args: Prisma.LeadDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          update: {
            args: Prisma.LeadUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          deleteMany: {
            args: Prisma.LeadDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LeadUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LeadUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>[]
          }
          upsert: {
            args: Prisma.LeadUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          aggregate: {
            args: Prisma.LeadAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLead>
          }
          groupBy: {
            args: Prisma.LeadGroupByArgs<ExtArgs>
            result: $Utils.Optional<LeadGroupByOutputType>[]
          }
          count: {
            args: Prisma.LeadCountArgs<ExtArgs>
            result: $Utils.Optional<LeadCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      TokenizedAsset: {
        payload: Prisma.$TokenizedAssetPayload<ExtArgs>
        fields: Prisma.TokenizedAssetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TokenizedAssetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenizedAssetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TokenizedAssetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenizedAssetPayload>
          }
          findFirst: {
            args: Prisma.TokenizedAssetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenizedAssetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TokenizedAssetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenizedAssetPayload>
          }
          findMany: {
            args: Prisma.TokenizedAssetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenizedAssetPayload>[]
          }
          create: {
            args: Prisma.TokenizedAssetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenizedAssetPayload>
          }
          createMany: {
            args: Prisma.TokenizedAssetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TokenizedAssetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenizedAssetPayload>[]
          }
          delete: {
            args: Prisma.TokenizedAssetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenizedAssetPayload>
          }
          update: {
            args: Prisma.TokenizedAssetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenizedAssetPayload>
          }
          deleteMany: {
            args: Prisma.TokenizedAssetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TokenizedAssetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TokenizedAssetUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenizedAssetPayload>[]
          }
          upsert: {
            args: Prisma.TokenizedAssetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenizedAssetPayload>
          }
          aggregate: {
            args: Prisma.TokenizedAssetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTokenizedAsset>
          }
          groupBy: {
            args: Prisma.TokenizedAssetGroupByArgs<ExtArgs>
            result: $Utils.Optional<TokenizedAssetGroupByOutputType>[]
          }
          count: {
            args: Prisma.TokenizedAssetCountArgs<ExtArgs>
            result: $Utils.Optional<TokenizedAssetCountAggregateOutputType> | number
          }
        }
      }
      TokenHolder: {
        payload: Prisma.$TokenHolderPayload<ExtArgs>
        fields: Prisma.TokenHolderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TokenHolderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenHolderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TokenHolderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenHolderPayload>
          }
          findFirst: {
            args: Prisma.TokenHolderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenHolderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TokenHolderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenHolderPayload>
          }
          findMany: {
            args: Prisma.TokenHolderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenHolderPayload>[]
          }
          create: {
            args: Prisma.TokenHolderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenHolderPayload>
          }
          createMany: {
            args: Prisma.TokenHolderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TokenHolderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenHolderPayload>[]
          }
          delete: {
            args: Prisma.TokenHolderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenHolderPayload>
          }
          update: {
            args: Prisma.TokenHolderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenHolderPayload>
          }
          deleteMany: {
            args: Prisma.TokenHolderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TokenHolderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TokenHolderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenHolderPayload>[]
          }
          upsert: {
            args: Prisma.TokenHolderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenHolderPayload>
          }
          aggregate: {
            args: Prisma.TokenHolderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTokenHolder>
          }
          groupBy: {
            args: Prisma.TokenHolderGroupByArgs<ExtArgs>
            result: $Utils.Optional<TokenHolderGroupByOutputType>[]
          }
          count: {
            args: Prisma.TokenHolderCountArgs<ExtArgs>
            result: $Utils.Optional<TokenHolderCountAggregateOutputType> | number
          }
        }
      }
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>
        fields: Prisma.PaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
          }
        }
      }
      Demo: {
        payload: Prisma.$DemoPayload<ExtArgs>
        fields: Prisma.DemoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DemoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DemoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DemoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DemoPayload>
          }
          findFirst: {
            args: Prisma.DemoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DemoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DemoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DemoPayload>
          }
          findMany: {
            args: Prisma.DemoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DemoPayload>[]
          }
          create: {
            args: Prisma.DemoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DemoPayload>
          }
          createMany: {
            args: Prisma.DemoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DemoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DemoPayload>[]
          }
          delete: {
            args: Prisma.DemoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DemoPayload>
          }
          update: {
            args: Prisma.DemoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DemoPayload>
          }
          deleteMany: {
            args: Prisma.DemoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DemoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DemoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DemoPayload>[]
          }
          upsert: {
            args: Prisma.DemoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DemoPayload>
          }
          aggregate: {
            args: Prisma.DemoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDemo>
          }
          groupBy: {
            args: Prisma.DemoGroupByArgs<ExtArgs>
            result: $Utils.Optional<DemoGroupByOutputType>[]
          }
          count: {
            args: Prisma.DemoCountArgs<ExtArgs>
            result: $Utils.Optional<DemoCountAggregateOutputType> | number
          }
        }
      }
      SystemEvent: {
        payload: Prisma.$SystemEventPayload<ExtArgs>
        fields: Prisma.SystemEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SystemEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SystemEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemEventPayload>
          }
          findFirst: {
            args: Prisma.SystemEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SystemEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemEventPayload>
          }
          findMany: {
            args: Prisma.SystemEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemEventPayload>[]
          }
          create: {
            args: Prisma.SystemEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemEventPayload>
          }
          createMany: {
            args: Prisma.SystemEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SystemEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemEventPayload>[]
          }
          delete: {
            args: Prisma.SystemEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemEventPayload>
          }
          update: {
            args: Prisma.SystemEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemEventPayload>
          }
          deleteMany: {
            args: Prisma.SystemEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SystemEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SystemEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemEventPayload>[]
          }
          upsert: {
            args: Prisma.SystemEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemEventPayload>
          }
          aggregate: {
            args: Prisma.SystemEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSystemEvent>
          }
          groupBy: {
            args: Prisma.SystemEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<SystemEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.SystemEventCountArgs<ExtArgs>
            result: $Utils.Optional<SystemEventCountAggregateOutputType> | number
          }
        }
      }
      SniperTarget: {
        payload: Prisma.$SniperTargetPayload<ExtArgs>
        fields: Prisma.SniperTargetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SniperTargetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SniperTargetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SniperTargetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SniperTargetPayload>
          }
          findFirst: {
            args: Prisma.SniperTargetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SniperTargetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SniperTargetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SniperTargetPayload>
          }
          findMany: {
            args: Prisma.SniperTargetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SniperTargetPayload>[]
          }
          create: {
            args: Prisma.SniperTargetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SniperTargetPayload>
          }
          createMany: {
            args: Prisma.SniperTargetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SniperTargetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SniperTargetPayload>[]
          }
          delete: {
            args: Prisma.SniperTargetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SniperTargetPayload>
          }
          update: {
            args: Prisma.SniperTargetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SniperTargetPayload>
          }
          deleteMany: {
            args: Prisma.SniperTargetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SniperTargetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SniperTargetUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SniperTargetPayload>[]
          }
          upsert: {
            args: Prisma.SniperTargetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SniperTargetPayload>
          }
          aggregate: {
            args: Prisma.SniperTargetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSniperTarget>
          }
          groupBy: {
            args: Prisma.SniperTargetGroupByArgs<ExtArgs>
            result: $Utils.Optional<SniperTargetGroupByOutputType>[]
          }
          count: {
            args: Prisma.SniperTargetCountArgs<ExtArgs>
            result: $Utils.Optional<SniperTargetCountAggregateOutputType> | number
          }
        }
      }
      EmailEvent: {
        payload: Prisma.$EmailEventPayload<ExtArgs>
        fields: Prisma.EmailEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmailEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmailEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailEventPayload>
          }
          findFirst: {
            args: Prisma.EmailEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmailEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailEventPayload>
          }
          findMany: {
            args: Prisma.EmailEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailEventPayload>[]
          }
          create: {
            args: Prisma.EmailEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailEventPayload>
          }
          createMany: {
            args: Prisma.EmailEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmailEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailEventPayload>[]
          }
          delete: {
            args: Prisma.EmailEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailEventPayload>
          }
          update: {
            args: Prisma.EmailEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailEventPayload>
          }
          deleteMany: {
            args: Prisma.EmailEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmailEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmailEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailEventPayload>[]
          }
          upsert: {
            args: Prisma.EmailEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailEventPayload>
          }
          aggregate: {
            args: Prisma.EmailEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmailEvent>
          }
          groupBy: {
            args: Prisma.EmailEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmailEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmailEventCountArgs<ExtArgs>
            result: $Utils.Optional<EmailEventCountAggregateOutputType> | number
          }
        }
      }
      KnowledgeEmbedding: {
        payload: Prisma.$KnowledgeEmbeddingPayload<ExtArgs>
        fields: Prisma.KnowledgeEmbeddingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.KnowledgeEmbeddingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeEmbeddingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.KnowledgeEmbeddingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeEmbeddingPayload>
          }
          findFirst: {
            args: Prisma.KnowledgeEmbeddingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeEmbeddingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.KnowledgeEmbeddingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeEmbeddingPayload>
          }
          findMany: {
            args: Prisma.KnowledgeEmbeddingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeEmbeddingPayload>[]
          }
          delete: {
            args: Prisma.KnowledgeEmbeddingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeEmbeddingPayload>
          }
          update: {
            args: Prisma.KnowledgeEmbeddingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeEmbeddingPayload>
          }
          deleteMany: {
            args: Prisma.KnowledgeEmbeddingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.KnowledgeEmbeddingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.KnowledgeEmbeddingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeEmbeddingPayload>[]
          }
          aggregate: {
            args: Prisma.KnowledgeEmbeddingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateKnowledgeEmbedding>
          }
          groupBy: {
            args: Prisma.KnowledgeEmbeddingGroupByArgs<ExtArgs>
            result: $Utils.Optional<KnowledgeEmbeddingGroupByOutputType>[]
          }
          count: {
            args: Prisma.KnowledgeEmbeddingCountArgs<ExtArgs>
            result: $Utils.Optional<KnowledgeEmbeddingCountAggregateOutputType> | number
          }
        }
      }
      Embedding: {
        payload: Prisma.$EmbeddingPayload<ExtArgs>
        fields: Prisma.EmbeddingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmbeddingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbeddingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmbeddingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbeddingPayload>
          }
          findFirst: {
            args: Prisma.EmbeddingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbeddingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmbeddingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbeddingPayload>
          }
          findMany: {
            args: Prisma.EmbeddingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbeddingPayload>[]
          }
          create: {
            args: Prisma.EmbeddingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbeddingPayload>
          }
          createMany: {
            args: Prisma.EmbeddingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmbeddingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbeddingPayload>[]
          }
          delete: {
            args: Prisma.EmbeddingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbeddingPayload>
          }
          update: {
            args: Prisma.EmbeddingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbeddingPayload>
          }
          deleteMany: {
            args: Prisma.EmbeddingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmbeddingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmbeddingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbeddingPayload>[]
          }
          upsert: {
            args: Prisma.EmbeddingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbeddingPayload>
          }
          aggregate: {
            args: Prisma.EmbeddingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmbedding>
          }
          groupBy: {
            args: Prisma.EmbeddingGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmbeddingGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmbeddingCountArgs<ExtArgs>
            result: $Utils.Optional<EmbeddingCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      LedgerTransaction: {
        payload: Prisma.$LedgerTransactionPayload<ExtArgs>
        fields: Prisma.LedgerTransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LedgerTransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerTransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LedgerTransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerTransactionPayload>
          }
          findFirst: {
            args: Prisma.LedgerTransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerTransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LedgerTransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerTransactionPayload>
          }
          findMany: {
            args: Prisma.LedgerTransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerTransactionPayload>[]
          }
          create: {
            args: Prisma.LedgerTransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerTransactionPayload>
          }
          createMany: {
            args: Prisma.LedgerTransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LedgerTransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerTransactionPayload>[]
          }
          delete: {
            args: Prisma.LedgerTransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerTransactionPayload>
          }
          update: {
            args: Prisma.LedgerTransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerTransactionPayload>
          }
          deleteMany: {
            args: Prisma.LedgerTransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LedgerTransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LedgerTransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerTransactionPayload>[]
          }
          upsert: {
            args: Prisma.LedgerTransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerTransactionPayload>
          }
          aggregate: {
            args: Prisma.LedgerTransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLedgerTransaction>
          }
          groupBy: {
            args: Prisma.LedgerTransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<LedgerTransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.LedgerTransactionCountArgs<ExtArgs>
            result: $Utils.Optional<LedgerTransactionCountAggregateOutputType> | number
          }
        }
      }
      Entry: {
        payload: Prisma.$EntryPayload<ExtArgs>
        fields: Prisma.EntryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EntryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EntryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryPayload>
          }
          findFirst: {
            args: Prisma.EntryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EntryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryPayload>
          }
          findMany: {
            args: Prisma.EntryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryPayload>[]
          }
          create: {
            args: Prisma.EntryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryPayload>
          }
          createMany: {
            args: Prisma.EntryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EntryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryPayload>[]
          }
          delete: {
            args: Prisma.EntryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryPayload>
          }
          update: {
            args: Prisma.EntryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryPayload>
          }
          deleteMany: {
            args: Prisma.EntryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EntryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EntryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryPayload>[]
          }
          upsert: {
            args: Prisma.EntryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryPayload>
          }
          aggregate: {
            args: Prisma.EntryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEntry>
          }
          groupBy: {
            args: Prisma.EntryGroupByArgs<ExtArgs>
            result: $Utils.Optional<EntryGroupByOutputType>[]
          }
          count: {
            args: Prisma.EntryCountArgs<ExtArgs>
            result: $Utils.Optional<EntryCountAggregateOutputType> | number
          }
        }
      }
      LedgerIdempotency: {
        payload: Prisma.$LedgerIdempotencyPayload<ExtArgs>
        fields: Prisma.LedgerIdempotencyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LedgerIdempotencyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerIdempotencyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LedgerIdempotencyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerIdempotencyPayload>
          }
          findFirst: {
            args: Prisma.LedgerIdempotencyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerIdempotencyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LedgerIdempotencyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerIdempotencyPayload>
          }
          findMany: {
            args: Prisma.LedgerIdempotencyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerIdempotencyPayload>[]
          }
          create: {
            args: Prisma.LedgerIdempotencyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerIdempotencyPayload>
          }
          createMany: {
            args: Prisma.LedgerIdempotencyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LedgerIdempotencyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerIdempotencyPayload>[]
          }
          delete: {
            args: Prisma.LedgerIdempotencyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerIdempotencyPayload>
          }
          update: {
            args: Prisma.LedgerIdempotencyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerIdempotencyPayload>
          }
          deleteMany: {
            args: Prisma.LedgerIdempotencyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LedgerIdempotencyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LedgerIdempotencyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerIdempotencyPayload>[]
          }
          upsert: {
            args: Prisma.LedgerIdempotencyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerIdempotencyPayload>
          }
          aggregate: {
            args: Prisma.LedgerIdempotencyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLedgerIdempotency>
          }
          groupBy: {
            args: Prisma.LedgerIdempotencyGroupByArgs<ExtArgs>
            result: $Utils.Optional<LedgerIdempotencyGroupByOutputType>[]
          }
          count: {
            args: Prisma.LedgerIdempotencyCountArgs<ExtArgs>
            result: $Utils.Optional<LedgerIdempotencyCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    lead?: LeadOmit
    user?: UserOmit
    tokenizedAsset?: TokenizedAssetOmit
    tokenHolder?: TokenHolderOmit
    payment?: PaymentOmit
    demo?: DemoOmit
    systemEvent?: SystemEventOmit
    sniperTarget?: SniperTargetOmit
    emailEvent?: EmailEventOmit
    knowledgeEmbedding?: KnowledgeEmbeddingOmit
    embedding?: EmbeddingOmit
    account?: AccountOmit
    ledgerTransaction?: LedgerTransactionOmit
    entry?: EntryOmit
    ledgerIdempotency?: LedgerIdempotencyOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type LeadCountOutputType
   */

  export type LeadCountOutputType = {
    emailEvents: number
    payments: number
  }

  export type LeadCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    emailEvents?: boolean | LeadCountOutputTypeCountEmailEventsArgs
    payments?: boolean | LeadCountOutputTypeCountPaymentsArgs
  }

  // Custom InputTypes
  /**
   * LeadCountOutputType without action
   */
  export type LeadCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadCountOutputType
     */
    select?: LeadCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LeadCountOutputType without action
   */
  export type LeadCountOutputTypeCountEmailEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailEventWhereInput
  }

  /**
   * LeadCountOutputType without action
   */
  export type LeadCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }


  /**
   * Count Type TokenizedAssetCountOutputType
   */

  export type TokenizedAssetCountOutputType = {
    tokenHolders: number
  }

  export type TokenizedAssetCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tokenHolders?: boolean | TokenizedAssetCountOutputTypeCountTokenHoldersArgs
  }

  // Custom InputTypes
  /**
   * TokenizedAssetCountOutputType without action
   */
  export type TokenizedAssetCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenizedAssetCountOutputType
     */
    select?: TokenizedAssetCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TokenizedAssetCountOutputType without action
   */
  export type TokenizedAssetCountOutputTypeCountTokenHoldersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TokenHolderWhereInput
  }


  /**
   * Count Type AccountCountOutputType
   */

  export type AccountCountOutputType = {
    entries: number
  }

  export type AccountCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entries?: boolean | AccountCountOutputTypeCountEntriesArgs
  }

  // Custom InputTypes
  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountCountOutputType
     */
    select?: AccountCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeCountEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EntryWhereInput
  }


  /**
   * Count Type LedgerTransactionCountOutputType
   */

  export type LedgerTransactionCountOutputType = {
    entries: number
  }

  export type LedgerTransactionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entries?: boolean | LedgerTransactionCountOutputTypeCountEntriesArgs
  }

  // Custom InputTypes
  /**
   * LedgerTransactionCountOutputType without action
   */
  export type LedgerTransactionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerTransactionCountOutputType
     */
    select?: LedgerTransactionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LedgerTransactionCountOutputType without action
   */
  export type LedgerTransactionCountOutputTypeCountEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EntryWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Lead
   */

  export type AggregateLead = {
    _count: LeadCountAggregateOutputType | null
    _avg: LeadAvgAggregateOutputType | null
    _sum: LeadSumAggregateOutputType | null
    _min: LeadMinAggregateOutputType | null
    _max: LeadMaxAggregateOutputType | null
  }

  export type LeadAvgAggregateOutputType = {
    leadScore: number | null
  }

  export type LeadSumAggregateOutputType = {
    leadScore: number | null
  }

  export type LeadMinAggregateOutputType = {
    id: string | null
    phoneNumber: string | null
    email: string | null
    intent: string | null
    status: string | null
    leadScore: number | null
    tier: string | null
    lastMessage: string | null
    nextFollowUpAt: Date | null
    termsAccepted: boolean | null
    paymentRef: string | null
    demoApproved: boolean | null
    demoScheduled: boolean | null
    updatedAt: Date | null
    createdAt: Date | null
  }

  export type LeadMaxAggregateOutputType = {
    id: string | null
    phoneNumber: string | null
    email: string | null
    intent: string | null
    status: string | null
    leadScore: number | null
    tier: string | null
    lastMessage: string | null
    nextFollowUpAt: Date | null
    termsAccepted: boolean | null
    paymentRef: string | null
    demoApproved: boolean | null
    demoScheduled: boolean | null
    updatedAt: Date | null
    createdAt: Date | null
  }

  export type LeadCountAggregateOutputType = {
    id: number
    phoneNumber: number
    email: number
    intent: number
    status: number
    leadScore: number
    tier: number
    lastMessage: number
    nextFollowUpAt: number
    metadata: number
    termsAccepted: number
    miniAuditData: number
    paymentRef: number
    demoApproved: number
    demoScheduled: number
    updatedAt: number
    createdAt: number
    _all: number
  }


  export type LeadAvgAggregateInputType = {
    leadScore?: true
  }

  export type LeadSumAggregateInputType = {
    leadScore?: true
  }

  export type LeadMinAggregateInputType = {
    id?: true
    phoneNumber?: true
    email?: true
    intent?: true
    status?: true
    leadScore?: true
    tier?: true
    lastMessage?: true
    nextFollowUpAt?: true
    termsAccepted?: true
    paymentRef?: true
    demoApproved?: true
    demoScheduled?: true
    updatedAt?: true
    createdAt?: true
  }

  export type LeadMaxAggregateInputType = {
    id?: true
    phoneNumber?: true
    email?: true
    intent?: true
    status?: true
    leadScore?: true
    tier?: true
    lastMessage?: true
    nextFollowUpAt?: true
    termsAccepted?: true
    paymentRef?: true
    demoApproved?: true
    demoScheduled?: true
    updatedAt?: true
    createdAt?: true
  }

  export type LeadCountAggregateInputType = {
    id?: true
    phoneNumber?: true
    email?: true
    intent?: true
    status?: true
    leadScore?: true
    tier?: true
    lastMessage?: true
    nextFollowUpAt?: true
    metadata?: true
    termsAccepted?: true
    miniAuditData?: true
    paymentRef?: true
    demoApproved?: true
    demoScheduled?: true
    updatedAt?: true
    createdAt?: true
    _all?: true
  }

  export type LeadAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lead to aggregate.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Leads
    **/
    _count?: true | LeadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LeadAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LeadSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LeadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LeadMaxAggregateInputType
  }

  export type GetLeadAggregateType<T extends LeadAggregateArgs> = {
        [P in keyof T & keyof AggregateLead]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLead[P]>
      : GetScalarType<T[P], AggregateLead[P]>
  }




  export type LeadGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadWhereInput
    orderBy?: LeadOrderByWithAggregationInput | LeadOrderByWithAggregationInput[]
    by: LeadScalarFieldEnum[] | LeadScalarFieldEnum
    having?: LeadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LeadCountAggregateInputType | true
    _avg?: LeadAvgAggregateInputType
    _sum?: LeadSumAggregateInputType
    _min?: LeadMinAggregateInputType
    _max?: LeadMaxAggregateInputType
  }

  export type LeadGroupByOutputType = {
    id: string
    phoneNumber: string | null
    email: string | null
    intent: string | null
    status: string
    leadScore: number | null
    tier: string | null
    lastMessage: string | null
    nextFollowUpAt: Date | null
    metadata: JsonValue | null
    termsAccepted: boolean
    miniAuditData: JsonValue | null
    paymentRef: string | null
    demoApproved: boolean
    demoScheduled: boolean
    updatedAt: Date
    createdAt: Date
    _count: LeadCountAggregateOutputType | null
    _avg: LeadAvgAggregateOutputType | null
    _sum: LeadSumAggregateOutputType | null
    _min: LeadMinAggregateOutputType | null
    _max: LeadMaxAggregateOutputType | null
  }

  type GetLeadGroupByPayload<T extends LeadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LeadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LeadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LeadGroupByOutputType[P]>
            : GetScalarType<T[P], LeadGroupByOutputType[P]>
        }
      >
    >


  export type LeadSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phoneNumber?: boolean
    email?: boolean
    intent?: boolean
    status?: boolean
    leadScore?: boolean
    tier?: boolean
    lastMessage?: boolean
    nextFollowUpAt?: boolean
    metadata?: boolean
    termsAccepted?: boolean
    miniAuditData?: boolean
    paymentRef?: boolean
    demoApproved?: boolean
    demoScheduled?: boolean
    updatedAt?: boolean
    createdAt?: boolean
    demo?: boolean | Lead$demoArgs<ExtArgs>
    emailEvents?: boolean | Lead$emailEventsArgs<ExtArgs>
    payments?: boolean | Lead$paymentsArgs<ExtArgs>
    _count?: boolean | LeadCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lead"]>

  export type LeadSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phoneNumber?: boolean
    email?: boolean
    intent?: boolean
    status?: boolean
    leadScore?: boolean
    tier?: boolean
    lastMessage?: boolean
    nextFollowUpAt?: boolean
    metadata?: boolean
    termsAccepted?: boolean
    miniAuditData?: boolean
    paymentRef?: boolean
    demoApproved?: boolean
    demoScheduled?: boolean
    updatedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["lead"]>

  export type LeadSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phoneNumber?: boolean
    email?: boolean
    intent?: boolean
    status?: boolean
    leadScore?: boolean
    tier?: boolean
    lastMessage?: boolean
    nextFollowUpAt?: boolean
    metadata?: boolean
    termsAccepted?: boolean
    miniAuditData?: boolean
    paymentRef?: boolean
    demoApproved?: boolean
    demoScheduled?: boolean
    updatedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["lead"]>

  export type LeadSelectScalar = {
    id?: boolean
    phoneNumber?: boolean
    email?: boolean
    intent?: boolean
    status?: boolean
    leadScore?: boolean
    tier?: boolean
    lastMessage?: boolean
    nextFollowUpAt?: boolean
    metadata?: boolean
    termsAccepted?: boolean
    miniAuditData?: boolean
    paymentRef?: boolean
    demoApproved?: boolean
    demoScheduled?: boolean
    updatedAt?: boolean
    createdAt?: boolean
  }

  export type LeadOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "phoneNumber" | "email" | "intent" | "status" | "leadScore" | "tier" | "lastMessage" | "nextFollowUpAt" | "metadata" | "termsAccepted" | "miniAuditData" | "paymentRef" | "demoApproved" | "demoScheduled" | "updatedAt" | "createdAt", ExtArgs["result"]["lead"]>
  export type LeadInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    demo?: boolean | Lead$demoArgs<ExtArgs>
    emailEvents?: boolean | Lead$emailEventsArgs<ExtArgs>
    payments?: boolean | Lead$paymentsArgs<ExtArgs>
    _count?: boolean | LeadCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LeadIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type LeadIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $LeadPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Lead"
    objects: {
      demo: Prisma.$DemoPayload<ExtArgs> | null
      emailEvents: Prisma.$EmailEventPayload<ExtArgs>[]
      payments: Prisma.$PaymentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      phoneNumber: string | null
      email: string | null
      intent: string | null
      status: string
      leadScore: number | null
      tier: string | null
      lastMessage: string | null
      nextFollowUpAt: Date | null
      metadata: Prisma.JsonValue | null
      termsAccepted: boolean
      miniAuditData: Prisma.JsonValue | null
      paymentRef: string | null
      demoApproved: boolean
      demoScheduled: boolean
      updatedAt: Date
      createdAt: Date
    }, ExtArgs["result"]["lead"]>
    composites: {}
  }

  type LeadGetPayload<S extends boolean | null | undefined | LeadDefaultArgs> = $Result.GetResult<Prisma.$LeadPayload, S>

  type LeadCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LeadFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LeadCountAggregateInputType | true
    }

  export interface LeadDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Lead'], meta: { name: 'Lead' } }
    /**
     * Find zero or one Lead that matches the filter.
     * @param {LeadFindUniqueArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LeadFindUniqueArgs>(args: SelectSubset<T, LeadFindUniqueArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Lead that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LeadFindUniqueOrThrowArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LeadFindUniqueOrThrowArgs>(args: SelectSubset<T, LeadFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lead that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindFirstArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LeadFindFirstArgs>(args?: SelectSubset<T, LeadFindFirstArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lead that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindFirstOrThrowArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LeadFindFirstOrThrowArgs>(args?: SelectSubset<T, LeadFindFirstOrThrowArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Leads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Leads
     * const leads = await prisma.lead.findMany()
     * 
     * // Get first 10 Leads
     * const leads = await prisma.lead.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leadWithIdOnly = await prisma.lead.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LeadFindManyArgs>(args?: SelectSubset<T, LeadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Lead.
     * @param {LeadCreateArgs} args - Arguments to create a Lead.
     * @example
     * // Create one Lead
     * const Lead = await prisma.lead.create({
     *   data: {
     *     // ... data to create a Lead
     *   }
     * })
     * 
     */
    create<T extends LeadCreateArgs>(args: SelectSubset<T, LeadCreateArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Leads.
     * @param {LeadCreateManyArgs} args - Arguments to create many Leads.
     * @example
     * // Create many Leads
     * const lead = await prisma.lead.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LeadCreateManyArgs>(args?: SelectSubset<T, LeadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Leads and returns the data saved in the database.
     * @param {LeadCreateManyAndReturnArgs} args - Arguments to create many Leads.
     * @example
     * // Create many Leads
     * const lead = await prisma.lead.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Leads and only return the `id`
     * const leadWithIdOnly = await prisma.lead.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LeadCreateManyAndReturnArgs>(args?: SelectSubset<T, LeadCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Lead.
     * @param {LeadDeleteArgs} args - Arguments to delete one Lead.
     * @example
     * // Delete one Lead
     * const Lead = await prisma.lead.delete({
     *   where: {
     *     // ... filter to delete one Lead
     *   }
     * })
     * 
     */
    delete<T extends LeadDeleteArgs>(args: SelectSubset<T, LeadDeleteArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Lead.
     * @param {LeadUpdateArgs} args - Arguments to update one Lead.
     * @example
     * // Update one Lead
     * const lead = await prisma.lead.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LeadUpdateArgs>(args: SelectSubset<T, LeadUpdateArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Leads.
     * @param {LeadDeleteManyArgs} args - Arguments to filter Leads to delete.
     * @example
     * // Delete a few Leads
     * const { count } = await prisma.lead.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LeadDeleteManyArgs>(args?: SelectSubset<T, LeadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Leads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Leads
     * const lead = await prisma.lead.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LeadUpdateManyArgs>(args: SelectSubset<T, LeadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Leads and returns the data updated in the database.
     * @param {LeadUpdateManyAndReturnArgs} args - Arguments to update many Leads.
     * @example
     * // Update many Leads
     * const lead = await prisma.lead.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Leads and only return the `id`
     * const leadWithIdOnly = await prisma.lead.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LeadUpdateManyAndReturnArgs>(args: SelectSubset<T, LeadUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Lead.
     * @param {LeadUpsertArgs} args - Arguments to update or create a Lead.
     * @example
     * // Update or create a Lead
     * const lead = await prisma.lead.upsert({
     *   create: {
     *     // ... data to create a Lead
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Lead we want to update
     *   }
     * })
     */
    upsert<T extends LeadUpsertArgs>(args: SelectSubset<T, LeadUpsertArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Leads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadCountArgs} args - Arguments to filter Leads to count.
     * @example
     * // Count the number of Leads
     * const count = await prisma.lead.count({
     *   where: {
     *     // ... the filter for the Leads we want to count
     *   }
     * })
    **/
    count<T extends LeadCountArgs>(
      args?: Subset<T, LeadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LeadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Lead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LeadAggregateArgs>(args: Subset<T, LeadAggregateArgs>): Prisma.PrismaPromise<GetLeadAggregateType<T>>

    /**
     * Group by Lead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LeadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LeadGroupByArgs['orderBy'] }
        : { orderBy?: LeadGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LeadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Lead model
   */
  readonly fields: LeadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Lead.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LeadClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    demo<T extends Lead$demoArgs<ExtArgs> = {}>(args?: Subset<T, Lead$demoArgs<ExtArgs>>): Prisma__DemoClient<$Result.GetResult<Prisma.$DemoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    emailEvents<T extends Lead$emailEventsArgs<ExtArgs> = {}>(args?: Subset<T, Lead$emailEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    payments<T extends Lead$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, Lead$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Lead model
   */
  interface LeadFieldRefs {
    readonly id: FieldRef<"Lead", 'String'>
    readonly phoneNumber: FieldRef<"Lead", 'String'>
    readonly email: FieldRef<"Lead", 'String'>
    readonly intent: FieldRef<"Lead", 'String'>
    readonly status: FieldRef<"Lead", 'String'>
    readonly leadScore: FieldRef<"Lead", 'Int'>
    readonly tier: FieldRef<"Lead", 'String'>
    readonly lastMessage: FieldRef<"Lead", 'String'>
    readonly nextFollowUpAt: FieldRef<"Lead", 'DateTime'>
    readonly metadata: FieldRef<"Lead", 'Json'>
    readonly termsAccepted: FieldRef<"Lead", 'Boolean'>
    readonly miniAuditData: FieldRef<"Lead", 'Json'>
    readonly paymentRef: FieldRef<"Lead", 'String'>
    readonly demoApproved: FieldRef<"Lead", 'Boolean'>
    readonly demoScheduled: FieldRef<"Lead", 'Boolean'>
    readonly updatedAt: FieldRef<"Lead", 'DateTime'>
    readonly createdAt: FieldRef<"Lead", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Lead findUnique
   */
  export type LeadFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead findUniqueOrThrow
   */
  export type LeadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead findFirst
   */
  export type LeadFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Leads.
     */
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead findFirstOrThrow
   */
  export type LeadFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Leads.
     */
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead findMany
   */
  export type LeadFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Leads to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Leads.
     */
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead create
   */
  export type LeadCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * The data needed to create a Lead.
     */
    data: XOR<LeadCreateInput, LeadUncheckedCreateInput>
  }

  /**
   * Lead createMany
   */
  export type LeadCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Leads.
     */
    data: LeadCreateManyInput | LeadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Lead createManyAndReturn
   */
  export type LeadCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * The data used to create many Leads.
     */
    data: LeadCreateManyInput | LeadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Lead update
   */
  export type LeadUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * The data needed to update a Lead.
     */
    data: XOR<LeadUpdateInput, LeadUncheckedUpdateInput>
    /**
     * Choose, which Lead to update.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead updateMany
   */
  export type LeadUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Leads.
     */
    data: XOR<LeadUpdateManyMutationInput, LeadUncheckedUpdateManyInput>
    /**
     * Filter which Leads to update
     */
    where?: LeadWhereInput
    /**
     * Limit how many Leads to update.
     */
    limit?: number
  }

  /**
   * Lead updateManyAndReturn
   */
  export type LeadUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * The data used to update Leads.
     */
    data: XOR<LeadUpdateManyMutationInput, LeadUncheckedUpdateManyInput>
    /**
     * Filter which Leads to update
     */
    where?: LeadWhereInput
    /**
     * Limit how many Leads to update.
     */
    limit?: number
  }

  /**
   * Lead upsert
   */
  export type LeadUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * The filter to search for the Lead to update in case it exists.
     */
    where: LeadWhereUniqueInput
    /**
     * In case the Lead found by the `where` argument doesn't exist, create a new Lead with this data.
     */
    create: XOR<LeadCreateInput, LeadUncheckedCreateInput>
    /**
     * In case the Lead was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LeadUpdateInput, LeadUncheckedUpdateInput>
  }

  /**
   * Lead delete
   */
  export type LeadDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter which Lead to delete.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead deleteMany
   */
  export type LeadDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Leads to delete
     */
    where?: LeadWhereInput
    /**
     * Limit how many Leads to delete.
     */
    limit?: number
  }

  /**
   * Lead.demo
   */
  export type Lead$demoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Demo
     */
    select?: DemoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Demo
     */
    omit?: DemoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DemoInclude<ExtArgs> | null
    where?: DemoWhereInput
  }

  /**
   * Lead.emailEvents
   */
  export type Lead$emailEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailEvent
     */
    select?: EmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailEvent
     */
    omit?: EmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailEventInclude<ExtArgs> | null
    where?: EmailEventWhereInput
    orderBy?: EmailEventOrderByWithRelationInput | EmailEventOrderByWithRelationInput[]
    cursor?: EmailEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmailEventScalarFieldEnum | EmailEventScalarFieldEnum[]
  }

  /**
   * Lead.payments
   */
  export type Lead$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Lead without action
   */
  export type LeadDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    role: string | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    role: string | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    role: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string | null
    email: string
    password: string
    role: string | null
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "role" | "createdAt", ExtArgs["result"]["user"]>

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      email: string
      password: string
      role: string | null
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
  }


  /**
   * Model TokenizedAsset
   */

  export type AggregateTokenizedAsset = {
    _count: TokenizedAssetCountAggregateOutputType | null
    _avg: TokenizedAssetAvgAggregateOutputType | null
    _sum: TokenizedAssetSumAggregateOutputType | null
    _min: TokenizedAssetMinAggregateOutputType | null
    _max: TokenizedAssetMaxAggregateOutputType | null
  }

  export type TokenizedAssetAvgAggregateOutputType = {
    totalShares: number | null
    availableShares: number | null
    pricePerShare: Decimal | null
  }

  export type TokenizedAssetSumAggregateOutputType = {
    totalShares: number | null
    availableShares: number | null
    pricePerShare: Decimal | null
  }

  export type TokenizedAssetMinAggregateOutputType = {
    id: string | null
    assetType: string | null
    name: string | null
    location: string | null
    totalShares: number | null
    availableShares: number | null
    pricePerShare: Decimal | null
    currency: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TokenizedAssetMaxAggregateOutputType = {
    id: string | null
    assetType: string | null
    name: string | null
    location: string | null
    totalShares: number | null
    availableShares: number | null
    pricePerShare: Decimal | null
    currency: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TokenizedAssetCountAggregateOutputType = {
    id: number
    assetType: number
    name: number
    location: number
    totalShares: number
    availableShares: number
    pricePerShare: number
    currency: number
    metadata: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TokenizedAssetAvgAggregateInputType = {
    totalShares?: true
    availableShares?: true
    pricePerShare?: true
  }

  export type TokenizedAssetSumAggregateInputType = {
    totalShares?: true
    availableShares?: true
    pricePerShare?: true
  }

  export type TokenizedAssetMinAggregateInputType = {
    id?: true
    assetType?: true
    name?: true
    location?: true
    totalShares?: true
    availableShares?: true
    pricePerShare?: true
    currency?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TokenizedAssetMaxAggregateInputType = {
    id?: true
    assetType?: true
    name?: true
    location?: true
    totalShares?: true
    availableShares?: true
    pricePerShare?: true
    currency?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TokenizedAssetCountAggregateInputType = {
    id?: true
    assetType?: true
    name?: true
    location?: true
    totalShares?: true
    availableShares?: true
    pricePerShare?: true
    currency?: true
    metadata?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TokenizedAssetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TokenizedAsset to aggregate.
     */
    where?: TokenizedAssetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TokenizedAssets to fetch.
     */
    orderBy?: TokenizedAssetOrderByWithRelationInput | TokenizedAssetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TokenizedAssetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TokenizedAssets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TokenizedAssets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TokenizedAssets
    **/
    _count?: true | TokenizedAssetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TokenizedAssetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TokenizedAssetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TokenizedAssetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TokenizedAssetMaxAggregateInputType
  }

  export type GetTokenizedAssetAggregateType<T extends TokenizedAssetAggregateArgs> = {
        [P in keyof T & keyof AggregateTokenizedAsset]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTokenizedAsset[P]>
      : GetScalarType<T[P], AggregateTokenizedAsset[P]>
  }




  export type TokenizedAssetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TokenizedAssetWhereInput
    orderBy?: TokenizedAssetOrderByWithAggregationInput | TokenizedAssetOrderByWithAggregationInput[]
    by: TokenizedAssetScalarFieldEnum[] | TokenizedAssetScalarFieldEnum
    having?: TokenizedAssetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TokenizedAssetCountAggregateInputType | true
    _avg?: TokenizedAssetAvgAggregateInputType
    _sum?: TokenizedAssetSumAggregateInputType
    _min?: TokenizedAssetMinAggregateInputType
    _max?: TokenizedAssetMaxAggregateInputType
  }

  export type TokenizedAssetGroupByOutputType = {
    id: string
    assetType: string
    name: string
    location: string | null
    totalShares: number
    availableShares: number
    pricePerShare: Decimal
    currency: string
    metadata: JsonValue | null
    status: string
    createdAt: Date
    updatedAt: Date
    _count: TokenizedAssetCountAggregateOutputType | null
    _avg: TokenizedAssetAvgAggregateOutputType | null
    _sum: TokenizedAssetSumAggregateOutputType | null
    _min: TokenizedAssetMinAggregateOutputType | null
    _max: TokenizedAssetMaxAggregateOutputType | null
  }

  type GetTokenizedAssetGroupByPayload<T extends TokenizedAssetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TokenizedAssetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TokenizedAssetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TokenizedAssetGroupByOutputType[P]>
            : GetScalarType<T[P], TokenizedAssetGroupByOutputType[P]>
        }
      >
    >


  export type TokenizedAssetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    assetType?: boolean
    name?: boolean
    location?: boolean
    totalShares?: boolean
    availableShares?: boolean
    pricePerShare?: boolean
    currency?: boolean
    metadata?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tokenHolders?: boolean | TokenizedAsset$tokenHoldersArgs<ExtArgs>
    _count?: boolean | TokenizedAssetCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tokenizedAsset"]>

  export type TokenizedAssetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    assetType?: boolean
    name?: boolean
    location?: boolean
    totalShares?: boolean
    availableShares?: boolean
    pricePerShare?: boolean
    currency?: boolean
    metadata?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["tokenizedAsset"]>

  export type TokenizedAssetSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    assetType?: boolean
    name?: boolean
    location?: boolean
    totalShares?: boolean
    availableShares?: boolean
    pricePerShare?: boolean
    currency?: boolean
    metadata?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["tokenizedAsset"]>

  export type TokenizedAssetSelectScalar = {
    id?: boolean
    assetType?: boolean
    name?: boolean
    location?: boolean
    totalShares?: boolean
    availableShares?: boolean
    pricePerShare?: boolean
    currency?: boolean
    metadata?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TokenizedAssetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "assetType" | "name" | "location" | "totalShares" | "availableShares" | "pricePerShare" | "currency" | "metadata" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["tokenizedAsset"]>
  export type TokenizedAssetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tokenHolders?: boolean | TokenizedAsset$tokenHoldersArgs<ExtArgs>
    _count?: boolean | TokenizedAssetCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TokenizedAssetIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TokenizedAssetIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TokenizedAssetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TokenizedAsset"
    objects: {
      tokenHolders: Prisma.$TokenHolderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      assetType: string
      name: string
      location: string | null
      totalShares: number
      availableShares: number
      pricePerShare: Prisma.Decimal
      currency: string
      metadata: Prisma.JsonValue | null
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["tokenizedAsset"]>
    composites: {}
  }

  type TokenizedAssetGetPayload<S extends boolean | null | undefined | TokenizedAssetDefaultArgs> = $Result.GetResult<Prisma.$TokenizedAssetPayload, S>

  type TokenizedAssetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TokenizedAssetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TokenizedAssetCountAggregateInputType | true
    }

  export interface TokenizedAssetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TokenizedAsset'], meta: { name: 'TokenizedAsset' } }
    /**
     * Find zero or one TokenizedAsset that matches the filter.
     * @param {TokenizedAssetFindUniqueArgs} args - Arguments to find a TokenizedAsset
     * @example
     * // Get one TokenizedAsset
     * const tokenizedAsset = await prisma.tokenizedAsset.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TokenizedAssetFindUniqueArgs>(args: SelectSubset<T, TokenizedAssetFindUniqueArgs<ExtArgs>>): Prisma__TokenizedAssetClient<$Result.GetResult<Prisma.$TokenizedAssetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TokenizedAsset that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TokenizedAssetFindUniqueOrThrowArgs} args - Arguments to find a TokenizedAsset
     * @example
     * // Get one TokenizedAsset
     * const tokenizedAsset = await prisma.tokenizedAsset.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TokenizedAssetFindUniqueOrThrowArgs>(args: SelectSubset<T, TokenizedAssetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TokenizedAssetClient<$Result.GetResult<Prisma.$TokenizedAssetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TokenizedAsset that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenizedAssetFindFirstArgs} args - Arguments to find a TokenizedAsset
     * @example
     * // Get one TokenizedAsset
     * const tokenizedAsset = await prisma.tokenizedAsset.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TokenizedAssetFindFirstArgs>(args?: SelectSubset<T, TokenizedAssetFindFirstArgs<ExtArgs>>): Prisma__TokenizedAssetClient<$Result.GetResult<Prisma.$TokenizedAssetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TokenizedAsset that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenizedAssetFindFirstOrThrowArgs} args - Arguments to find a TokenizedAsset
     * @example
     * // Get one TokenizedAsset
     * const tokenizedAsset = await prisma.tokenizedAsset.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TokenizedAssetFindFirstOrThrowArgs>(args?: SelectSubset<T, TokenizedAssetFindFirstOrThrowArgs<ExtArgs>>): Prisma__TokenizedAssetClient<$Result.GetResult<Prisma.$TokenizedAssetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TokenizedAssets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenizedAssetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TokenizedAssets
     * const tokenizedAssets = await prisma.tokenizedAsset.findMany()
     * 
     * // Get first 10 TokenizedAssets
     * const tokenizedAssets = await prisma.tokenizedAsset.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tokenizedAssetWithIdOnly = await prisma.tokenizedAsset.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TokenizedAssetFindManyArgs>(args?: SelectSubset<T, TokenizedAssetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenizedAssetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TokenizedAsset.
     * @param {TokenizedAssetCreateArgs} args - Arguments to create a TokenizedAsset.
     * @example
     * // Create one TokenizedAsset
     * const TokenizedAsset = await prisma.tokenizedAsset.create({
     *   data: {
     *     // ... data to create a TokenizedAsset
     *   }
     * })
     * 
     */
    create<T extends TokenizedAssetCreateArgs>(args: SelectSubset<T, TokenizedAssetCreateArgs<ExtArgs>>): Prisma__TokenizedAssetClient<$Result.GetResult<Prisma.$TokenizedAssetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TokenizedAssets.
     * @param {TokenizedAssetCreateManyArgs} args - Arguments to create many TokenizedAssets.
     * @example
     * // Create many TokenizedAssets
     * const tokenizedAsset = await prisma.tokenizedAsset.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TokenizedAssetCreateManyArgs>(args?: SelectSubset<T, TokenizedAssetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TokenizedAssets and returns the data saved in the database.
     * @param {TokenizedAssetCreateManyAndReturnArgs} args - Arguments to create many TokenizedAssets.
     * @example
     * // Create many TokenizedAssets
     * const tokenizedAsset = await prisma.tokenizedAsset.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TokenizedAssets and only return the `id`
     * const tokenizedAssetWithIdOnly = await prisma.tokenizedAsset.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TokenizedAssetCreateManyAndReturnArgs>(args?: SelectSubset<T, TokenizedAssetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenizedAssetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TokenizedAsset.
     * @param {TokenizedAssetDeleteArgs} args - Arguments to delete one TokenizedAsset.
     * @example
     * // Delete one TokenizedAsset
     * const TokenizedAsset = await prisma.tokenizedAsset.delete({
     *   where: {
     *     // ... filter to delete one TokenizedAsset
     *   }
     * })
     * 
     */
    delete<T extends TokenizedAssetDeleteArgs>(args: SelectSubset<T, TokenizedAssetDeleteArgs<ExtArgs>>): Prisma__TokenizedAssetClient<$Result.GetResult<Prisma.$TokenizedAssetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TokenizedAsset.
     * @param {TokenizedAssetUpdateArgs} args - Arguments to update one TokenizedAsset.
     * @example
     * // Update one TokenizedAsset
     * const tokenizedAsset = await prisma.tokenizedAsset.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TokenizedAssetUpdateArgs>(args: SelectSubset<T, TokenizedAssetUpdateArgs<ExtArgs>>): Prisma__TokenizedAssetClient<$Result.GetResult<Prisma.$TokenizedAssetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TokenizedAssets.
     * @param {TokenizedAssetDeleteManyArgs} args - Arguments to filter TokenizedAssets to delete.
     * @example
     * // Delete a few TokenizedAssets
     * const { count } = await prisma.tokenizedAsset.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TokenizedAssetDeleteManyArgs>(args?: SelectSubset<T, TokenizedAssetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TokenizedAssets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenizedAssetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TokenizedAssets
     * const tokenizedAsset = await prisma.tokenizedAsset.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TokenizedAssetUpdateManyArgs>(args: SelectSubset<T, TokenizedAssetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TokenizedAssets and returns the data updated in the database.
     * @param {TokenizedAssetUpdateManyAndReturnArgs} args - Arguments to update many TokenizedAssets.
     * @example
     * // Update many TokenizedAssets
     * const tokenizedAsset = await prisma.tokenizedAsset.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TokenizedAssets and only return the `id`
     * const tokenizedAssetWithIdOnly = await prisma.tokenizedAsset.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TokenizedAssetUpdateManyAndReturnArgs>(args: SelectSubset<T, TokenizedAssetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenizedAssetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TokenizedAsset.
     * @param {TokenizedAssetUpsertArgs} args - Arguments to update or create a TokenizedAsset.
     * @example
     * // Update or create a TokenizedAsset
     * const tokenizedAsset = await prisma.tokenizedAsset.upsert({
     *   create: {
     *     // ... data to create a TokenizedAsset
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TokenizedAsset we want to update
     *   }
     * })
     */
    upsert<T extends TokenizedAssetUpsertArgs>(args: SelectSubset<T, TokenizedAssetUpsertArgs<ExtArgs>>): Prisma__TokenizedAssetClient<$Result.GetResult<Prisma.$TokenizedAssetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TokenizedAssets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenizedAssetCountArgs} args - Arguments to filter TokenizedAssets to count.
     * @example
     * // Count the number of TokenizedAssets
     * const count = await prisma.tokenizedAsset.count({
     *   where: {
     *     // ... the filter for the TokenizedAssets we want to count
     *   }
     * })
    **/
    count<T extends TokenizedAssetCountArgs>(
      args?: Subset<T, TokenizedAssetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TokenizedAssetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TokenizedAsset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenizedAssetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TokenizedAssetAggregateArgs>(args: Subset<T, TokenizedAssetAggregateArgs>): Prisma.PrismaPromise<GetTokenizedAssetAggregateType<T>>

    /**
     * Group by TokenizedAsset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenizedAssetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TokenizedAssetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TokenizedAssetGroupByArgs['orderBy'] }
        : { orderBy?: TokenizedAssetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TokenizedAssetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTokenizedAssetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TokenizedAsset model
   */
  readonly fields: TokenizedAssetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TokenizedAsset.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TokenizedAssetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tokenHolders<T extends TokenizedAsset$tokenHoldersArgs<ExtArgs> = {}>(args?: Subset<T, TokenizedAsset$tokenHoldersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenHolderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TokenizedAsset model
   */
  interface TokenizedAssetFieldRefs {
    readonly id: FieldRef<"TokenizedAsset", 'String'>
    readonly assetType: FieldRef<"TokenizedAsset", 'String'>
    readonly name: FieldRef<"TokenizedAsset", 'String'>
    readonly location: FieldRef<"TokenizedAsset", 'String'>
    readonly totalShares: FieldRef<"TokenizedAsset", 'Int'>
    readonly availableShares: FieldRef<"TokenizedAsset", 'Int'>
    readonly pricePerShare: FieldRef<"TokenizedAsset", 'Decimal'>
    readonly currency: FieldRef<"TokenizedAsset", 'String'>
    readonly metadata: FieldRef<"TokenizedAsset", 'Json'>
    readonly status: FieldRef<"TokenizedAsset", 'String'>
    readonly createdAt: FieldRef<"TokenizedAsset", 'DateTime'>
    readonly updatedAt: FieldRef<"TokenizedAsset", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TokenizedAsset findUnique
   */
  export type TokenizedAssetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenizedAsset
     */
    select?: TokenizedAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenizedAsset
     */
    omit?: TokenizedAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenizedAssetInclude<ExtArgs> | null
    /**
     * Filter, which TokenizedAsset to fetch.
     */
    where: TokenizedAssetWhereUniqueInput
  }

  /**
   * TokenizedAsset findUniqueOrThrow
   */
  export type TokenizedAssetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenizedAsset
     */
    select?: TokenizedAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenizedAsset
     */
    omit?: TokenizedAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenizedAssetInclude<ExtArgs> | null
    /**
     * Filter, which TokenizedAsset to fetch.
     */
    where: TokenizedAssetWhereUniqueInput
  }

  /**
   * TokenizedAsset findFirst
   */
  export type TokenizedAssetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenizedAsset
     */
    select?: TokenizedAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenizedAsset
     */
    omit?: TokenizedAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenizedAssetInclude<ExtArgs> | null
    /**
     * Filter, which TokenizedAsset to fetch.
     */
    where?: TokenizedAssetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TokenizedAssets to fetch.
     */
    orderBy?: TokenizedAssetOrderByWithRelationInput | TokenizedAssetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TokenizedAssets.
     */
    cursor?: TokenizedAssetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TokenizedAssets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TokenizedAssets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TokenizedAssets.
     */
    distinct?: TokenizedAssetScalarFieldEnum | TokenizedAssetScalarFieldEnum[]
  }

  /**
   * TokenizedAsset findFirstOrThrow
   */
  export type TokenizedAssetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenizedAsset
     */
    select?: TokenizedAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenizedAsset
     */
    omit?: TokenizedAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenizedAssetInclude<ExtArgs> | null
    /**
     * Filter, which TokenizedAsset to fetch.
     */
    where?: TokenizedAssetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TokenizedAssets to fetch.
     */
    orderBy?: TokenizedAssetOrderByWithRelationInput | TokenizedAssetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TokenizedAssets.
     */
    cursor?: TokenizedAssetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TokenizedAssets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TokenizedAssets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TokenizedAssets.
     */
    distinct?: TokenizedAssetScalarFieldEnum | TokenizedAssetScalarFieldEnum[]
  }

  /**
   * TokenizedAsset findMany
   */
  export type TokenizedAssetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenizedAsset
     */
    select?: TokenizedAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenizedAsset
     */
    omit?: TokenizedAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenizedAssetInclude<ExtArgs> | null
    /**
     * Filter, which TokenizedAssets to fetch.
     */
    where?: TokenizedAssetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TokenizedAssets to fetch.
     */
    orderBy?: TokenizedAssetOrderByWithRelationInput | TokenizedAssetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TokenizedAssets.
     */
    cursor?: TokenizedAssetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TokenizedAssets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TokenizedAssets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TokenizedAssets.
     */
    distinct?: TokenizedAssetScalarFieldEnum | TokenizedAssetScalarFieldEnum[]
  }

  /**
   * TokenizedAsset create
   */
  export type TokenizedAssetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenizedAsset
     */
    select?: TokenizedAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenizedAsset
     */
    omit?: TokenizedAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenizedAssetInclude<ExtArgs> | null
    /**
     * The data needed to create a TokenizedAsset.
     */
    data: XOR<TokenizedAssetCreateInput, TokenizedAssetUncheckedCreateInput>
  }

  /**
   * TokenizedAsset createMany
   */
  export type TokenizedAssetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TokenizedAssets.
     */
    data: TokenizedAssetCreateManyInput | TokenizedAssetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TokenizedAsset createManyAndReturn
   */
  export type TokenizedAssetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenizedAsset
     */
    select?: TokenizedAssetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TokenizedAsset
     */
    omit?: TokenizedAssetOmit<ExtArgs> | null
    /**
     * The data used to create many TokenizedAssets.
     */
    data: TokenizedAssetCreateManyInput | TokenizedAssetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TokenizedAsset update
   */
  export type TokenizedAssetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenizedAsset
     */
    select?: TokenizedAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenizedAsset
     */
    omit?: TokenizedAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenizedAssetInclude<ExtArgs> | null
    /**
     * The data needed to update a TokenizedAsset.
     */
    data: XOR<TokenizedAssetUpdateInput, TokenizedAssetUncheckedUpdateInput>
    /**
     * Choose, which TokenizedAsset to update.
     */
    where: TokenizedAssetWhereUniqueInput
  }

  /**
   * TokenizedAsset updateMany
   */
  export type TokenizedAssetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TokenizedAssets.
     */
    data: XOR<TokenizedAssetUpdateManyMutationInput, TokenizedAssetUncheckedUpdateManyInput>
    /**
     * Filter which TokenizedAssets to update
     */
    where?: TokenizedAssetWhereInput
    /**
     * Limit how many TokenizedAssets to update.
     */
    limit?: number
  }

  /**
   * TokenizedAsset updateManyAndReturn
   */
  export type TokenizedAssetUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenizedAsset
     */
    select?: TokenizedAssetSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TokenizedAsset
     */
    omit?: TokenizedAssetOmit<ExtArgs> | null
    /**
     * The data used to update TokenizedAssets.
     */
    data: XOR<TokenizedAssetUpdateManyMutationInput, TokenizedAssetUncheckedUpdateManyInput>
    /**
     * Filter which TokenizedAssets to update
     */
    where?: TokenizedAssetWhereInput
    /**
     * Limit how many TokenizedAssets to update.
     */
    limit?: number
  }

  /**
   * TokenizedAsset upsert
   */
  export type TokenizedAssetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenizedAsset
     */
    select?: TokenizedAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenizedAsset
     */
    omit?: TokenizedAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenizedAssetInclude<ExtArgs> | null
    /**
     * The filter to search for the TokenizedAsset to update in case it exists.
     */
    where: TokenizedAssetWhereUniqueInput
    /**
     * In case the TokenizedAsset found by the `where` argument doesn't exist, create a new TokenizedAsset with this data.
     */
    create: XOR<TokenizedAssetCreateInput, TokenizedAssetUncheckedCreateInput>
    /**
     * In case the TokenizedAsset was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TokenizedAssetUpdateInput, TokenizedAssetUncheckedUpdateInput>
  }

  /**
   * TokenizedAsset delete
   */
  export type TokenizedAssetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenizedAsset
     */
    select?: TokenizedAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenizedAsset
     */
    omit?: TokenizedAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenizedAssetInclude<ExtArgs> | null
    /**
     * Filter which TokenizedAsset to delete.
     */
    where: TokenizedAssetWhereUniqueInput
  }

  /**
   * TokenizedAsset deleteMany
   */
  export type TokenizedAssetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TokenizedAssets to delete
     */
    where?: TokenizedAssetWhereInput
    /**
     * Limit how many TokenizedAssets to delete.
     */
    limit?: number
  }

  /**
   * TokenizedAsset.tokenHolders
   */
  export type TokenizedAsset$tokenHoldersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenHolder
     */
    select?: TokenHolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenHolder
     */
    omit?: TokenHolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenHolderInclude<ExtArgs> | null
    where?: TokenHolderWhereInput
    orderBy?: TokenHolderOrderByWithRelationInput | TokenHolderOrderByWithRelationInput[]
    cursor?: TokenHolderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TokenHolderScalarFieldEnum | TokenHolderScalarFieldEnum[]
  }

  /**
   * TokenizedAsset without action
   */
  export type TokenizedAssetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenizedAsset
     */
    select?: TokenizedAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenizedAsset
     */
    omit?: TokenizedAssetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenizedAssetInclude<ExtArgs> | null
  }


  /**
   * Model TokenHolder
   */

  export type AggregateTokenHolder = {
    _count: TokenHolderCountAggregateOutputType | null
    _avg: TokenHolderAvgAggregateOutputType | null
    _sum: TokenHolderSumAggregateOutputType | null
    _min: TokenHolderMinAggregateOutputType | null
    _max: TokenHolderMaxAggregateOutputType | null
  }

  export type TokenHolderAvgAggregateOutputType = {
    shares: number | null
    purchasePrice: Decimal | null
    totalPaid: Decimal | null
  }

  export type TokenHolderSumAggregateOutputType = {
    shares: number | null
    purchasePrice: Decimal | null
    totalPaid: Decimal | null
  }

  export type TokenHolderMinAggregateOutputType = {
    id: string | null
    tokenizedAssetId: string | null
    leadId: string | null
    shares: number | null
    purchasePrice: Decimal | null
    totalPaid: Decimal | null
    transactionId: string | null
    purchasedAt: Date | null
  }

  export type TokenHolderMaxAggregateOutputType = {
    id: string | null
    tokenizedAssetId: string | null
    leadId: string | null
    shares: number | null
    purchasePrice: Decimal | null
    totalPaid: Decimal | null
    transactionId: string | null
    purchasedAt: Date | null
  }

  export type TokenHolderCountAggregateOutputType = {
    id: number
    tokenizedAssetId: number
    leadId: number
    shares: number
    purchasePrice: number
    totalPaid: number
    transactionId: number
    purchasedAt: number
    _all: number
  }


  export type TokenHolderAvgAggregateInputType = {
    shares?: true
    purchasePrice?: true
    totalPaid?: true
  }

  export type TokenHolderSumAggregateInputType = {
    shares?: true
    purchasePrice?: true
    totalPaid?: true
  }

  export type TokenHolderMinAggregateInputType = {
    id?: true
    tokenizedAssetId?: true
    leadId?: true
    shares?: true
    purchasePrice?: true
    totalPaid?: true
    transactionId?: true
    purchasedAt?: true
  }

  export type TokenHolderMaxAggregateInputType = {
    id?: true
    tokenizedAssetId?: true
    leadId?: true
    shares?: true
    purchasePrice?: true
    totalPaid?: true
    transactionId?: true
    purchasedAt?: true
  }

  export type TokenHolderCountAggregateInputType = {
    id?: true
    tokenizedAssetId?: true
    leadId?: true
    shares?: true
    purchasePrice?: true
    totalPaid?: true
    transactionId?: true
    purchasedAt?: true
    _all?: true
  }

  export type TokenHolderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TokenHolder to aggregate.
     */
    where?: TokenHolderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TokenHolders to fetch.
     */
    orderBy?: TokenHolderOrderByWithRelationInput | TokenHolderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TokenHolderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TokenHolders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TokenHolders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TokenHolders
    **/
    _count?: true | TokenHolderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TokenHolderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TokenHolderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TokenHolderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TokenHolderMaxAggregateInputType
  }

  export type GetTokenHolderAggregateType<T extends TokenHolderAggregateArgs> = {
        [P in keyof T & keyof AggregateTokenHolder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTokenHolder[P]>
      : GetScalarType<T[P], AggregateTokenHolder[P]>
  }




  export type TokenHolderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TokenHolderWhereInput
    orderBy?: TokenHolderOrderByWithAggregationInput | TokenHolderOrderByWithAggregationInput[]
    by: TokenHolderScalarFieldEnum[] | TokenHolderScalarFieldEnum
    having?: TokenHolderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TokenHolderCountAggregateInputType | true
    _avg?: TokenHolderAvgAggregateInputType
    _sum?: TokenHolderSumAggregateInputType
    _min?: TokenHolderMinAggregateInputType
    _max?: TokenHolderMaxAggregateInputType
  }

  export type TokenHolderGroupByOutputType = {
    id: string
    tokenizedAssetId: string
    leadId: string | null
    shares: number
    purchasePrice: Decimal
    totalPaid: Decimal
    transactionId: string | null
    purchasedAt: Date
    _count: TokenHolderCountAggregateOutputType | null
    _avg: TokenHolderAvgAggregateOutputType | null
    _sum: TokenHolderSumAggregateOutputType | null
    _min: TokenHolderMinAggregateOutputType | null
    _max: TokenHolderMaxAggregateOutputType | null
  }

  type GetTokenHolderGroupByPayload<T extends TokenHolderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TokenHolderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TokenHolderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TokenHolderGroupByOutputType[P]>
            : GetScalarType<T[P], TokenHolderGroupByOutputType[P]>
        }
      >
    >


  export type TokenHolderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tokenizedAssetId?: boolean
    leadId?: boolean
    shares?: boolean
    purchasePrice?: boolean
    totalPaid?: boolean
    transactionId?: boolean
    purchasedAt?: boolean
    tokenizedAsset?: boolean | TokenizedAssetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tokenHolder"]>

  export type TokenHolderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tokenizedAssetId?: boolean
    leadId?: boolean
    shares?: boolean
    purchasePrice?: boolean
    totalPaid?: boolean
    transactionId?: boolean
    purchasedAt?: boolean
    tokenizedAsset?: boolean | TokenizedAssetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tokenHolder"]>

  export type TokenHolderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tokenizedAssetId?: boolean
    leadId?: boolean
    shares?: boolean
    purchasePrice?: boolean
    totalPaid?: boolean
    transactionId?: boolean
    purchasedAt?: boolean
    tokenizedAsset?: boolean | TokenizedAssetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tokenHolder"]>

  export type TokenHolderSelectScalar = {
    id?: boolean
    tokenizedAssetId?: boolean
    leadId?: boolean
    shares?: boolean
    purchasePrice?: boolean
    totalPaid?: boolean
    transactionId?: boolean
    purchasedAt?: boolean
  }

  export type TokenHolderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tokenizedAssetId" | "leadId" | "shares" | "purchasePrice" | "totalPaid" | "transactionId" | "purchasedAt", ExtArgs["result"]["tokenHolder"]>
  export type TokenHolderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tokenizedAsset?: boolean | TokenizedAssetDefaultArgs<ExtArgs>
  }
  export type TokenHolderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tokenizedAsset?: boolean | TokenizedAssetDefaultArgs<ExtArgs>
  }
  export type TokenHolderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tokenizedAsset?: boolean | TokenizedAssetDefaultArgs<ExtArgs>
  }

  export type $TokenHolderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TokenHolder"
    objects: {
      tokenizedAsset: Prisma.$TokenizedAssetPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tokenizedAssetId: string
      leadId: string | null
      shares: number
      purchasePrice: Prisma.Decimal
      totalPaid: Prisma.Decimal
      transactionId: string | null
      purchasedAt: Date
    }, ExtArgs["result"]["tokenHolder"]>
    composites: {}
  }

  type TokenHolderGetPayload<S extends boolean | null | undefined | TokenHolderDefaultArgs> = $Result.GetResult<Prisma.$TokenHolderPayload, S>

  type TokenHolderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TokenHolderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TokenHolderCountAggregateInputType | true
    }

  export interface TokenHolderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TokenHolder'], meta: { name: 'TokenHolder' } }
    /**
     * Find zero or one TokenHolder that matches the filter.
     * @param {TokenHolderFindUniqueArgs} args - Arguments to find a TokenHolder
     * @example
     * // Get one TokenHolder
     * const tokenHolder = await prisma.tokenHolder.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TokenHolderFindUniqueArgs>(args: SelectSubset<T, TokenHolderFindUniqueArgs<ExtArgs>>): Prisma__TokenHolderClient<$Result.GetResult<Prisma.$TokenHolderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TokenHolder that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TokenHolderFindUniqueOrThrowArgs} args - Arguments to find a TokenHolder
     * @example
     * // Get one TokenHolder
     * const tokenHolder = await prisma.tokenHolder.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TokenHolderFindUniqueOrThrowArgs>(args: SelectSubset<T, TokenHolderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TokenHolderClient<$Result.GetResult<Prisma.$TokenHolderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TokenHolder that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenHolderFindFirstArgs} args - Arguments to find a TokenHolder
     * @example
     * // Get one TokenHolder
     * const tokenHolder = await prisma.tokenHolder.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TokenHolderFindFirstArgs>(args?: SelectSubset<T, TokenHolderFindFirstArgs<ExtArgs>>): Prisma__TokenHolderClient<$Result.GetResult<Prisma.$TokenHolderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TokenHolder that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenHolderFindFirstOrThrowArgs} args - Arguments to find a TokenHolder
     * @example
     * // Get one TokenHolder
     * const tokenHolder = await prisma.tokenHolder.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TokenHolderFindFirstOrThrowArgs>(args?: SelectSubset<T, TokenHolderFindFirstOrThrowArgs<ExtArgs>>): Prisma__TokenHolderClient<$Result.GetResult<Prisma.$TokenHolderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TokenHolders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenHolderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TokenHolders
     * const tokenHolders = await prisma.tokenHolder.findMany()
     * 
     * // Get first 10 TokenHolders
     * const tokenHolders = await prisma.tokenHolder.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tokenHolderWithIdOnly = await prisma.tokenHolder.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TokenHolderFindManyArgs>(args?: SelectSubset<T, TokenHolderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenHolderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TokenHolder.
     * @param {TokenHolderCreateArgs} args - Arguments to create a TokenHolder.
     * @example
     * // Create one TokenHolder
     * const TokenHolder = await prisma.tokenHolder.create({
     *   data: {
     *     // ... data to create a TokenHolder
     *   }
     * })
     * 
     */
    create<T extends TokenHolderCreateArgs>(args: SelectSubset<T, TokenHolderCreateArgs<ExtArgs>>): Prisma__TokenHolderClient<$Result.GetResult<Prisma.$TokenHolderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TokenHolders.
     * @param {TokenHolderCreateManyArgs} args - Arguments to create many TokenHolders.
     * @example
     * // Create many TokenHolders
     * const tokenHolder = await prisma.tokenHolder.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TokenHolderCreateManyArgs>(args?: SelectSubset<T, TokenHolderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TokenHolders and returns the data saved in the database.
     * @param {TokenHolderCreateManyAndReturnArgs} args - Arguments to create many TokenHolders.
     * @example
     * // Create many TokenHolders
     * const tokenHolder = await prisma.tokenHolder.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TokenHolders and only return the `id`
     * const tokenHolderWithIdOnly = await prisma.tokenHolder.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TokenHolderCreateManyAndReturnArgs>(args?: SelectSubset<T, TokenHolderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenHolderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TokenHolder.
     * @param {TokenHolderDeleteArgs} args - Arguments to delete one TokenHolder.
     * @example
     * // Delete one TokenHolder
     * const TokenHolder = await prisma.tokenHolder.delete({
     *   where: {
     *     // ... filter to delete one TokenHolder
     *   }
     * })
     * 
     */
    delete<T extends TokenHolderDeleteArgs>(args: SelectSubset<T, TokenHolderDeleteArgs<ExtArgs>>): Prisma__TokenHolderClient<$Result.GetResult<Prisma.$TokenHolderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TokenHolder.
     * @param {TokenHolderUpdateArgs} args - Arguments to update one TokenHolder.
     * @example
     * // Update one TokenHolder
     * const tokenHolder = await prisma.tokenHolder.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TokenHolderUpdateArgs>(args: SelectSubset<T, TokenHolderUpdateArgs<ExtArgs>>): Prisma__TokenHolderClient<$Result.GetResult<Prisma.$TokenHolderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TokenHolders.
     * @param {TokenHolderDeleteManyArgs} args - Arguments to filter TokenHolders to delete.
     * @example
     * // Delete a few TokenHolders
     * const { count } = await prisma.tokenHolder.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TokenHolderDeleteManyArgs>(args?: SelectSubset<T, TokenHolderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TokenHolders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenHolderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TokenHolders
     * const tokenHolder = await prisma.tokenHolder.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TokenHolderUpdateManyArgs>(args: SelectSubset<T, TokenHolderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TokenHolders and returns the data updated in the database.
     * @param {TokenHolderUpdateManyAndReturnArgs} args - Arguments to update many TokenHolders.
     * @example
     * // Update many TokenHolders
     * const tokenHolder = await prisma.tokenHolder.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TokenHolders and only return the `id`
     * const tokenHolderWithIdOnly = await prisma.tokenHolder.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TokenHolderUpdateManyAndReturnArgs>(args: SelectSubset<T, TokenHolderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenHolderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TokenHolder.
     * @param {TokenHolderUpsertArgs} args - Arguments to update or create a TokenHolder.
     * @example
     * // Update or create a TokenHolder
     * const tokenHolder = await prisma.tokenHolder.upsert({
     *   create: {
     *     // ... data to create a TokenHolder
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TokenHolder we want to update
     *   }
     * })
     */
    upsert<T extends TokenHolderUpsertArgs>(args: SelectSubset<T, TokenHolderUpsertArgs<ExtArgs>>): Prisma__TokenHolderClient<$Result.GetResult<Prisma.$TokenHolderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TokenHolders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenHolderCountArgs} args - Arguments to filter TokenHolders to count.
     * @example
     * // Count the number of TokenHolders
     * const count = await prisma.tokenHolder.count({
     *   where: {
     *     // ... the filter for the TokenHolders we want to count
     *   }
     * })
    **/
    count<T extends TokenHolderCountArgs>(
      args?: Subset<T, TokenHolderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TokenHolderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TokenHolder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenHolderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TokenHolderAggregateArgs>(args: Subset<T, TokenHolderAggregateArgs>): Prisma.PrismaPromise<GetTokenHolderAggregateType<T>>

    /**
     * Group by TokenHolder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenHolderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TokenHolderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TokenHolderGroupByArgs['orderBy'] }
        : { orderBy?: TokenHolderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TokenHolderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTokenHolderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TokenHolder model
   */
  readonly fields: TokenHolderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TokenHolder.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TokenHolderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tokenizedAsset<T extends TokenizedAssetDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TokenizedAssetDefaultArgs<ExtArgs>>): Prisma__TokenizedAssetClient<$Result.GetResult<Prisma.$TokenizedAssetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TokenHolder model
   */
  interface TokenHolderFieldRefs {
    readonly id: FieldRef<"TokenHolder", 'String'>
    readonly tokenizedAssetId: FieldRef<"TokenHolder", 'String'>
    readonly leadId: FieldRef<"TokenHolder", 'String'>
    readonly shares: FieldRef<"TokenHolder", 'Int'>
    readonly purchasePrice: FieldRef<"TokenHolder", 'Decimal'>
    readonly totalPaid: FieldRef<"TokenHolder", 'Decimal'>
    readonly transactionId: FieldRef<"TokenHolder", 'String'>
    readonly purchasedAt: FieldRef<"TokenHolder", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TokenHolder findUnique
   */
  export type TokenHolderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenHolder
     */
    select?: TokenHolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenHolder
     */
    omit?: TokenHolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenHolderInclude<ExtArgs> | null
    /**
     * Filter, which TokenHolder to fetch.
     */
    where: TokenHolderWhereUniqueInput
  }

  /**
   * TokenHolder findUniqueOrThrow
   */
  export type TokenHolderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenHolder
     */
    select?: TokenHolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenHolder
     */
    omit?: TokenHolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenHolderInclude<ExtArgs> | null
    /**
     * Filter, which TokenHolder to fetch.
     */
    where: TokenHolderWhereUniqueInput
  }

  /**
   * TokenHolder findFirst
   */
  export type TokenHolderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenHolder
     */
    select?: TokenHolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenHolder
     */
    omit?: TokenHolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenHolderInclude<ExtArgs> | null
    /**
     * Filter, which TokenHolder to fetch.
     */
    where?: TokenHolderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TokenHolders to fetch.
     */
    orderBy?: TokenHolderOrderByWithRelationInput | TokenHolderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TokenHolders.
     */
    cursor?: TokenHolderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TokenHolders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TokenHolders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TokenHolders.
     */
    distinct?: TokenHolderScalarFieldEnum | TokenHolderScalarFieldEnum[]
  }

  /**
   * TokenHolder findFirstOrThrow
   */
  export type TokenHolderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenHolder
     */
    select?: TokenHolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenHolder
     */
    omit?: TokenHolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenHolderInclude<ExtArgs> | null
    /**
     * Filter, which TokenHolder to fetch.
     */
    where?: TokenHolderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TokenHolders to fetch.
     */
    orderBy?: TokenHolderOrderByWithRelationInput | TokenHolderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TokenHolders.
     */
    cursor?: TokenHolderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TokenHolders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TokenHolders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TokenHolders.
     */
    distinct?: TokenHolderScalarFieldEnum | TokenHolderScalarFieldEnum[]
  }

  /**
   * TokenHolder findMany
   */
  export type TokenHolderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenHolder
     */
    select?: TokenHolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenHolder
     */
    omit?: TokenHolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenHolderInclude<ExtArgs> | null
    /**
     * Filter, which TokenHolders to fetch.
     */
    where?: TokenHolderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TokenHolders to fetch.
     */
    orderBy?: TokenHolderOrderByWithRelationInput | TokenHolderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TokenHolders.
     */
    cursor?: TokenHolderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TokenHolders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TokenHolders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TokenHolders.
     */
    distinct?: TokenHolderScalarFieldEnum | TokenHolderScalarFieldEnum[]
  }

  /**
   * TokenHolder create
   */
  export type TokenHolderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenHolder
     */
    select?: TokenHolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenHolder
     */
    omit?: TokenHolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenHolderInclude<ExtArgs> | null
    /**
     * The data needed to create a TokenHolder.
     */
    data: XOR<TokenHolderCreateInput, TokenHolderUncheckedCreateInput>
  }

  /**
   * TokenHolder createMany
   */
  export type TokenHolderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TokenHolders.
     */
    data: TokenHolderCreateManyInput | TokenHolderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TokenHolder createManyAndReturn
   */
  export type TokenHolderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenHolder
     */
    select?: TokenHolderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TokenHolder
     */
    omit?: TokenHolderOmit<ExtArgs> | null
    /**
     * The data used to create many TokenHolders.
     */
    data: TokenHolderCreateManyInput | TokenHolderCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenHolderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TokenHolder update
   */
  export type TokenHolderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenHolder
     */
    select?: TokenHolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenHolder
     */
    omit?: TokenHolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenHolderInclude<ExtArgs> | null
    /**
     * The data needed to update a TokenHolder.
     */
    data: XOR<TokenHolderUpdateInput, TokenHolderUncheckedUpdateInput>
    /**
     * Choose, which TokenHolder to update.
     */
    where: TokenHolderWhereUniqueInput
  }

  /**
   * TokenHolder updateMany
   */
  export type TokenHolderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TokenHolders.
     */
    data: XOR<TokenHolderUpdateManyMutationInput, TokenHolderUncheckedUpdateManyInput>
    /**
     * Filter which TokenHolders to update
     */
    where?: TokenHolderWhereInput
    /**
     * Limit how many TokenHolders to update.
     */
    limit?: number
  }

  /**
   * TokenHolder updateManyAndReturn
   */
  export type TokenHolderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenHolder
     */
    select?: TokenHolderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TokenHolder
     */
    omit?: TokenHolderOmit<ExtArgs> | null
    /**
     * The data used to update TokenHolders.
     */
    data: XOR<TokenHolderUpdateManyMutationInput, TokenHolderUncheckedUpdateManyInput>
    /**
     * Filter which TokenHolders to update
     */
    where?: TokenHolderWhereInput
    /**
     * Limit how many TokenHolders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenHolderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TokenHolder upsert
   */
  export type TokenHolderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenHolder
     */
    select?: TokenHolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenHolder
     */
    omit?: TokenHolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenHolderInclude<ExtArgs> | null
    /**
     * The filter to search for the TokenHolder to update in case it exists.
     */
    where: TokenHolderWhereUniqueInput
    /**
     * In case the TokenHolder found by the `where` argument doesn't exist, create a new TokenHolder with this data.
     */
    create: XOR<TokenHolderCreateInput, TokenHolderUncheckedCreateInput>
    /**
     * In case the TokenHolder was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TokenHolderUpdateInput, TokenHolderUncheckedUpdateInput>
  }

  /**
   * TokenHolder delete
   */
  export type TokenHolderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenHolder
     */
    select?: TokenHolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenHolder
     */
    omit?: TokenHolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenHolderInclude<ExtArgs> | null
    /**
     * Filter which TokenHolder to delete.
     */
    where: TokenHolderWhereUniqueInput
  }

  /**
   * TokenHolder deleteMany
   */
  export type TokenHolderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TokenHolders to delete
     */
    where?: TokenHolderWhereInput
    /**
     * Limit how many TokenHolders to delete.
     */
    limit?: number
  }

  /**
   * TokenHolder without action
   */
  export type TokenHolderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenHolder
     */
    select?: TokenHolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenHolder
     */
    omit?: TokenHolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenHolderInclude<ExtArgs> | null
  }


  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    amount: number | null
  }

  export type PaymentSumAggregateOutputType = {
    amount: number | null
  }

  export type PaymentMinAggregateOutputType = {
    id: string | null
    amount: number | null
    status: string | null
    reference: string | null
    leadId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentMaxAggregateOutputType = {
    id: string | null
    amount: number | null
    status: string | null
    reference: string | null
    leadId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentCountAggregateOutputType = {
    id: number
    amount: number
    status: number
    reference: number
    leadId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    amount?: true
  }

  export type PaymentSumAggregateInputType = {
    amount?: true
  }

  export type PaymentMinAggregateInputType = {
    id?: true
    amount?: true
    status?: true
    reference?: true
    leadId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentMaxAggregateInputType = {
    id?: true
    amount?: true
    status?: true
    reference?: true
    leadId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentCountAggregateInputType = {
    id?: true
    amount?: true
    status?: true
    reference?: true
    leadId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[]
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }

  export type PaymentGroupByOutputType = {
    id: string
    amount: number
    status: string
    reference: string
    leadId: string
    createdAt: Date
    updatedAt: Date
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    status?: boolean
    reference?: boolean
    leadId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    status?: boolean
    reference?: boolean
    leadId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    status?: boolean
    reference?: boolean
    leadId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectScalar = {
    id?: boolean
    amount?: boolean
    status?: boolean
    reference?: boolean
    leadId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "amount" | "status" | "reference" | "leadId" | "createdAt" | "updatedAt", ExtArgs["result"]["payment"]>
  export type PaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {
      lead: Prisma.$LeadPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      amount: number
      status: string
      reference: string
      leadId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["payment"]>
    composites: {}
  }

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<Prisma.$PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentFindManyArgs>(args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
     */
    create<T extends PaymentCreateArgs>(args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentCreateManyArgs>(args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payments and returns the data saved in the database.
     * @param {PaymentCreateManyAndReturnArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
     */
    delete<T extends PaymentDeleteArgs>(args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentUpdateArgs>(args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentDeleteManyArgs>(args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentUpdateManyArgs>(args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments and returns the data updated in the database.
     * @param {PaymentUpdateManyAndReturnArgs} args - Arguments to update many Payments.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PaymentUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payment model
   */
  readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lead<T extends LeadDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LeadDefaultArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Payment model
   */
  interface PaymentFieldRefs {
    readonly id: FieldRef<"Payment", 'String'>
    readonly amount: FieldRef<"Payment", 'Int'>
    readonly status: FieldRef<"Payment", 'String'>
    readonly reference: FieldRef<"Payment", 'String'>
    readonly leadId: FieldRef<"Payment", 'String'>
    readonly createdAt: FieldRef<"Payment", 'DateTime'>
    readonly updatedAt: FieldRef<"Payment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payment createManyAndReturn
   */
  export type PaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
  }

  /**
   * Payment updateManyAndReturn
   */
  export type PaymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to delete.
     */
    limit?: number
  }

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
  }


  /**
   * Model Demo
   */

  export type AggregateDemo = {
    _count: DemoCountAggregateOutputType | null
    _min: DemoMinAggregateOutputType | null
    _max: DemoMaxAggregateOutputType | null
  }

  export type DemoMinAggregateOutputType = {
    id: string | null
    slug: string | null
    leadId: string | null
    approved: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DemoMaxAggregateOutputType = {
    id: string | null
    slug: string | null
    leadId: string | null
    approved: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DemoCountAggregateOutputType = {
    id: number
    slug: number
    leadId: number
    config: number
    approved: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DemoMinAggregateInputType = {
    id?: true
    slug?: true
    leadId?: true
    approved?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DemoMaxAggregateInputType = {
    id?: true
    slug?: true
    leadId?: true
    approved?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DemoCountAggregateInputType = {
    id?: true
    slug?: true
    leadId?: true
    config?: true
    approved?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DemoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Demo to aggregate.
     */
    where?: DemoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Demos to fetch.
     */
    orderBy?: DemoOrderByWithRelationInput | DemoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DemoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Demos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Demos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Demos
    **/
    _count?: true | DemoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DemoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DemoMaxAggregateInputType
  }

  export type GetDemoAggregateType<T extends DemoAggregateArgs> = {
        [P in keyof T & keyof AggregateDemo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDemo[P]>
      : GetScalarType<T[P], AggregateDemo[P]>
  }




  export type DemoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DemoWhereInput
    orderBy?: DemoOrderByWithAggregationInput | DemoOrderByWithAggregationInput[]
    by: DemoScalarFieldEnum[] | DemoScalarFieldEnum
    having?: DemoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DemoCountAggregateInputType | true
    _min?: DemoMinAggregateInputType
    _max?: DemoMaxAggregateInputType
  }

  export type DemoGroupByOutputType = {
    id: string
    slug: string
    leadId: string
    config: JsonValue | null
    approved: boolean
    createdAt: Date
    updatedAt: Date
    _count: DemoCountAggregateOutputType | null
    _min: DemoMinAggregateOutputType | null
    _max: DemoMaxAggregateOutputType | null
  }

  type GetDemoGroupByPayload<T extends DemoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DemoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DemoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DemoGroupByOutputType[P]>
            : GetScalarType<T[P], DemoGroupByOutputType[P]>
        }
      >
    >


  export type DemoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    leadId?: boolean
    config?: boolean
    approved?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["demo"]>

  export type DemoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    leadId?: boolean
    config?: boolean
    approved?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["demo"]>

  export type DemoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    leadId?: boolean
    config?: boolean
    approved?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["demo"]>

  export type DemoSelectScalar = {
    id?: boolean
    slug?: boolean
    leadId?: boolean
    config?: boolean
    approved?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DemoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "slug" | "leadId" | "config" | "approved" | "createdAt" | "updatedAt", ExtArgs["result"]["demo"]>
  export type DemoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }
  export type DemoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }
  export type DemoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }

  export type $DemoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Demo"
    objects: {
      lead: Prisma.$LeadPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      slug: string
      leadId: string
      config: Prisma.JsonValue | null
      approved: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["demo"]>
    composites: {}
  }

  type DemoGetPayload<S extends boolean | null | undefined | DemoDefaultArgs> = $Result.GetResult<Prisma.$DemoPayload, S>

  type DemoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DemoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DemoCountAggregateInputType | true
    }

  export interface DemoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Demo'], meta: { name: 'Demo' } }
    /**
     * Find zero or one Demo that matches the filter.
     * @param {DemoFindUniqueArgs} args - Arguments to find a Demo
     * @example
     * // Get one Demo
     * const demo = await prisma.demo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DemoFindUniqueArgs>(args: SelectSubset<T, DemoFindUniqueArgs<ExtArgs>>): Prisma__DemoClient<$Result.GetResult<Prisma.$DemoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Demo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DemoFindUniqueOrThrowArgs} args - Arguments to find a Demo
     * @example
     * // Get one Demo
     * const demo = await prisma.demo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DemoFindUniqueOrThrowArgs>(args: SelectSubset<T, DemoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DemoClient<$Result.GetResult<Prisma.$DemoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Demo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DemoFindFirstArgs} args - Arguments to find a Demo
     * @example
     * // Get one Demo
     * const demo = await prisma.demo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DemoFindFirstArgs>(args?: SelectSubset<T, DemoFindFirstArgs<ExtArgs>>): Prisma__DemoClient<$Result.GetResult<Prisma.$DemoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Demo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DemoFindFirstOrThrowArgs} args - Arguments to find a Demo
     * @example
     * // Get one Demo
     * const demo = await prisma.demo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DemoFindFirstOrThrowArgs>(args?: SelectSubset<T, DemoFindFirstOrThrowArgs<ExtArgs>>): Prisma__DemoClient<$Result.GetResult<Prisma.$DemoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Demos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DemoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Demos
     * const demos = await prisma.demo.findMany()
     * 
     * // Get first 10 Demos
     * const demos = await prisma.demo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const demoWithIdOnly = await prisma.demo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DemoFindManyArgs>(args?: SelectSubset<T, DemoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DemoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Demo.
     * @param {DemoCreateArgs} args - Arguments to create a Demo.
     * @example
     * // Create one Demo
     * const Demo = await prisma.demo.create({
     *   data: {
     *     // ... data to create a Demo
     *   }
     * })
     * 
     */
    create<T extends DemoCreateArgs>(args: SelectSubset<T, DemoCreateArgs<ExtArgs>>): Prisma__DemoClient<$Result.GetResult<Prisma.$DemoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Demos.
     * @param {DemoCreateManyArgs} args - Arguments to create many Demos.
     * @example
     * // Create many Demos
     * const demo = await prisma.demo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DemoCreateManyArgs>(args?: SelectSubset<T, DemoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Demos and returns the data saved in the database.
     * @param {DemoCreateManyAndReturnArgs} args - Arguments to create many Demos.
     * @example
     * // Create many Demos
     * const demo = await prisma.demo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Demos and only return the `id`
     * const demoWithIdOnly = await prisma.demo.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DemoCreateManyAndReturnArgs>(args?: SelectSubset<T, DemoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DemoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Demo.
     * @param {DemoDeleteArgs} args - Arguments to delete one Demo.
     * @example
     * // Delete one Demo
     * const Demo = await prisma.demo.delete({
     *   where: {
     *     // ... filter to delete one Demo
     *   }
     * })
     * 
     */
    delete<T extends DemoDeleteArgs>(args: SelectSubset<T, DemoDeleteArgs<ExtArgs>>): Prisma__DemoClient<$Result.GetResult<Prisma.$DemoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Demo.
     * @param {DemoUpdateArgs} args - Arguments to update one Demo.
     * @example
     * // Update one Demo
     * const demo = await prisma.demo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DemoUpdateArgs>(args: SelectSubset<T, DemoUpdateArgs<ExtArgs>>): Prisma__DemoClient<$Result.GetResult<Prisma.$DemoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Demos.
     * @param {DemoDeleteManyArgs} args - Arguments to filter Demos to delete.
     * @example
     * // Delete a few Demos
     * const { count } = await prisma.demo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DemoDeleteManyArgs>(args?: SelectSubset<T, DemoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Demos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DemoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Demos
     * const demo = await prisma.demo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DemoUpdateManyArgs>(args: SelectSubset<T, DemoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Demos and returns the data updated in the database.
     * @param {DemoUpdateManyAndReturnArgs} args - Arguments to update many Demos.
     * @example
     * // Update many Demos
     * const demo = await prisma.demo.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Demos and only return the `id`
     * const demoWithIdOnly = await prisma.demo.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DemoUpdateManyAndReturnArgs>(args: SelectSubset<T, DemoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DemoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Demo.
     * @param {DemoUpsertArgs} args - Arguments to update or create a Demo.
     * @example
     * // Update or create a Demo
     * const demo = await prisma.demo.upsert({
     *   create: {
     *     // ... data to create a Demo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Demo we want to update
     *   }
     * })
     */
    upsert<T extends DemoUpsertArgs>(args: SelectSubset<T, DemoUpsertArgs<ExtArgs>>): Prisma__DemoClient<$Result.GetResult<Prisma.$DemoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Demos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DemoCountArgs} args - Arguments to filter Demos to count.
     * @example
     * // Count the number of Demos
     * const count = await prisma.demo.count({
     *   where: {
     *     // ... the filter for the Demos we want to count
     *   }
     * })
    **/
    count<T extends DemoCountArgs>(
      args?: Subset<T, DemoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DemoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Demo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DemoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DemoAggregateArgs>(args: Subset<T, DemoAggregateArgs>): Prisma.PrismaPromise<GetDemoAggregateType<T>>

    /**
     * Group by Demo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DemoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DemoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DemoGroupByArgs['orderBy'] }
        : { orderBy?: DemoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DemoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDemoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Demo model
   */
  readonly fields: DemoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Demo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DemoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lead<T extends LeadDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LeadDefaultArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Demo model
   */
  interface DemoFieldRefs {
    readonly id: FieldRef<"Demo", 'String'>
    readonly slug: FieldRef<"Demo", 'String'>
    readonly leadId: FieldRef<"Demo", 'String'>
    readonly config: FieldRef<"Demo", 'Json'>
    readonly approved: FieldRef<"Demo", 'Boolean'>
    readonly createdAt: FieldRef<"Demo", 'DateTime'>
    readonly updatedAt: FieldRef<"Demo", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Demo findUnique
   */
  export type DemoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Demo
     */
    select?: DemoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Demo
     */
    omit?: DemoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DemoInclude<ExtArgs> | null
    /**
     * Filter, which Demo to fetch.
     */
    where: DemoWhereUniqueInput
  }

  /**
   * Demo findUniqueOrThrow
   */
  export type DemoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Demo
     */
    select?: DemoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Demo
     */
    omit?: DemoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DemoInclude<ExtArgs> | null
    /**
     * Filter, which Demo to fetch.
     */
    where: DemoWhereUniqueInput
  }

  /**
   * Demo findFirst
   */
  export type DemoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Demo
     */
    select?: DemoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Demo
     */
    omit?: DemoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DemoInclude<ExtArgs> | null
    /**
     * Filter, which Demo to fetch.
     */
    where?: DemoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Demos to fetch.
     */
    orderBy?: DemoOrderByWithRelationInput | DemoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Demos.
     */
    cursor?: DemoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Demos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Demos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Demos.
     */
    distinct?: DemoScalarFieldEnum | DemoScalarFieldEnum[]
  }

  /**
   * Demo findFirstOrThrow
   */
  export type DemoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Demo
     */
    select?: DemoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Demo
     */
    omit?: DemoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DemoInclude<ExtArgs> | null
    /**
     * Filter, which Demo to fetch.
     */
    where?: DemoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Demos to fetch.
     */
    orderBy?: DemoOrderByWithRelationInput | DemoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Demos.
     */
    cursor?: DemoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Demos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Demos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Demos.
     */
    distinct?: DemoScalarFieldEnum | DemoScalarFieldEnum[]
  }

  /**
   * Demo findMany
   */
  export type DemoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Demo
     */
    select?: DemoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Demo
     */
    omit?: DemoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DemoInclude<ExtArgs> | null
    /**
     * Filter, which Demos to fetch.
     */
    where?: DemoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Demos to fetch.
     */
    orderBy?: DemoOrderByWithRelationInput | DemoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Demos.
     */
    cursor?: DemoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Demos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Demos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Demos.
     */
    distinct?: DemoScalarFieldEnum | DemoScalarFieldEnum[]
  }

  /**
   * Demo create
   */
  export type DemoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Demo
     */
    select?: DemoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Demo
     */
    omit?: DemoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DemoInclude<ExtArgs> | null
    /**
     * The data needed to create a Demo.
     */
    data: XOR<DemoCreateInput, DemoUncheckedCreateInput>
  }

  /**
   * Demo createMany
   */
  export type DemoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Demos.
     */
    data: DemoCreateManyInput | DemoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Demo createManyAndReturn
   */
  export type DemoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Demo
     */
    select?: DemoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Demo
     */
    omit?: DemoOmit<ExtArgs> | null
    /**
     * The data used to create many Demos.
     */
    data: DemoCreateManyInput | DemoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DemoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Demo update
   */
  export type DemoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Demo
     */
    select?: DemoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Demo
     */
    omit?: DemoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DemoInclude<ExtArgs> | null
    /**
     * The data needed to update a Demo.
     */
    data: XOR<DemoUpdateInput, DemoUncheckedUpdateInput>
    /**
     * Choose, which Demo to update.
     */
    where: DemoWhereUniqueInput
  }

  /**
   * Demo updateMany
   */
  export type DemoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Demos.
     */
    data: XOR<DemoUpdateManyMutationInput, DemoUncheckedUpdateManyInput>
    /**
     * Filter which Demos to update
     */
    where?: DemoWhereInput
    /**
     * Limit how many Demos to update.
     */
    limit?: number
  }

  /**
   * Demo updateManyAndReturn
   */
  export type DemoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Demo
     */
    select?: DemoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Demo
     */
    omit?: DemoOmit<ExtArgs> | null
    /**
     * The data used to update Demos.
     */
    data: XOR<DemoUpdateManyMutationInput, DemoUncheckedUpdateManyInput>
    /**
     * Filter which Demos to update
     */
    where?: DemoWhereInput
    /**
     * Limit how many Demos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DemoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Demo upsert
   */
  export type DemoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Demo
     */
    select?: DemoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Demo
     */
    omit?: DemoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DemoInclude<ExtArgs> | null
    /**
     * The filter to search for the Demo to update in case it exists.
     */
    where: DemoWhereUniqueInput
    /**
     * In case the Demo found by the `where` argument doesn't exist, create a new Demo with this data.
     */
    create: XOR<DemoCreateInput, DemoUncheckedCreateInput>
    /**
     * In case the Demo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DemoUpdateInput, DemoUncheckedUpdateInput>
  }

  /**
   * Demo delete
   */
  export type DemoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Demo
     */
    select?: DemoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Demo
     */
    omit?: DemoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DemoInclude<ExtArgs> | null
    /**
     * Filter which Demo to delete.
     */
    where: DemoWhereUniqueInput
  }

  /**
   * Demo deleteMany
   */
  export type DemoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Demos to delete
     */
    where?: DemoWhereInput
    /**
     * Limit how many Demos to delete.
     */
    limit?: number
  }

  /**
   * Demo without action
   */
  export type DemoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Demo
     */
    select?: DemoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Demo
     */
    omit?: DemoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DemoInclude<ExtArgs> | null
  }


  /**
   * Model SystemEvent
   */

  export type AggregateSystemEvent = {
    _count: SystemEventCountAggregateOutputType | null
    _min: SystemEventMinAggregateOutputType | null
    _max: SystemEventMaxAggregateOutputType | null
  }

  export type SystemEventMinAggregateOutputType = {
    id: string | null
    type: string | null
    message: string | null
    digest: string | null
    createdAt: Date | null
  }

  export type SystemEventMaxAggregateOutputType = {
    id: string | null
    type: string | null
    message: string | null
    digest: string | null
    createdAt: Date | null
  }

  export type SystemEventCountAggregateOutputType = {
    id: number
    type: number
    message: number
    digest: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type SystemEventMinAggregateInputType = {
    id?: true
    type?: true
    message?: true
    digest?: true
    createdAt?: true
  }

  export type SystemEventMaxAggregateInputType = {
    id?: true
    type?: true
    message?: true
    digest?: true
    createdAt?: true
  }

  export type SystemEventCountAggregateInputType = {
    id?: true
    type?: true
    message?: true
    digest?: true
    metadata?: true
    createdAt?: true
    _all?: true
  }

  export type SystemEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemEvent to aggregate.
     */
    where?: SystemEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemEvents to fetch.
     */
    orderBy?: SystemEventOrderByWithRelationInput | SystemEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SystemEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SystemEvents
    **/
    _count?: true | SystemEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SystemEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SystemEventMaxAggregateInputType
  }

  export type GetSystemEventAggregateType<T extends SystemEventAggregateArgs> = {
        [P in keyof T & keyof AggregateSystemEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSystemEvent[P]>
      : GetScalarType<T[P], AggregateSystemEvent[P]>
  }




  export type SystemEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SystemEventWhereInput
    orderBy?: SystemEventOrderByWithAggregationInput | SystemEventOrderByWithAggregationInput[]
    by: SystemEventScalarFieldEnum[] | SystemEventScalarFieldEnum
    having?: SystemEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SystemEventCountAggregateInputType | true
    _min?: SystemEventMinAggregateInputType
    _max?: SystemEventMaxAggregateInputType
  }

  export type SystemEventGroupByOutputType = {
    id: string
    type: string
    message: string
    digest: string | null
    metadata: JsonValue | null
    createdAt: Date
    _count: SystemEventCountAggregateOutputType | null
    _min: SystemEventMinAggregateOutputType | null
    _max: SystemEventMaxAggregateOutputType | null
  }

  type GetSystemEventGroupByPayload<T extends SystemEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SystemEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SystemEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SystemEventGroupByOutputType[P]>
            : GetScalarType<T[P], SystemEventGroupByOutputType[P]>
        }
      >
    >


  export type SystemEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    message?: boolean
    digest?: boolean
    metadata?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["systemEvent"]>

  export type SystemEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    message?: boolean
    digest?: boolean
    metadata?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["systemEvent"]>

  export type SystemEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    message?: boolean
    digest?: boolean
    metadata?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["systemEvent"]>

  export type SystemEventSelectScalar = {
    id?: boolean
    type?: boolean
    message?: boolean
    digest?: boolean
    metadata?: boolean
    createdAt?: boolean
  }

  export type SystemEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "message" | "digest" | "metadata" | "createdAt", ExtArgs["result"]["systemEvent"]>

  export type $SystemEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SystemEvent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: string
      message: string
      digest: string | null
      metadata: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["systemEvent"]>
    composites: {}
  }

  type SystemEventGetPayload<S extends boolean | null | undefined | SystemEventDefaultArgs> = $Result.GetResult<Prisma.$SystemEventPayload, S>

  type SystemEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SystemEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SystemEventCountAggregateInputType | true
    }

  export interface SystemEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SystemEvent'], meta: { name: 'SystemEvent' } }
    /**
     * Find zero or one SystemEvent that matches the filter.
     * @param {SystemEventFindUniqueArgs} args - Arguments to find a SystemEvent
     * @example
     * // Get one SystemEvent
     * const systemEvent = await prisma.systemEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SystemEventFindUniqueArgs>(args: SelectSubset<T, SystemEventFindUniqueArgs<ExtArgs>>): Prisma__SystemEventClient<$Result.GetResult<Prisma.$SystemEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SystemEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SystemEventFindUniqueOrThrowArgs} args - Arguments to find a SystemEvent
     * @example
     * // Get one SystemEvent
     * const systemEvent = await prisma.systemEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SystemEventFindUniqueOrThrowArgs>(args: SelectSubset<T, SystemEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SystemEventClient<$Result.GetResult<Prisma.$SystemEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SystemEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemEventFindFirstArgs} args - Arguments to find a SystemEvent
     * @example
     * // Get one SystemEvent
     * const systemEvent = await prisma.systemEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SystemEventFindFirstArgs>(args?: SelectSubset<T, SystemEventFindFirstArgs<ExtArgs>>): Prisma__SystemEventClient<$Result.GetResult<Prisma.$SystemEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SystemEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemEventFindFirstOrThrowArgs} args - Arguments to find a SystemEvent
     * @example
     * // Get one SystemEvent
     * const systemEvent = await prisma.systemEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SystemEventFindFirstOrThrowArgs>(args?: SelectSubset<T, SystemEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__SystemEventClient<$Result.GetResult<Prisma.$SystemEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SystemEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SystemEvents
     * const systemEvents = await prisma.systemEvent.findMany()
     * 
     * // Get first 10 SystemEvents
     * const systemEvents = await prisma.systemEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const systemEventWithIdOnly = await prisma.systemEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SystemEventFindManyArgs>(args?: SelectSubset<T, SystemEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SystemEvent.
     * @param {SystemEventCreateArgs} args - Arguments to create a SystemEvent.
     * @example
     * // Create one SystemEvent
     * const SystemEvent = await prisma.systemEvent.create({
     *   data: {
     *     // ... data to create a SystemEvent
     *   }
     * })
     * 
     */
    create<T extends SystemEventCreateArgs>(args: SelectSubset<T, SystemEventCreateArgs<ExtArgs>>): Prisma__SystemEventClient<$Result.GetResult<Prisma.$SystemEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SystemEvents.
     * @param {SystemEventCreateManyArgs} args - Arguments to create many SystemEvents.
     * @example
     * // Create many SystemEvents
     * const systemEvent = await prisma.systemEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SystemEventCreateManyArgs>(args?: SelectSubset<T, SystemEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SystemEvents and returns the data saved in the database.
     * @param {SystemEventCreateManyAndReturnArgs} args - Arguments to create many SystemEvents.
     * @example
     * // Create many SystemEvents
     * const systemEvent = await prisma.systemEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SystemEvents and only return the `id`
     * const systemEventWithIdOnly = await prisma.systemEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SystemEventCreateManyAndReturnArgs>(args?: SelectSubset<T, SystemEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SystemEvent.
     * @param {SystemEventDeleteArgs} args - Arguments to delete one SystemEvent.
     * @example
     * // Delete one SystemEvent
     * const SystemEvent = await prisma.systemEvent.delete({
     *   where: {
     *     // ... filter to delete one SystemEvent
     *   }
     * })
     * 
     */
    delete<T extends SystemEventDeleteArgs>(args: SelectSubset<T, SystemEventDeleteArgs<ExtArgs>>): Prisma__SystemEventClient<$Result.GetResult<Prisma.$SystemEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SystemEvent.
     * @param {SystemEventUpdateArgs} args - Arguments to update one SystemEvent.
     * @example
     * // Update one SystemEvent
     * const systemEvent = await prisma.systemEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SystemEventUpdateArgs>(args: SelectSubset<T, SystemEventUpdateArgs<ExtArgs>>): Prisma__SystemEventClient<$Result.GetResult<Prisma.$SystemEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SystemEvents.
     * @param {SystemEventDeleteManyArgs} args - Arguments to filter SystemEvents to delete.
     * @example
     * // Delete a few SystemEvents
     * const { count } = await prisma.systemEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SystemEventDeleteManyArgs>(args?: SelectSubset<T, SystemEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SystemEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SystemEvents
     * const systemEvent = await prisma.systemEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SystemEventUpdateManyArgs>(args: SelectSubset<T, SystemEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SystemEvents and returns the data updated in the database.
     * @param {SystemEventUpdateManyAndReturnArgs} args - Arguments to update many SystemEvents.
     * @example
     * // Update many SystemEvents
     * const systemEvent = await prisma.systemEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SystemEvents and only return the `id`
     * const systemEventWithIdOnly = await prisma.systemEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SystemEventUpdateManyAndReturnArgs>(args: SelectSubset<T, SystemEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SystemEvent.
     * @param {SystemEventUpsertArgs} args - Arguments to update or create a SystemEvent.
     * @example
     * // Update or create a SystemEvent
     * const systemEvent = await prisma.systemEvent.upsert({
     *   create: {
     *     // ... data to create a SystemEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SystemEvent we want to update
     *   }
     * })
     */
    upsert<T extends SystemEventUpsertArgs>(args: SelectSubset<T, SystemEventUpsertArgs<ExtArgs>>): Prisma__SystemEventClient<$Result.GetResult<Prisma.$SystemEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SystemEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemEventCountArgs} args - Arguments to filter SystemEvents to count.
     * @example
     * // Count the number of SystemEvents
     * const count = await prisma.systemEvent.count({
     *   where: {
     *     // ... the filter for the SystemEvents we want to count
     *   }
     * })
    **/
    count<T extends SystemEventCountArgs>(
      args?: Subset<T, SystemEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SystemEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SystemEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SystemEventAggregateArgs>(args: Subset<T, SystemEventAggregateArgs>): Prisma.PrismaPromise<GetSystemEventAggregateType<T>>

    /**
     * Group by SystemEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SystemEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SystemEventGroupByArgs['orderBy'] }
        : { orderBy?: SystemEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SystemEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSystemEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SystemEvent model
   */
  readonly fields: SystemEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SystemEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SystemEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SystemEvent model
   */
  interface SystemEventFieldRefs {
    readonly id: FieldRef<"SystemEvent", 'String'>
    readonly type: FieldRef<"SystemEvent", 'String'>
    readonly message: FieldRef<"SystemEvent", 'String'>
    readonly digest: FieldRef<"SystemEvent", 'String'>
    readonly metadata: FieldRef<"SystemEvent", 'Json'>
    readonly createdAt: FieldRef<"SystemEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SystemEvent findUnique
   */
  export type SystemEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemEvent
     */
    select?: SystemEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemEvent
     */
    omit?: SystemEventOmit<ExtArgs> | null
    /**
     * Filter, which SystemEvent to fetch.
     */
    where: SystemEventWhereUniqueInput
  }

  /**
   * SystemEvent findUniqueOrThrow
   */
  export type SystemEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemEvent
     */
    select?: SystemEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemEvent
     */
    omit?: SystemEventOmit<ExtArgs> | null
    /**
     * Filter, which SystemEvent to fetch.
     */
    where: SystemEventWhereUniqueInput
  }

  /**
   * SystemEvent findFirst
   */
  export type SystemEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemEvent
     */
    select?: SystemEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemEvent
     */
    omit?: SystemEventOmit<ExtArgs> | null
    /**
     * Filter, which SystemEvent to fetch.
     */
    where?: SystemEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemEvents to fetch.
     */
    orderBy?: SystemEventOrderByWithRelationInput | SystemEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemEvents.
     */
    cursor?: SystemEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemEvents.
     */
    distinct?: SystemEventScalarFieldEnum | SystemEventScalarFieldEnum[]
  }

  /**
   * SystemEvent findFirstOrThrow
   */
  export type SystemEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemEvent
     */
    select?: SystemEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemEvent
     */
    omit?: SystemEventOmit<ExtArgs> | null
    /**
     * Filter, which SystemEvent to fetch.
     */
    where?: SystemEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemEvents to fetch.
     */
    orderBy?: SystemEventOrderByWithRelationInput | SystemEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemEvents.
     */
    cursor?: SystemEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemEvents.
     */
    distinct?: SystemEventScalarFieldEnum | SystemEventScalarFieldEnum[]
  }

  /**
   * SystemEvent findMany
   */
  export type SystemEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemEvent
     */
    select?: SystemEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemEvent
     */
    omit?: SystemEventOmit<ExtArgs> | null
    /**
     * Filter, which SystemEvents to fetch.
     */
    where?: SystemEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemEvents to fetch.
     */
    orderBy?: SystemEventOrderByWithRelationInput | SystemEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SystemEvents.
     */
    cursor?: SystemEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemEvents.
     */
    distinct?: SystemEventScalarFieldEnum | SystemEventScalarFieldEnum[]
  }

  /**
   * SystemEvent create
   */
  export type SystemEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemEvent
     */
    select?: SystemEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemEvent
     */
    omit?: SystemEventOmit<ExtArgs> | null
    /**
     * The data needed to create a SystemEvent.
     */
    data: XOR<SystemEventCreateInput, SystemEventUncheckedCreateInput>
  }

  /**
   * SystemEvent createMany
   */
  export type SystemEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SystemEvents.
     */
    data: SystemEventCreateManyInput | SystemEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemEvent createManyAndReturn
   */
  export type SystemEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemEvent
     */
    select?: SystemEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SystemEvent
     */
    omit?: SystemEventOmit<ExtArgs> | null
    /**
     * The data used to create many SystemEvents.
     */
    data: SystemEventCreateManyInput | SystemEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemEvent update
   */
  export type SystemEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemEvent
     */
    select?: SystemEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemEvent
     */
    omit?: SystemEventOmit<ExtArgs> | null
    /**
     * The data needed to update a SystemEvent.
     */
    data: XOR<SystemEventUpdateInput, SystemEventUncheckedUpdateInput>
    /**
     * Choose, which SystemEvent to update.
     */
    where: SystemEventWhereUniqueInput
  }

  /**
   * SystemEvent updateMany
   */
  export type SystemEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SystemEvents.
     */
    data: XOR<SystemEventUpdateManyMutationInput, SystemEventUncheckedUpdateManyInput>
    /**
     * Filter which SystemEvents to update
     */
    where?: SystemEventWhereInput
    /**
     * Limit how many SystemEvents to update.
     */
    limit?: number
  }

  /**
   * SystemEvent updateManyAndReturn
   */
  export type SystemEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemEvent
     */
    select?: SystemEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SystemEvent
     */
    omit?: SystemEventOmit<ExtArgs> | null
    /**
     * The data used to update SystemEvents.
     */
    data: XOR<SystemEventUpdateManyMutationInput, SystemEventUncheckedUpdateManyInput>
    /**
     * Filter which SystemEvents to update
     */
    where?: SystemEventWhereInput
    /**
     * Limit how many SystemEvents to update.
     */
    limit?: number
  }

  /**
   * SystemEvent upsert
   */
  export type SystemEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemEvent
     */
    select?: SystemEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemEvent
     */
    omit?: SystemEventOmit<ExtArgs> | null
    /**
     * The filter to search for the SystemEvent to update in case it exists.
     */
    where: SystemEventWhereUniqueInput
    /**
     * In case the SystemEvent found by the `where` argument doesn't exist, create a new SystemEvent with this data.
     */
    create: XOR<SystemEventCreateInput, SystemEventUncheckedCreateInput>
    /**
     * In case the SystemEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SystemEventUpdateInput, SystemEventUncheckedUpdateInput>
  }

  /**
   * SystemEvent delete
   */
  export type SystemEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemEvent
     */
    select?: SystemEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemEvent
     */
    omit?: SystemEventOmit<ExtArgs> | null
    /**
     * Filter which SystemEvent to delete.
     */
    where: SystemEventWhereUniqueInput
  }

  /**
   * SystemEvent deleteMany
   */
  export type SystemEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemEvents to delete
     */
    where?: SystemEventWhereInput
    /**
     * Limit how many SystemEvents to delete.
     */
    limit?: number
  }

  /**
   * SystemEvent without action
   */
  export type SystemEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemEvent
     */
    select?: SystemEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemEvent
     */
    omit?: SystemEventOmit<ExtArgs> | null
  }


  /**
   * Model SniperTarget
   */

  export type AggregateSniperTarget = {
    _count: SniperTargetCountAggregateOutputType | null
    _avg: SniperTargetAvgAggregateOutputType | null
    _sum: SniperTargetSumAggregateOutputType | null
    _min: SniperTargetMinAggregateOutputType | null
    _max: SniperTargetMaxAggregateOutputType | null
  }

  export type SniperTargetAvgAggregateOutputType = {
    attemptCount: number | null
  }

  export type SniperTargetSumAggregateOutputType = {
    attemptCount: number | null
  }

  export type SniperTargetMinAggregateOutputType = {
    id: string | null
    source: string | null
    domain: string | null
    companyName: string | null
    firstName: string | null
    email: string | null
    linkedinUrl: string | null
    signal: string | null
    status: string | null
    generatedDraft: string | null
    draftEmail: string | null
    sentAt: Date | null
    lastAttemptAt: Date | null
    attemptCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SniperTargetMaxAggregateOutputType = {
    id: string | null
    source: string | null
    domain: string | null
    companyName: string | null
    firstName: string | null
    email: string | null
    linkedinUrl: string | null
    signal: string | null
    status: string | null
    generatedDraft: string | null
    draftEmail: string | null
    sentAt: Date | null
    lastAttemptAt: Date | null
    attemptCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SniperTargetCountAggregateOutputType = {
    id: number
    source: number
    domain: number
    companyName: number
    firstName: number
    email: number
    linkedinUrl: number
    signal: number
    status: number
    generatedDraft: number
    draftEmail: number
    sentAt: number
    lastAttemptAt: number
    attemptCount: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SniperTargetAvgAggregateInputType = {
    attemptCount?: true
  }

  export type SniperTargetSumAggregateInputType = {
    attemptCount?: true
  }

  export type SniperTargetMinAggregateInputType = {
    id?: true
    source?: true
    domain?: true
    companyName?: true
    firstName?: true
    email?: true
    linkedinUrl?: true
    signal?: true
    status?: true
    generatedDraft?: true
    draftEmail?: true
    sentAt?: true
    lastAttemptAt?: true
    attemptCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SniperTargetMaxAggregateInputType = {
    id?: true
    source?: true
    domain?: true
    companyName?: true
    firstName?: true
    email?: true
    linkedinUrl?: true
    signal?: true
    status?: true
    generatedDraft?: true
    draftEmail?: true
    sentAt?: true
    lastAttemptAt?: true
    attemptCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SniperTargetCountAggregateInputType = {
    id?: true
    source?: true
    domain?: true
    companyName?: true
    firstName?: true
    email?: true
    linkedinUrl?: true
    signal?: true
    status?: true
    generatedDraft?: true
    draftEmail?: true
    sentAt?: true
    lastAttemptAt?: true
    attemptCount?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SniperTargetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SniperTarget to aggregate.
     */
    where?: SniperTargetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SniperTargets to fetch.
     */
    orderBy?: SniperTargetOrderByWithRelationInput | SniperTargetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SniperTargetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SniperTargets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SniperTargets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SniperTargets
    **/
    _count?: true | SniperTargetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SniperTargetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SniperTargetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SniperTargetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SniperTargetMaxAggregateInputType
  }

  export type GetSniperTargetAggregateType<T extends SniperTargetAggregateArgs> = {
        [P in keyof T & keyof AggregateSniperTarget]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSniperTarget[P]>
      : GetScalarType<T[P], AggregateSniperTarget[P]>
  }




  export type SniperTargetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SniperTargetWhereInput
    orderBy?: SniperTargetOrderByWithAggregationInput | SniperTargetOrderByWithAggregationInput[]
    by: SniperTargetScalarFieldEnum[] | SniperTargetScalarFieldEnum
    having?: SniperTargetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SniperTargetCountAggregateInputType | true
    _avg?: SniperTargetAvgAggregateInputType
    _sum?: SniperTargetSumAggregateInputType
    _min?: SniperTargetMinAggregateInputType
    _max?: SniperTargetMaxAggregateInputType
  }

  export type SniperTargetGroupByOutputType = {
    id: string
    source: string
    domain: string
    companyName: string
    firstName: string | null
    email: string | null
    linkedinUrl: string | null
    signal: string | null
    status: string
    generatedDraft: string | null
    draftEmail: string | null
    sentAt: Date | null
    lastAttemptAt: Date | null
    attemptCount: number
    createdAt: Date
    updatedAt: Date
    _count: SniperTargetCountAggregateOutputType | null
    _avg: SniperTargetAvgAggregateOutputType | null
    _sum: SniperTargetSumAggregateOutputType | null
    _min: SniperTargetMinAggregateOutputType | null
    _max: SniperTargetMaxAggregateOutputType | null
  }

  type GetSniperTargetGroupByPayload<T extends SniperTargetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SniperTargetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SniperTargetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SniperTargetGroupByOutputType[P]>
            : GetScalarType<T[P], SniperTargetGroupByOutputType[P]>
        }
      >
    >


  export type SniperTargetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    source?: boolean
    domain?: boolean
    companyName?: boolean
    firstName?: boolean
    email?: boolean
    linkedinUrl?: boolean
    signal?: boolean
    status?: boolean
    generatedDraft?: boolean
    draftEmail?: boolean
    sentAt?: boolean
    lastAttemptAt?: boolean
    attemptCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["sniperTarget"]>

  export type SniperTargetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    source?: boolean
    domain?: boolean
    companyName?: boolean
    firstName?: boolean
    email?: boolean
    linkedinUrl?: boolean
    signal?: boolean
    status?: boolean
    generatedDraft?: boolean
    draftEmail?: boolean
    sentAt?: boolean
    lastAttemptAt?: boolean
    attemptCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["sniperTarget"]>

  export type SniperTargetSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    source?: boolean
    domain?: boolean
    companyName?: boolean
    firstName?: boolean
    email?: boolean
    linkedinUrl?: boolean
    signal?: boolean
    status?: boolean
    generatedDraft?: boolean
    draftEmail?: boolean
    sentAt?: boolean
    lastAttemptAt?: boolean
    attemptCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["sniperTarget"]>

  export type SniperTargetSelectScalar = {
    id?: boolean
    source?: boolean
    domain?: boolean
    companyName?: boolean
    firstName?: boolean
    email?: boolean
    linkedinUrl?: boolean
    signal?: boolean
    status?: boolean
    generatedDraft?: boolean
    draftEmail?: boolean
    sentAt?: boolean
    lastAttemptAt?: boolean
    attemptCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SniperTargetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "source" | "domain" | "companyName" | "firstName" | "email" | "linkedinUrl" | "signal" | "status" | "generatedDraft" | "draftEmail" | "sentAt" | "lastAttemptAt" | "attemptCount" | "createdAt" | "updatedAt", ExtArgs["result"]["sniperTarget"]>

  export type $SniperTargetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SniperTarget"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      source: string
      domain: string
      companyName: string
      firstName: string | null
      email: string | null
      linkedinUrl: string | null
      signal: string | null
      status: string
      generatedDraft: string | null
      draftEmail: string | null
      sentAt: Date | null
      lastAttemptAt: Date | null
      attemptCount: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["sniperTarget"]>
    composites: {}
  }

  type SniperTargetGetPayload<S extends boolean | null | undefined | SniperTargetDefaultArgs> = $Result.GetResult<Prisma.$SniperTargetPayload, S>

  type SniperTargetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SniperTargetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SniperTargetCountAggregateInputType | true
    }

  export interface SniperTargetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SniperTarget'], meta: { name: 'SniperTarget' } }
    /**
     * Find zero or one SniperTarget that matches the filter.
     * @param {SniperTargetFindUniqueArgs} args - Arguments to find a SniperTarget
     * @example
     * // Get one SniperTarget
     * const sniperTarget = await prisma.sniperTarget.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SniperTargetFindUniqueArgs>(args: SelectSubset<T, SniperTargetFindUniqueArgs<ExtArgs>>): Prisma__SniperTargetClient<$Result.GetResult<Prisma.$SniperTargetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SniperTarget that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SniperTargetFindUniqueOrThrowArgs} args - Arguments to find a SniperTarget
     * @example
     * // Get one SniperTarget
     * const sniperTarget = await prisma.sniperTarget.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SniperTargetFindUniqueOrThrowArgs>(args: SelectSubset<T, SniperTargetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SniperTargetClient<$Result.GetResult<Prisma.$SniperTargetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SniperTarget that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SniperTargetFindFirstArgs} args - Arguments to find a SniperTarget
     * @example
     * // Get one SniperTarget
     * const sniperTarget = await prisma.sniperTarget.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SniperTargetFindFirstArgs>(args?: SelectSubset<T, SniperTargetFindFirstArgs<ExtArgs>>): Prisma__SniperTargetClient<$Result.GetResult<Prisma.$SniperTargetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SniperTarget that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SniperTargetFindFirstOrThrowArgs} args - Arguments to find a SniperTarget
     * @example
     * // Get one SniperTarget
     * const sniperTarget = await prisma.sniperTarget.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SniperTargetFindFirstOrThrowArgs>(args?: SelectSubset<T, SniperTargetFindFirstOrThrowArgs<ExtArgs>>): Prisma__SniperTargetClient<$Result.GetResult<Prisma.$SniperTargetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SniperTargets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SniperTargetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SniperTargets
     * const sniperTargets = await prisma.sniperTarget.findMany()
     * 
     * // Get first 10 SniperTargets
     * const sniperTargets = await prisma.sniperTarget.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sniperTargetWithIdOnly = await prisma.sniperTarget.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SniperTargetFindManyArgs>(args?: SelectSubset<T, SniperTargetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SniperTargetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SniperTarget.
     * @param {SniperTargetCreateArgs} args - Arguments to create a SniperTarget.
     * @example
     * // Create one SniperTarget
     * const SniperTarget = await prisma.sniperTarget.create({
     *   data: {
     *     // ... data to create a SniperTarget
     *   }
     * })
     * 
     */
    create<T extends SniperTargetCreateArgs>(args: SelectSubset<T, SniperTargetCreateArgs<ExtArgs>>): Prisma__SniperTargetClient<$Result.GetResult<Prisma.$SniperTargetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SniperTargets.
     * @param {SniperTargetCreateManyArgs} args - Arguments to create many SniperTargets.
     * @example
     * // Create many SniperTargets
     * const sniperTarget = await prisma.sniperTarget.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SniperTargetCreateManyArgs>(args?: SelectSubset<T, SniperTargetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SniperTargets and returns the data saved in the database.
     * @param {SniperTargetCreateManyAndReturnArgs} args - Arguments to create many SniperTargets.
     * @example
     * // Create many SniperTargets
     * const sniperTarget = await prisma.sniperTarget.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SniperTargets and only return the `id`
     * const sniperTargetWithIdOnly = await prisma.sniperTarget.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SniperTargetCreateManyAndReturnArgs>(args?: SelectSubset<T, SniperTargetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SniperTargetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SniperTarget.
     * @param {SniperTargetDeleteArgs} args - Arguments to delete one SniperTarget.
     * @example
     * // Delete one SniperTarget
     * const SniperTarget = await prisma.sniperTarget.delete({
     *   where: {
     *     // ... filter to delete one SniperTarget
     *   }
     * })
     * 
     */
    delete<T extends SniperTargetDeleteArgs>(args: SelectSubset<T, SniperTargetDeleteArgs<ExtArgs>>): Prisma__SniperTargetClient<$Result.GetResult<Prisma.$SniperTargetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SniperTarget.
     * @param {SniperTargetUpdateArgs} args - Arguments to update one SniperTarget.
     * @example
     * // Update one SniperTarget
     * const sniperTarget = await prisma.sniperTarget.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SniperTargetUpdateArgs>(args: SelectSubset<T, SniperTargetUpdateArgs<ExtArgs>>): Prisma__SniperTargetClient<$Result.GetResult<Prisma.$SniperTargetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SniperTargets.
     * @param {SniperTargetDeleteManyArgs} args - Arguments to filter SniperTargets to delete.
     * @example
     * // Delete a few SniperTargets
     * const { count } = await prisma.sniperTarget.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SniperTargetDeleteManyArgs>(args?: SelectSubset<T, SniperTargetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SniperTargets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SniperTargetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SniperTargets
     * const sniperTarget = await prisma.sniperTarget.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SniperTargetUpdateManyArgs>(args: SelectSubset<T, SniperTargetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SniperTargets and returns the data updated in the database.
     * @param {SniperTargetUpdateManyAndReturnArgs} args - Arguments to update many SniperTargets.
     * @example
     * // Update many SniperTargets
     * const sniperTarget = await prisma.sniperTarget.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SniperTargets and only return the `id`
     * const sniperTargetWithIdOnly = await prisma.sniperTarget.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SniperTargetUpdateManyAndReturnArgs>(args: SelectSubset<T, SniperTargetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SniperTargetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SniperTarget.
     * @param {SniperTargetUpsertArgs} args - Arguments to update or create a SniperTarget.
     * @example
     * // Update or create a SniperTarget
     * const sniperTarget = await prisma.sniperTarget.upsert({
     *   create: {
     *     // ... data to create a SniperTarget
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SniperTarget we want to update
     *   }
     * })
     */
    upsert<T extends SniperTargetUpsertArgs>(args: SelectSubset<T, SniperTargetUpsertArgs<ExtArgs>>): Prisma__SniperTargetClient<$Result.GetResult<Prisma.$SniperTargetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SniperTargets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SniperTargetCountArgs} args - Arguments to filter SniperTargets to count.
     * @example
     * // Count the number of SniperTargets
     * const count = await prisma.sniperTarget.count({
     *   where: {
     *     // ... the filter for the SniperTargets we want to count
     *   }
     * })
    **/
    count<T extends SniperTargetCountArgs>(
      args?: Subset<T, SniperTargetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SniperTargetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SniperTarget.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SniperTargetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SniperTargetAggregateArgs>(args: Subset<T, SniperTargetAggregateArgs>): Prisma.PrismaPromise<GetSniperTargetAggregateType<T>>

    /**
     * Group by SniperTarget.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SniperTargetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SniperTargetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SniperTargetGroupByArgs['orderBy'] }
        : { orderBy?: SniperTargetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SniperTargetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSniperTargetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SniperTarget model
   */
  readonly fields: SniperTargetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SniperTarget.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SniperTargetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SniperTarget model
   */
  interface SniperTargetFieldRefs {
    readonly id: FieldRef<"SniperTarget", 'String'>
    readonly source: FieldRef<"SniperTarget", 'String'>
    readonly domain: FieldRef<"SniperTarget", 'String'>
    readonly companyName: FieldRef<"SniperTarget", 'String'>
    readonly firstName: FieldRef<"SniperTarget", 'String'>
    readonly email: FieldRef<"SniperTarget", 'String'>
    readonly linkedinUrl: FieldRef<"SniperTarget", 'String'>
    readonly signal: FieldRef<"SniperTarget", 'String'>
    readonly status: FieldRef<"SniperTarget", 'String'>
    readonly generatedDraft: FieldRef<"SniperTarget", 'String'>
    readonly draftEmail: FieldRef<"SniperTarget", 'String'>
    readonly sentAt: FieldRef<"SniperTarget", 'DateTime'>
    readonly lastAttemptAt: FieldRef<"SniperTarget", 'DateTime'>
    readonly attemptCount: FieldRef<"SniperTarget", 'Int'>
    readonly createdAt: FieldRef<"SniperTarget", 'DateTime'>
    readonly updatedAt: FieldRef<"SniperTarget", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SniperTarget findUnique
   */
  export type SniperTargetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SniperTarget
     */
    select?: SniperTargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SniperTarget
     */
    omit?: SniperTargetOmit<ExtArgs> | null
    /**
     * Filter, which SniperTarget to fetch.
     */
    where: SniperTargetWhereUniqueInput
  }

  /**
   * SniperTarget findUniqueOrThrow
   */
  export type SniperTargetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SniperTarget
     */
    select?: SniperTargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SniperTarget
     */
    omit?: SniperTargetOmit<ExtArgs> | null
    /**
     * Filter, which SniperTarget to fetch.
     */
    where: SniperTargetWhereUniqueInput
  }

  /**
   * SniperTarget findFirst
   */
  export type SniperTargetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SniperTarget
     */
    select?: SniperTargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SniperTarget
     */
    omit?: SniperTargetOmit<ExtArgs> | null
    /**
     * Filter, which SniperTarget to fetch.
     */
    where?: SniperTargetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SniperTargets to fetch.
     */
    orderBy?: SniperTargetOrderByWithRelationInput | SniperTargetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SniperTargets.
     */
    cursor?: SniperTargetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SniperTargets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SniperTargets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SniperTargets.
     */
    distinct?: SniperTargetScalarFieldEnum | SniperTargetScalarFieldEnum[]
  }

  /**
   * SniperTarget findFirstOrThrow
   */
  export type SniperTargetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SniperTarget
     */
    select?: SniperTargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SniperTarget
     */
    omit?: SniperTargetOmit<ExtArgs> | null
    /**
     * Filter, which SniperTarget to fetch.
     */
    where?: SniperTargetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SniperTargets to fetch.
     */
    orderBy?: SniperTargetOrderByWithRelationInput | SniperTargetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SniperTargets.
     */
    cursor?: SniperTargetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SniperTargets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SniperTargets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SniperTargets.
     */
    distinct?: SniperTargetScalarFieldEnum | SniperTargetScalarFieldEnum[]
  }

  /**
   * SniperTarget findMany
   */
  export type SniperTargetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SniperTarget
     */
    select?: SniperTargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SniperTarget
     */
    omit?: SniperTargetOmit<ExtArgs> | null
    /**
     * Filter, which SniperTargets to fetch.
     */
    where?: SniperTargetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SniperTargets to fetch.
     */
    orderBy?: SniperTargetOrderByWithRelationInput | SniperTargetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SniperTargets.
     */
    cursor?: SniperTargetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SniperTargets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SniperTargets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SniperTargets.
     */
    distinct?: SniperTargetScalarFieldEnum | SniperTargetScalarFieldEnum[]
  }

  /**
   * SniperTarget create
   */
  export type SniperTargetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SniperTarget
     */
    select?: SniperTargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SniperTarget
     */
    omit?: SniperTargetOmit<ExtArgs> | null
    /**
     * The data needed to create a SniperTarget.
     */
    data: XOR<SniperTargetCreateInput, SniperTargetUncheckedCreateInput>
  }

  /**
   * SniperTarget createMany
   */
  export type SniperTargetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SniperTargets.
     */
    data: SniperTargetCreateManyInput | SniperTargetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SniperTarget createManyAndReturn
   */
  export type SniperTargetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SniperTarget
     */
    select?: SniperTargetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SniperTarget
     */
    omit?: SniperTargetOmit<ExtArgs> | null
    /**
     * The data used to create many SniperTargets.
     */
    data: SniperTargetCreateManyInput | SniperTargetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SniperTarget update
   */
  export type SniperTargetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SniperTarget
     */
    select?: SniperTargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SniperTarget
     */
    omit?: SniperTargetOmit<ExtArgs> | null
    /**
     * The data needed to update a SniperTarget.
     */
    data: XOR<SniperTargetUpdateInput, SniperTargetUncheckedUpdateInput>
    /**
     * Choose, which SniperTarget to update.
     */
    where: SniperTargetWhereUniqueInput
  }

  /**
   * SniperTarget updateMany
   */
  export type SniperTargetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SniperTargets.
     */
    data: XOR<SniperTargetUpdateManyMutationInput, SniperTargetUncheckedUpdateManyInput>
    /**
     * Filter which SniperTargets to update
     */
    where?: SniperTargetWhereInput
    /**
     * Limit how many SniperTargets to update.
     */
    limit?: number
  }

  /**
   * SniperTarget updateManyAndReturn
   */
  export type SniperTargetUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SniperTarget
     */
    select?: SniperTargetSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SniperTarget
     */
    omit?: SniperTargetOmit<ExtArgs> | null
    /**
     * The data used to update SniperTargets.
     */
    data: XOR<SniperTargetUpdateManyMutationInput, SniperTargetUncheckedUpdateManyInput>
    /**
     * Filter which SniperTargets to update
     */
    where?: SniperTargetWhereInput
    /**
     * Limit how many SniperTargets to update.
     */
    limit?: number
  }

  /**
   * SniperTarget upsert
   */
  export type SniperTargetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SniperTarget
     */
    select?: SniperTargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SniperTarget
     */
    omit?: SniperTargetOmit<ExtArgs> | null
    /**
     * The filter to search for the SniperTarget to update in case it exists.
     */
    where: SniperTargetWhereUniqueInput
    /**
     * In case the SniperTarget found by the `where` argument doesn't exist, create a new SniperTarget with this data.
     */
    create: XOR<SniperTargetCreateInput, SniperTargetUncheckedCreateInput>
    /**
     * In case the SniperTarget was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SniperTargetUpdateInput, SniperTargetUncheckedUpdateInput>
  }

  /**
   * SniperTarget delete
   */
  export type SniperTargetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SniperTarget
     */
    select?: SniperTargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SniperTarget
     */
    omit?: SniperTargetOmit<ExtArgs> | null
    /**
     * Filter which SniperTarget to delete.
     */
    where: SniperTargetWhereUniqueInput
  }

  /**
   * SniperTarget deleteMany
   */
  export type SniperTargetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SniperTargets to delete
     */
    where?: SniperTargetWhereInput
    /**
     * Limit how many SniperTargets to delete.
     */
    limit?: number
  }

  /**
   * SniperTarget without action
   */
  export type SniperTargetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SniperTarget
     */
    select?: SniperTargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SniperTarget
     */
    omit?: SniperTargetOmit<ExtArgs> | null
  }


  /**
   * Model EmailEvent
   */

  export type AggregateEmailEvent = {
    _count: EmailEventCountAggregateOutputType | null
    _min: EmailEventMinAggregateOutputType | null
    _max: EmailEventMaxAggregateOutputType | null
  }

  export type EmailEventMinAggregateOutputType = {
    id: string | null
    leadId: string | null
    type: string | null
    createdAt: Date | null
  }

  export type EmailEventMaxAggregateOutputType = {
    id: string | null
    leadId: string | null
    type: string | null
    createdAt: Date | null
  }

  export type EmailEventCountAggregateOutputType = {
    id: number
    leadId: number
    type: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type EmailEventMinAggregateInputType = {
    id?: true
    leadId?: true
    type?: true
    createdAt?: true
  }

  export type EmailEventMaxAggregateInputType = {
    id?: true
    leadId?: true
    type?: true
    createdAt?: true
  }

  export type EmailEventCountAggregateInputType = {
    id?: true
    leadId?: true
    type?: true
    metadata?: true
    createdAt?: true
    _all?: true
  }

  export type EmailEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailEvent to aggregate.
     */
    where?: EmailEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailEvents to fetch.
     */
    orderBy?: EmailEventOrderByWithRelationInput | EmailEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmailEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmailEvents
    **/
    _count?: true | EmailEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmailEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmailEventMaxAggregateInputType
  }

  export type GetEmailEventAggregateType<T extends EmailEventAggregateArgs> = {
        [P in keyof T & keyof AggregateEmailEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmailEvent[P]>
      : GetScalarType<T[P], AggregateEmailEvent[P]>
  }




  export type EmailEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailEventWhereInput
    orderBy?: EmailEventOrderByWithAggregationInput | EmailEventOrderByWithAggregationInput[]
    by: EmailEventScalarFieldEnum[] | EmailEventScalarFieldEnum
    having?: EmailEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmailEventCountAggregateInputType | true
    _min?: EmailEventMinAggregateInputType
    _max?: EmailEventMaxAggregateInputType
  }

  export type EmailEventGroupByOutputType = {
    id: string
    leadId: string
    type: string
    metadata: JsonValue | null
    createdAt: Date
    _count: EmailEventCountAggregateOutputType | null
    _min: EmailEventMinAggregateOutputType | null
    _max: EmailEventMaxAggregateOutputType | null
  }

  type GetEmailEventGroupByPayload<T extends EmailEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmailEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmailEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmailEventGroupByOutputType[P]>
            : GetScalarType<T[P], EmailEventGroupByOutputType[P]>
        }
      >
    >


  export type EmailEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leadId?: boolean
    type?: boolean
    metadata?: boolean
    createdAt?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailEvent"]>

  export type EmailEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leadId?: boolean
    type?: boolean
    metadata?: boolean
    createdAt?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailEvent"]>

  export type EmailEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leadId?: boolean
    type?: boolean
    metadata?: boolean
    createdAt?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailEvent"]>

  export type EmailEventSelectScalar = {
    id?: boolean
    leadId?: boolean
    type?: boolean
    metadata?: boolean
    createdAt?: boolean
  }

  export type EmailEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "leadId" | "type" | "metadata" | "createdAt", ExtArgs["result"]["emailEvent"]>
  export type EmailEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }
  export type EmailEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }
  export type EmailEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }

  export type $EmailEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmailEvent"
    objects: {
      lead: Prisma.$LeadPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      leadId: string
      type: string
      metadata: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["emailEvent"]>
    composites: {}
  }

  type EmailEventGetPayload<S extends boolean | null | undefined | EmailEventDefaultArgs> = $Result.GetResult<Prisma.$EmailEventPayload, S>

  type EmailEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmailEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmailEventCountAggregateInputType | true
    }

  export interface EmailEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmailEvent'], meta: { name: 'EmailEvent' } }
    /**
     * Find zero or one EmailEvent that matches the filter.
     * @param {EmailEventFindUniqueArgs} args - Arguments to find a EmailEvent
     * @example
     * // Get one EmailEvent
     * const emailEvent = await prisma.emailEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmailEventFindUniqueArgs>(args: SelectSubset<T, EmailEventFindUniqueArgs<ExtArgs>>): Prisma__EmailEventClient<$Result.GetResult<Prisma.$EmailEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmailEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmailEventFindUniqueOrThrowArgs} args - Arguments to find a EmailEvent
     * @example
     * // Get one EmailEvent
     * const emailEvent = await prisma.emailEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmailEventFindUniqueOrThrowArgs>(args: SelectSubset<T, EmailEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmailEventClient<$Result.GetResult<Prisma.$EmailEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailEventFindFirstArgs} args - Arguments to find a EmailEvent
     * @example
     * // Get one EmailEvent
     * const emailEvent = await prisma.emailEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmailEventFindFirstArgs>(args?: SelectSubset<T, EmailEventFindFirstArgs<ExtArgs>>): Prisma__EmailEventClient<$Result.GetResult<Prisma.$EmailEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailEventFindFirstOrThrowArgs} args - Arguments to find a EmailEvent
     * @example
     * // Get one EmailEvent
     * const emailEvent = await prisma.emailEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmailEventFindFirstOrThrowArgs>(args?: SelectSubset<T, EmailEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmailEventClient<$Result.GetResult<Prisma.$EmailEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmailEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmailEvents
     * const emailEvents = await prisma.emailEvent.findMany()
     * 
     * // Get first 10 EmailEvents
     * const emailEvents = await prisma.emailEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const emailEventWithIdOnly = await prisma.emailEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmailEventFindManyArgs>(args?: SelectSubset<T, EmailEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EmailEvent.
     * @param {EmailEventCreateArgs} args - Arguments to create a EmailEvent.
     * @example
     * // Create one EmailEvent
     * const EmailEvent = await prisma.emailEvent.create({
     *   data: {
     *     // ... data to create a EmailEvent
     *   }
     * })
     * 
     */
    create<T extends EmailEventCreateArgs>(args: SelectSubset<T, EmailEventCreateArgs<ExtArgs>>): Prisma__EmailEventClient<$Result.GetResult<Prisma.$EmailEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EmailEvents.
     * @param {EmailEventCreateManyArgs} args - Arguments to create many EmailEvents.
     * @example
     * // Create many EmailEvents
     * const emailEvent = await prisma.emailEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmailEventCreateManyArgs>(args?: SelectSubset<T, EmailEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EmailEvents and returns the data saved in the database.
     * @param {EmailEventCreateManyAndReturnArgs} args - Arguments to create many EmailEvents.
     * @example
     * // Create many EmailEvents
     * const emailEvent = await prisma.emailEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EmailEvents and only return the `id`
     * const emailEventWithIdOnly = await prisma.emailEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmailEventCreateManyAndReturnArgs>(args?: SelectSubset<T, EmailEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EmailEvent.
     * @param {EmailEventDeleteArgs} args - Arguments to delete one EmailEvent.
     * @example
     * // Delete one EmailEvent
     * const EmailEvent = await prisma.emailEvent.delete({
     *   where: {
     *     // ... filter to delete one EmailEvent
     *   }
     * })
     * 
     */
    delete<T extends EmailEventDeleteArgs>(args: SelectSubset<T, EmailEventDeleteArgs<ExtArgs>>): Prisma__EmailEventClient<$Result.GetResult<Prisma.$EmailEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmailEvent.
     * @param {EmailEventUpdateArgs} args - Arguments to update one EmailEvent.
     * @example
     * // Update one EmailEvent
     * const emailEvent = await prisma.emailEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmailEventUpdateArgs>(args: SelectSubset<T, EmailEventUpdateArgs<ExtArgs>>): Prisma__EmailEventClient<$Result.GetResult<Prisma.$EmailEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmailEvents.
     * @param {EmailEventDeleteManyArgs} args - Arguments to filter EmailEvents to delete.
     * @example
     * // Delete a few EmailEvents
     * const { count } = await prisma.emailEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmailEventDeleteManyArgs>(args?: SelectSubset<T, EmailEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmailEvents
     * const emailEvent = await prisma.emailEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmailEventUpdateManyArgs>(args: SelectSubset<T, EmailEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailEvents and returns the data updated in the database.
     * @param {EmailEventUpdateManyAndReturnArgs} args - Arguments to update many EmailEvents.
     * @example
     * // Update many EmailEvents
     * const emailEvent = await prisma.emailEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EmailEvents and only return the `id`
     * const emailEventWithIdOnly = await prisma.emailEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmailEventUpdateManyAndReturnArgs>(args: SelectSubset<T, EmailEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EmailEvent.
     * @param {EmailEventUpsertArgs} args - Arguments to update or create a EmailEvent.
     * @example
     * // Update or create a EmailEvent
     * const emailEvent = await prisma.emailEvent.upsert({
     *   create: {
     *     // ... data to create a EmailEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmailEvent we want to update
     *   }
     * })
     */
    upsert<T extends EmailEventUpsertArgs>(args: SelectSubset<T, EmailEventUpsertArgs<ExtArgs>>): Prisma__EmailEventClient<$Result.GetResult<Prisma.$EmailEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EmailEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailEventCountArgs} args - Arguments to filter EmailEvents to count.
     * @example
     * // Count the number of EmailEvents
     * const count = await prisma.emailEvent.count({
     *   where: {
     *     // ... the filter for the EmailEvents we want to count
     *   }
     * })
    **/
    count<T extends EmailEventCountArgs>(
      args?: Subset<T, EmailEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmailEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmailEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmailEventAggregateArgs>(args: Subset<T, EmailEventAggregateArgs>): Prisma.PrismaPromise<GetEmailEventAggregateType<T>>

    /**
     * Group by EmailEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmailEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmailEventGroupByArgs['orderBy'] }
        : { orderBy?: EmailEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmailEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmailEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmailEvent model
   */
  readonly fields: EmailEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmailEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmailEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lead<T extends LeadDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LeadDefaultArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EmailEvent model
   */
  interface EmailEventFieldRefs {
    readonly id: FieldRef<"EmailEvent", 'String'>
    readonly leadId: FieldRef<"EmailEvent", 'String'>
    readonly type: FieldRef<"EmailEvent", 'String'>
    readonly metadata: FieldRef<"EmailEvent", 'Json'>
    readonly createdAt: FieldRef<"EmailEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EmailEvent findUnique
   */
  export type EmailEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailEvent
     */
    select?: EmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailEvent
     */
    omit?: EmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailEventInclude<ExtArgs> | null
    /**
     * Filter, which EmailEvent to fetch.
     */
    where: EmailEventWhereUniqueInput
  }

  /**
   * EmailEvent findUniqueOrThrow
   */
  export type EmailEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailEvent
     */
    select?: EmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailEvent
     */
    omit?: EmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailEventInclude<ExtArgs> | null
    /**
     * Filter, which EmailEvent to fetch.
     */
    where: EmailEventWhereUniqueInput
  }

  /**
   * EmailEvent findFirst
   */
  export type EmailEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailEvent
     */
    select?: EmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailEvent
     */
    omit?: EmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailEventInclude<ExtArgs> | null
    /**
     * Filter, which EmailEvent to fetch.
     */
    where?: EmailEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailEvents to fetch.
     */
    orderBy?: EmailEventOrderByWithRelationInput | EmailEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailEvents.
     */
    cursor?: EmailEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailEvents.
     */
    distinct?: EmailEventScalarFieldEnum | EmailEventScalarFieldEnum[]
  }

  /**
   * EmailEvent findFirstOrThrow
   */
  export type EmailEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailEvent
     */
    select?: EmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailEvent
     */
    omit?: EmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailEventInclude<ExtArgs> | null
    /**
     * Filter, which EmailEvent to fetch.
     */
    where?: EmailEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailEvents to fetch.
     */
    orderBy?: EmailEventOrderByWithRelationInput | EmailEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailEvents.
     */
    cursor?: EmailEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailEvents.
     */
    distinct?: EmailEventScalarFieldEnum | EmailEventScalarFieldEnum[]
  }

  /**
   * EmailEvent findMany
   */
  export type EmailEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailEvent
     */
    select?: EmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailEvent
     */
    omit?: EmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailEventInclude<ExtArgs> | null
    /**
     * Filter, which EmailEvents to fetch.
     */
    where?: EmailEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailEvents to fetch.
     */
    orderBy?: EmailEventOrderByWithRelationInput | EmailEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmailEvents.
     */
    cursor?: EmailEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailEvents.
     */
    distinct?: EmailEventScalarFieldEnum | EmailEventScalarFieldEnum[]
  }

  /**
   * EmailEvent create
   */
  export type EmailEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailEvent
     */
    select?: EmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailEvent
     */
    omit?: EmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailEventInclude<ExtArgs> | null
    /**
     * The data needed to create a EmailEvent.
     */
    data: XOR<EmailEventCreateInput, EmailEventUncheckedCreateInput>
  }

  /**
   * EmailEvent createMany
   */
  export type EmailEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmailEvents.
     */
    data: EmailEventCreateManyInput | EmailEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmailEvent createManyAndReturn
   */
  export type EmailEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailEvent
     */
    select?: EmailEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmailEvent
     */
    omit?: EmailEventOmit<ExtArgs> | null
    /**
     * The data used to create many EmailEvents.
     */
    data: EmailEventCreateManyInput | EmailEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmailEvent update
   */
  export type EmailEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailEvent
     */
    select?: EmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailEvent
     */
    omit?: EmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailEventInclude<ExtArgs> | null
    /**
     * The data needed to update a EmailEvent.
     */
    data: XOR<EmailEventUpdateInput, EmailEventUncheckedUpdateInput>
    /**
     * Choose, which EmailEvent to update.
     */
    where: EmailEventWhereUniqueInput
  }

  /**
   * EmailEvent updateMany
   */
  export type EmailEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmailEvents.
     */
    data: XOR<EmailEventUpdateManyMutationInput, EmailEventUncheckedUpdateManyInput>
    /**
     * Filter which EmailEvents to update
     */
    where?: EmailEventWhereInput
    /**
     * Limit how many EmailEvents to update.
     */
    limit?: number
  }

  /**
   * EmailEvent updateManyAndReturn
   */
  export type EmailEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailEvent
     */
    select?: EmailEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmailEvent
     */
    omit?: EmailEventOmit<ExtArgs> | null
    /**
     * The data used to update EmailEvents.
     */
    data: XOR<EmailEventUpdateManyMutationInput, EmailEventUncheckedUpdateManyInput>
    /**
     * Filter which EmailEvents to update
     */
    where?: EmailEventWhereInput
    /**
     * Limit how many EmailEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmailEvent upsert
   */
  export type EmailEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailEvent
     */
    select?: EmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailEvent
     */
    omit?: EmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailEventInclude<ExtArgs> | null
    /**
     * The filter to search for the EmailEvent to update in case it exists.
     */
    where: EmailEventWhereUniqueInput
    /**
     * In case the EmailEvent found by the `where` argument doesn't exist, create a new EmailEvent with this data.
     */
    create: XOR<EmailEventCreateInput, EmailEventUncheckedCreateInput>
    /**
     * In case the EmailEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmailEventUpdateInput, EmailEventUncheckedUpdateInput>
  }

  /**
   * EmailEvent delete
   */
  export type EmailEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailEvent
     */
    select?: EmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailEvent
     */
    omit?: EmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailEventInclude<ExtArgs> | null
    /**
     * Filter which EmailEvent to delete.
     */
    where: EmailEventWhereUniqueInput
  }

  /**
   * EmailEvent deleteMany
   */
  export type EmailEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailEvents to delete
     */
    where?: EmailEventWhereInput
    /**
     * Limit how many EmailEvents to delete.
     */
    limit?: number
  }

  /**
   * EmailEvent without action
   */
  export type EmailEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailEvent
     */
    select?: EmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailEvent
     */
    omit?: EmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailEventInclude<ExtArgs> | null
  }


  /**
   * Model KnowledgeEmbedding
   */

  export type AggregateKnowledgeEmbedding = {
    _count: KnowledgeEmbeddingCountAggregateOutputType | null
    _avg: KnowledgeEmbeddingAvgAggregateOutputType | null
    _sum: KnowledgeEmbeddingSumAggregateOutputType | null
    _min: KnowledgeEmbeddingMinAggregateOutputType | null
    _max: KnowledgeEmbeddingMaxAggregateOutputType | null
  }

  export type KnowledgeEmbeddingAvgAggregateOutputType = {
    chunkId: number | null
  }

  export type KnowledgeEmbeddingSumAggregateOutputType = {
    chunkId: number | null
  }

  export type KnowledgeEmbeddingMinAggregateOutputType = {
    id: string | null
    source: string | null
    url: string | null
    createdAt: Date | null
    updatedAt: Date | null
    chunkId: number | null
    text: string | null
    type: string | null
  }

  export type KnowledgeEmbeddingMaxAggregateOutputType = {
    id: string | null
    source: string | null
    url: string | null
    createdAt: Date | null
    updatedAt: Date | null
    chunkId: number | null
    text: string | null
    type: string | null
  }

  export type KnowledgeEmbeddingCountAggregateOutputType = {
    id: number
    source: number
    url: number
    createdAt: number
    updatedAt: number
    chunkId: number
    text: number
    type: number
    metadata: number
    _all: number
  }


  export type KnowledgeEmbeddingAvgAggregateInputType = {
    chunkId?: true
  }

  export type KnowledgeEmbeddingSumAggregateInputType = {
    chunkId?: true
  }

  export type KnowledgeEmbeddingMinAggregateInputType = {
    id?: true
    source?: true
    url?: true
    createdAt?: true
    updatedAt?: true
    chunkId?: true
    text?: true
    type?: true
  }

  export type KnowledgeEmbeddingMaxAggregateInputType = {
    id?: true
    source?: true
    url?: true
    createdAt?: true
    updatedAt?: true
    chunkId?: true
    text?: true
    type?: true
  }

  export type KnowledgeEmbeddingCountAggregateInputType = {
    id?: true
    source?: true
    url?: true
    createdAt?: true
    updatedAt?: true
    chunkId?: true
    text?: true
    type?: true
    metadata?: true
    _all?: true
  }

  export type KnowledgeEmbeddingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which KnowledgeEmbedding to aggregate.
     */
    where?: KnowledgeEmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KnowledgeEmbeddings to fetch.
     */
    orderBy?: KnowledgeEmbeddingOrderByWithRelationInput | KnowledgeEmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: KnowledgeEmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KnowledgeEmbeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KnowledgeEmbeddings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned KnowledgeEmbeddings
    **/
    _count?: true | KnowledgeEmbeddingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: KnowledgeEmbeddingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: KnowledgeEmbeddingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: KnowledgeEmbeddingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: KnowledgeEmbeddingMaxAggregateInputType
  }

  export type GetKnowledgeEmbeddingAggregateType<T extends KnowledgeEmbeddingAggregateArgs> = {
        [P in keyof T & keyof AggregateKnowledgeEmbedding]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateKnowledgeEmbedding[P]>
      : GetScalarType<T[P], AggregateKnowledgeEmbedding[P]>
  }




  export type KnowledgeEmbeddingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KnowledgeEmbeddingWhereInput
    orderBy?: KnowledgeEmbeddingOrderByWithAggregationInput | KnowledgeEmbeddingOrderByWithAggregationInput[]
    by: KnowledgeEmbeddingScalarFieldEnum[] | KnowledgeEmbeddingScalarFieldEnum
    having?: KnowledgeEmbeddingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: KnowledgeEmbeddingCountAggregateInputType | true
    _avg?: KnowledgeEmbeddingAvgAggregateInputType
    _sum?: KnowledgeEmbeddingSumAggregateInputType
    _min?: KnowledgeEmbeddingMinAggregateInputType
    _max?: KnowledgeEmbeddingMaxAggregateInputType
  }

  export type KnowledgeEmbeddingGroupByOutputType = {
    id: string
    source: string
    url: string | null
    createdAt: Date
    updatedAt: Date
    chunkId: number
    text: string
    type: string
    metadata: JsonValue | null
    _count: KnowledgeEmbeddingCountAggregateOutputType | null
    _avg: KnowledgeEmbeddingAvgAggregateOutputType | null
    _sum: KnowledgeEmbeddingSumAggregateOutputType | null
    _min: KnowledgeEmbeddingMinAggregateOutputType | null
    _max: KnowledgeEmbeddingMaxAggregateOutputType | null
  }

  type GetKnowledgeEmbeddingGroupByPayload<T extends KnowledgeEmbeddingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<KnowledgeEmbeddingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof KnowledgeEmbeddingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], KnowledgeEmbeddingGroupByOutputType[P]>
            : GetScalarType<T[P], KnowledgeEmbeddingGroupByOutputType[P]>
        }
      >
    >


  export type KnowledgeEmbeddingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    source?: boolean
    url?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    chunkId?: boolean
    text?: boolean
    type?: boolean
    metadata?: boolean
  }, ExtArgs["result"]["knowledgeEmbedding"]>


  export type KnowledgeEmbeddingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    source?: boolean
    url?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    chunkId?: boolean
    text?: boolean
    type?: boolean
    metadata?: boolean
  }, ExtArgs["result"]["knowledgeEmbedding"]>

  export type KnowledgeEmbeddingSelectScalar = {
    id?: boolean
    source?: boolean
    url?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    chunkId?: boolean
    text?: boolean
    type?: boolean
    metadata?: boolean
  }

  export type KnowledgeEmbeddingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "source" | "url" | "createdAt" | "updatedAt" | "chunkId" | "text" | "type" | "metadata", ExtArgs["result"]["knowledgeEmbedding"]>

  export type $KnowledgeEmbeddingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "KnowledgeEmbedding"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      source: string
      url: string | null
      createdAt: Date
      updatedAt: Date
      chunkId: number
      text: string
      type: string
      metadata: Prisma.JsonValue | null
    }, ExtArgs["result"]["knowledgeEmbedding"]>
    composites: {}
  }

  type KnowledgeEmbeddingGetPayload<S extends boolean | null | undefined | KnowledgeEmbeddingDefaultArgs> = $Result.GetResult<Prisma.$KnowledgeEmbeddingPayload, S>

  type KnowledgeEmbeddingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<KnowledgeEmbeddingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: KnowledgeEmbeddingCountAggregateInputType | true
    }

  export interface KnowledgeEmbeddingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['KnowledgeEmbedding'], meta: { name: 'KnowledgeEmbedding' } }
    /**
     * Find zero or one KnowledgeEmbedding that matches the filter.
     * @param {KnowledgeEmbeddingFindUniqueArgs} args - Arguments to find a KnowledgeEmbedding
     * @example
     * // Get one KnowledgeEmbedding
     * const knowledgeEmbedding = await prisma.knowledgeEmbedding.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends KnowledgeEmbeddingFindUniqueArgs>(args: SelectSubset<T, KnowledgeEmbeddingFindUniqueArgs<ExtArgs>>): Prisma__KnowledgeEmbeddingClient<$Result.GetResult<Prisma.$KnowledgeEmbeddingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one KnowledgeEmbedding that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {KnowledgeEmbeddingFindUniqueOrThrowArgs} args - Arguments to find a KnowledgeEmbedding
     * @example
     * // Get one KnowledgeEmbedding
     * const knowledgeEmbedding = await prisma.knowledgeEmbedding.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends KnowledgeEmbeddingFindUniqueOrThrowArgs>(args: SelectSubset<T, KnowledgeEmbeddingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__KnowledgeEmbeddingClient<$Result.GetResult<Prisma.$KnowledgeEmbeddingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first KnowledgeEmbedding that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeEmbeddingFindFirstArgs} args - Arguments to find a KnowledgeEmbedding
     * @example
     * // Get one KnowledgeEmbedding
     * const knowledgeEmbedding = await prisma.knowledgeEmbedding.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends KnowledgeEmbeddingFindFirstArgs>(args?: SelectSubset<T, KnowledgeEmbeddingFindFirstArgs<ExtArgs>>): Prisma__KnowledgeEmbeddingClient<$Result.GetResult<Prisma.$KnowledgeEmbeddingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first KnowledgeEmbedding that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeEmbeddingFindFirstOrThrowArgs} args - Arguments to find a KnowledgeEmbedding
     * @example
     * // Get one KnowledgeEmbedding
     * const knowledgeEmbedding = await prisma.knowledgeEmbedding.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends KnowledgeEmbeddingFindFirstOrThrowArgs>(args?: SelectSubset<T, KnowledgeEmbeddingFindFirstOrThrowArgs<ExtArgs>>): Prisma__KnowledgeEmbeddingClient<$Result.GetResult<Prisma.$KnowledgeEmbeddingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more KnowledgeEmbeddings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeEmbeddingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all KnowledgeEmbeddings
     * const knowledgeEmbeddings = await prisma.knowledgeEmbedding.findMany()
     * 
     * // Get first 10 KnowledgeEmbeddings
     * const knowledgeEmbeddings = await prisma.knowledgeEmbedding.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const knowledgeEmbeddingWithIdOnly = await prisma.knowledgeEmbedding.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends KnowledgeEmbeddingFindManyArgs>(args?: SelectSubset<T, KnowledgeEmbeddingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KnowledgeEmbeddingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Delete a KnowledgeEmbedding.
     * @param {KnowledgeEmbeddingDeleteArgs} args - Arguments to delete one KnowledgeEmbedding.
     * @example
     * // Delete one KnowledgeEmbedding
     * const KnowledgeEmbedding = await prisma.knowledgeEmbedding.delete({
     *   where: {
     *     // ... filter to delete one KnowledgeEmbedding
     *   }
     * })
     * 
     */
    delete<T extends KnowledgeEmbeddingDeleteArgs>(args: SelectSubset<T, KnowledgeEmbeddingDeleteArgs<ExtArgs>>): Prisma__KnowledgeEmbeddingClient<$Result.GetResult<Prisma.$KnowledgeEmbeddingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one KnowledgeEmbedding.
     * @param {KnowledgeEmbeddingUpdateArgs} args - Arguments to update one KnowledgeEmbedding.
     * @example
     * // Update one KnowledgeEmbedding
     * const knowledgeEmbedding = await prisma.knowledgeEmbedding.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends KnowledgeEmbeddingUpdateArgs>(args: SelectSubset<T, KnowledgeEmbeddingUpdateArgs<ExtArgs>>): Prisma__KnowledgeEmbeddingClient<$Result.GetResult<Prisma.$KnowledgeEmbeddingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more KnowledgeEmbeddings.
     * @param {KnowledgeEmbeddingDeleteManyArgs} args - Arguments to filter KnowledgeEmbeddings to delete.
     * @example
     * // Delete a few KnowledgeEmbeddings
     * const { count } = await prisma.knowledgeEmbedding.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends KnowledgeEmbeddingDeleteManyArgs>(args?: SelectSubset<T, KnowledgeEmbeddingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more KnowledgeEmbeddings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeEmbeddingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many KnowledgeEmbeddings
     * const knowledgeEmbedding = await prisma.knowledgeEmbedding.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends KnowledgeEmbeddingUpdateManyArgs>(args: SelectSubset<T, KnowledgeEmbeddingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more KnowledgeEmbeddings and returns the data updated in the database.
     * @param {KnowledgeEmbeddingUpdateManyAndReturnArgs} args - Arguments to update many KnowledgeEmbeddings.
     * @example
     * // Update many KnowledgeEmbeddings
     * const knowledgeEmbedding = await prisma.knowledgeEmbedding.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more KnowledgeEmbeddings and only return the `id`
     * const knowledgeEmbeddingWithIdOnly = await prisma.knowledgeEmbedding.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends KnowledgeEmbeddingUpdateManyAndReturnArgs>(args: SelectSubset<T, KnowledgeEmbeddingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KnowledgeEmbeddingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>


    /**
     * Count the number of KnowledgeEmbeddings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeEmbeddingCountArgs} args - Arguments to filter KnowledgeEmbeddings to count.
     * @example
     * // Count the number of KnowledgeEmbeddings
     * const count = await prisma.knowledgeEmbedding.count({
     *   where: {
     *     // ... the filter for the KnowledgeEmbeddings we want to count
     *   }
     * })
    **/
    count<T extends KnowledgeEmbeddingCountArgs>(
      args?: Subset<T, KnowledgeEmbeddingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], KnowledgeEmbeddingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a KnowledgeEmbedding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeEmbeddingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends KnowledgeEmbeddingAggregateArgs>(args: Subset<T, KnowledgeEmbeddingAggregateArgs>): Prisma.PrismaPromise<GetKnowledgeEmbeddingAggregateType<T>>

    /**
     * Group by KnowledgeEmbedding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeEmbeddingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends KnowledgeEmbeddingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: KnowledgeEmbeddingGroupByArgs['orderBy'] }
        : { orderBy?: KnowledgeEmbeddingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, KnowledgeEmbeddingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKnowledgeEmbeddingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the KnowledgeEmbedding model
   */
  readonly fields: KnowledgeEmbeddingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for KnowledgeEmbedding.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__KnowledgeEmbeddingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the KnowledgeEmbedding model
   */
  interface KnowledgeEmbeddingFieldRefs {
    readonly id: FieldRef<"KnowledgeEmbedding", 'String'>
    readonly source: FieldRef<"KnowledgeEmbedding", 'String'>
    readonly url: FieldRef<"KnowledgeEmbedding", 'String'>
    readonly createdAt: FieldRef<"KnowledgeEmbedding", 'DateTime'>
    readonly updatedAt: FieldRef<"KnowledgeEmbedding", 'DateTime'>
    readonly chunkId: FieldRef<"KnowledgeEmbedding", 'Int'>
    readonly text: FieldRef<"KnowledgeEmbedding", 'String'>
    readonly type: FieldRef<"KnowledgeEmbedding", 'String'>
    readonly metadata: FieldRef<"KnowledgeEmbedding", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * KnowledgeEmbedding findUnique
   */
  export type KnowledgeEmbeddingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeEmbedding
     */
    select?: KnowledgeEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeEmbedding
     */
    omit?: KnowledgeEmbeddingOmit<ExtArgs> | null
    /**
     * Filter, which KnowledgeEmbedding to fetch.
     */
    where: KnowledgeEmbeddingWhereUniqueInput
  }

  /**
   * KnowledgeEmbedding findUniqueOrThrow
   */
  export type KnowledgeEmbeddingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeEmbedding
     */
    select?: KnowledgeEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeEmbedding
     */
    omit?: KnowledgeEmbeddingOmit<ExtArgs> | null
    /**
     * Filter, which KnowledgeEmbedding to fetch.
     */
    where: KnowledgeEmbeddingWhereUniqueInput
  }

  /**
   * KnowledgeEmbedding findFirst
   */
  export type KnowledgeEmbeddingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeEmbedding
     */
    select?: KnowledgeEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeEmbedding
     */
    omit?: KnowledgeEmbeddingOmit<ExtArgs> | null
    /**
     * Filter, which KnowledgeEmbedding to fetch.
     */
    where?: KnowledgeEmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KnowledgeEmbeddings to fetch.
     */
    orderBy?: KnowledgeEmbeddingOrderByWithRelationInput | KnowledgeEmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KnowledgeEmbeddings.
     */
    cursor?: KnowledgeEmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KnowledgeEmbeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KnowledgeEmbeddings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KnowledgeEmbeddings.
     */
    distinct?: KnowledgeEmbeddingScalarFieldEnum | KnowledgeEmbeddingScalarFieldEnum[]
  }

  /**
   * KnowledgeEmbedding findFirstOrThrow
   */
  export type KnowledgeEmbeddingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeEmbedding
     */
    select?: KnowledgeEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeEmbedding
     */
    omit?: KnowledgeEmbeddingOmit<ExtArgs> | null
    /**
     * Filter, which KnowledgeEmbedding to fetch.
     */
    where?: KnowledgeEmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KnowledgeEmbeddings to fetch.
     */
    orderBy?: KnowledgeEmbeddingOrderByWithRelationInput | KnowledgeEmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KnowledgeEmbeddings.
     */
    cursor?: KnowledgeEmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KnowledgeEmbeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KnowledgeEmbeddings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KnowledgeEmbeddings.
     */
    distinct?: KnowledgeEmbeddingScalarFieldEnum | KnowledgeEmbeddingScalarFieldEnum[]
  }

  /**
   * KnowledgeEmbedding findMany
   */
  export type KnowledgeEmbeddingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeEmbedding
     */
    select?: KnowledgeEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeEmbedding
     */
    omit?: KnowledgeEmbeddingOmit<ExtArgs> | null
    /**
     * Filter, which KnowledgeEmbeddings to fetch.
     */
    where?: KnowledgeEmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KnowledgeEmbeddings to fetch.
     */
    orderBy?: KnowledgeEmbeddingOrderByWithRelationInput | KnowledgeEmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing KnowledgeEmbeddings.
     */
    cursor?: KnowledgeEmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KnowledgeEmbeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KnowledgeEmbeddings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KnowledgeEmbeddings.
     */
    distinct?: KnowledgeEmbeddingScalarFieldEnum | KnowledgeEmbeddingScalarFieldEnum[]
  }

  /**
   * KnowledgeEmbedding update
   */
  export type KnowledgeEmbeddingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeEmbedding
     */
    select?: KnowledgeEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeEmbedding
     */
    omit?: KnowledgeEmbeddingOmit<ExtArgs> | null
    /**
     * The data needed to update a KnowledgeEmbedding.
     */
    data: XOR<KnowledgeEmbeddingUpdateInput, KnowledgeEmbeddingUncheckedUpdateInput>
    /**
     * Choose, which KnowledgeEmbedding to update.
     */
    where: KnowledgeEmbeddingWhereUniqueInput
  }

  /**
   * KnowledgeEmbedding updateMany
   */
  export type KnowledgeEmbeddingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update KnowledgeEmbeddings.
     */
    data: XOR<KnowledgeEmbeddingUpdateManyMutationInput, KnowledgeEmbeddingUncheckedUpdateManyInput>
    /**
     * Filter which KnowledgeEmbeddings to update
     */
    where?: KnowledgeEmbeddingWhereInput
    /**
     * Limit how many KnowledgeEmbeddings to update.
     */
    limit?: number
  }

  /**
   * KnowledgeEmbedding updateManyAndReturn
   */
  export type KnowledgeEmbeddingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeEmbedding
     */
    select?: KnowledgeEmbeddingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeEmbedding
     */
    omit?: KnowledgeEmbeddingOmit<ExtArgs> | null
    /**
     * The data used to update KnowledgeEmbeddings.
     */
    data: XOR<KnowledgeEmbeddingUpdateManyMutationInput, KnowledgeEmbeddingUncheckedUpdateManyInput>
    /**
     * Filter which KnowledgeEmbeddings to update
     */
    where?: KnowledgeEmbeddingWhereInput
    /**
     * Limit how many KnowledgeEmbeddings to update.
     */
    limit?: number
  }

  /**
   * KnowledgeEmbedding delete
   */
  export type KnowledgeEmbeddingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeEmbedding
     */
    select?: KnowledgeEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeEmbedding
     */
    omit?: KnowledgeEmbeddingOmit<ExtArgs> | null
    /**
     * Filter which KnowledgeEmbedding to delete.
     */
    where: KnowledgeEmbeddingWhereUniqueInput
  }

  /**
   * KnowledgeEmbedding deleteMany
   */
  export type KnowledgeEmbeddingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which KnowledgeEmbeddings to delete
     */
    where?: KnowledgeEmbeddingWhereInput
    /**
     * Limit how many KnowledgeEmbeddings to delete.
     */
    limit?: number
  }

  /**
   * KnowledgeEmbedding without action
   */
  export type KnowledgeEmbeddingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeEmbedding
     */
    select?: KnowledgeEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeEmbedding
     */
    omit?: KnowledgeEmbeddingOmit<ExtArgs> | null
  }


  /**
   * Model Embedding
   */

  export type AggregateEmbedding = {
    _count: EmbeddingCountAggregateOutputType | null
    _avg: EmbeddingAvgAggregateOutputType | null
    _sum: EmbeddingSumAggregateOutputType | null
    _min: EmbeddingMinAggregateOutputType | null
    _max: EmbeddingMaxAggregateOutputType | null
  }

  export type EmbeddingAvgAggregateOutputType = {
    embedding: number | null
  }

  export type EmbeddingSumAggregateOutputType = {
    embedding: number[]
  }

  export type EmbeddingMinAggregateOutputType = {
    id: string | null
    content: string | null
    source: string | null
    type: string | null
    createdAt: Date | null
  }

  export type EmbeddingMaxAggregateOutputType = {
    id: string | null
    content: string | null
    source: string | null
    type: string | null
    createdAt: Date | null
  }

  export type EmbeddingCountAggregateOutputType = {
    id: number
    content: number
    embedding: number
    source: number
    type: number
    createdAt: number
    _all: number
  }


  export type EmbeddingAvgAggregateInputType = {
    embedding?: true
  }

  export type EmbeddingSumAggregateInputType = {
    embedding?: true
  }

  export type EmbeddingMinAggregateInputType = {
    id?: true
    content?: true
    source?: true
    type?: true
    createdAt?: true
  }

  export type EmbeddingMaxAggregateInputType = {
    id?: true
    content?: true
    source?: true
    type?: true
    createdAt?: true
  }

  export type EmbeddingCountAggregateInputType = {
    id?: true
    content?: true
    embedding?: true
    source?: true
    type?: true
    createdAt?: true
    _all?: true
  }

  export type EmbeddingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Embedding to aggregate.
     */
    where?: EmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Embeddings to fetch.
     */
    orderBy?: EmbeddingOrderByWithRelationInput | EmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Embeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Embeddings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Embeddings
    **/
    _count?: true | EmbeddingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmbeddingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmbeddingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmbeddingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmbeddingMaxAggregateInputType
  }

  export type GetEmbeddingAggregateType<T extends EmbeddingAggregateArgs> = {
        [P in keyof T & keyof AggregateEmbedding]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmbedding[P]>
      : GetScalarType<T[P], AggregateEmbedding[P]>
  }




  export type EmbeddingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmbeddingWhereInput
    orderBy?: EmbeddingOrderByWithAggregationInput | EmbeddingOrderByWithAggregationInput[]
    by: EmbeddingScalarFieldEnum[] | EmbeddingScalarFieldEnum
    having?: EmbeddingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmbeddingCountAggregateInputType | true
    _avg?: EmbeddingAvgAggregateInputType
    _sum?: EmbeddingSumAggregateInputType
    _min?: EmbeddingMinAggregateInputType
    _max?: EmbeddingMaxAggregateInputType
  }

  export type EmbeddingGroupByOutputType = {
    id: string
    content: string
    embedding: number[]
    source: string
    type: string
    createdAt: Date
    _count: EmbeddingCountAggregateOutputType | null
    _avg: EmbeddingAvgAggregateOutputType | null
    _sum: EmbeddingSumAggregateOutputType | null
    _min: EmbeddingMinAggregateOutputType | null
    _max: EmbeddingMaxAggregateOutputType | null
  }

  type GetEmbeddingGroupByPayload<T extends EmbeddingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmbeddingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmbeddingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmbeddingGroupByOutputType[P]>
            : GetScalarType<T[P], EmbeddingGroupByOutputType[P]>
        }
      >
    >


  export type EmbeddingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    embedding?: boolean
    source?: boolean
    type?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["embedding"]>

  export type EmbeddingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    embedding?: boolean
    source?: boolean
    type?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["embedding"]>

  export type EmbeddingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    embedding?: boolean
    source?: boolean
    type?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["embedding"]>

  export type EmbeddingSelectScalar = {
    id?: boolean
    content?: boolean
    embedding?: boolean
    source?: boolean
    type?: boolean
    createdAt?: boolean
  }

  export type EmbeddingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "content" | "embedding" | "source" | "type" | "createdAt", ExtArgs["result"]["embedding"]>

  export type $EmbeddingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Embedding"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      content: string
      embedding: number[]
      source: string
      type: string
      createdAt: Date
    }, ExtArgs["result"]["embedding"]>
    composites: {}
  }

  type EmbeddingGetPayload<S extends boolean | null | undefined | EmbeddingDefaultArgs> = $Result.GetResult<Prisma.$EmbeddingPayload, S>

  type EmbeddingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmbeddingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmbeddingCountAggregateInputType | true
    }

  export interface EmbeddingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Embedding'], meta: { name: 'Embedding' } }
    /**
     * Find zero or one Embedding that matches the filter.
     * @param {EmbeddingFindUniqueArgs} args - Arguments to find a Embedding
     * @example
     * // Get one Embedding
     * const embedding = await prisma.embedding.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmbeddingFindUniqueArgs>(args: SelectSubset<T, EmbeddingFindUniqueArgs<ExtArgs>>): Prisma__EmbeddingClient<$Result.GetResult<Prisma.$EmbeddingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Embedding that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmbeddingFindUniqueOrThrowArgs} args - Arguments to find a Embedding
     * @example
     * // Get one Embedding
     * const embedding = await prisma.embedding.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmbeddingFindUniqueOrThrowArgs>(args: SelectSubset<T, EmbeddingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmbeddingClient<$Result.GetResult<Prisma.$EmbeddingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Embedding that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbeddingFindFirstArgs} args - Arguments to find a Embedding
     * @example
     * // Get one Embedding
     * const embedding = await prisma.embedding.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmbeddingFindFirstArgs>(args?: SelectSubset<T, EmbeddingFindFirstArgs<ExtArgs>>): Prisma__EmbeddingClient<$Result.GetResult<Prisma.$EmbeddingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Embedding that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbeddingFindFirstOrThrowArgs} args - Arguments to find a Embedding
     * @example
     * // Get one Embedding
     * const embedding = await prisma.embedding.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmbeddingFindFirstOrThrowArgs>(args?: SelectSubset<T, EmbeddingFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmbeddingClient<$Result.GetResult<Prisma.$EmbeddingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Embeddings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbeddingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Embeddings
     * const embeddings = await prisma.embedding.findMany()
     * 
     * // Get first 10 Embeddings
     * const embeddings = await prisma.embedding.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const embeddingWithIdOnly = await prisma.embedding.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmbeddingFindManyArgs>(args?: SelectSubset<T, EmbeddingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmbeddingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Embedding.
     * @param {EmbeddingCreateArgs} args - Arguments to create a Embedding.
     * @example
     * // Create one Embedding
     * const Embedding = await prisma.embedding.create({
     *   data: {
     *     // ... data to create a Embedding
     *   }
     * })
     * 
     */
    create<T extends EmbeddingCreateArgs>(args: SelectSubset<T, EmbeddingCreateArgs<ExtArgs>>): Prisma__EmbeddingClient<$Result.GetResult<Prisma.$EmbeddingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Embeddings.
     * @param {EmbeddingCreateManyArgs} args - Arguments to create many Embeddings.
     * @example
     * // Create many Embeddings
     * const embedding = await prisma.embedding.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmbeddingCreateManyArgs>(args?: SelectSubset<T, EmbeddingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Embeddings and returns the data saved in the database.
     * @param {EmbeddingCreateManyAndReturnArgs} args - Arguments to create many Embeddings.
     * @example
     * // Create many Embeddings
     * const embedding = await prisma.embedding.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Embeddings and only return the `id`
     * const embeddingWithIdOnly = await prisma.embedding.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmbeddingCreateManyAndReturnArgs>(args?: SelectSubset<T, EmbeddingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmbeddingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Embedding.
     * @param {EmbeddingDeleteArgs} args - Arguments to delete one Embedding.
     * @example
     * // Delete one Embedding
     * const Embedding = await prisma.embedding.delete({
     *   where: {
     *     // ... filter to delete one Embedding
     *   }
     * })
     * 
     */
    delete<T extends EmbeddingDeleteArgs>(args: SelectSubset<T, EmbeddingDeleteArgs<ExtArgs>>): Prisma__EmbeddingClient<$Result.GetResult<Prisma.$EmbeddingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Embedding.
     * @param {EmbeddingUpdateArgs} args - Arguments to update one Embedding.
     * @example
     * // Update one Embedding
     * const embedding = await prisma.embedding.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmbeddingUpdateArgs>(args: SelectSubset<T, EmbeddingUpdateArgs<ExtArgs>>): Prisma__EmbeddingClient<$Result.GetResult<Prisma.$EmbeddingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Embeddings.
     * @param {EmbeddingDeleteManyArgs} args - Arguments to filter Embeddings to delete.
     * @example
     * // Delete a few Embeddings
     * const { count } = await prisma.embedding.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmbeddingDeleteManyArgs>(args?: SelectSubset<T, EmbeddingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Embeddings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbeddingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Embeddings
     * const embedding = await prisma.embedding.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmbeddingUpdateManyArgs>(args: SelectSubset<T, EmbeddingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Embeddings and returns the data updated in the database.
     * @param {EmbeddingUpdateManyAndReturnArgs} args - Arguments to update many Embeddings.
     * @example
     * // Update many Embeddings
     * const embedding = await prisma.embedding.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Embeddings and only return the `id`
     * const embeddingWithIdOnly = await prisma.embedding.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmbeddingUpdateManyAndReturnArgs>(args: SelectSubset<T, EmbeddingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmbeddingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Embedding.
     * @param {EmbeddingUpsertArgs} args - Arguments to update or create a Embedding.
     * @example
     * // Update or create a Embedding
     * const embedding = await prisma.embedding.upsert({
     *   create: {
     *     // ... data to create a Embedding
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Embedding we want to update
     *   }
     * })
     */
    upsert<T extends EmbeddingUpsertArgs>(args: SelectSubset<T, EmbeddingUpsertArgs<ExtArgs>>): Prisma__EmbeddingClient<$Result.GetResult<Prisma.$EmbeddingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Embeddings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbeddingCountArgs} args - Arguments to filter Embeddings to count.
     * @example
     * // Count the number of Embeddings
     * const count = await prisma.embedding.count({
     *   where: {
     *     // ... the filter for the Embeddings we want to count
     *   }
     * })
    **/
    count<T extends EmbeddingCountArgs>(
      args?: Subset<T, EmbeddingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmbeddingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Embedding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbeddingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmbeddingAggregateArgs>(args: Subset<T, EmbeddingAggregateArgs>): Prisma.PrismaPromise<GetEmbeddingAggregateType<T>>

    /**
     * Group by Embedding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbeddingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmbeddingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmbeddingGroupByArgs['orderBy'] }
        : { orderBy?: EmbeddingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmbeddingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmbeddingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Embedding model
   */
  readonly fields: EmbeddingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Embedding.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmbeddingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Embedding model
   */
  interface EmbeddingFieldRefs {
    readonly id: FieldRef<"Embedding", 'String'>
    readonly content: FieldRef<"Embedding", 'String'>
    readonly embedding: FieldRef<"Embedding", 'Float[]'>
    readonly source: FieldRef<"Embedding", 'String'>
    readonly type: FieldRef<"Embedding", 'String'>
    readonly createdAt: FieldRef<"Embedding", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Embedding findUnique
   */
  export type EmbeddingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Embedding
     */
    select?: EmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Embedding
     */
    omit?: EmbeddingOmit<ExtArgs> | null
    /**
     * Filter, which Embedding to fetch.
     */
    where: EmbeddingWhereUniqueInput
  }

  /**
   * Embedding findUniqueOrThrow
   */
  export type EmbeddingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Embedding
     */
    select?: EmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Embedding
     */
    omit?: EmbeddingOmit<ExtArgs> | null
    /**
     * Filter, which Embedding to fetch.
     */
    where: EmbeddingWhereUniqueInput
  }

  /**
   * Embedding findFirst
   */
  export type EmbeddingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Embedding
     */
    select?: EmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Embedding
     */
    omit?: EmbeddingOmit<ExtArgs> | null
    /**
     * Filter, which Embedding to fetch.
     */
    where?: EmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Embeddings to fetch.
     */
    orderBy?: EmbeddingOrderByWithRelationInput | EmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Embeddings.
     */
    cursor?: EmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Embeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Embeddings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Embeddings.
     */
    distinct?: EmbeddingScalarFieldEnum | EmbeddingScalarFieldEnum[]
  }

  /**
   * Embedding findFirstOrThrow
   */
  export type EmbeddingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Embedding
     */
    select?: EmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Embedding
     */
    omit?: EmbeddingOmit<ExtArgs> | null
    /**
     * Filter, which Embedding to fetch.
     */
    where?: EmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Embeddings to fetch.
     */
    orderBy?: EmbeddingOrderByWithRelationInput | EmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Embeddings.
     */
    cursor?: EmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Embeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Embeddings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Embeddings.
     */
    distinct?: EmbeddingScalarFieldEnum | EmbeddingScalarFieldEnum[]
  }

  /**
   * Embedding findMany
   */
  export type EmbeddingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Embedding
     */
    select?: EmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Embedding
     */
    omit?: EmbeddingOmit<ExtArgs> | null
    /**
     * Filter, which Embeddings to fetch.
     */
    where?: EmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Embeddings to fetch.
     */
    orderBy?: EmbeddingOrderByWithRelationInput | EmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Embeddings.
     */
    cursor?: EmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Embeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Embeddings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Embeddings.
     */
    distinct?: EmbeddingScalarFieldEnum | EmbeddingScalarFieldEnum[]
  }

  /**
   * Embedding create
   */
  export type EmbeddingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Embedding
     */
    select?: EmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Embedding
     */
    omit?: EmbeddingOmit<ExtArgs> | null
    /**
     * The data needed to create a Embedding.
     */
    data: XOR<EmbeddingCreateInput, EmbeddingUncheckedCreateInput>
  }

  /**
   * Embedding createMany
   */
  export type EmbeddingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Embeddings.
     */
    data: EmbeddingCreateManyInput | EmbeddingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Embedding createManyAndReturn
   */
  export type EmbeddingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Embedding
     */
    select?: EmbeddingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Embedding
     */
    omit?: EmbeddingOmit<ExtArgs> | null
    /**
     * The data used to create many Embeddings.
     */
    data: EmbeddingCreateManyInput | EmbeddingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Embedding update
   */
  export type EmbeddingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Embedding
     */
    select?: EmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Embedding
     */
    omit?: EmbeddingOmit<ExtArgs> | null
    /**
     * The data needed to update a Embedding.
     */
    data: XOR<EmbeddingUpdateInput, EmbeddingUncheckedUpdateInput>
    /**
     * Choose, which Embedding to update.
     */
    where: EmbeddingWhereUniqueInput
  }

  /**
   * Embedding updateMany
   */
  export type EmbeddingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Embeddings.
     */
    data: XOR<EmbeddingUpdateManyMutationInput, EmbeddingUncheckedUpdateManyInput>
    /**
     * Filter which Embeddings to update
     */
    where?: EmbeddingWhereInput
    /**
     * Limit how many Embeddings to update.
     */
    limit?: number
  }

  /**
   * Embedding updateManyAndReturn
   */
  export type EmbeddingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Embedding
     */
    select?: EmbeddingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Embedding
     */
    omit?: EmbeddingOmit<ExtArgs> | null
    /**
     * The data used to update Embeddings.
     */
    data: XOR<EmbeddingUpdateManyMutationInput, EmbeddingUncheckedUpdateManyInput>
    /**
     * Filter which Embeddings to update
     */
    where?: EmbeddingWhereInput
    /**
     * Limit how many Embeddings to update.
     */
    limit?: number
  }

  /**
   * Embedding upsert
   */
  export type EmbeddingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Embedding
     */
    select?: EmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Embedding
     */
    omit?: EmbeddingOmit<ExtArgs> | null
    /**
     * The filter to search for the Embedding to update in case it exists.
     */
    where: EmbeddingWhereUniqueInput
    /**
     * In case the Embedding found by the `where` argument doesn't exist, create a new Embedding with this data.
     */
    create: XOR<EmbeddingCreateInput, EmbeddingUncheckedCreateInput>
    /**
     * In case the Embedding was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmbeddingUpdateInput, EmbeddingUncheckedUpdateInput>
  }

  /**
   * Embedding delete
   */
  export type EmbeddingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Embedding
     */
    select?: EmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Embedding
     */
    omit?: EmbeddingOmit<ExtArgs> | null
    /**
     * Filter which Embedding to delete.
     */
    where: EmbeddingWhereUniqueInput
  }

  /**
   * Embedding deleteMany
   */
  export type EmbeddingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Embeddings to delete
     */
    where?: EmbeddingWhereInput
    /**
     * Limit how many Embeddings to delete.
     */
    limit?: number
  }

  /**
   * Embedding without action
   */
  export type EmbeddingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Embedding
     */
    select?: EmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Embedding
     */
    omit?: EmbeddingOmit<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    currency: string | null
    createdAt: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    currency: string | null
    createdAt: Date | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    currency: number
    createdAt: number
    _all: number
  }


  export type AccountMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    currency?: true
    createdAt?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    currency?: true
    createdAt?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    currency?: true
    createdAt?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    userId: string
    type: string
    currency: string
    createdAt: Date
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    currency?: boolean
    createdAt?: boolean
    entries?: boolean | Account$entriesArgs<ExtArgs>
    _count?: boolean | AccountCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    currency?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    currency?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    currency?: boolean
    createdAt?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "currency" | "createdAt", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entries?: boolean | Account$entriesArgs<ExtArgs>
    _count?: boolean | AccountCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      entries: Prisma.$EntryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: string
      currency: string
      createdAt: Date
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    entries<T extends Account$entriesArgs<ExtArgs> = {}>(args?: Subset<T, Account$entriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly type: FieldRef<"Account", 'String'>
    readonly currency: FieldRef<"Account", 'String'>
    readonly createdAt: FieldRef<"Account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account.entries
   */
  export type Account$entriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entry
     */
    select?: EntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entry
     */
    omit?: EntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryInclude<ExtArgs> | null
    where?: EntryWhereInput
    orderBy?: EntryOrderByWithRelationInput | EntryOrderByWithRelationInput[]
    cursor?: EntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EntryScalarFieldEnum | EntryScalarFieldEnum[]
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model LedgerTransaction
   */

  export type AggregateLedgerTransaction = {
    _count: LedgerTransactionCountAggregateOutputType | null
    _min: LedgerTransactionMinAggregateOutputType | null
    _max: LedgerTransactionMaxAggregateOutputType | null
  }

  export type LedgerTransactionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    reference: string | null
    description: string | null
    state: string | null
    idempotencyKey: string | null
    createdAt: Date | null
    updatedAt: Date | null
    postedAt: Date | null
  }

  export type LedgerTransactionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    reference: string | null
    description: string | null
    state: string | null
    idempotencyKey: string | null
    createdAt: Date | null
    updatedAt: Date | null
    postedAt: Date | null
  }

  export type LedgerTransactionCountAggregateOutputType = {
    id: number
    userId: number
    reference: number
    description: number
    state: number
    idempotencyKey: number
    createdAt: number
    updatedAt: number
    postedAt: number
    _all: number
  }


  export type LedgerTransactionMinAggregateInputType = {
    id?: true
    userId?: true
    reference?: true
    description?: true
    state?: true
    idempotencyKey?: true
    createdAt?: true
    updatedAt?: true
    postedAt?: true
  }

  export type LedgerTransactionMaxAggregateInputType = {
    id?: true
    userId?: true
    reference?: true
    description?: true
    state?: true
    idempotencyKey?: true
    createdAt?: true
    updatedAt?: true
    postedAt?: true
  }

  export type LedgerTransactionCountAggregateInputType = {
    id?: true
    userId?: true
    reference?: true
    description?: true
    state?: true
    idempotencyKey?: true
    createdAt?: true
    updatedAt?: true
    postedAt?: true
    _all?: true
  }

  export type LedgerTransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LedgerTransaction to aggregate.
     */
    where?: LedgerTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LedgerTransactions to fetch.
     */
    orderBy?: LedgerTransactionOrderByWithRelationInput | LedgerTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LedgerTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LedgerTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LedgerTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LedgerTransactions
    **/
    _count?: true | LedgerTransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LedgerTransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LedgerTransactionMaxAggregateInputType
  }

  export type GetLedgerTransactionAggregateType<T extends LedgerTransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateLedgerTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLedgerTransaction[P]>
      : GetScalarType<T[P], AggregateLedgerTransaction[P]>
  }




  export type LedgerTransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LedgerTransactionWhereInput
    orderBy?: LedgerTransactionOrderByWithAggregationInput | LedgerTransactionOrderByWithAggregationInput[]
    by: LedgerTransactionScalarFieldEnum[] | LedgerTransactionScalarFieldEnum
    having?: LedgerTransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LedgerTransactionCountAggregateInputType | true
    _min?: LedgerTransactionMinAggregateInputType
    _max?: LedgerTransactionMaxAggregateInputType
  }

  export type LedgerTransactionGroupByOutputType = {
    id: string
    userId: string
    reference: string
    description: string | null
    state: string
    idempotencyKey: string
    createdAt: Date
    updatedAt: Date
    postedAt: Date | null
    _count: LedgerTransactionCountAggregateOutputType | null
    _min: LedgerTransactionMinAggregateOutputType | null
    _max: LedgerTransactionMaxAggregateOutputType | null
  }

  type GetLedgerTransactionGroupByPayload<T extends LedgerTransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LedgerTransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LedgerTransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LedgerTransactionGroupByOutputType[P]>
            : GetScalarType<T[P], LedgerTransactionGroupByOutputType[P]>
        }
      >
    >


  export type LedgerTransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    reference?: boolean
    description?: boolean
    state?: boolean
    idempotencyKey?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    postedAt?: boolean
    entries?: boolean | LedgerTransaction$entriesArgs<ExtArgs>
    idempotency?: boolean | LedgerTransaction$idempotencyArgs<ExtArgs>
    _count?: boolean | LedgerTransactionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ledgerTransaction"]>

  export type LedgerTransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    reference?: boolean
    description?: boolean
    state?: boolean
    idempotencyKey?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    postedAt?: boolean
  }, ExtArgs["result"]["ledgerTransaction"]>

  export type LedgerTransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    reference?: boolean
    description?: boolean
    state?: boolean
    idempotencyKey?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    postedAt?: boolean
  }, ExtArgs["result"]["ledgerTransaction"]>

  export type LedgerTransactionSelectScalar = {
    id?: boolean
    userId?: boolean
    reference?: boolean
    description?: boolean
    state?: boolean
    idempotencyKey?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    postedAt?: boolean
  }

  export type LedgerTransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "reference" | "description" | "state" | "idempotencyKey" | "createdAt" | "updatedAt" | "postedAt", ExtArgs["result"]["ledgerTransaction"]>
  export type LedgerTransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entries?: boolean | LedgerTransaction$entriesArgs<ExtArgs>
    idempotency?: boolean | LedgerTransaction$idempotencyArgs<ExtArgs>
    _count?: boolean | LedgerTransactionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LedgerTransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type LedgerTransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $LedgerTransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LedgerTransaction"
    objects: {
      entries: Prisma.$EntryPayload<ExtArgs>[]
      idempotency: Prisma.$LedgerIdempotencyPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      reference: string
      description: string | null
      state: string
      idempotencyKey: string
      createdAt: Date
      updatedAt: Date
      postedAt: Date | null
    }, ExtArgs["result"]["ledgerTransaction"]>
    composites: {}
  }

  type LedgerTransactionGetPayload<S extends boolean | null | undefined | LedgerTransactionDefaultArgs> = $Result.GetResult<Prisma.$LedgerTransactionPayload, S>

  type LedgerTransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LedgerTransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LedgerTransactionCountAggregateInputType | true
    }

  export interface LedgerTransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LedgerTransaction'], meta: { name: 'LedgerTransaction' } }
    /**
     * Find zero or one LedgerTransaction that matches the filter.
     * @param {LedgerTransactionFindUniqueArgs} args - Arguments to find a LedgerTransaction
     * @example
     * // Get one LedgerTransaction
     * const ledgerTransaction = await prisma.ledgerTransaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LedgerTransactionFindUniqueArgs>(args: SelectSubset<T, LedgerTransactionFindUniqueArgs<ExtArgs>>): Prisma__LedgerTransactionClient<$Result.GetResult<Prisma.$LedgerTransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LedgerTransaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LedgerTransactionFindUniqueOrThrowArgs} args - Arguments to find a LedgerTransaction
     * @example
     * // Get one LedgerTransaction
     * const ledgerTransaction = await prisma.ledgerTransaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LedgerTransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, LedgerTransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LedgerTransactionClient<$Result.GetResult<Prisma.$LedgerTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LedgerTransaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerTransactionFindFirstArgs} args - Arguments to find a LedgerTransaction
     * @example
     * // Get one LedgerTransaction
     * const ledgerTransaction = await prisma.ledgerTransaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LedgerTransactionFindFirstArgs>(args?: SelectSubset<T, LedgerTransactionFindFirstArgs<ExtArgs>>): Prisma__LedgerTransactionClient<$Result.GetResult<Prisma.$LedgerTransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LedgerTransaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerTransactionFindFirstOrThrowArgs} args - Arguments to find a LedgerTransaction
     * @example
     * // Get one LedgerTransaction
     * const ledgerTransaction = await prisma.ledgerTransaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LedgerTransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, LedgerTransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__LedgerTransactionClient<$Result.GetResult<Prisma.$LedgerTransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LedgerTransactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerTransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LedgerTransactions
     * const ledgerTransactions = await prisma.ledgerTransaction.findMany()
     * 
     * // Get first 10 LedgerTransactions
     * const ledgerTransactions = await prisma.ledgerTransaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ledgerTransactionWithIdOnly = await prisma.ledgerTransaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LedgerTransactionFindManyArgs>(args?: SelectSubset<T, LedgerTransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LedgerTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LedgerTransaction.
     * @param {LedgerTransactionCreateArgs} args - Arguments to create a LedgerTransaction.
     * @example
     * // Create one LedgerTransaction
     * const LedgerTransaction = await prisma.ledgerTransaction.create({
     *   data: {
     *     // ... data to create a LedgerTransaction
     *   }
     * })
     * 
     */
    create<T extends LedgerTransactionCreateArgs>(args: SelectSubset<T, LedgerTransactionCreateArgs<ExtArgs>>): Prisma__LedgerTransactionClient<$Result.GetResult<Prisma.$LedgerTransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LedgerTransactions.
     * @param {LedgerTransactionCreateManyArgs} args - Arguments to create many LedgerTransactions.
     * @example
     * // Create many LedgerTransactions
     * const ledgerTransaction = await prisma.ledgerTransaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LedgerTransactionCreateManyArgs>(args?: SelectSubset<T, LedgerTransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LedgerTransactions and returns the data saved in the database.
     * @param {LedgerTransactionCreateManyAndReturnArgs} args - Arguments to create many LedgerTransactions.
     * @example
     * // Create many LedgerTransactions
     * const ledgerTransaction = await prisma.ledgerTransaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LedgerTransactions and only return the `id`
     * const ledgerTransactionWithIdOnly = await prisma.ledgerTransaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LedgerTransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, LedgerTransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LedgerTransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LedgerTransaction.
     * @param {LedgerTransactionDeleteArgs} args - Arguments to delete one LedgerTransaction.
     * @example
     * // Delete one LedgerTransaction
     * const LedgerTransaction = await prisma.ledgerTransaction.delete({
     *   where: {
     *     // ... filter to delete one LedgerTransaction
     *   }
     * })
     * 
     */
    delete<T extends LedgerTransactionDeleteArgs>(args: SelectSubset<T, LedgerTransactionDeleteArgs<ExtArgs>>): Prisma__LedgerTransactionClient<$Result.GetResult<Prisma.$LedgerTransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LedgerTransaction.
     * @param {LedgerTransactionUpdateArgs} args - Arguments to update one LedgerTransaction.
     * @example
     * // Update one LedgerTransaction
     * const ledgerTransaction = await prisma.ledgerTransaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LedgerTransactionUpdateArgs>(args: SelectSubset<T, LedgerTransactionUpdateArgs<ExtArgs>>): Prisma__LedgerTransactionClient<$Result.GetResult<Prisma.$LedgerTransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LedgerTransactions.
     * @param {LedgerTransactionDeleteManyArgs} args - Arguments to filter LedgerTransactions to delete.
     * @example
     * // Delete a few LedgerTransactions
     * const { count } = await prisma.ledgerTransaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LedgerTransactionDeleteManyArgs>(args?: SelectSubset<T, LedgerTransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LedgerTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerTransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LedgerTransactions
     * const ledgerTransaction = await prisma.ledgerTransaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LedgerTransactionUpdateManyArgs>(args: SelectSubset<T, LedgerTransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LedgerTransactions and returns the data updated in the database.
     * @param {LedgerTransactionUpdateManyAndReturnArgs} args - Arguments to update many LedgerTransactions.
     * @example
     * // Update many LedgerTransactions
     * const ledgerTransaction = await prisma.ledgerTransaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LedgerTransactions and only return the `id`
     * const ledgerTransactionWithIdOnly = await prisma.ledgerTransaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LedgerTransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, LedgerTransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LedgerTransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LedgerTransaction.
     * @param {LedgerTransactionUpsertArgs} args - Arguments to update or create a LedgerTransaction.
     * @example
     * // Update or create a LedgerTransaction
     * const ledgerTransaction = await prisma.ledgerTransaction.upsert({
     *   create: {
     *     // ... data to create a LedgerTransaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LedgerTransaction we want to update
     *   }
     * })
     */
    upsert<T extends LedgerTransactionUpsertArgs>(args: SelectSubset<T, LedgerTransactionUpsertArgs<ExtArgs>>): Prisma__LedgerTransactionClient<$Result.GetResult<Prisma.$LedgerTransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LedgerTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerTransactionCountArgs} args - Arguments to filter LedgerTransactions to count.
     * @example
     * // Count the number of LedgerTransactions
     * const count = await prisma.ledgerTransaction.count({
     *   where: {
     *     // ... the filter for the LedgerTransactions we want to count
     *   }
     * })
    **/
    count<T extends LedgerTransactionCountArgs>(
      args?: Subset<T, LedgerTransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LedgerTransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LedgerTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerTransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LedgerTransactionAggregateArgs>(args: Subset<T, LedgerTransactionAggregateArgs>): Prisma.PrismaPromise<GetLedgerTransactionAggregateType<T>>

    /**
     * Group by LedgerTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerTransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LedgerTransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LedgerTransactionGroupByArgs['orderBy'] }
        : { orderBy?: LedgerTransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LedgerTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLedgerTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LedgerTransaction model
   */
  readonly fields: LedgerTransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LedgerTransaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LedgerTransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    entries<T extends LedgerTransaction$entriesArgs<ExtArgs> = {}>(args?: Subset<T, LedgerTransaction$entriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    idempotency<T extends LedgerTransaction$idempotencyArgs<ExtArgs> = {}>(args?: Subset<T, LedgerTransaction$idempotencyArgs<ExtArgs>>): Prisma__LedgerIdempotencyClient<$Result.GetResult<Prisma.$LedgerIdempotencyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LedgerTransaction model
   */
  interface LedgerTransactionFieldRefs {
    readonly id: FieldRef<"LedgerTransaction", 'String'>
    readonly userId: FieldRef<"LedgerTransaction", 'String'>
    readonly reference: FieldRef<"LedgerTransaction", 'String'>
    readonly description: FieldRef<"LedgerTransaction", 'String'>
    readonly state: FieldRef<"LedgerTransaction", 'String'>
    readonly idempotencyKey: FieldRef<"LedgerTransaction", 'String'>
    readonly createdAt: FieldRef<"LedgerTransaction", 'DateTime'>
    readonly updatedAt: FieldRef<"LedgerTransaction", 'DateTime'>
    readonly postedAt: FieldRef<"LedgerTransaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LedgerTransaction findUnique
   */
  export type LedgerTransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerTransaction
     */
    select?: LedgerTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerTransaction
     */
    omit?: LedgerTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerTransactionInclude<ExtArgs> | null
    /**
     * Filter, which LedgerTransaction to fetch.
     */
    where: LedgerTransactionWhereUniqueInput
  }

  /**
   * LedgerTransaction findUniqueOrThrow
   */
  export type LedgerTransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerTransaction
     */
    select?: LedgerTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerTransaction
     */
    omit?: LedgerTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerTransactionInclude<ExtArgs> | null
    /**
     * Filter, which LedgerTransaction to fetch.
     */
    where: LedgerTransactionWhereUniqueInput
  }

  /**
   * LedgerTransaction findFirst
   */
  export type LedgerTransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerTransaction
     */
    select?: LedgerTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerTransaction
     */
    omit?: LedgerTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerTransactionInclude<ExtArgs> | null
    /**
     * Filter, which LedgerTransaction to fetch.
     */
    where?: LedgerTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LedgerTransactions to fetch.
     */
    orderBy?: LedgerTransactionOrderByWithRelationInput | LedgerTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LedgerTransactions.
     */
    cursor?: LedgerTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LedgerTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LedgerTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LedgerTransactions.
     */
    distinct?: LedgerTransactionScalarFieldEnum | LedgerTransactionScalarFieldEnum[]
  }

  /**
   * LedgerTransaction findFirstOrThrow
   */
  export type LedgerTransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerTransaction
     */
    select?: LedgerTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerTransaction
     */
    omit?: LedgerTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerTransactionInclude<ExtArgs> | null
    /**
     * Filter, which LedgerTransaction to fetch.
     */
    where?: LedgerTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LedgerTransactions to fetch.
     */
    orderBy?: LedgerTransactionOrderByWithRelationInput | LedgerTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LedgerTransactions.
     */
    cursor?: LedgerTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LedgerTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LedgerTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LedgerTransactions.
     */
    distinct?: LedgerTransactionScalarFieldEnum | LedgerTransactionScalarFieldEnum[]
  }

  /**
   * LedgerTransaction findMany
   */
  export type LedgerTransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerTransaction
     */
    select?: LedgerTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerTransaction
     */
    omit?: LedgerTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerTransactionInclude<ExtArgs> | null
    /**
     * Filter, which LedgerTransactions to fetch.
     */
    where?: LedgerTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LedgerTransactions to fetch.
     */
    orderBy?: LedgerTransactionOrderByWithRelationInput | LedgerTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LedgerTransactions.
     */
    cursor?: LedgerTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LedgerTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LedgerTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LedgerTransactions.
     */
    distinct?: LedgerTransactionScalarFieldEnum | LedgerTransactionScalarFieldEnum[]
  }

  /**
   * LedgerTransaction create
   */
  export type LedgerTransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerTransaction
     */
    select?: LedgerTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerTransaction
     */
    omit?: LedgerTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerTransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a LedgerTransaction.
     */
    data: XOR<LedgerTransactionCreateInput, LedgerTransactionUncheckedCreateInput>
  }

  /**
   * LedgerTransaction createMany
   */
  export type LedgerTransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LedgerTransactions.
     */
    data: LedgerTransactionCreateManyInput | LedgerTransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LedgerTransaction createManyAndReturn
   */
  export type LedgerTransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerTransaction
     */
    select?: LedgerTransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerTransaction
     */
    omit?: LedgerTransactionOmit<ExtArgs> | null
    /**
     * The data used to create many LedgerTransactions.
     */
    data: LedgerTransactionCreateManyInput | LedgerTransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LedgerTransaction update
   */
  export type LedgerTransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerTransaction
     */
    select?: LedgerTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerTransaction
     */
    omit?: LedgerTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerTransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a LedgerTransaction.
     */
    data: XOR<LedgerTransactionUpdateInput, LedgerTransactionUncheckedUpdateInput>
    /**
     * Choose, which LedgerTransaction to update.
     */
    where: LedgerTransactionWhereUniqueInput
  }

  /**
   * LedgerTransaction updateMany
   */
  export type LedgerTransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LedgerTransactions.
     */
    data: XOR<LedgerTransactionUpdateManyMutationInput, LedgerTransactionUncheckedUpdateManyInput>
    /**
     * Filter which LedgerTransactions to update
     */
    where?: LedgerTransactionWhereInput
    /**
     * Limit how many LedgerTransactions to update.
     */
    limit?: number
  }

  /**
   * LedgerTransaction updateManyAndReturn
   */
  export type LedgerTransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerTransaction
     */
    select?: LedgerTransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerTransaction
     */
    omit?: LedgerTransactionOmit<ExtArgs> | null
    /**
     * The data used to update LedgerTransactions.
     */
    data: XOR<LedgerTransactionUpdateManyMutationInput, LedgerTransactionUncheckedUpdateManyInput>
    /**
     * Filter which LedgerTransactions to update
     */
    where?: LedgerTransactionWhereInput
    /**
     * Limit how many LedgerTransactions to update.
     */
    limit?: number
  }

  /**
   * LedgerTransaction upsert
   */
  export type LedgerTransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerTransaction
     */
    select?: LedgerTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerTransaction
     */
    omit?: LedgerTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerTransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the LedgerTransaction to update in case it exists.
     */
    where: LedgerTransactionWhereUniqueInput
    /**
     * In case the LedgerTransaction found by the `where` argument doesn't exist, create a new LedgerTransaction with this data.
     */
    create: XOR<LedgerTransactionCreateInput, LedgerTransactionUncheckedCreateInput>
    /**
     * In case the LedgerTransaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LedgerTransactionUpdateInput, LedgerTransactionUncheckedUpdateInput>
  }

  /**
   * LedgerTransaction delete
   */
  export type LedgerTransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerTransaction
     */
    select?: LedgerTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerTransaction
     */
    omit?: LedgerTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerTransactionInclude<ExtArgs> | null
    /**
     * Filter which LedgerTransaction to delete.
     */
    where: LedgerTransactionWhereUniqueInput
  }

  /**
   * LedgerTransaction deleteMany
   */
  export type LedgerTransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LedgerTransactions to delete
     */
    where?: LedgerTransactionWhereInput
    /**
     * Limit how many LedgerTransactions to delete.
     */
    limit?: number
  }

  /**
   * LedgerTransaction.entries
   */
  export type LedgerTransaction$entriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entry
     */
    select?: EntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entry
     */
    omit?: EntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryInclude<ExtArgs> | null
    where?: EntryWhereInput
    orderBy?: EntryOrderByWithRelationInput | EntryOrderByWithRelationInput[]
    cursor?: EntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EntryScalarFieldEnum | EntryScalarFieldEnum[]
  }

  /**
   * LedgerTransaction.idempotency
   */
  export type LedgerTransaction$idempotencyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerIdempotency
     */
    select?: LedgerIdempotencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerIdempotency
     */
    omit?: LedgerIdempotencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerIdempotencyInclude<ExtArgs> | null
    where?: LedgerIdempotencyWhereInput
  }

  /**
   * LedgerTransaction without action
   */
  export type LedgerTransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerTransaction
     */
    select?: LedgerTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerTransaction
     */
    omit?: LedgerTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerTransactionInclude<ExtArgs> | null
  }


  /**
   * Model Entry
   */

  export type AggregateEntry = {
    _count: EntryCountAggregateOutputType | null
    _avg: EntryAvgAggregateOutputType | null
    _sum: EntrySumAggregateOutputType | null
    _min: EntryMinAggregateOutputType | null
    _max: EntryMaxAggregateOutputType | null
  }

  export type EntryAvgAggregateOutputType = {
    debit: number | null
    credit: number | null
  }

  export type EntrySumAggregateOutputType = {
    debit: bigint | null
    credit: bigint | null
  }

  export type EntryMinAggregateOutputType = {
    id: string | null
    transactionId: string | null
    accountId: string | null
    debit: bigint | null
    credit: bigint | null
    currency: string | null
    description: string | null
    createdAt: Date | null
  }

  export type EntryMaxAggregateOutputType = {
    id: string | null
    transactionId: string | null
    accountId: string | null
    debit: bigint | null
    credit: bigint | null
    currency: string | null
    description: string | null
    createdAt: Date | null
  }

  export type EntryCountAggregateOutputType = {
    id: number
    transactionId: number
    accountId: number
    debit: number
    credit: number
    currency: number
    description: number
    createdAt: number
    _all: number
  }


  export type EntryAvgAggregateInputType = {
    debit?: true
    credit?: true
  }

  export type EntrySumAggregateInputType = {
    debit?: true
    credit?: true
  }

  export type EntryMinAggregateInputType = {
    id?: true
    transactionId?: true
    accountId?: true
    debit?: true
    credit?: true
    currency?: true
    description?: true
    createdAt?: true
  }

  export type EntryMaxAggregateInputType = {
    id?: true
    transactionId?: true
    accountId?: true
    debit?: true
    credit?: true
    currency?: true
    description?: true
    createdAt?: true
  }

  export type EntryCountAggregateInputType = {
    id?: true
    transactionId?: true
    accountId?: true
    debit?: true
    credit?: true
    currency?: true
    description?: true
    createdAt?: true
    _all?: true
  }

  export type EntryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Entry to aggregate.
     */
    where?: EntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Entries to fetch.
     */
    orderBy?: EntryOrderByWithRelationInput | EntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Entries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Entries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Entries
    **/
    _count?: true | EntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EntryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EntrySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EntryMaxAggregateInputType
  }

  export type GetEntryAggregateType<T extends EntryAggregateArgs> = {
        [P in keyof T & keyof AggregateEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEntry[P]>
      : GetScalarType<T[P], AggregateEntry[P]>
  }




  export type EntryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EntryWhereInput
    orderBy?: EntryOrderByWithAggregationInput | EntryOrderByWithAggregationInput[]
    by: EntryScalarFieldEnum[] | EntryScalarFieldEnum
    having?: EntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EntryCountAggregateInputType | true
    _avg?: EntryAvgAggregateInputType
    _sum?: EntrySumAggregateInputType
    _min?: EntryMinAggregateInputType
    _max?: EntryMaxAggregateInputType
  }

  export type EntryGroupByOutputType = {
    id: string
    transactionId: string
    accountId: string
    debit: bigint
    credit: bigint
    currency: string
    description: string | null
    createdAt: Date
    _count: EntryCountAggregateOutputType | null
    _avg: EntryAvgAggregateOutputType | null
    _sum: EntrySumAggregateOutputType | null
    _min: EntryMinAggregateOutputType | null
    _max: EntryMaxAggregateOutputType | null
  }

  type GetEntryGroupByPayload<T extends EntryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EntryGroupByOutputType[P]>
            : GetScalarType<T[P], EntryGroupByOutputType[P]>
        }
      >
    >


  export type EntrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    transactionId?: boolean
    accountId?: boolean
    debit?: boolean
    credit?: boolean
    currency?: boolean
    description?: boolean
    createdAt?: boolean
    transaction?: boolean | LedgerTransactionDefaultArgs<ExtArgs>
    account?: boolean | AccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["entry"]>

  export type EntrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    transactionId?: boolean
    accountId?: boolean
    debit?: boolean
    credit?: boolean
    currency?: boolean
    description?: boolean
    createdAt?: boolean
    transaction?: boolean | LedgerTransactionDefaultArgs<ExtArgs>
    account?: boolean | AccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["entry"]>

  export type EntrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    transactionId?: boolean
    accountId?: boolean
    debit?: boolean
    credit?: boolean
    currency?: boolean
    description?: boolean
    createdAt?: boolean
    transaction?: boolean | LedgerTransactionDefaultArgs<ExtArgs>
    account?: boolean | AccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["entry"]>

  export type EntrySelectScalar = {
    id?: boolean
    transactionId?: boolean
    accountId?: boolean
    debit?: boolean
    credit?: boolean
    currency?: boolean
    description?: boolean
    createdAt?: boolean
  }

  export type EntryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "transactionId" | "accountId" | "debit" | "credit" | "currency" | "description" | "createdAt", ExtArgs["result"]["entry"]>
  export type EntryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transaction?: boolean | LedgerTransactionDefaultArgs<ExtArgs>
    account?: boolean | AccountDefaultArgs<ExtArgs>
  }
  export type EntryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transaction?: boolean | LedgerTransactionDefaultArgs<ExtArgs>
    account?: boolean | AccountDefaultArgs<ExtArgs>
  }
  export type EntryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transaction?: boolean | LedgerTransactionDefaultArgs<ExtArgs>
    account?: boolean | AccountDefaultArgs<ExtArgs>
  }

  export type $EntryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Entry"
    objects: {
      transaction: Prisma.$LedgerTransactionPayload<ExtArgs>
      account: Prisma.$AccountPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      transactionId: string
      accountId: string
      debit: bigint
      credit: bigint
      currency: string
      description: string | null
      createdAt: Date
    }, ExtArgs["result"]["entry"]>
    composites: {}
  }

  type EntryGetPayload<S extends boolean | null | undefined | EntryDefaultArgs> = $Result.GetResult<Prisma.$EntryPayload, S>

  type EntryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EntryCountAggregateInputType | true
    }

  export interface EntryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Entry'], meta: { name: 'Entry' } }
    /**
     * Find zero or one Entry that matches the filter.
     * @param {EntryFindUniqueArgs} args - Arguments to find a Entry
     * @example
     * // Get one Entry
     * const entry = await prisma.entry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EntryFindUniqueArgs>(args: SelectSubset<T, EntryFindUniqueArgs<ExtArgs>>): Prisma__EntryClient<$Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Entry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EntryFindUniqueOrThrowArgs} args - Arguments to find a Entry
     * @example
     * // Get one Entry
     * const entry = await prisma.entry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EntryFindUniqueOrThrowArgs>(args: SelectSubset<T, EntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EntryClient<$Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Entry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryFindFirstArgs} args - Arguments to find a Entry
     * @example
     * // Get one Entry
     * const entry = await prisma.entry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EntryFindFirstArgs>(args?: SelectSubset<T, EntryFindFirstArgs<ExtArgs>>): Prisma__EntryClient<$Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Entry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryFindFirstOrThrowArgs} args - Arguments to find a Entry
     * @example
     * // Get one Entry
     * const entry = await prisma.entry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EntryFindFirstOrThrowArgs>(args?: SelectSubset<T, EntryFindFirstOrThrowArgs<ExtArgs>>): Prisma__EntryClient<$Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Entries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Entries
     * const entries = await prisma.entry.findMany()
     * 
     * // Get first 10 Entries
     * const entries = await prisma.entry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const entryWithIdOnly = await prisma.entry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EntryFindManyArgs>(args?: SelectSubset<T, EntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Entry.
     * @param {EntryCreateArgs} args - Arguments to create a Entry.
     * @example
     * // Create one Entry
     * const Entry = await prisma.entry.create({
     *   data: {
     *     // ... data to create a Entry
     *   }
     * })
     * 
     */
    create<T extends EntryCreateArgs>(args: SelectSubset<T, EntryCreateArgs<ExtArgs>>): Prisma__EntryClient<$Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Entries.
     * @param {EntryCreateManyArgs} args - Arguments to create many Entries.
     * @example
     * // Create many Entries
     * const entry = await prisma.entry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EntryCreateManyArgs>(args?: SelectSubset<T, EntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Entries and returns the data saved in the database.
     * @param {EntryCreateManyAndReturnArgs} args - Arguments to create many Entries.
     * @example
     * // Create many Entries
     * const entry = await prisma.entry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Entries and only return the `id`
     * const entryWithIdOnly = await prisma.entry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EntryCreateManyAndReturnArgs>(args?: SelectSubset<T, EntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Entry.
     * @param {EntryDeleteArgs} args - Arguments to delete one Entry.
     * @example
     * // Delete one Entry
     * const Entry = await prisma.entry.delete({
     *   where: {
     *     // ... filter to delete one Entry
     *   }
     * })
     * 
     */
    delete<T extends EntryDeleteArgs>(args: SelectSubset<T, EntryDeleteArgs<ExtArgs>>): Prisma__EntryClient<$Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Entry.
     * @param {EntryUpdateArgs} args - Arguments to update one Entry.
     * @example
     * // Update one Entry
     * const entry = await prisma.entry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EntryUpdateArgs>(args: SelectSubset<T, EntryUpdateArgs<ExtArgs>>): Prisma__EntryClient<$Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Entries.
     * @param {EntryDeleteManyArgs} args - Arguments to filter Entries to delete.
     * @example
     * // Delete a few Entries
     * const { count } = await prisma.entry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EntryDeleteManyArgs>(args?: SelectSubset<T, EntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Entries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Entries
     * const entry = await prisma.entry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EntryUpdateManyArgs>(args: SelectSubset<T, EntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Entries and returns the data updated in the database.
     * @param {EntryUpdateManyAndReturnArgs} args - Arguments to update many Entries.
     * @example
     * // Update many Entries
     * const entry = await prisma.entry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Entries and only return the `id`
     * const entryWithIdOnly = await prisma.entry.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EntryUpdateManyAndReturnArgs>(args: SelectSubset<T, EntryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Entry.
     * @param {EntryUpsertArgs} args - Arguments to update or create a Entry.
     * @example
     * // Update or create a Entry
     * const entry = await prisma.entry.upsert({
     *   create: {
     *     // ... data to create a Entry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Entry we want to update
     *   }
     * })
     */
    upsert<T extends EntryUpsertArgs>(args: SelectSubset<T, EntryUpsertArgs<ExtArgs>>): Prisma__EntryClient<$Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Entries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryCountArgs} args - Arguments to filter Entries to count.
     * @example
     * // Count the number of Entries
     * const count = await prisma.entry.count({
     *   where: {
     *     // ... the filter for the Entries we want to count
     *   }
     * })
    **/
    count<T extends EntryCountArgs>(
      args?: Subset<T, EntryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Entry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EntryAggregateArgs>(args: Subset<T, EntryAggregateArgs>): Prisma.PrismaPromise<GetEntryAggregateType<T>>

    /**
     * Group by Entry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EntryGroupByArgs['orderBy'] }
        : { orderBy?: EntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Entry model
   */
  readonly fields: EntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Entry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EntryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    transaction<T extends LedgerTransactionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LedgerTransactionDefaultArgs<ExtArgs>>): Prisma__LedgerTransactionClient<$Result.GetResult<Prisma.$LedgerTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    account<T extends AccountDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AccountDefaultArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Entry model
   */
  interface EntryFieldRefs {
    readonly id: FieldRef<"Entry", 'String'>
    readonly transactionId: FieldRef<"Entry", 'String'>
    readonly accountId: FieldRef<"Entry", 'String'>
    readonly debit: FieldRef<"Entry", 'BigInt'>
    readonly credit: FieldRef<"Entry", 'BigInt'>
    readonly currency: FieldRef<"Entry", 'String'>
    readonly description: FieldRef<"Entry", 'String'>
    readonly createdAt: FieldRef<"Entry", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Entry findUnique
   */
  export type EntryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entry
     */
    select?: EntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entry
     */
    omit?: EntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryInclude<ExtArgs> | null
    /**
     * Filter, which Entry to fetch.
     */
    where: EntryWhereUniqueInput
  }

  /**
   * Entry findUniqueOrThrow
   */
  export type EntryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entry
     */
    select?: EntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entry
     */
    omit?: EntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryInclude<ExtArgs> | null
    /**
     * Filter, which Entry to fetch.
     */
    where: EntryWhereUniqueInput
  }

  /**
   * Entry findFirst
   */
  export type EntryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entry
     */
    select?: EntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entry
     */
    omit?: EntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryInclude<ExtArgs> | null
    /**
     * Filter, which Entry to fetch.
     */
    where?: EntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Entries to fetch.
     */
    orderBy?: EntryOrderByWithRelationInput | EntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Entries.
     */
    cursor?: EntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Entries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Entries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Entries.
     */
    distinct?: EntryScalarFieldEnum | EntryScalarFieldEnum[]
  }

  /**
   * Entry findFirstOrThrow
   */
  export type EntryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entry
     */
    select?: EntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entry
     */
    omit?: EntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryInclude<ExtArgs> | null
    /**
     * Filter, which Entry to fetch.
     */
    where?: EntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Entries to fetch.
     */
    orderBy?: EntryOrderByWithRelationInput | EntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Entries.
     */
    cursor?: EntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Entries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Entries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Entries.
     */
    distinct?: EntryScalarFieldEnum | EntryScalarFieldEnum[]
  }

  /**
   * Entry findMany
   */
  export type EntryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entry
     */
    select?: EntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entry
     */
    omit?: EntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryInclude<ExtArgs> | null
    /**
     * Filter, which Entries to fetch.
     */
    where?: EntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Entries to fetch.
     */
    orderBy?: EntryOrderByWithRelationInput | EntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Entries.
     */
    cursor?: EntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Entries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Entries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Entries.
     */
    distinct?: EntryScalarFieldEnum | EntryScalarFieldEnum[]
  }

  /**
   * Entry create
   */
  export type EntryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entry
     */
    select?: EntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entry
     */
    omit?: EntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryInclude<ExtArgs> | null
    /**
     * The data needed to create a Entry.
     */
    data: XOR<EntryCreateInput, EntryUncheckedCreateInput>
  }

  /**
   * Entry createMany
   */
  export type EntryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Entries.
     */
    data: EntryCreateManyInput | EntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Entry createManyAndReturn
   */
  export type EntryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entry
     */
    select?: EntrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Entry
     */
    omit?: EntryOmit<ExtArgs> | null
    /**
     * The data used to create many Entries.
     */
    data: EntryCreateManyInput | EntryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Entry update
   */
  export type EntryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entry
     */
    select?: EntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entry
     */
    omit?: EntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryInclude<ExtArgs> | null
    /**
     * The data needed to update a Entry.
     */
    data: XOR<EntryUpdateInput, EntryUncheckedUpdateInput>
    /**
     * Choose, which Entry to update.
     */
    where: EntryWhereUniqueInput
  }

  /**
   * Entry updateMany
   */
  export type EntryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Entries.
     */
    data: XOR<EntryUpdateManyMutationInput, EntryUncheckedUpdateManyInput>
    /**
     * Filter which Entries to update
     */
    where?: EntryWhereInput
    /**
     * Limit how many Entries to update.
     */
    limit?: number
  }

  /**
   * Entry updateManyAndReturn
   */
  export type EntryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entry
     */
    select?: EntrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Entry
     */
    omit?: EntryOmit<ExtArgs> | null
    /**
     * The data used to update Entries.
     */
    data: XOR<EntryUpdateManyMutationInput, EntryUncheckedUpdateManyInput>
    /**
     * Filter which Entries to update
     */
    where?: EntryWhereInput
    /**
     * Limit how many Entries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Entry upsert
   */
  export type EntryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entry
     */
    select?: EntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entry
     */
    omit?: EntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryInclude<ExtArgs> | null
    /**
     * The filter to search for the Entry to update in case it exists.
     */
    where: EntryWhereUniqueInput
    /**
     * In case the Entry found by the `where` argument doesn't exist, create a new Entry with this data.
     */
    create: XOR<EntryCreateInput, EntryUncheckedCreateInput>
    /**
     * In case the Entry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EntryUpdateInput, EntryUncheckedUpdateInput>
  }

  /**
   * Entry delete
   */
  export type EntryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entry
     */
    select?: EntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entry
     */
    omit?: EntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryInclude<ExtArgs> | null
    /**
     * Filter which Entry to delete.
     */
    where: EntryWhereUniqueInput
  }

  /**
   * Entry deleteMany
   */
  export type EntryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Entries to delete
     */
    where?: EntryWhereInput
    /**
     * Limit how many Entries to delete.
     */
    limit?: number
  }

  /**
   * Entry without action
   */
  export type EntryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entry
     */
    select?: EntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Entry
     */
    omit?: EntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryInclude<ExtArgs> | null
  }


  /**
   * Model LedgerIdempotency
   */

  export type AggregateLedgerIdempotency = {
    _count: LedgerIdempotencyCountAggregateOutputType | null
    _min: LedgerIdempotencyMinAggregateOutputType | null
    _max: LedgerIdempotencyMaxAggregateOutputType | null
  }

  export type LedgerIdempotencyMinAggregateOutputType = {
    id: string | null
    idempotencyKey: string | null
    transactionId: string | null
    createdAt: Date | null
  }

  export type LedgerIdempotencyMaxAggregateOutputType = {
    id: string | null
    idempotencyKey: string | null
    transactionId: string | null
    createdAt: Date | null
  }

  export type LedgerIdempotencyCountAggregateOutputType = {
    id: number
    idempotencyKey: number
    transactionId: number
    createdAt: number
    _all: number
  }


  export type LedgerIdempotencyMinAggregateInputType = {
    id?: true
    idempotencyKey?: true
    transactionId?: true
    createdAt?: true
  }

  export type LedgerIdempotencyMaxAggregateInputType = {
    id?: true
    idempotencyKey?: true
    transactionId?: true
    createdAt?: true
  }

  export type LedgerIdempotencyCountAggregateInputType = {
    id?: true
    idempotencyKey?: true
    transactionId?: true
    createdAt?: true
    _all?: true
  }

  export type LedgerIdempotencyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LedgerIdempotency to aggregate.
     */
    where?: LedgerIdempotencyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LedgerIdempotencies to fetch.
     */
    orderBy?: LedgerIdempotencyOrderByWithRelationInput | LedgerIdempotencyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LedgerIdempotencyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LedgerIdempotencies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LedgerIdempotencies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LedgerIdempotencies
    **/
    _count?: true | LedgerIdempotencyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LedgerIdempotencyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LedgerIdempotencyMaxAggregateInputType
  }

  export type GetLedgerIdempotencyAggregateType<T extends LedgerIdempotencyAggregateArgs> = {
        [P in keyof T & keyof AggregateLedgerIdempotency]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLedgerIdempotency[P]>
      : GetScalarType<T[P], AggregateLedgerIdempotency[P]>
  }




  export type LedgerIdempotencyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LedgerIdempotencyWhereInput
    orderBy?: LedgerIdempotencyOrderByWithAggregationInput | LedgerIdempotencyOrderByWithAggregationInput[]
    by: LedgerIdempotencyScalarFieldEnum[] | LedgerIdempotencyScalarFieldEnum
    having?: LedgerIdempotencyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LedgerIdempotencyCountAggregateInputType | true
    _min?: LedgerIdempotencyMinAggregateInputType
    _max?: LedgerIdempotencyMaxAggregateInputType
  }

  export type LedgerIdempotencyGroupByOutputType = {
    id: string
    idempotencyKey: string
    transactionId: string
    createdAt: Date
    _count: LedgerIdempotencyCountAggregateOutputType | null
    _min: LedgerIdempotencyMinAggregateOutputType | null
    _max: LedgerIdempotencyMaxAggregateOutputType | null
  }

  type GetLedgerIdempotencyGroupByPayload<T extends LedgerIdempotencyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LedgerIdempotencyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LedgerIdempotencyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LedgerIdempotencyGroupByOutputType[P]>
            : GetScalarType<T[P], LedgerIdempotencyGroupByOutputType[P]>
        }
      >
    >


  export type LedgerIdempotencySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idempotencyKey?: boolean
    transactionId?: boolean
    createdAt?: boolean
    transaction?: boolean | LedgerTransactionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ledgerIdempotency"]>

  export type LedgerIdempotencySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idempotencyKey?: boolean
    transactionId?: boolean
    createdAt?: boolean
    transaction?: boolean | LedgerTransactionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ledgerIdempotency"]>

  export type LedgerIdempotencySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idempotencyKey?: boolean
    transactionId?: boolean
    createdAt?: boolean
    transaction?: boolean | LedgerTransactionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ledgerIdempotency"]>

  export type LedgerIdempotencySelectScalar = {
    id?: boolean
    idempotencyKey?: boolean
    transactionId?: boolean
    createdAt?: boolean
  }

  export type LedgerIdempotencyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "idempotencyKey" | "transactionId" | "createdAt", ExtArgs["result"]["ledgerIdempotency"]>
  export type LedgerIdempotencyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transaction?: boolean | LedgerTransactionDefaultArgs<ExtArgs>
  }
  export type LedgerIdempotencyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transaction?: boolean | LedgerTransactionDefaultArgs<ExtArgs>
  }
  export type LedgerIdempotencyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transaction?: boolean | LedgerTransactionDefaultArgs<ExtArgs>
  }

  export type $LedgerIdempotencyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LedgerIdempotency"
    objects: {
      transaction: Prisma.$LedgerTransactionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      idempotencyKey: string
      transactionId: string
      createdAt: Date
    }, ExtArgs["result"]["ledgerIdempotency"]>
    composites: {}
  }

  type LedgerIdempotencyGetPayload<S extends boolean | null | undefined | LedgerIdempotencyDefaultArgs> = $Result.GetResult<Prisma.$LedgerIdempotencyPayload, S>

  type LedgerIdempotencyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LedgerIdempotencyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LedgerIdempotencyCountAggregateInputType | true
    }

  export interface LedgerIdempotencyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LedgerIdempotency'], meta: { name: 'LedgerIdempotency' } }
    /**
     * Find zero or one LedgerIdempotency that matches the filter.
     * @param {LedgerIdempotencyFindUniqueArgs} args - Arguments to find a LedgerIdempotency
     * @example
     * // Get one LedgerIdempotency
     * const ledgerIdempotency = await prisma.ledgerIdempotency.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LedgerIdempotencyFindUniqueArgs>(args: SelectSubset<T, LedgerIdempotencyFindUniqueArgs<ExtArgs>>): Prisma__LedgerIdempotencyClient<$Result.GetResult<Prisma.$LedgerIdempotencyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LedgerIdempotency that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LedgerIdempotencyFindUniqueOrThrowArgs} args - Arguments to find a LedgerIdempotency
     * @example
     * // Get one LedgerIdempotency
     * const ledgerIdempotency = await prisma.ledgerIdempotency.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LedgerIdempotencyFindUniqueOrThrowArgs>(args: SelectSubset<T, LedgerIdempotencyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LedgerIdempotencyClient<$Result.GetResult<Prisma.$LedgerIdempotencyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LedgerIdempotency that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerIdempotencyFindFirstArgs} args - Arguments to find a LedgerIdempotency
     * @example
     * // Get one LedgerIdempotency
     * const ledgerIdempotency = await prisma.ledgerIdempotency.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LedgerIdempotencyFindFirstArgs>(args?: SelectSubset<T, LedgerIdempotencyFindFirstArgs<ExtArgs>>): Prisma__LedgerIdempotencyClient<$Result.GetResult<Prisma.$LedgerIdempotencyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LedgerIdempotency that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerIdempotencyFindFirstOrThrowArgs} args - Arguments to find a LedgerIdempotency
     * @example
     * // Get one LedgerIdempotency
     * const ledgerIdempotency = await prisma.ledgerIdempotency.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LedgerIdempotencyFindFirstOrThrowArgs>(args?: SelectSubset<T, LedgerIdempotencyFindFirstOrThrowArgs<ExtArgs>>): Prisma__LedgerIdempotencyClient<$Result.GetResult<Prisma.$LedgerIdempotencyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LedgerIdempotencies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerIdempotencyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LedgerIdempotencies
     * const ledgerIdempotencies = await prisma.ledgerIdempotency.findMany()
     * 
     * // Get first 10 LedgerIdempotencies
     * const ledgerIdempotencies = await prisma.ledgerIdempotency.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ledgerIdempotencyWithIdOnly = await prisma.ledgerIdempotency.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LedgerIdempotencyFindManyArgs>(args?: SelectSubset<T, LedgerIdempotencyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LedgerIdempotencyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LedgerIdempotency.
     * @param {LedgerIdempotencyCreateArgs} args - Arguments to create a LedgerIdempotency.
     * @example
     * // Create one LedgerIdempotency
     * const LedgerIdempotency = await prisma.ledgerIdempotency.create({
     *   data: {
     *     // ... data to create a LedgerIdempotency
     *   }
     * })
     * 
     */
    create<T extends LedgerIdempotencyCreateArgs>(args: SelectSubset<T, LedgerIdempotencyCreateArgs<ExtArgs>>): Prisma__LedgerIdempotencyClient<$Result.GetResult<Prisma.$LedgerIdempotencyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LedgerIdempotencies.
     * @param {LedgerIdempotencyCreateManyArgs} args - Arguments to create many LedgerIdempotencies.
     * @example
     * // Create many LedgerIdempotencies
     * const ledgerIdempotency = await prisma.ledgerIdempotency.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LedgerIdempotencyCreateManyArgs>(args?: SelectSubset<T, LedgerIdempotencyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LedgerIdempotencies and returns the data saved in the database.
     * @param {LedgerIdempotencyCreateManyAndReturnArgs} args - Arguments to create many LedgerIdempotencies.
     * @example
     * // Create many LedgerIdempotencies
     * const ledgerIdempotency = await prisma.ledgerIdempotency.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LedgerIdempotencies and only return the `id`
     * const ledgerIdempotencyWithIdOnly = await prisma.ledgerIdempotency.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LedgerIdempotencyCreateManyAndReturnArgs>(args?: SelectSubset<T, LedgerIdempotencyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LedgerIdempotencyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LedgerIdempotency.
     * @param {LedgerIdempotencyDeleteArgs} args - Arguments to delete one LedgerIdempotency.
     * @example
     * // Delete one LedgerIdempotency
     * const LedgerIdempotency = await prisma.ledgerIdempotency.delete({
     *   where: {
     *     // ... filter to delete one LedgerIdempotency
     *   }
     * })
     * 
     */
    delete<T extends LedgerIdempotencyDeleteArgs>(args: SelectSubset<T, LedgerIdempotencyDeleteArgs<ExtArgs>>): Prisma__LedgerIdempotencyClient<$Result.GetResult<Prisma.$LedgerIdempotencyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LedgerIdempotency.
     * @param {LedgerIdempotencyUpdateArgs} args - Arguments to update one LedgerIdempotency.
     * @example
     * // Update one LedgerIdempotency
     * const ledgerIdempotency = await prisma.ledgerIdempotency.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LedgerIdempotencyUpdateArgs>(args: SelectSubset<T, LedgerIdempotencyUpdateArgs<ExtArgs>>): Prisma__LedgerIdempotencyClient<$Result.GetResult<Prisma.$LedgerIdempotencyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LedgerIdempotencies.
     * @param {LedgerIdempotencyDeleteManyArgs} args - Arguments to filter LedgerIdempotencies to delete.
     * @example
     * // Delete a few LedgerIdempotencies
     * const { count } = await prisma.ledgerIdempotency.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LedgerIdempotencyDeleteManyArgs>(args?: SelectSubset<T, LedgerIdempotencyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LedgerIdempotencies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerIdempotencyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LedgerIdempotencies
     * const ledgerIdempotency = await prisma.ledgerIdempotency.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LedgerIdempotencyUpdateManyArgs>(args: SelectSubset<T, LedgerIdempotencyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LedgerIdempotencies and returns the data updated in the database.
     * @param {LedgerIdempotencyUpdateManyAndReturnArgs} args - Arguments to update many LedgerIdempotencies.
     * @example
     * // Update many LedgerIdempotencies
     * const ledgerIdempotency = await prisma.ledgerIdempotency.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LedgerIdempotencies and only return the `id`
     * const ledgerIdempotencyWithIdOnly = await prisma.ledgerIdempotency.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LedgerIdempotencyUpdateManyAndReturnArgs>(args: SelectSubset<T, LedgerIdempotencyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LedgerIdempotencyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LedgerIdempotency.
     * @param {LedgerIdempotencyUpsertArgs} args - Arguments to update or create a LedgerIdempotency.
     * @example
     * // Update or create a LedgerIdempotency
     * const ledgerIdempotency = await prisma.ledgerIdempotency.upsert({
     *   create: {
     *     // ... data to create a LedgerIdempotency
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LedgerIdempotency we want to update
     *   }
     * })
     */
    upsert<T extends LedgerIdempotencyUpsertArgs>(args: SelectSubset<T, LedgerIdempotencyUpsertArgs<ExtArgs>>): Prisma__LedgerIdempotencyClient<$Result.GetResult<Prisma.$LedgerIdempotencyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LedgerIdempotencies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerIdempotencyCountArgs} args - Arguments to filter LedgerIdempotencies to count.
     * @example
     * // Count the number of LedgerIdempotencies
     * const count = await prisma.ledgerIdempotency.count({
     *   where: {
     *     // ... the filter for the LedgerIdempotencies we want to count
     *   }
     * })
    **/
    count<T extends LedgerIdempotencyCountArgs>(
      args?: Subset<T, LedgerIdempotencyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LedgerIdempotencyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LedgerIdempotency.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerIdempotencyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LedgerIdempotencyAggregateArgs>(args: Subset<T, LedgerIdempotencyAggregateArgs>): Prisma.PrismaPromise<GetLedgerIdempotencyAggregateType<T>>

    /**
     * Group by LedgerIdempotency.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerIdempotencyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LedgerIdempotencyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LedgerIdempotencyGroupByArgs['orderBy'] }
        : { orderBy?: LedgerIdempotencyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LedgerIdempotencyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLedgerIdempotencyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LedgerIdempotency model
   */
  readonly fields: LedgerIdempotencyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LedgerIdempotency.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LedgerIdempotencyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    transaction<T extends LedgerTransactionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LedgerTransactionDefaultArgs<ExtArgs>>): Prisma__LedgerTransactionClient<$Result.GetResult<Prisma.$LedgerTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LedgerIdempotency model
   */
  interface LedgerIdempotencyFieldRefs {
    readonly id: FieldRef<"LedgerIdempotency", 'String'>
    readonly idempotencyKey: FieldRef<"LedgerIdempotency", 'String'>
    readonly transactionId: FieldRef<"LedgerIdempotency", 'String'>
    readonly createdAt: FieldRef<"LedgerIdempotency", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LedgerIdempotency findUnique
   */
  export type LedgerIdempotencyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerIdempotency
     */
    select?: LedgerIdempotencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerIdempotency
     */
    omit?: LedgerIdempotencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerIdempotencyInclude<ExtArgs> | null
    /**
     * Filter, which LedgerIdempotency to fetch.
     */
    where: LedgerIdempotencyWhereUniqueInput
  }

  /**
   * LedgerIdempotency findUniqueOrThrow
   */
  export type LedgerIdempotencyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerIdempotency
     */
    select?: LedgerIdempotencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerIdempotency
     */
    omit?: LedgerIdempotencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerIdempotencyInclude<ExtArgs> | null
    /**
     * Filter, which LedgerIdempotency to fetch.
     */
    where: LedgerIdempotencyWhereUniqueInput
  }

  /**
   * LedgerIdempotency findFirst
   */
  export type LedgerIdempotencyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerIdempotency
     */
    select?: LedgerIdempotencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerIdempotency
     */
    omit?: LedgerIdempotencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerIdempotencyInclude<ExtArgs> | null
    /**
     * Filter, which LedgerIdempotency to fetch.
     */
    where?: LedgerIdempotencyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LedgerIdempotencies to fetch.
     */
    orderBy?: LedgerIdempotencyOrderByWithRelationInput | LedgerIdempotencyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LedgerIdempotencies.
     */
    cursor?: LedgerIdempotencyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LedgerIdempotencies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LedgerIdempotencies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LedgerIdempotencies.
     */
    distinct?: LedgerIdempotencyScalarFieldEnum | LedgerIdempotencyScalarFieldEnum[]
  }

  /**
   * LedgerIdempotency findFirstOrThrow
   */
  export type LedgerIdempotencyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerIdempotency
     */
    select?: LedgerIdempotencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerIdempotency
     */
    omit?: LedgerIdempotencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerIdempotencyInclude<ExtArgs> | null
    /**
     * Filter, which LedgerIdempotency to fetch.
     */
    where?: LedgerIdempotencyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LedgerIdempotencies to fetch.
     */
    orderBy?: LedgerIdempotencyOrderByWithRelationInput | LedgerIdempotencyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LedgerIdempotencies.
     */
    cursor?: LedgerIdempotencyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LedgerIdempotencies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LedgerIdempotencies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LedgerIdempotencies.
     */
    distinct?: LedgerIdempotencyScalarFieldEnum | LedgerIdempotencyScalarFieldEnum[]
  }

  /**
   * LedgerIdempotency findMany
   */
  export type LedgerIdempotencyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerIdempotency
     */
    select?: LedgerIdempotencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerIdempotency
     */
    omit?: LedgerIdempotencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerIdempotencyInclude<ExtArgs> | null
    /**
     * Filter, which LedgerIdempotencies to fetch.
     */
    where?: LedgerIdempotencyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LedgerIdempotencies to fetch.
     */
    orderBy?: LedgerIdempotencyOrderByWithRelationInput | LedgerIdempotencyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LedgerIdempotencies.
     */
    cursor?: LedgerIdempotencyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LedgerIdempotencies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LedgerIdempotencies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LedgerIdempotencies.
     */
    distinct?: LedgerIdempotencyScalarFieldEnum | LedgerIdempotencyScalarFieldEnum[]
  }

  /**
   * LedgerIdempotency create
   */
  export type LedgerIdempotencyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerIdempotency
     */
    select?: LedgerIdempotencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerIdempotency
     */
    omit?: LedgerIdempotencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerIdempotencyInclude<ExtArgs> | null
    /**
     * The data needed to create a LedgerIdempotency.
     */
    data: XOR<LedgerIdempotencyCreateInput, LedgerIdempotencyUncheckedCreateInput>
  }

  /**
   * LedgerIdempotency createMany
   */
  export type LedgerIdempotencyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LedgerIdempotencies.
     */
    data: LedgerIdempotencyCreateManyInput | LedgerIdempotencyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LedgerIdempotency createManyAndReturn
   */
  export type LedgerIdempotencyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerIdempotency
     */
    select?: LedgerIdempotencySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerIdempotency
     */
    omit?: LedgerIdempotencyOmit<ExtArgs> | null
    /**
     * The data used to create many LedgerIdempotencies.
     */
    data: LedgerIdempotencyCreateManyInput | LedgerIdempotencyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerIdempotencyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LedgerIdempotency update
   */
  export type LedgerIdempotencyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerIdempotency
     */
    select?: LedgerIdempotencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerIdempotency
     */
    omit?: LedgerIdempotencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerIdempotencyInclude<ExtArgs> | null
    /**
     * The data needed to update a LedgerIdempotency.
     */
    data: XOR<LedgerIdempotencyUpdateInput, LedgerIdempotencyUncheckedUpdateInput>
    /**
     * Choose, which LedgerIdempotency to update.
     */
    where: LedgerIdempotencyWhereUniqueInput
  }

  /**
   * LedgerIdempotency updateMany
   */
  export type LedgerIdempotencyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LedgerIdempotencies.
     */
    data: XOR<LedgerIdempotencyUpdateManyMutationInput, LedgerIdempotencyUncheckedUpdateManyInput>
    /**
     * Filter which LedgerIdempotencies to update
     */
    where?: LedgerIdempotencyWhereInput
    /**
     * Limit how many LedgerIdempotencies to update.
     */
    limit?: number
  }

  /**
   * LedgerIdempotency updateManyAndReturn
   */
  export type LedgerIdempotencyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerIdempotency
     */
    select?: LedgerIdempotencySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerIdempotency
     */
    omit?: LedgerIdempotencyOmit<ExtArgs> | null
    /**
     * The data used to update LedgerIdempotencies.
     */
    data: XOR<LedgerIdempotencyUpdateManyMutationInput, LedgerIdempotencyUncheckedUpdateManyInput>
    /**
     * Filter which LedgerIdempotencies to update
     */
    where?: LedgerIdempotencyWhereInput
    /**
     * Limit how many LedgerIdempotencies to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerIdempotencyIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LedgerIdempotency upsert
   */
  export type LedgerIdempotencyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerIdempotency
     */
    select?: LedgerIdempotencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerIdempotency
     */
    omit?: LedgerIdempotencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerIdempotencyInclude<ExtArgs> | null
    /**
     * The filter to search for the LedgerIdempotency to update in case it exists.
     */
    where: LedgerIdempotencyWhereUniqueInput
    /**
     * In case the LedgerIdempotency found by the `where` argument doesn't exist, create a new LedgerIdempotency with this data.
     */
    create: XOR<LedgerIdempotencyCreateInput, LedgerIdempotencyUncheckedCreateInput>
    /**
     * In case the LedgerIdempotency was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LedgerIdempotencyUpdateInput, LedgerIdempotencyUncheckedUpdateInput>
  }

  /**
   * LedgerIdempotency delete
   */
  export type LedgerIdempotencyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerIdempotency
     */
    select?: LedgerIdempotencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerIdempotency
     */
    omit?: LedgerIdempotencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerIdempotencyInclude<ExtArgs> | null
    /**
     * Filter which LedgerIdempotency to delete.
     */
    where: LedgerIdempotencyWhereUniqueInput
  }

  /**
   * LedgerIdempotency deleteMany
   */
  export type LedgerIdempotencyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LedgerIdempotencies to delete
     */
    where?: LedgerIdempotencyWhereInput
    /**
     * Limit how many LedgerIdempotencies to delete.
     */
    limit?: number
  }

  /**
   * LedgerIdempotency without action
   */
  export type LedgerIdempotencyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerIdempotency
     */
    select?: LedgerIdempotencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LedgerIdempotency
     */
    omit?: LedgerIdempotencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerIdempotencyInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const LeadScalarFieldEnum: {
    id: 'id',
    phoneNumber: 'phoneNumber',
    email: 'email',
    intent: 'intent',
    status: 'status',
    leadScore: 'leadScore',
    tier: 'tier',
    lastMessage: 'lastMessage',
    nextFollowUpAt: 'nextFollowUpAt',
    metadata: 'metadata',
    termsAccepted: 'termsAccepted',
    miniAuditData: 'miniAuditData',
    paymentRef: 'paymentRef',
    demoApproved: 'demoApproved',
    demoScheduled: 'demoScheduled',
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
  };

  export type LeadScalarFieldEnum = (typeof LeadScalarFieldEnum)[keyof typeof LeadScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    role: 'role',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const TokenizedAssetScalarFieldEnum: {
    id: 'id',
    assetType: 'assetType',
    name: 'name',
    location: 'location',
    totalShares: 'totalShares',
    availableShares: 'availableShares',
    pricePerShare: 'pricePerShare',
    currency: 'currency',
    metadata: 'metadata',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TokenizedAssetScalarFieldEnum = (typeof TokenizedAssetScalarFieldEnum)[keyof typeof TokenizedAssetScalarFieldEnum]


  export const TokenHolderScalarFieldEnum: {
    id: 'id',
    tokenizedAssetId: 'tokenizedAssetId',
    leadId: 'leadId',
    shares: 'shares',
    purchasePrice: 'purchasePrice',
    totalPaid: 'totalPaid',
    transactionId: 'transactionId',
    purchasedAt: 'purchasedAt'
  };

  export type TokenHolderScalarFieldEnum = (typeof TokenHolderScalarFieldEnum)[keyof typeof TokenHolderScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
    id: 'id',
    amount: 'amount',
    status: 'status',
    reference: 'reference',
    leadId: 'leadId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const DemoScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    leadId: 'leadId',
    config: 'config',
    approved: 'approved',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DemoScalarFieldEnum = (typeof DemoScalarFieldEnum)[keyof typeof DemoScalarFieldEnum]


  export const SystemEventScalarFieldEnum: {
    id: 'id',
    type: 'type',
    message: 'message',
    digest: 'digest',
    metadata: 'metadata',
    createdAt: 'createdAt'
  };

  export type SystemEventScalarFieldEnum = (typeof SystemEventScalarFieldEnum)[keyof typeof SystemEventScalarFieldEnum]


  export const SniperTargetScalarFieldEnum: {
    id: 'id',
    source: 'source',
    domain: 'domain',
    companyName: 'companyName',
    firstName: 'firstName',
    email: 'email',
    linkedinUrl: 'linkedinUrl',
    signal: 'signal',
    status: 'status',
    generatedDraft: 'generatedDraft',
    draftEmail: 'draftEmail',
    sentAt: 'sentAt',
    lastAttemptAt: 'lastAttemptAt',
    attemptCount: 'attemptCount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SniperTargetScalarFieldEnum = (typeof SniperTargetScalarFieldEnum)[keyof typeof SniperTargetScalarFieldEnum]


  export const EmailEventScalarFieldEnum: {
    id: 'id',
    leadId: 'leadId',
    type: 'type',
    metadata: 'metadata',
    createdAt: 'createdAt'
  };

  export type EmailEventScalarFieldEnum = (typeof EmailEventScalarFieldEnum)[keyof typeof EmailEventScalarFieldEnum]


  export const KnowledgeEmbeddingScalarFieldEnum: {
    id: 'id',
    source: 'source',
    url: 'url',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    chunkId: 'chunkId',
    text: 'text',
    type: 'type',
    metadata: 'metadata'
  };

  export type KnowledgeEmbeddingScalarFieldEnum = (typeof KnowledgeEmbeddingScalarFieldEnum)[keyof typeof KnowledgeEmbeddingScalarFieldEnum]


  export const EmbeddingScalarFieldEnum: {
    id: 'id',
    content: 'content',
    embedding: 'embedding',
    source: 'source',
    type: 'type',
    createdAt: 'createdAt'
  };

  export type EmbeddingScalarFieldEnum = (typeof EmbeddingScalarFieldEnum)[keyof typeof EmbeddingScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    currency: 'currency',
    createdAt: 'createdAt'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const LedgerTransactionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    reference: 'reference',
    description: 'description',
    state: 'state',
    idempotencyKey: 'idempotencyKey',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    postedAt: 'postedAt'
  };

  export type LedgerTransactionScalarFieldEnum = (typeof LedgerTransactionScalarFieldEnum)[keyof typeof LedgerTransactionScalarFieldEnum]


  export const EntryScalarFieldEnum: {
    id: 'id',
    transactionId: 'transactionId',
    accountId: 'accountId',
    debit: 'debit',
    credit: 'credit',
    currency: 'currency',
    description: 'description',
    createdAt: 'createdAt'
  };

  export type EntryScalarFieldEnum = (typeof EntryScalarFieldEnum)[keyof typeof EntryScalarFieldEnum]


  export const LedgerIdempotencyScalarFieldEnum: {
    id: 'id',
    idempotencyKey: 'idempotencyKey',
    transactionId: 'transactionId',
    createdAt: 'createdAt'
  };

  export type LedgerIdempotencyScalarFieldEnum = (typeof LedgerIdempotencyScalarFieldEnum)[keyof typeof LedgerIdempotencyScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    
  /**
   * Deep Input Types
   */


  export type LeadWhereInput = {
    AND?: LeadWhereInput | LeadWhereInput[]
    OR?: LeadWhereInput[]
    NOT?: LeadWhereInput | LeadWhereInput[]
    id?: StringFilter<"Lead"> | string
    phoneNumber?: StringNullableFilter<"Lead"> | string | null
    email?: StringNullableFilter<"Lead"> | string | null
    intent?: StringNullableFilter<"Lead"> | string | null
    status?: StringFilter<"Lead"> | string
    leadScore?: IntNullableFilter<"Lead"> | number | null
    tier?: StringNullableFilter<"Lead"> | string | null
    lastMessage?: StringNullableFilter<"Lead"> | string | null
    nextFollowUpAt?: DateTimeNullableFilter<"Lead"> | Date | string | null
    metadata?: JsonNullableFilter<"Lead">
    termsAccepted?: BoolFilter<"Lead"> | boolean
    miniAuditData?: JsonNullableFilter<"Lead">
    paymentRef?: StringNullableFilter<"Lead"> | string | null
    demoApproved?: BoolFilter<"Lead"> | boolean
    demoScheduled?: BoolFilter<"Lead"> | boolean
    updatedAt?: DateTimeFilter<"Lead"> | Date | string
    createdAt?: DateTimeFilter<"Lead"> | Date | string
    demo?: XOR<DemoNullableScalarRelationFilter, DemoWhereInput> | null
    emailEvents?: EmailEventListRelationFilter
    payments?: PaymentListRelationFilter
  }

  export type LeadOrderByWithRelationInput = {
    id?: SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    intent?: SortOrderInput | SortOrder
    status?: SortOrder
    leadScore?: SortOrderInput | SortOrder
    tier?: SortOrderInput | SortOrder
    lastMessage?: SortOrderInput | SortOrder
    nextFollowUpAt?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    termsAccepted?: SortOrder
    miniAuditData?: SortOrderInput | SortOrder
    paymentRef?: SortOrderInput | SortOrder
    demoApproved?: SortOrder
    demoScheduled?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
    demo?: DemoOrderByWithRelationInput
    emailEvents?: EmailEventOrderByRelationAggregateInput
    payments?: PaymentOrderByRelationAggregateInput
  }

  export type LeadWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    phoneNumber?: string
    email?: string
    AND?: LeadWhereInput | LeadWhereInput[]
    OR?: LeadWhereInput[]
    NOT?: LeadWhereInput | LeadWhereInput[]
    intent?: StringNullableFilter<"Lead"> | string | null
    status?: StringFilter<"Lead"> | string
    leadScore?: IntNullableFilter<"Lead"> | number | null
    tier?: StringNullableFilter<"Lead"> | string | null
    lastMessage?: StringNullableFilter<"Lead"> | string | null
    nextFollowUpAt?: DateTimeNullableFilter<"Lead"> | Date | string | null
    metadata?: JsonNullableFilter<"Lead">
    termsAccepted?: BoolFilter<"Lead"> | boolean
    miniAuditData?: JsonNullableFilter<"Lead">
    paymentRef?: StringNullableFilter<"Lead"> | string | null
    demoApproved?: BoolFilter<"Lead"> | boolean
    demoScheduled?: BoolFilter<"Lead"> | boolean
    updatedAt?: DateTimeFilter<"Lead"> | Date | string
    createdAt?: DateTimeFilter<"Lead"> | Date | string
    demo?: XOR<DemoNullableScalarRelationFilter, DemoWhereInput> | null
    emailEvents?: EmailEventListRelationFilter
    payments?: PaymentListRelationFilter
  }, "id" | "phoneNumber" | "email">

  export type LeadOrderByWithAggregationInput = {
    id?: SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    intent?: SortOrderInput | SortOrder
    status?: SortOrder
    leadScore?: SortOrderInput | SortOrder
    tier?: SortOrderInput | SortOrder
    lastMessage?: SortOrderInput | SortOrder
    nextFollowUpAt?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    termsAccepted?: SortOrder
    miniAuditData?: SortOrderInput | SortOrder
    paymentRef?: SortOrderInput | SortOrder
    demoApproved?: SortOrder
    demoScheduled?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
    _count?: LeadCountOrderByAggregateInput
    _avg?: LeadAvgOrderByAggregateInput
    _max?: LeadMaxOrderByAggregateInput
    _min?: LeadMinOrderByAggregateInput
    _sum?: LeadSumOrderByAggregateInput
  }

  export type LeadScalarWhereWithAggregatesInput = {
    AND?: LeadScalarWhereWithAggregatesInput | LeadScalarWhereWithAggregatesInput[]
    OR?: LeadScalarWhereWithAggregatesInput[]
    NOT?: LeadScalarWhereWithAggregatesInput | LeadScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Lead"> | string
    phoneNumber?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    email?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    intent?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    status?: StringWithAggregatesFilter<"Lead"> | string
    leadScore?: IntNullableWithAggregatesFilter<"Lead"> | number | null
    tier?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    lastMessage?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    nextFollowUpAt?: DateTimeNullableWithAggregatesFilter<"Lead"> | Date | string | null
    metadata?: JsonNullableWithAggregatesFilter<"Lead">
    termsAccepted?: BoolWithAggregatesFilter<"Lead"> | boolean
    miniAuditData?: JsonNullableWithAggregatesFilter<"Lead">
    paymentRef?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    demoApproved?: BoolWithAggregatesFilter<"Lead"> | boolean
    demoScheduled?: BoolWithAggregatesFilter<"Lead"> | boolean
    updatedAt?: DateTimeWithAggregatesFilter<"Lead"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Lead"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    role?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type TokenizedAssetWhereInput = {
    AND?: TokenizedAssetWhereInput | TokenizedAssetWhereInput[]
    OR?: TokenizedAssetWhereInput[]
    NOT?: TokenizedAssetWhereInput | TokenizedAssetWhereInput[]
    id?: StringFilter<"TokenizedAsset"> | string
    assetType?: StringFilter<"TokenizedAsset"> | string
    name?: StringFilter<"TokenizedAsset"> | string
    location?: StringNullableFilter<"TokenizedAsset"> | string | null
    totalShares?: IntFilter<"TokenizedAsset"> | number
    availableShares?: IntFilter<"TokenizedAsset"> | number
    pricePerShare?: DecimalFilter<"TokenizedAsset"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"TokenizedAsset"> | string
    metadata?: JsonNullableFilter<"TokenizedAsset">
    status?: StringFilter<"TokenizedAsset"> | string
    createdAt?: DateTimeFilter<"TokenizedAsset"> | Date | string
    updatedAt?: DateTimeFilter<"TokenizedAsset"> | Date | string
    tokenHolders?: TokenHolderListRelationFilter
  }

  export type TokenizedAssetOrderByWithRelationInput = {
    id?: SortOrder
    assetType?: SortOrder
    name?: SortOrder
    location?: SortOrderInput | SortOrder
    totalShares?: SortOrder
    availableShares?: SortOrder
    pricePerShare?: SortOrder
    currency?: SortOrder
    metadata?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tokenHolders?: TokenHolderOrderByRelationAggregateInput
  }

  export type TokenizedAssetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TokenizedAssetWhereInput | TokenizedAssetWhereInput[]
    OR?: TokenizedAssetWhereInput[]
    NOT?: TokenizedAssetWhereInput | TokenizedAssetWhereInput[]
    assetType?: StringFilter<"TokenizedAsset"> | string
    name?: StringFilter<"TokenizedAsset"> | string
    location?: StringNullableFilter<"TokenizedAsset"> | string | null
    totalShares?: IntFilter<"TokenizedAsset"> | number
    availableShares?: IntFilter<"TokenizedAsset"> | number
    pricePerShare?: DecimalFilter<"TokenizedAsset"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"TokenizedAsset"> | string
    metadata?: JsonNullableFilter<"TokenizedAsset">
    status?: StringFilter<"TokenizedAsset"> | string
    createdAt?: DateTimeFilter<"TokenizedAsset"> | Date | string
    updatedAt?: DateTimeFilter<"TokenizedAsset"> | Date | string
    tokenHolders?: TokenHolderListRelationFilter
  }, "id">

  export type TokenizedAssetOrderByWithAggregationInput = {
    id?: SortOrder
    assetType?: SortOrder
    name?: SortOrder
    location?: SortOrderInput | SortOrder
    totalShares?: SortOrder
    availableShares?: SortOrder
    pricePerShare?: SortOrder
    currency?: SortOrder
    metadata?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TokenizedAssetCountOrderByAggregateInput
    _avg?: TokenizedAssetAvgOrderByAggregateInput
    _max?: TokenizedAssetMaxOrderByAggregateInput
    _min?: TokenizedAssetMinOrderByAggregateInput
    _sum?: TokenizedAssetSumOrderByAggregateInput
  }

  export type TokenizedAssetScalarWhereWithAggregatesInput = {
    AND?: TokenizedAssetScalarWhereWithAggregatesInput | TokenizedAssetScalarWhereWithAggregatesInput[]
    OR?: TokenizedAssetScalarWhereWithAggregatesInput[]
    NOT?: TokenizedAssetScalarWhereWithAggregatesInput | TokenizedAssetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TokenizedAsset"> | string
    assetType?: StringWithAggregatesFilter<"TokenizedAsset"> | string
    name?: StringWithAggregatesFilter<"TokenizedAsset"> | string
    location?: StringNullableWithAggregatesFilter<"TokenizedAsset"> | string | null
    totalShares?: IntWithAggregatesFilter<"TokenizedAsset"> | number
    availableShares?: IntWithAggregatesFilter<"TokenizedAsset"> | number
    pricePerShare?: DecimalWithAggregatesFilter<"TokenizedAsset"> | Decimal | DecimalJsLike | number | string
    currency?: StringWithAggregatesFilter<"TokenizedAsset"> | string
    metadata?: JsonNullableWithAggregatesFilter<"TokenizedAsset">
    status?: StringWithAggregatesFilter<"TokenizedAsset"> | string
    createdAt?: DateTimeWithAggregatesFilter<"TokenizedAsset"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TokenizedAsset"> | Date | string
  }

  export type TokenHolderWhereInput = {
    AND?: TokenHolderWhereInput | TokenHolderWhereInput[]
    OR?: TokenHolderWhereInput[]
    NOT?: TokenHolderWhereInput | TokenHolderWhereInput[]
    id?: StringFilter<"TokenHolder"> | string
    tokenizedAssetId?: StringFilter<"TokenHolder"> | string
    leadId?: StringNullableFilter<"TokenHolder"> | string | null
    shares?: IntFilter<"TokenHolder"> | number
    purchasePrice?: DecimalFilter<"TokenHolder"> | Decimal | DecimalJsLike | number | string
    totalPaid?: DecimalFilter<"TokenHolder"> | Decimal | DecimalJsLike | number | string
    transactionId?: StringNullableFilter<"TokenHolder"> | string | null
    purchasedAt?: DateTimeFilter<"TokenHolder"> | Date | string
    tokenizedAsset?: XOR<TokenizedAssetScalarRelationFilter, TokenizedAssetWhereInput>
  }

  export type TokenHolderOrderByWithRelationInput = {
    id?: SortOrder
    tokenizedAssetId?: SortOrder
    leadId?: SortOrderInput | SortOrder
    shares?: SortOrder
    purchasePrice?: SortOrder
    totalPaid?: SortOrder
    transactionId?: SortOrderInput | SortOrder
    purchasedAt?: SortOrder
    tokenizedAsset?: TokenizedAssetOrderByWithRelationInput
  }

  export type TokenHolderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TokenHolderWhereInput | TokenHolderWhereInput[]
    OR?: TokenHolderWhereInput[]
    NOT?: TokenHolderWhereInput | TokenHolderWhereInput[]
    tokenizedAssetId?: StringFilter<"TokenHolder"> | string
    leadId?: StringNullableFilter<"TokenHolder"> | string | null
    shares?: IntFilter<"TokenHolder"> | number
    purchasePrice?: DecimalFilter<"TokenHolder"> | Decimal | DecimalJsLike | number | string
    totalPaid?: DecimalFilter<"TokenHolder"> | Decimal | DecimalJsLike | number | string
    transactionId?: StringNullableFilter<"TokenHolder"> | string | null
    purchasedAt?: DateTimeFilter<"TokenHolder"> | Date | string
    tokenizedAsset?: XOR<TokenizedAssetScalarRelationFilter, TokenizedAssetWhereInput>
  }, "id">

  export type TokenHolderOrderByWithAggregationInput = {
    id?: SortOrder
    tokenizedAssetId?: SortOrder
    leadId?: SortOrderInput | SortOrder
    shares?: SortOrder
    purchasePrice?: SortOrder
    totalPaid?: SortOrder
    transactionId?: SortOrderInput | SortOrder
    purchasedAt?: SortOrder
    _count?: TokenHolderCountOrderByAggregateInput
    _avg?: TokenHolderAvgOrderByAggregateInput
    _max?: TokenHolderMaxOrderByAggregateInput
    _min?: TokenHolderMinOrderByAggregateInput
    _sum?: TokenHolderSumOrderByAggregateInput
  }

  export type TokenHolderScalarWhereWithAggregatesInput = {
    AND?: TokenHolderScalarWhereWithAggregatesInput | TokenHolderScalarWhereWithAggregatesInput[]
    OR?: TokenHolderScalarWhereWithAggregatesInput[]
    NOT?: TokenHolderScalarWhereWithAggregatesInput | TokenHolderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TokenHolder"> | string
    tokenizedAssetId?: StringWithAggregatesFilter<"TokenHolder"> | string
    leadId?: StringNullableWithAggregatesFilter<"TokenHolder"> | string | null
    shares?: IntWithAggregatesFilter<"TokenHolder"> | number
    purchasePrice?: DecimalWithAggregatesFilter<"TokenHolder"> | Decimal | DecimalJsLike | number | string
    totalPaid?: DecimalWithAggregatesFilter<"TokenHolder"> | Decimal | DecimalJsLike | number | string
    transactionId?: StringNullableWithAggregatesFilter<"TokenHolder"> | string | null
    purchasedAt?: DateTimeWithAggregatesFilter<"TokenHolder"> | Date | string
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    id?: StringFilter<"Payment"> | string
    amount?: IntFilter<"Payment"> | number
    status?: StringFilter<"Payment"> | string
    reference?: StringFilter<"Payment"> | string
    leadId?: StringFilter<"Payment"> | string
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    lead?: XOR<LeadScalarRelationFilter, LeadWhereInput>
  }

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    reference?: SortOrder
    leadId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lead?: LeadOrderByWithRelationInput
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    reference?: string
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    amount?: IntFilter<"Payment"> | number
    status?: StringFilter<"Payment"> | string
    leadId?: StringFilter<"Payment"> | string
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    lead?: XOR<LeadScalarRelationFilter, LeadWhereInput>
  }, "id" | "reference">

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    reference?: SortOrder
    leadId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    OR?: PaymentScalarWhereWithAggregatesInput[]
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Payment"> | string
    amount?: IntWithAggregatesFilter<"Payment"> | number
    status?: StringWithAggregatesFilter<"Payment"> | string
    reference?: StringWithAggregatesFilter<"Payment"> | string
    leadId?: StringWithAggregatesFilter<"Payment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
  }

  export type DemoWhereInput = {
    AND?: DemoWhereInput | DemoWhereInput[]
    OR?: DemoWhereInput[]
    NOT?: DemoWhereInput | DemoWhereInput[]
    id?: StringFilter<"Demo"> | string
    slug?: StringFilter<"Demo"> | string
    leadId?: StringFilter<"Demo"> | string
    config?: JsonNullableFilter<"Demo">
    approved?: BoolFilter<"Demo"> | boolean
    createdAt?: DateTimeFilter<"Demo"> | Date | string
    updatedAt?: DateTimeFilter<"Demo"> | Date | string
    lead?: XOR<LeadScalarRelationFilter, LeadWhereInput>
  }

  export type DemoOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    leadId?: SortOrder
    config?: SortOrderInput | SortOrder
    approved?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lead?: LeadOrderByWithRelationInput
  }

  export type DemoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    leadId?: string
    AND?: DemoWhereInput | DemoWhereInput[]
    OR?: DemoWhereInput[]
    NOT?: DemoWhereInput | DemoWhereInput[]
    config?: JsonNullableFilter<"Demo">
    approved?: BoolFilter<"Demo"> | boolean
    createdAt?: DateTimeFilter<"Demo"> | Date | string
    updatedAt?: DateTimeFilter<"Demo"> | Date | string
    lead?: XOR<LeadScalarRelationFilter, LeadWhereInput>
  }, "id" | "slug" | "leadId">

  export type DemoOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    leadId?: SortOrder
    config?: SortOrderInput | SortOrder
    approved?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DemoCountOrderByAggregateInput
    _max?: DemoMaxOrderByAggregateInput
    _min?: DemoMinOrderByAggregateInput
  }

  export type DemoScalarWhereWithAggregatesInput = {
    AND?: DemoScalarWhereWithAggregatesInput | DemoScalarWhereWithAggregatesInput[]
    OR?: DemoScalarWhereWithAggregatesInput[]
    NOT?: DemoScalarWhereWithAggregatesInput | DemoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Demo"> | string
    slug?: StringWithAggregatesFilter<"Demo"> | string
    leadId?: StringWithAggregatesFilter<"Demo"> | string
    config?: JsonNullableWithAggregatesFilter<"Demo">
    approved?: BoolWithAggregatesFilter<"Demo"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Demo"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Demo"> | Date | string
  }

  export type SystemEventWhereInput = {
    AND?: SystemEventWhereInput | SystemEventWhereInput[]
    OR?: SystemEventWhereInput[]
    NOT?: SystemEventWhereInput | SystemEventWhereInput[]
    id?: StringFilter<"SystemEvent"> | string
    type?: StringFilter<"SystemEvent"> | string
    message?: StringFilter<"SystemEvent"> | string
    digest?: StringNullableFilter<"SystemEvent"> | string | null
    metadata?: JsonNullableFilter<"SystemEvent">
    createdAt?: DateTimeFilter<"SystemEvent"> | Date | string
  }

  export type SystemEventOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    message?: SortOrder
    digest?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type SystemEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SystemEventWhereInput | SystemEventWhereInput[]
    OR?: SystemEventWhereInput[]
    NOT?: SystemEventWhereInput | SystemEventWhereInput[]
    type?: StringFilter<"SystemEvent"> | string
    message?: StringFilter<"SystemEvent"> | string
    digest?: StringNullableFilter<"SystemEvent"> | string | null
    metadata?: JsonNullableFilter<"SystemEvent">
    createdAt?: DateTimeFilter<"SystemEvent"> | Date | string
  }, "id">

  export type SystemEventOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    message?: SortOrder
    digest?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SystemEventCountOrderByAggregateInput
    _max?: SystemEventMaxOrderByAggregateInput
    _min?: SystemEventMinOrderByAggregateInput
  }

  export type SystemEventScalarWhereWithAggregatesInput = {
    AND?: SystemEventScalarWhereWithAggregatesInput | SystemEventScalarWhereWithAggregatesInput[]
    OR?: SystemEventScalarWhereWithAggregatesInput[]
    NOT?: SystemEventScalarWhereWithAggregatesInput | SystemEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SystemEvent"> | string
    type?: StringWithAggregatesFilter<"SystemEvent"> | string
    message?: StringWithAggregatesFilter<"SystemEvent"> | string
    digest?: StringNullableWithAggregatesFilter<"SystemEvent"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"SystemEvent">
    createdAt?: DateTimeWithAggregatesFilter<"SystemEvent"> | Date | string
  }

  export type SniperTargetWhereInput = {
    AND?: SniperTargetWhereInput | SniperTargetWhereInput[]
    OR?: SniperTargetWhereInput[]
    NOT?: SniperTargetWhereInput | SniperTargetWhereInput[]
    id?: StringFilter<"SniperTarget"> | string
    source?: StringFilter<"SniperTarget"> | string
    domain?: StringFilter<"SniperTarget"> | string
    companyName?: StringFilter<"SniperTarget"> | string
    firstName?: StringNullableFilter<"SniperTarget"> | string | null
    email?: StringNullableFilter<"SniperTarget"> | string | null
    linkedinUrl?: StringNullableFilter<"SniperTarget"> | string | null
    signal?: StringNullableFilter<"SniperTarget"> | string | null
    status?: StringFilter<"SniperTarget"> | string
    generatedDraft?: StringNullableFilter<"SniperTarget"> | string | null
    draftEmail?: StringNullableFilter<"SniperTarget"> | string | null
    sentAt?: DateTimeNullableFilter<"SniperTarget"> | Date | string | null
    lastAttemptAt?: DateTimeNullableFilter<"SniperTarget"> | Date | string | null
    attemptCount?: IntFilter<"SniperTarget"> | number
    createdAt?: DateTimeFilter<"SniperTarget"> | Date | string
    updatedAt?: DateTimeFilter<"SniperTarget"> | Date | string
  }

  export type SniperTargetOrderByWithRelationInput = {
    id?: SortOrder
    source?: SortOrder
    domain?: SortOrder
    companyName?: SortOrder
    firstName?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    linkedinUrl?: SortOrderInput | SortOrder
    signal?: SortOrderInput | SortOrder
    status?: SortOrder
    generatedDraft?: SortOrderInput | SortOrder
    draftEmail?: SortOrderInput | SortOrder
    sentAt?: SortOrderInput | SortOrder
    lastAttemptAt?: SortOrderInput | SortOrder
    attemptCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SniperTargetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SniperTargetWhereInput | SniperTargetWhereInput[]
    OR?: SniperTargetWhereInput[]
    NOT?: SniperTargetWhereInput | SniperTargetWhereInput[]
    source?: StringFilter<"SniperTarget"> | string
    domain?: StringFilter<"SniperTarget"> | string
    companyName?: StringFilter<"SniperTarget"> | string
    firstName?: StringNullableFilter<"SniperTarget"> | string | null
    email?: StringNullableFilter<"SniperTarget"> | string | null
    linkedinUrl?: StringNullableFilter<"SniperTarget"> | string | null
    signal?: StringNullableFilter<"SniperTarget"> | string | null
    status?: StringFilter<"SniperTarget"> | string
    generatedDraft?: StringNullableFilter<"SniperTarget"> | string | null
    draftEmail?: StringNullableFilter<"SniperTarget"> | string | null
    sentAt?: DateTimeNullableFilter<"SniperTarget"> | Date | string | null
    lastAttemptAt?: DateTimeNullableFilter<"SniperTarget"> | Date | string | null
    attemptCount?: IntFilter<"SniperTarget"> | number
    createdAt?: DateTimeFilter<"SniperTarget"> | Date | string
    updatedAt?: DateTimeFilter<"SniperTarget"> | Date | string
  }, "id">

  export type SniperTargetOrderByWithAggregationInput = {
    id?: SortOrder
    source?: SortOrder
    domain?: SortOrder
    companyName?: SortOrder
    firstName?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    linkedinUrl?: SortOrderInput | SortOrder
    signal?: SortOrderInput | SortOrder
    status?: SortOrder
    generatedDraft?: SortOrderInput | SortOrder
    draftEmail?: SortOrderInput | SortOrder
    sentAt?: SortOrderInput | SortOrder
    lastAttemptAt?: SortOrderInput | SortOrder
    attemptCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SniperTargetCountOrderByAggregateInput
    _avg?: SniperTargetAvgOrderByAggregateInput
    _max?: SniperTargetMaxOrderByAggregateInput
    _min?: SniperTargetMinOrderByAggregateInput
    _sum?: SniperTargetSumOrderByAggregateInput
  }

  export type SniperTargetScalarWhereWithAggregatesInput = {
    AND?: SniperTargetScalarWhereWithAggregatesInput | SniperTargetScalarWhereWithAggregatesInput[]
    OR?: SniperTargetScalarWhereWithAggregatesInput[]
    NOT?: SniperTargetScalarWhereWithAggregatesInput | SniperTargetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SniperTarget"> | string
    source?: StringWithAggregatesFilter<"SniperTarget"> | string
    domain?: StringWithAggregatesFilter<"SniperTarget"> | string
    companyName?: StringWithAggregatesFilter<"SniperTarget"> | string
    firstName?: StringNullableWithAggregatesFilter<"SniperTarget"> | string | null
    email?: StringNullableWithAggregatesFilter<"SniperTarget"> | string | null
    linkedinUrl?: StringNullableWithAggregatesFilter<"SniperTarget"> | string | null
    signal?: StringNullableWithAggregatesFilter<"SniperTarget"> | string | null
    status?: StringWithAggregatesFilter<"SniperTarget"> | string
    generatedDraft?: StringNullableWithAggregatesFilter<"SniperTarget"> | string | null
    draftEmail?: StringNullableWithAggregatesFilter<"SniperTarget"> | string | null
    sentAt?: DateTimeNullableWithAggregatesFilter<"SniperTarget"> | Date | string | null
    lastAttemptAt?: DateTimeNullableWithAggregatesFilter<"SniperTarget"> | Date | string | null
    attemptCount?: IntWithAggregatesFilter<"SniperTarget"> | number
    createdAt?: DateTimeWithAggregatesFilter<"SniperTarget"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SniperTarget"> | Date | string
  }

  export type EmailEventWhereInput = {
    AND?: EmailEventWhereInput | EmailEventWhereInput[]
    OR?: EmailEventWhereInput[]
    NOT?: EmailEventWhereInput | EmailEventWhereInput[]
    id?: StringFilter<"EmailEvent"> | string
    leadId?: StringFilter<"EmailEvent"> | string
    type?: StringFilter<"EmailEvent"> | string
    metadata?: JsonNullableFilter<"EmailEvent">
    createdAt?: DateTimeFilter<"EmailEvent"> | Date | string
    lead?: XOR<LeadScalarRelationFilter, LeadWhereInput>
  }

  export type EmailEventOrderByWithRelationInput = {
    id?: SortOrder
    leadId?: SortOrder
    type?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    lead?: LeadOrderByWithRelationInput
  }

  export type EmailEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EmailEventWhereInput | EmailEventWhereInput[]
    OR?: EmailEventWhereInput[]
    NOT?: EmailEventWhereInput | EmailEventWhereInput[]
    leadId?: StringFilter<"EmailEvent"> | string
    type?: StringFilter<"EmailEvent"> | string
    metadata?: JsonNullableFilter<"EmailEvent">
    createdAt?: DateTimeFilter<"EmailEvent"> | Date | string
    lead?: XOR<LeadScalarRelationFilter, LeadWhereInput>
  }, "id">

  export type EmailEventOrderByWithAggregationInput = {
    id?: SortOrder
    leadId?: SortOrder
    type?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: EmailEventCountOrderByAggregateInput
    _max?: EmailEventMaxOrderByAggregateInput
    _min?: EmailEventMinOrderByAggregateInput
  }

  export type EmailEventScalarWhereWithAggregatesInput = {
    AND?: EmailEventScalarWhereWithAggregatesInput | EmailEventScalarWhereWithAggregatesInput[]
    OR?: EmailEventScalarWhereWithAggregatesInput[]
    NOT?: EmailEventScalarWhereWithAggregatesInput | EmailEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EmailEvent"> | string
    leadId?: StringWithAggregatesFilter<"EmailEvent"> | string
    type?: StringWithAggregatesFilter<"EmailEvent"> | string
    metadata?: JsonNullableWithAggregatesFilter<"EmailEvent">
    createdAt?: DateTimeWithAggregatesFilter<"EmailEvent"> | Date | string
  }

  export type KnowledgeEmbeddingWhereInput = {
    AND?: KnowledgeEmbeddingWhereInput | KnowledgeEmbeddingWhereInput[]
    OR?: KnowledgeEmbeddingWhereInput[]
    NOT?: KnowledgeEmbeddingWhereInput | KnowledgeEmbeddingWhereInput[]
    id?: StringFilter<"KnowledgeEmbedding"> | string
    source?: StringFilter<"KnowledgeEmbedding"> | string
    url?: StringNullableFilter<"KnowledgeEmbedding"> | string | null
    createdAt?: DateTimeFilter<"KnowledgeEmbedding"> | Date | string
    updatedAt?: DateTimeFilter<"KnowledgeEmbedding"> | Date | string
    chunkId?: IntFilter<"KnowledgeEmbedding"> | number
    text?: StringFilter<"KnowledgeEmbedding"> | string
    type?: StringFilter<"KnowledgeEmbedding"> | string
    metadata?: JsonNullableFilter<"KnowledgeEmbedding">
  }

  export type KnowledgeEmbeddingOrderByWithRelationInput = {
    id?: SortOrder
    source?: SortOrder
    url?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    chunkId?: SortOrder
    text?: SortOrder
    type?: SortOrder
    metadata?: SortOrderInput | SortOrder
  }

  export type KnowledgeEmbeddingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    chunkId?: number
    AND?: KnowledgeEmbeddingWhereInput | KnowledgeEmbeddingWhereInput[]
    OR?: KnowledgeEmbeddingWhereInput[]
    NOT?: KnowledgeEmbeddingWhereInput | KnowledgeEmbeddingWhereInput[]
    source?: StringFilter<"KnowledgeEmbedding"> | string
    url?: StringNullableFilter<"KnowledgeEmbedding"> | string | null
    createdAt?: DateTimeFilter<"KnowledgeEmbedding"> | Date | string
    updatedAt?: DateTimeFilter<"KnowledgeEmbedding"> | Date | string
    text?: StringFilter<"KnowledgeEmbedding"> | string
    type?: StringFilter<"KnowledgeEmbedding"> | string
    metadata?: JsonNullableFilter<"KnowledgeEmbedding">
  }, "id" | "chunkId">

  export type KnowledgeEmbeddingOrderByWithAggregationInput = {
    id?: SortOrder
    source?: SortOrder
    url?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    chunkId?: SortOrder
    text?: SortOrder
    type?: SortOrder
    metadata?: SortOrderInput | SortOrder
    _count?: KnowledgeEmbeddingCountOrderByAggregateInput
    _avg?: KnowledgeEmbeddingAvgOrderByAggregateInput
    _max?: KnowledgeEmbeddingMaxOrderByAggregateInput
    _min?: KnowledgeEmbeddingMinOrderByAggregateInput
    _sum?: KnowledgeEmbeddingSumOrderByAggregateInput
  }

  export type KnowledgeEmbeddingScalarWhereWithAggregatesInput = {
    AND?: KnowledgeEmbeddingScalarWhereWithAggregatesInput | KnowledgeEmbeddingScalarWhereWithAggregatesInput[]
    OR?: KnowledgeEmbeddingScalarWhereWithAggregatesInput[]
    NOT?: KnowledgeEmbeddingScalarWhereWithAggregatesInput | KnowledgeEmbeddingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"KnowledgeEmbedding"> | string
    source?: StringWithAggregatesFilter<"KnowledgeEmbedding"> | string
    url?: StringNullableWithAggregatesFilter<"KnowledgeEmbedding"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"KnowledgeEmbedding"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"KnowledgeEmbedding"> | Date | string
    chunkId?: IntWithAggregatesFilter<"KnowledgeEmbedding"> | number
    text?: StringWithAggregatesFilter<"KnowledgeEmbedding"> | string
    type?: StringWithAggregatesFilter<"KnowledgeEmbedding"> | string
    metadata?: JsonNullableWithAggregatesFilter<"KnowledgeEmbedding">
  }

  export type EmbeddingWhereInput = {
    AND?: EmbeddingWhereInput | EmbeddingWhereInput[]
    OR?: EmbeddingWhereInput[]
    NOT?: EmbeddingWhereInput | EmbeddingWhereInput[]
    id?: StringFilter<"Embedding"> | string
    content?: StringFilter<"Embedding"> | string
    embedding?: FloatNullableListFilter<"Embedding">
    source?: StringFilter<"Embedding"> | string
    type?: StringFilter<"Embedding"> | string
    createdAt?: DateTimeFilter<"Embedding"> | Date | string
  }

  export type EmbeddingOrderByWithRelationInput = {
    id?: SortOrder
    content?: SortOrder
    embedding?: SortOrder
    source?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type EmbeddingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EmbeddingWhereInput | EmbeddingWhereInput[]
    OR?: EmbeddingWhereInput[]
    NOT?: EmbeddingWhereInput | EmbeddingWhereInput[]
    content?: StringFilter<"Embedding"> | string
    embedding?: FloatNullableListFilter<"Embedding">
    source?: StringFilter<"Embedding"> | string
    type?: StringFilter<"Embedding"> | string
    createdAt?: DateTimeFilter<"Embedding"> | Date | string
  }, "id">

  export type EmbeddingOrderByWithAggregationInput = {
    id?: SortOrder
    content?: SortOrder
    embedding?: SortOrder
    source?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    _count?: EmbeddingCountOrderByAggregateInput
    _avg?: EmbeddingAvgOrderByAggregateInput
    _max?: EmbeddingMaxOrderByAggregateInput
    _min?: EmbeddingMinOrderByAggregateInput
    _sum?: EmbeddingSumOrderByAggregateInput
  }

  export type EmbeddingScalarWhereWithAggregatesInput = {
    AND?: EmbeddingScalarWhereWithAggregatesInput | EmbeddingScalarWhereWithAggregatesInput[]
    OR?: EmbeddingScalarWhereWithAggregatesInput[]
    NOT?: EmbeddingScalarWhereWithAggregatesInput | EmbeddingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Embedding"> | string
    content?: StringWithAggregatesFilter<"Embedding"> | string
    embedding?: FloatNullableListFilter<"Embedding">
    source?: StringWithAggregatesFilter<"Embedding"> | string
    type?: StringWithAggregatesFilter<"Embedding"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Embedding"> | Date | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    currency?: StringFilter<"Account"> | string
    createdAt?: DateTimeFilter<"Account"> | Date | string
    entries?: EntryListRelationFilter
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    currency?: SortOrder
    createdAt?: SortOrder
    entries?: EntryOrderByRelationAggregateInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    currency?: StringFilter<"Account"> | string
    createdAt?: DateTimeFilter<"Account"> | Date | string
    entries?: EntryListRelationFilter
  }, "id">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    currency?: SortOrder
    createdAt?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    type?: StringWithAggregatesFilter<"Account"> | string
    currency?: StringWithAggregatesFilter<"Account"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
  }

  export type LedgerTransactionWhereInput = {
    AND?: LedgerTransactionWhereInput | LedgerTransactionWhereInput[]
    OR?: LedgerTransactionWhereInput[]
    NOT?: LedgerTransactionWhereInput | LedgerTransactionWhereInput[]
    id?: StringFilter<"LedgerTransaction"> | string
    userId?: StringFilter<"LedgerTransaction"> | string
    reference?: StringFilter<"LedgerTransaction"> | string
    description?: StringNullableFilter<"LedgerTransaction"> | string | null
    state?: StringFilter<"LedgerTransaction"> | string
    idempotencyKey?: StringFilter<"LedgerTransaction"> | string
    createdAt?: DateTimeFilter<"LedgerTransaction"> | Date | string
    updatedAt?: DateTimeFilter<"LedgerTransaction"> | Date | string
    postedAt?: DateTimeNullableFilter<"LedgerTransaction"> | Date | string | null
    entries?: EntryListRelationFilter
    idempotency?: XOR<LedgerIdempotencyNullableScalarRelationFilter, LedgerIdempotencyWhereInput> | null
  }

  export type LedgerTransactionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    reference?: SortOrder
    description?: SortOrderInput | SortOrder
    state?: SortOrder
    idempotencyKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    postedAt?: SortOrderInput | SortOrder
    entries?: EntryOrderByRelationAggregateInput
    idempotency?: LedgerIdempotencyOrderByWithRelationInput
  }

  export type LedgerTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    reference?: string
    idempotencyKey?: string
    AND?: LedgerTransactionWhereInput | LedgerTransactionWhereInput[]
    OR?: LedgerTransactionWhereInput[]
    NOT?: LedgerTransactionWhereInput | LedgerTransactionWhereInput[]
    userId?: StringFilter<"LedgerTransaction"> | string
    description?: StringNullableFilter<"LedgerTransaction"> | string | null
    state?: StringFilter<"LedgerTransaction"> | string
    createdAt?: DateTimeFilter<"LedgerTransaction"> | Date | string
    updatedAt?: DateTimeFilter<"LedgerTransaction"> | Date | string
    postedAt?: DateTimeNullableFilter<"LedgerTransaction"> | Date | string | null
    entries?: EntryListRelationFilter
    idempotency?: XOR<LedgerIdempotencyNullableScalarRelationFilter, LedgerIdempotencyWhereInput> | null
  }, "id" | "reference" | "idempotencyKey">

  export type LedgerTransactionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    reference?: SortOrder
    description?: SortOrderInput | SortOrder
    state?: SortOrder
    idempotencyKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    postedAt?: SortOrderInput | SortOrder
    _count?: LedgerTransactionCountOrderByAggregateInput
    _max?: LedgerTransactionMaxOrderByAggregateInput
    _min?: LedgerTransactionMinOrderByAggregateInput
  }

  export type LedgerTransactionScalarWhereWithAggregatesInput = {
    AND?: LedgerTransactionScalarWhereWithAggregatesInput | LedgerTransactionScalarWhereWithAggregatesInput[]
    OR?: LedgerTransactionScalarWhereWithAggregatesInput[]
    NOT?: LedgerTransactionScalarWhereWithAggregatesInput | LedgerTransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LedgerTransaction"> | string
    userId?: StringWithAggregatesFilter<"LedgerTransaction"> | string
    reference?: StringWithAggregatesFilter<"LedgerTransaction"> | string
    description?: StringNullableWithAggregatesFilter<"LedgerTransaction"> | string | null
    state?: StringWithAggregatesFilter<"LedgerTransaction"> | string
    idempotencyKey?: StringWithAggregatesFilter<"LedgerTransaction"> | string
    createdAt?: DateTimeWithAggregatesFilter<"LedgerTransaction"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"LedgerTransaction"> | Date | string
    postedAt?: DateTimeNullableWithAggregatesFilter<"LedgerTransaction"> | Date | string | null
  }

  export type EntryWhereInput = {
    AND?: EntryWhereInput | EntryWhereInput[]
    OR?: EntryWhereInput[]
    NOT?: EntryWhereInput | EntryWhereInput[]
    id?: StringFilter<"Entry"> | string
    transactionId?: StringFilter<"Entry"> | string
    accountId?: StringFilter<"Entry"> | string
    debit?: BigIntFilter<"Entry"> | bigint | number
    credit?: BigIntFilter<"Entry"> | bigint | number
    currency?: StringFilter<"Entry"> | string
    description?: StringNullableFilter<"Entry"> | string | null
    createdAt?: DateTimeFilter<"Entry"> | Date | string
    transaction?: XOR<LedgerTransactionScalarRelationFilter, LedgerTransactionWhereInput>
    account?: XOR<AccountScalarRelationFilter, AccountWhereInput>
  }

  export type EntryOrderByWithRelationInput = {
    id?: SortOrder
    transactionId?: SortOrder
    accountId?: SortOrder
    debit?: SortOrder
    credit?: SortOrder
    currency?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    transaction?: LedgerTransactionOrderByWithRelationInput
    account?: AccountOrderByWithRelationInput
  }

  export type EntryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EntryWhereInput | EntryWhereInput[]
    OR?: EntryWhereInput[]
    NOT?: EntryWhereInput | EntryWhereInput[]
    transactionId?: StringFilter<"Entry"> | string
    accountId?: StringFilter<"Entry"> | string
    debit?: BigIntFilter<"Entry"> | bigint | number
    credit?: BigIntFilter<"Entry"> | bigint | number
    currency?: StringFilter<"Entry"> | string
    description?: StringNullableFilter<"Entry"> | string | null
    createdAt?: DateTimeFilter<"Entry"> | Date | string
    transaction?: XOR<LedgerTransactionScalarRelationFilter, LedgerTransactionWhereInput>
    account?: XOR<AccountScalarRelationFilter, AccountWhereInput>
  }, "id">

  export type EntryOrderByWithAggregationInput = {
    id?: SortOrder
    transactionId?: SortOrder
    accountId?: SortOrder
    debit?: SortOrder
    credit?: SortOrder
    currency?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: EntryCountOrderByAggregateInput
    _avg?: EntryAvgOrderByAggregateInput
    _max?: EntryMaxOrderByAggregateInput
    _min?: EntryMinOrderByAggregateInput
    _sum?: EntrySumOrderByAggregateInput
  }

  export type EntryScalarWhereWithAggregatesInput = {
    AND?: EntryScalarWhereWithAggregatesInput | EntryScalarWhereWithAggregatesInput[]
    OR?: EntryScalarWhereWithAggregatesInput[]
    NOT?: EntryScalarWhereWithAggregatesInput | EntryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Entry"> | string
    transactionId?: StringWithAggregatesFilter<"Entry"> | string
    accountId?: StringWithAggregatesFilter<"Entry"> | string
    debit?: BigIntWithAggregatesFilter<"Entry"> | bigint | number
    credit?: BigIntWithAggregatesFilter<"Entry"> | bigint | number
    currency?: StringWithAggregatesFilter<"Entry"> | string
    description?: StringNullableWithAggregatesFilter<"Entry"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Entry"> | Date | string
  }

  export type LedgerIdempotencyWhereInput = {
    AND?: LedgerIdempotencyWhereInput | LedgerIdempotencyWhereInput[]
    OR?: LedgerIdempotencyWhereInput[]
    NOT?: LedgerIdempotencyWhereInput | LedgerIdempotencyWhereInput[]
    id?: StringFilter<"LedgerIdempotency"> | string
    idempotencyKey?: StringFilter<"LedgerIdempotency"> | string
    transactionId?: StringFilter<"LedgerIdempotency"> | string
    createdAt?: DateTimeFilter<"LedgerIdempotency"> | Date | string
    transaction?: XOR<LedgerTransactionScalarRelationFilter, LedgerTransactionWhereInput>
  }

  export type LedgerIdempotencyOrderByWithRelationInput = {
    id?: SortOrder
    idempotencyKey?: SortOrder
    transactionId?: SortOrder
    createdAt?: SortOrder
    transaction?: LedgerTransactionOrderByWithRelationInput
  }

  export type LedgerIdempotencyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    idempotencyKey?: string
    transactionId?: string
    AND?: LedgerIdempotencyWhereInput | LedgerIdempotencyWhereInput[]
    OR?: LedgerIdempotencyWhereInput[]
    NOT?: LedgerIdempotencyWhereInput | LedgerIdempotencyWhereInput[]
    createdAt?: DateTimeFilter<"LedgerIdempotency"> | Date | string
    transaction?: XOR<LedgerTransactionScalarRelationFilter, LedgerTransactionWhereInput>
  }, "id" | "idempotencyKey" | "transactionId">

  export type LedgerIdempotencyOrderByWithAggregationInput = {
    id?: SortOrder
    idempotencyKey?: SortOrder
    transactionId?: SortOrder
    createdAt?: SortOrder
    _count?: LedgerIdempotencyCountOrderByAggregateInput
    _max?: LedgerIdempotencyMaxOrderByAggregateInput
    _min?: LedgerIdempotencyMinOrderByAggregateInput
  }

  export type LedgerIdempotencyScalarWhereWithAggregatesInput = {
    AND?: LedgerIdempotencyScalarWhereWithAggregatesInput | LedgerIdempotencyScalarWhereWithAggregatesInput[]
    OR?: LedgerIdempotencyScalarWhereWithAggregatesInput[]
    NOT?: LedgerIdempotencyScalarWhereWithAggregatesInput | LedgerIdempotencyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LedgerIdempotency"> | string
    idempotencyKey?: StringWithAggregatesFilter<"LedgerIdempotency"> | string
    transactionId?: StringWithAggregatesFilter<"LedgerIdempotency"> | string
    createdAt?: DateTimeWithAggregatesFilter<"LedgerIdempotency"> | Date | string
  }

  export type LeadCreateInput = {
    id?: string
    phoneNumber?: string | null
    email?: string | null
    intent?: string | null
    status: string
    leadScore?: number | null
    tier?: string | null
    lastMessage?: string | null
    nextFollowUpAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    termsAccepted?: boolean
    miniAuditData?: NullableJsonNullValueInput | InputJsonValue
    paymentRef?: string | null
    demoApproved?: boolean
    demoScheduled?: boolean
    updatedAt?: Date | string
    createdAt?: Date | string
    demo?: DemoCreateNestedOneWithoutLeadInput
    emailEvents?: EmailEventCreateNestedManyWithoutLeadInput
    payments?: PaymentCreateNestedManyWithoutLeadInput
  }

  export type LeadUncheckedCreateInput = {
    id?: string
    phoneNumber?: string | null
    email?: string | null
    intent?: string | null
    status: string
    leadScore?: number | null
    tier?: string | null
    lastMessage?: string | null
    nextFollowUpAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    termsAccepted?: boolean
    miniAuditData?: NullableJsonNullValueInput | InputJsonValue
    paymentRef?: string | null
    demoApproved?: boolean
    demoScheduled?: boolean
    updatedAt?: Date | string
    createdAt?: Date | string
    demo?: DemoUncheckedCreateNestedOneWithoutLeadInput
    emailEvents?: EmailEventUncheckedCreateNestedManyWithoutLeadInput
    payments?: PaymentUncheckedCreateNestedManyWithoutLeadInput
  }

  export type LeadUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    leadScore?: NullableIntFieldUpdateOperationsInput | number | null
    tier?: NullableStringFieldUpdateOperationsInput | string | null
    lastMessage?: NullableStringFieldUpdateOperationsInput | string | null
    nextFollowUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    termsAccepted?: BoolFieldUpdateOperationsInput | boolean
    miniAuditData?: NullableJsonNullValueInput | InputJsonValue
    paymentRef?: NullableStringFieldUpdateOperationsInput | string | null
    demoApproved?: BoolFieldUpdateOperationsInput | boolean
    demoScheduled?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    demo?: DemoUpdateOneWithoutLeadNestedInput
    emailEvents?: EmailEventUpdateManyWithoutLeadNestedInput
    payments?: PaymentUpdateManyWithoutLeadNestedInput
  }

  export type LeadUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    leadScore?: NullableIntFieldUpdateOperationsInput | number | null
    tier?: NullableStringFieldUpdateOperationsInput | string | null
    lastMessage?: NullableStringFieldUpdateOperationsInput | string | null
    nextFollowUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    termsAccepted?: BoolFieldUpdateOperationsInput | boolean
    miniAuditData?: NullableJsonNullValueInput | InputJsonValue
    paymentRef?: NullableStringFieldUpdateOperationsInput | string | null
    demoApproved?: BoolFieldUpdateOperationsInput | boolean
    demoScheduled?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    demo?: DemoUncheckedUpdateOneWithoutLeadNestedInput
    emailEvents?: EmailEventUncheckedUpdateManyWithoutLeadNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutLeadNestedInput
  }

  export type LeadCreateManyInput = {
    id?: string
    phoneNumber?: string | null
    email?: string | null
    intent?: string | null
    status: string
    leadScore?: number | null
    tier?: string | null
    lastMessage?: string | null
    nextFollowUpAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    termsAccepted?: boolean
    miniAuditData?: NullableJsonNullValueInput | InputJsonValue
    paymentRef?: string | null
    demoApproved?: boolean
    demoScheduled?: boolean
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type LeadUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    leadScore?: NullableIntFieldUpdateOperationsInput | number | null
    tier?: NullableStringFieldUpdateOperationsInput | string | null
    lastMessage?: NullableStringFieldUpdateOperationsInput | string | null
    nextFollowUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    termsAccepted?: BoolFieldUpdateOperationsInput | boolean
    miniAuditData?: NullableJsonNullValueInput | InputJsonValue
    paymentRef?: NullableStringFieldUpdateOperationsInput | string | null
    demoApproved?: BoolFieldUpdateOperationsInput | boolean
    demoScheduled?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    leadScore?: NullableIntFieldUpdateOperationsInput | number | null
    tier?: NullableStringFieldUpdateOperationsInput | string | null
    lastMessage?: NullableStringFieldUpdateOperationsInput | string | null
    nextFollowUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    termsAccepted?: BoolFieldUpdateOperationsInput | boolean
    miniAuditData?: NullableJsonNullValueInput | InputJsonValue
    paymentRef?: NullableStringFieldUpdateOperationsInput | string | null
    demoApproved?: BoolFieldUpdateOperationsInput | boolean
    demoScheduled?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    role?: string | null
    createdAt?: Date | string
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    role?: string | null
    createdAt?: Date | string
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: string
    name?: string | null
    email: string
    password: string
    role?: string | null
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenizedAssetCreateInput = {
    id?: string
    assetType: string
    name: string
    location?: string | null
    totalShares: number
    availableShares: number
    pricePerShare: Decimal | DecimalJsLike | number | string
    currency?: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tokenHolders?: TokenHolderCreateNestedManyWithoutTokenizedAssetInput
  }

  export type TokenizedAssetUncheckedCreateInput = {
    id?: string
    assetType: string
    name: string
    location?: string | null
    totalShares: number
    availableShares: number
    pricePerShare: Decimal | DecimalJsLike | number | string
    currency?: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tokenHolders?: TokenHolderUncheckedCreateNestedManyWithoutTokenizedAssetInput
  }

  export type TokenizedAssetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetType?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    totalShares?: IntFieldUpdateOperationsInput | number
    availableShares?: IntFieldUpdateOperationsInput | number
    pricePerShare?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tokenHolders?: TokenHolderUpdateManyWithoutTokenizedAssetNestedInput
  }

  export type TokenizedAssetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetType?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    totalShares?: IntFieldUpdateOperationsInput | number
    availableShares?: IntFieldUpdateOperationsInput | number
    pricePerShare?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tokenHolders?: TokenHolderUncheckedUpdateManyWithoutTokenizedAssetNestedInput
  }

  export type TokenizedAssetCreateManyInput = {
    id?: string
    assetType: string
    name: string
    location?: string | null
    totalShares: number
    availableShares: number
    pricePerShare: Decimal | DecimalJsLike | number | string
    currency?: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TokenizedAssetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetType?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    totalShares?: IntFieldUpdateOperationsInput | number
    availableShares?: IntFieldUpdateOperationsInput | number
    pricePerShare?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenizedAssetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetType?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    totalShares?: IntFieldUpdateOperationsInput | number
    availableShares?: IntFieldUpdateOperationsInput | number
    pricePerShare?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenHolderCreateInput = {
    id?: string
    leadId?: string | null
    shares: number
    purchasePrice: Decimal | DecimalJsLike | number | string
    totalPaid: Decimal | DecimalJsLike | number | string
    transactionId?: string | null
    purchasedAt?: Date | string
    tokenizedAsset: TokenizedAssetCreateNestedOneWithoutTokenHoldersInput
  }

  export type TokenHolderUncheckedCreateInput = {
    id?: string
    tokenizedAssetId: string
    leadId?: string | null
    shares: number
    purchasePrice: Decimal | DecimalJsLike | number | string
    totalPaid: Decimal | DecimalJsLike | number | string
    transactionId?: string | null
    purchasedAt?: Date | string
  }

  export type TokenHolderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    leadId?: NullableStringFieldUpdateOperationsInput | string | null
    shares?: IntFieldUpdateOperationsInput | number
    purchasePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    purchasedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tokenizedAsset?: TokenizedAssetUpdateOneRequiredWithoutTokenHoldersNestedInput
  }

  export type TokenHolderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenizedAssetId?: StringFieldUpdateOperationsInput | string
    leadId?: NullableStringFieldUpdateOperationsInput | string | null
    shares?: IntFieldUpdateOperationsInput | number
    purchasePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    purchasedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenHolderCreateManyInput = {
    id?: string
    tokenizedAssetId: string
    leadId?: string | null
    shares: number
    purchasePrice: Decimal | DecimalJsLike | number | string
    totalPaid: Decimal | DecimalJsLike | number | string
    transactionId?: string | null
    purchasedAt?: Date | string
  }

  export type TokenHolderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    leadId?: NullableStringFieldUpdateOperationsInput | string | null
    shares?: IntFieldUpdateOperationsInput | number
    purchasePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    purchasedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenHolderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenizedAssetId?: StringFieldUpdateOperationsInput | string
    leadId?: NullableStringFieldUpdateOperationsInput | string | null
    shares?: IntFieldUpdateOperationsInput | number
    purchasePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    purchasedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateInput = {
    id?: string
    amount: number
    status?: string
    reference: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lead: LeadCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateInput = {
    id?: string
    amount: number
    status?: string
    reference: string
    leadId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lead?: LeadUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateManyInput = {
    id?: string
    amount: number
    status?: string
    reference: string
    leadId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DemoCreateInput = {
    id?: string
    slug: string
    config?: NullableJsonNullValueInput | InputJsonValue
    approved?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lead: LeadCreateNestedOneWithoutDemoInput
  }

  export type DemoUncheckedCreateInput = {
    id?: string
    slug: string
    leadId: string
    config?: NullableJsonNullValueInput | InputJsonValue
    approved?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DemoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    config?: NullableJsonNullValueInput | InputJsonValue
    approved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lead?: LeadUpdateOneRequiredWithoutDemoNestedInput
  }

  export type DemoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    config?: NullableJsonNullValueInput | InputJsonValue
    approved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DemoCreateManyInput = {
    id?: string
    slug: string
    leadId: string
    config?: NullableJsonNullValueInput | InputJsonValue
    approved?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DemoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    config?: NullableJsonNullValueInput | InputJsonValue
    approved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DemoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    config?: NullableJsonNullValueInput | InputJsonValue
    approved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemEventCreateInput = {
    id?: string
    type: string
    message: string
    digest?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type SystemEventUncheckedCreateInput = {
    id?: string
    type: string
    message: string
    digest?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type SystemEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    digest?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    digest?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemEventCreateManyInput = {
    id?: string
    type: string
    message: string
    digest?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type SystemEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    digest?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    digest?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SniperTargetCreateInput = {
    id?: string
    source: string
    domain: string
    companyName: string
    firstName?: string | null
    email?: string | null
    linkedinUrl?: string | null
    signal?: string | null
    status?: string
    generatedDraft?: string | null
    draftEmail?: string | null
    sentAt?: Date | string | null
    lastAttemptAt?: Date | string | null
    attemptCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SniperTargetUncheckedCreateInput = {
    id?: string
    source: string
    domain: string
    companyName: string
    firstName?: string | null
    email?: string | null
    linkedinUrl?: string | null
    signal?: string | null
    status?: string
    generatedDraft?: string | null
    draftEmail?: string | null
    sentAt?: Date | string | null
    lastAttemptAt?: Date | string | null
    attemptCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SniperTargetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    signal?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    generatedDraft?: NullableStringFieldUpdateOperationsInput | string | null
    draftEmail?: NullableStringFieldUpdateOperationsInput | string | null
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastAttemptAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    attemptCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SniperTargetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    signal?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    generatedDraft?: NullableStringFieldUpdateOperationsInput | string | null
    draftEmail?: NullableStringFieldUpdateOperationsInput | string | null
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastAttemptAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    attemptCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SniperTargetCreateManyInput = {
    id?: string
    source: string
    domain: string
    companyName: string
    firstName?: string | null
    email?: string | null
    linkedinUrl?: string | null
    signal?: string | null
    status?: string
    generatedDraft?: string | null
    draftEmail?: string | null
    sentAt?: Date | string | null
    lastAttemptAt?: Date | string | null
    attemptCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SniperTargetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    signal?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    generatedDraft?: NullableStringFieldUpdateOperationsInput | string | null
    draftEmail?: NullableStringFieldUpdateOperationsInput | string | null
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastAttemptAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    attemptCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SniperTargetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    signal?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    generatedDraft?: NullableStringFieldUpdateOperationsInput | string | null
    draftEmail?: NullableStringFieldUpdateOperationsInput | string | null
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastAttemptAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    attemptCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailEventCreateInput = {
    id?: string
    type: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    lead: LeadCreateNestedOneWithoutEmailEventsInput
  }

  export type EmailEventUncheckedCreateInput = {
    id?: string
    leadId: string
    type: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type EmailEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lead?: LeadUpdateOneRequiredWithoutEmailEventsNestedInput
  }

  export type EmailEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailEventCreateManyInput = {
    id?: string
    leadId: string
    type: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type EmailEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KnowledgeEmbeddingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chunkId?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type KnowledgeEmbeddingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chunkId?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type KnowledgeEmbeddingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chunkId?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type KnowledgeEmbeddingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chunkId?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type EmbeddingCreateInput = {
    id?: string
    content: string
    embedding?: EmbeddingCreateembeddingInput | number[]
    source: string
    type: string
    createdAt?: Date | string
  }

  export type EmbeddingUncheckedCreateInput = {
    id?: string
    content: string
    embedding?: EmbeddingCreateembeddingInput | number[]
    source: string
    type: string
    createdAt?: Date | string
  }

  export type EmbeddingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    embedding?: EmbeddingUpdateembeddingInput | number[]
    source?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmbeddingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    embedding?: EmbeddingUpdateembeddingInput | number[]
    source?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmbeddingCreateManyInput = {
    id?: string
    content: string
    embedding?: EmbeddingCreateembeddingInput | number[]
    source: string
    type: string
    createdAt?: Date | string
  }

  export type EmbeddingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    embedding?: EmbeddingUpdateembeddingInput | number[]
    source?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmbeddingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    embedding?: EmbeddingUpdateembeddingInput | number[]
    source?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateInput = {
    id?: string
    userId: string
    type: string
    currency?: string
    createdAt?: Date | string
    entries?: EntryCreateNestedManyWithoutAccountInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    currency?: string
    createdAt?: Date | string
    entries?: EntryUncheckedCreateNestedManyWithoutAccountInput
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entries?: EntryUpdateManyWithoutAccountNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entries?: EntryUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type AccountCreateManyInput = {
    id?: string
    userId: string
    type: string
    currency?: string
    createdAt?: Date | string
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LedgerTransactionCreateInput = {
    id?: string
    userId: string
    reference: string
    description?: string | null
    state?: string
    idempotencyKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    postedAt?: Date | string | null
    entries?: EntryCreateNestedManyWithoutTransactionInput
    idempotency?: LedgerIdempotencyCreateNestedOneWithoutTransactionInput
  }

  export type LedgerTransactionUncheckedCreateInput = {
    id?: string
    userId: string
    reference: string
    description?: string | null
    state?: string
    idempotencyKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    postedAt?: Date | string | null
    entries?: EntryUncheckedCreateNestedManyWithoutTransactionInput
    idempotency?: LedgerIdempotencyUncheckedCreateNestedOneWithoutTransactionInput
  }

  export type LedgerTransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    state?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    postedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    entries?: EntryUpdateManyWithoutTransactionNestedInput
    idempotency?: LedgerIdempotencyUpdateOneWithoutTransactionNestedInput
  }

  export type LedgerTransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    state?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    postedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    entries?: EntryUncheckedUpdateManyWithoutTransactionNestedInput
    idempotency?: LedgerIdempotencyUncheckedUpdateOneWithoutTransactionNestedInput
  }

  export type LedgerTransactionCreateManyInput = {
    id?: string
    userId: string
    reference: string
    description?: string | null
    state?: string
    idempotencyKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    postedAt?: Date | string | null
  }

  export type LedgerTransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    state?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    postedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type LedgerTransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    state?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    postedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type EntryCreateInput = {
    id?: string
    debit?: bigint | number
    credit?: bigint | number
    currency?: string
    description?: string | null
    createdAt?: Date | string
    transaction: LedgerTransactionCreateNestedOneWithoutEntriesInput
    account: AccountCreateNestedOneWithoutEntriesInput
  }

  export type EntryUncheckedCreateInput = {
    id?: string
    transactionId: string
    accountId: string
    debit?: bigint | number
    credit?: bigint | number
    currency?: string
    description?: string | null
    createdAt?: Date | string
  }

  export type EntryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    debit?: BigIntFieldUpdateOperationsInput | bigint | number
    credit?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transaction?: LedgerTransactionUpdateOneRequiredWithoutEntriesNestedInput
    account?: AccountUpdateOneRequiredWithoutEntriesNestedInput
  }

  export type EntryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    transactionId?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    debit?: BigIntFieldUpdateOperationsInput | bigint | number
    credit?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntryCreateManyInput = {
    id?: string
    transactionId: string
    accountId: string
    debit?: bigint | number
    credit?: bigint | number
    currency?: string
    description?: string | null
    createdAt?: Date | string
  }

  export type EntryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    debit?: BigIntFieldUpdateOperationsInput | bigint | number
    credit?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    transactionId?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    debit?: BigIntFieldUpdateOperationsInput | bigint | number
    credit?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LedgerIdempotencyCreateInput = {
    id?: string
    idempotencyKey: string
    createdAt?: Date | string
    transaction: LedgerTransactionCreateNestedOneWithoutIdempotencyInput
  }

  export type LedgerIdempotencyUncheckedCreateInput = {
    id?: string
    idempotencyKey: string
    transactionId: string
    createdAt?: Date | string
  }

  export type LedgerIdempotencyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transaction?: LedgerTransactionUpdateOneRequiredWithoutIdempotencyNestedInput
  }

  export type LedgerIdempotencyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    transactionId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LedgerIdempotencyCreateManyInput = {
    id?: string
    idempotencyKey: string
    transactionId: string
    createdAt?: Date | string
  }

  export type LedgerIdempotencyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LedgerIdempotencyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    transactionId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DemoNullableScalarRelationFilter = {
    is?: DemoWhereInput | null
    isNot?: DemoWhereInput | null
  }

  export type EmailEventListRelationFilter = {
    every?: EmailEventWhereInput
    some?: EmailEventWhereInput
    none?: EmailEventWhereInput
  }

  export type PaymentListRelationFilter = {
    every?: PaymentWhereInput
    some?: PaymentWhereInput
    none?: PaymentWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type EmailEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LeadCountOrderByAggregateInput = {
    id?: SortOrder
    phoneNumber?: SortOrder
    email?: SortOrder
    intent?: SortOrder
    status?: SortOrder
    leadScore?: SortOrder
    tier?: SortOrder
    lastMessage?: SortOrder
    nextFollowUpAt?: SortOrder
    metadata?: SortOrder
    termsAccepted?: SortOrder
    miniAuditData?: SortOrder
    paymentRef?: SortOrder
    demoApproved?: SortOrder
    demoScheduled?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type LeadAvgOrderByAggregateInput = {
    leadScore?: SortOrder
  }

  export type LeadMaxOrderByAggregateInput = {
    id?: SortOrder
    phoneNumber?: SortOrder
    email?: SortOrder
    intent?: SortOrder
    status?: SortOrder
    leadScore?: SortOrder
    tier?: SortOrder
    lastMessage?: SortOrder
    nextFollowUpAt?: SortOrder
    termsAccepted?: SortOrder
    paymentRef?: SortOrder
    demoApproved?: SortOrder
    demoScheduled?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type LeadMinOrderByAggregateInput = {
    id?: SortOrder
    phoneNumber?: SortOrder
    email?: SortOrder
    intent?: SortOrder
    status?: SortOrder
    leadScore?: SortOrder
    tier?: SortOrder
    lastMessage?: SortOrder
    nextFollowUpAt?: SortOrder
    termsAccepted?: SortOrder
    paymentRef?: SortOrder
    demoApproved?: SortOrder
    demoScheduled?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type LeadSumOrderByAggregateInput = {
    leadScore?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type TokenHolderListRelationFilter = {
    every?: TokenHolderWhereInput
    some?: TokenHolderWhereInput
    none?: TokenHolderWhereInput
  }

  export type TokenHolderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TokenizedAssetCountOrderByAggregateInput = {
    id?: SortOrder
    assetType?: SortOrder
    name?: SortOrder
    location?: SortOrder
    totalShares?: SortOrder
    availableShares?: SortOrder
    pricePerShare?: SortOrder
    currency?: SortOrder
    metadata?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TokenizedAssetAvgOrderByAggregateInput = {
    totalShares?: SortOrder
    availableShares?: SortOrder
    pricePerShare?: SortOrder
  }

  export type TokenizedAssetMaxOrderByAggregateInput = {
    id?: SortOrder
    assetType?: SortOrder
    name?: SortOrder
    location?: SortOrder
    totalShares?: SortOrder
    availableShares?: SortOrder
    pricePerShare?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TokenizedAssetMinOrderByAggregateInput = {
    id?: SortOrder
    assetType?: SortOrder
    name?: SortOrder
    location?: SortOrder
    totalShares?: SortOrder
    availableShares?: SortOrder
    pricePerShare?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TokenizedAssetSumOrderByAggregateInput = {
    totalShares?: SortOrder
    availableShares?: SortOrder
    pricePerShare?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type TokenizedAssetScalarRelationFilter = {
    is?: TokenizedAssetWhereInput
    isNot?: TokenizedAssetWhereInput
  }

  export type TokenHolderCountOrderByAggregateInput = {
    id?: SortOrder
    tokenizedAssetId?: SortOrder
    leadId?: SortOrder
    shares?: SortOrder
    purchasePrice?: SortOrder
    totalPaid?: SortOrder
    transactionId?: SortOrder
    purchasedAt?: SortOrder
  }

  export type TokenHolderAvgOrderByAggregateInput = {
    shares?: SortOrder
    purchasePrice?: SortOrder
    totalPaid?: SortOrder
  }

  export type TokenHolderMaxOrderByAggregateInput = {
    id?: SortOrder
    tokenizedAssetId?: SortOrder
    leadId?: SortOrder
    shares?: SortOrder
    purchasePrice?: SortOrder
    totalPaid?: SortOrder
    transactionId?: SortOrder
    purchasedAt?: SortOrder
  }

  export type TokenHolderMinOrderByAggregateInput = {
    id?: SortOrder
    tokenizedAssetId?: SortOrder
    leadId?: SortOrder
    shares?: SortOrder
    purchasePrice?: SortOrder
    totalPaid?: SortOrder
    transactionId?: SortOrder
    purchasedAt?: SortOrder
  }

  export type TokenHolderSumOrderByAggregateInput = {
    shares?: SortOrder
    purchasePrice?: SortOrder
    totalPaid?: SortOrder
  }

  export type LeadScalarRelationFilter = {
    is?: LeadWhereInput
    isNot?: LeadWhereInput
  }

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    reference?: SortOrder
    leadId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    reference?: SortOrder
    leadId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    reference?: SortOrder
    leadId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type DemoCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    leadId?: SortOrder
    config?: SortOrder
    approved?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DemoMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    leadId?: SortOrder
    approved?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DemoMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    leadId?: SortOrder
    approved?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemEventCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    message?: SortOrder
    digest?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type SystemEventMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    message?: SortOrder
    digest?: SortOrder
    createdAt?: SortOrder
  }

  export type SystemEventMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    message?: SortOrder
    digest?: SortOrder
    createdAt?: SortOrder
  }

  export type SniperTargetCountOrderByAggregateInput = {
    id?: SortOrder
    source?: SortOrder
    domain?: SortOrder
    companyName?: SortOrder
    firstName?: SortOrder
    email?: SortOrder
    linkedinUrl?: SortOrder
    signal?: SortOrder
    status?: SortOrder
    generatedDraft?: SortOrder
    draftEmail?: SortOrder
    sentAt?: SortOrder
    lastAttemptAt?: SortOrder
    attemptCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SniperTargetAvgOrderByAggregateInput = {
    attemptCount?: SortOrder
  }

  export type SniperTargetMaxOrderByAggregateInput = {
    id?: SortOrder
    source?: SortOrder
    domain?: SortOrder
    companyName?: SortOrder
    firstName?: SortOrder
    email?: SortOrder
    linkedinUrl?: SortOrder
    signal?: SortOrder
    status?: SortOrder
    generatedDraft?: SortOrder
    draftEmail?: SortOrder
    sentAt?: SortOrder
    lastAttemptAt?: SortOrder
    attemptCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SniperTargetMinOrderByAggregateInput = {
    id?: SortOrder
    source?: SortOrder
    domain?: SortOrder
    companyName?: SortOrder
    firstName?: SortOrder
    email?: SortOrder
    linkedinUrl?: SortOrder
    signal?: SortOrder
    status?: SortOrder
    generatedDraft?: SortOrder
    draftEmail?: SortOrder
    sentAt?: SortOrder
    lastAttemptAt?: SortOrder
    attemptCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SniperTargetSumOrderByAggregateInput = {
    attemptCount?: SortOrder
  }

  export type EmailEventCountOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
    type?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type EmailEventMaxOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type EmailEventMinOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type KnowledgeEmbeddingCountOrderByAggregateInput = {
    id?: SortOrder
    source?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    chunkId?: SortOrder
    text?: SortOrder
    type?: SortOrder
    metadata?: SortOrder
  }

  export type KnowledgeEmbeddingAvgOrderByAggregateInput = {
    chunkId?: SortOrder
  }

  export type KnowledgeEmbeddingMaxOrderByAggregateInput = {
    id?: SortOrder
    source?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    chunkId?: SortOrder
    text?: SortOrder
    type?: SortOrder
  }

  export type KnowledgeEmbeddingMinOrderByAggregateInput = {
    id?: SortOrder
    source?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    chunkId?: SortOrder
    text?: SortOrder
    type?: SortOrder
  }

  export type KnowledgeEmbeddingSumOrderByAggregateInput = {
    chunkId?: SortOrder
  }

  export type FloatNullableListFilter<$PrismaModel = never> = {
    equals?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    has?: number | FloatFieldRefInput<$PrismaModel> | null
    hasEvery?: number[] | ListFloatFieldRefInput<$PrismaModel>
    hasSome?: number[] | ListFloatFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type EmbeddingCountOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    embedding?: SortOrder
    source?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type EmbeddingAvgOrderByAggregateInput = {
    embedding?: SortOrder
  }

  export type EmbeddingMaxOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    source?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type EmbeddingMinOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    source?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type EmbeddingSumOrderByAggregateInput = {
    embedding?: SortOrder
  }

  export type EntryListRelationFilter = {
    every?: EntryWhereInput
    some?: EntryWhereInput
    none?: EntryWhereInput
  }

  export type EntryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    currency?: SortOrder
    createdAt?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    currency?: SortOrder
    createdAt?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    currency?: SortOrder
    createdAt?: SortOrder
  }

  export type LedgerIdempotencyNullableScalarRelationFilter = {
    is?: LedgerIdempotencyWhereInput | null
    isNot?: LedgerIdempotencyWhereInput | null
  }

  export type LedgerTransactionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    reference?: SortOrder
    description?: SortOrder
    state?: SortOrder
    idempotencyKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    postedAt?: SortOrder
  }

  export type LedgerTransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    reference?: SortOrder
    description?: SortOrder
    state?: SortOrder
    idempotencyKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    postedAt?: SortOrder
  }

  export type LedgerTransactionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    reference?: SortOrder
    description?: SortOrder
    state?: SortOrder
    idempotencyKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    postedAt?: SortOrder
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type LedgerTransactionScalarRelationFilter = {
    is?: LedgerTransactionWhereInput
    isNot?: LedgerTransactionWhereInput
  }

  export type AccountScalarRelationFilter = {
    is?: AccountWhereInput
    isNot?: AccountWhereInput
  }

  export type EntryCountOrderByAggregateInput = {
    id?: SortOrder
    transactionId?: SortOrder
    accountId?: SortOrder
    debit?: SortOrder
    credit?: SortOrder
    currency?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type EntryAvgOrderByAggregateInput = {
    debit?: SortOrder
    credit?: SortOrder
  }

  export type EntryMaxOrderByAggregateInput = {
    id?: SortOrder
    transactionId?: SortOrder
    accountId?: SortOrder
    debit?: SortOrder
    credit?: SortOrder
    currency?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type EntryMinOrderByAggregateInput = {
    id?: SortOrder
    transactionId?: SortOrder
    accountId?: SortOrder
    debit?: SortOrder
    credit?: SortOrder
    currency?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type EntrySumOrderByAggregateInput = {
    debit?: SortOrder
    credit?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type LedgerIdempotencyCountOrderByAggregateInput = {
    id?: SortOrder
    idempotencyKey?: SortOrder
    transactionId?: SortOrder
    createdAt?: SortOrder
  }

  export type LedgerIdempotencyMaxOrderByAggregateInput = {
    id?: SortOrder
    idempotencyKey?: SortOrder
    transactionId?: SortOrder
    createdAt?: SortOrder
  }

  export type LedgerIdempotencyMinOrderByAggregateInput = {
    id?: SortOrder
    idempotencyKey?: SortOrder
    transactionId?: SortOrder
    createdAt?: SortOrder
  }

  export type DemoCreateNestedOneWithoutLeadInput = {
    create?: XOR<DemoCreateWithoutLeadInput, DemoUncheckedCreateWithoutLeadInput>
    connectOrCreate?: DemoCreateOrConnectWithoutLeadInput
    connect?: DemoWhereUniqueInput
  }

  export type EmailEventCreateNestedManyWithoutLeadInput = {
    create?: XOR<EmailEventCreateWithoutLeadInput, EmailEventUncheckedCreateWithoutLeadInput> | EmailEventCreateWithoutLeadInput[] | EmailEventUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: EmailEventCreateOrConnectWithoutLeadInput | EmailEventCreateOrConnectWithoutLeadInput[]
    createMany?: EmailEventCreateManyLeadInputEnvelope
    connect?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
  }

  export type PaymentCreateNestedManyWithoutLeadInput = {
    create?: XOR<PaymentCreateWithoutLeadInput, PaymentUncheckedCreateWithoutLeadInput> | PaymentCreateWithoutLeadInput[] | PaymentUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutLeadInput | PaymentCreateOrConnectWithoutLeadInput[]
    createMany?: PaymentCreateManyLeadInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type DemoUncheckedCreateNestedOneWithoutLeadInput = {
    create?: XOR<DemoCreateWithoutLeadInput, DemoUncheckedCreateWithoutLeadInput>
    connectOrCreate?: DemoCreateOrConnectWithoutLeadInput
    connect?: DemoWhereUniqueInput
  }

  export type EmailEventUncheckedCreateNestedManyWithoutLeadInput = {
    create?: XOR<EmailEventCreateWithoutLeadInput, EmailEventUncheckedCreateWithoutLeadInput> | EmailEventCreateWithoutLeadInput[] | EmailEventUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: EmailEventCreateOrConnectWithoutLeadInput | EmailEventCreateOrConnectWithoutLeadInput[]
    createMany?: EmailEventCreateManyLeadInputEnvelope
    connect?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedManyWithoutLeadInput = {
    create?: XOR<PaymentCreateWithoutLeadInput, PaymentUncheckedCreateWithoutLeadInput> | PaymentCreateWithoutLeadInput[] | PaymentUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutLeadInput | PaymentCreateOrConnectWithoutLeadInput[]
    createMany?: PaymentCreateManyLeadInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type DemoUpdateOneWithoutLeadNestedInput = {
    create?: XOR<DemoCreateWithoutLeadInput, DemoUncheckedCreateWithoutLeadInput>
    connectOrCreate?: DemoCreateOrConnectWithoutLeadInput
    upsert?: DemoUpsertWithoutLeadInput
    disconnect?: DemoWhereInput | boolean
    delete?: DemoWhereInput | boolean
    connect?: DemoWhereUniqueInput
    update?: XOR<XOR<DemoUpdateToOneWithWhereWithoutLeadInput, DemoUpdateWithoutLeadInput>, DemoUncheckedUpdateWithoutLeadInput>
  }

  export type EmailEventUpdateManyWithoutLeadNestedInput = {
    create?: XOR<EmailEventCreateWithoutLeadInput, EmailEventUncheckedCreateWithoutLeadInput> | EmailEventCreateWithoutLeadInput[] | EmailEventUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: EmailEventCreateOrConnectWithoutLeadInput | EmailEventCreateOrConnectWithoutLeadInput[]
    upsert?: EmailEventUpsertWithWhereUniqueWithoutLeadInput | EmailEventUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: EmailEventCreateManyLeadInputEnvelope
    set?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
    disconnect?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
    delete?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
    connect?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
    update?: EmailEventUpdateWithWhereUniqueWithoutLeadInput | EmailEventUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: EmailEventUpdateManyWithWhereWithoutLeadInput | EmailEventUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: EmailEventScalarWhereInput | EmailEventScalarWhereInput[]
  }

  export type PaymentUpdateManyWithoutLeadNestedInput = {
    create?: XOR<PaymentCreateWithoutLeadInput, PaymentUncheckedCreateWithoutLeadInput> | PaymentCreateWithoutLeadInput[] | PaymentUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutLeadInput | PaymentCreateOrConnectWithoutLeadInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutLeadInput | PaymentUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: PaymentCreateManyLeadInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutLeadInput | PaymentUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutLeadInput | PaymentUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type DemoUncheckedUpdateOneWithoutLeadNestedInput = {
    create?: XOR<DemoCreateWithoutLeadInput, DemoUncheckedCreateWithoutLeadInput>
    connectOrCreate?: DemoCreateOrConnectWithoutLeadInput
    upsert?: DemoUpsertWithoutLeadInput
    disconnect?: DemoWhereInput | boolean
    delete?: DemoWhereInput | boolean
    connect?: DemoWhereUniqueInput
    update?: XOR<XOR<DemoUpdateToOneWithWhereWithoutLeadInput, DemoUpdateWithoutLeadInput>, DemoUncheckedUpdateWithoutLeadInput>
  }

  export type EmailEventUncheckedUpdateManyWithoutLeadNestedInput = {
    create?: XOR<EmailEventCreateWithoutLeadInput, EmailEventUncheckedCreateWithoutLeadInput> | EmailEventCreateWithoutLeadInput[] | EmailEventUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: EmailEventCreateOrConnectWithoutLeadInput | EmailEventCreateOrConnectWithoutLeadInput[]
    upsert?: EmailEventUpsertWithWhereUniqueWithoutLeadInput | EmailEventUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: EmailEventCreateManyLeadInputEnvelope
    set?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
    disconnect?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
    delete?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
    connect?: EmailEventWhereUniqueInput | EmailEventWhereUniqueInput[]
    update?: EmailEventUpdateWithWhereUniqueWithoutLeadInput | EmailEventUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: EmailEventUpdateManyWithWhereWithoutLeadInput | EmailEventUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: EmailEventScalarWhereInput | EmailEventScalarWhereInput[]
  }

  export type PaymentUncheckedUpdateManyWithoutLeadNestedInput = {
    create?: XOR<PaymentCreateWithoutLeadInput, PaymentUncheckedCreateWithoutLeadInput> | PaymentCreateWithoutLeadInput[] | PaymentUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutLeadInput | PaymentCreateOrConnectWithoutLeadInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutLeadInput | PaymentUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: PaymentCreateManyLeadInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutLeadInput | PaymentUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutLeadInput | PaymentUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type TokenHolderCreateNestedManyWithoutTokenizedAssetInput = {
    create?: XOR<TokenHolderCreateWithoutTokenizedAssetInput, TokenHolderUncheckedCreateWithoutTokenizedAssetInput> | TokenHolderCreateWithoutTokenizedAssetInput[] | TokenHolderUncheckedCreateWithoutTokenizedAssetInput[]
    connectOrCreate?: TokenHolderCreateOrConnectWithoutTokenizedAssetInput | TokenHolderCreateOrConnectWithoutTokenizedAssetInput[]
    createMany?: TokenHolderCreateManyTokenizedAssetInputEnvelope
    connect?: TokenHolderWhereUniqueInput | TokenHolderWhereUniqueInput[]
  }

  export type TokenHolderUncheckedCreateNestedManyWithoutTokenizedAssetInput = {
    create?: XOR<TokenHolderCreateWithoutTokenizedAssetInput, TokenHolderUncheckedCreateWithoutTokenizedAssetInput> | TokenHolderCreateWithoutTokenizedAssetInput[] | TokenHolderUncheckedCreateWithoutTokenizedAssetInput[]
    connectOrCreate?: TokenHolderCreateOrConnectWithoutTokenizedAssetInput | TokenHolderCreateOrConnectWithoutTokenizedAssetInput[]
    createMany?: TokenHolderCreateManyTokenizedAssetInputEnvelope
    connect?: TokenHolderWhereUniqueInput | TokenHolderWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type TokenHolderUpdateManyWithoutTokenizedAssetNestedInput = {
    create?: XOR<TokenHolderCreateWithoutTokenizedAssetInput, TokenHolderUncheckedCreateWithoutTokenizedAssetInput> | TokenHolderCreateWithoutTokenizedAssetInput[] | TokenHolderUncheckedCreateWithoutTokenizedAssetInput[]
    connectOrCreate?: TokenHolderCreateOrConnectWithoutTokenizedAssetInput | TokenHolderCreateOrConnectWithoutTokenizedAssetInput[]
    upsert?: TokenHolderUpsertWithWhereUniqueWithoutTokenizedAssetInput | TokenHolderUpsertWithWhereUniqueWithoutTokenizedAssetInput[]
    createMany?: TokenHolderCreateManyTokenizedAssetInputEnvelope
    set?: TokenHolderWhereUniqueInput | TokenHolderWhereUniqueInput[]
    disconnect?: TokenHolderWhereUniqueInput | TokenHolderWhereUniqueInput[]
    delete?: TokenHolderWhereUniqueInput | TokenHolderWhereUniqueInput[]
    connect?: TokenHolderWhereUniqueInput | TokenHolderWhereUniqueInput[]
    update?: TokenHolderUpdateWithWhereUniqueWithoutTokenizedAssetInput | TokenHolderUpdateWithWhereUniqueWithoutTokenizedAssetInput[]
    updateMany?: TokenHolderUpdateManyWithWhereWithoutTokenizedAssetInput | TokenHolderUpdateManyWithWhereWithoutTokenizedAssetInput[]
    deleteMany?: TokenHolderScalarWhereInput | TokenHolderScalarWhereInput[]
  }

  export type TokenHolderUncheckedUpdateManyWithoutTokenizedAssetNestedInput = {
    create?: XOR<TokenHolderCreateWithoutTokenizedAssetInput, TokenHolderUncheckedCreateWithoutTokenizedAssetInput> | TokenHolderCreateWithoutTokenizedAssetInput[] | TokenHolderUncheckedCreateWithoutTokenizedAssetInput[]
    connectOrCreate?: TokenHolderCreateOrConnectWithoutTokenizedAssetInput | TokenHolderCreateOrConnectWithoutTokenizedAssetInput[]
    upsert?: TokenHolderUpsertWithWhereUniqueWithoutTokenizedAssetInput | TokenHolderUpsertWithWhereUniqueWithoutTokenizedAssetInput[]
    createMany?: TokenHolderCreateManyTokenizedAssetInputEnvelope
    set?: TokenHolderWhereUniqueInput | TokenHolderWhereUniqueInput[]
    disconnect?: TokenHolderWhereUniqueInput | TokenHolderWhereUniqueInput[]
    delete?: TokenHolderWhereUniqueInput | TokenHolderWhereUniqueInput[]
    connect?: TokenHolderWhereUniqueInput | TokenHolderWhereUniqueInput[]
    update?: TokenHolderUpdateWithWhereUniqueWithoutTokenizedAssetInput | TokenHolderUpdateWithWhereUniqueWithoutTokenizedAssetInput[]
    updateMany?: TokenHolderUpdateManyWithWhereWithoutTokenizedAssetInput | TokenHolderUpdateManyWithWhereWithoutTokenizedAssetInput[]
    deleteMany?: TokenHolderScalarWhereInput | TokenHolderScalarWhereInput[]
  }

  export type TokenizedAssetCreateNestedOneWithoutTokenHoldersInput = {
    create?: XOR<TokenizedAssetCreateWithoutTokenHoldersInput, TokenizedAssetUncheckedCreateWithoutTokenHoldersInput>
    connectOrCreate?: TokenizedAssetCreateOrConnectWithoutTokenHoldersInput
    connect?: TokenizedAssetWhereUniqueInput
  }

  export type TokenizedAssetUpdateOneRequiredWithoutTokenHoldersNestedInput = {
    create?: XOR<TokenizedAssetCreateWithoutTokenHoldersInput, TokenizedAssetUncheckedCreateWithoutTokenHoldersInput>
    connectOrCreate?: TokenizedAssetCreateOrConnectWithoutTokenHoldersInput
    upsert?: TokenizedAssetUpsertWithoutTokenHoldersInput
    connect?: TokenizedAssetWhereUniqueInput
    update?: XOR<XOR<TokenizedAssetUpdateToOneWithWhereWithoutTokenHoldersInput, TokenizedAssetUpdateWithoutTokenHoldersInput>, TokenizedAssetUncheckedUpdateWithoutTokenHoldersInput>
  }

  export type LeadCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<LeadCreateWithoutPaymentsInput, LeadUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: LeadCreateOrConnectWithoutPaymentsInput
    connect?: LeadWhereUniqueInput
  }

  export type LeadUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<LeadCreateWithoutPaymentsInput, LeadUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: LeadCreateOrConnectWithoutPaymentsInput
    upsert?: LeadUpsertWithoutPaymentsInput
    connect?: LeadWhereUniqueInput
    update?: XOR<XOR<LeadUpdateToOneWithWhereWithoutPaymentsInput, LeadUpdateWithoutPaymentsInput>, LeadUncheckedUpdateWithoutPaymentsInput>
  }

  export type LeadCreateNestedOneWithoutDemoInput = {
    create?: XOR<LeadCreateWithoutDemoInput, LeadUncheckedCreateWithoutDemoInput>
    connectOrCreate?: LeadCreateOrConnectWithoutDemoInput
    connect?: LeadWhereUniqueInput
  }

  export type LeadUpdateOneRequiredWithoutDemoNestedInput = {
    create?: XOR<LeadCreateWithoutDemoInput, LeadUncheckedCreateWithoutDemoInput>
    connectOrCreate?: LeadCreateOrConnectWithoutDemoInput
    upsert?: LeadUpsertWithoutDemoInput
    connect?: LeadWhereUniqueInput
    update?: XOR<XOR<LeadUpdateToOneWithWhereWithoutDemoInput, LeadUpdateWithoutDemoInput>, LeadUncheckedUpdateWithoutDemoInput>
  }

  export type LeadCreateNestedOneWithoutEmailEventsInput = {
    create?: XOR<LeadCreateWithoutEmailEventsInput, LeadUncheckedCreateWithoutEmailEventsInput>
    connectOrCreate?: LeadCreateOrConnectWithoutEmailEventsInput
    connect?: LeadWhereUniqueInput
  }

  export type LeadUpdateOneRequiredWithoutEmailEventsNestedInput = {
    create?: XOR<LeadCreateWithoutEmailEventsInput, LeadUncheckedCreateWithoutEmailEventsInput>
    connectOrCreate?: LeadCreateOrConnectWithoutEmailEventsInput
    upsert?: LeadUpsertWithoutEmailEventsInput
    connect?: LeadWhereUniqueInput
    update?: XOR<XOR<LeadUpdateToOneWithWhereWithoutEmailEventsInput, LeadUpdateWithoutEmailEventsInput>, LeadUncheckedUpdateWithoutEmailEventsInput>
  }

  export type EmbeddingCreateembeddingInput = {
    set: number[]
  }

  export type EmbeddingUpdateembeddingInput = {
    set?: number[]
    push?: number | number[]
  }

  export type EntryCreateNestedManyWithoutAccountInput = {
    create?: XOR<EntryCreateWithoutAccountInput, EntryUncheckedCreateWithoutAccountInput> | EntryCreateWithoutAccountInput[] | EntryUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: EntryCreateOrConnectWithoutAccountInput | EntryCreateOrConnectWithoutAccountInput[]
    createMany?: EntryCreateManyAccountInputEnvelope
    connect?: EntryWhereUniqueInput | EntryWhereUniqueInput[]
  }

  export type EntryUncheckedCreateNestedManyWithoutAccountInput = {
    create?: XOR<EntryCreateWithoutAccountInput, EntryUncheckedCreateWithoutAccountInput> | EntryCreateWithoutAccountInput[] | EntryUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: EntryCreateOrConnectWithoutAccountInput | EntryCreateOrConnectWithoutAccountInput[]
    createMany?: EntryCreateManyAccountInputEnvelope
    connect?: EntryWhereUniqueInput | EntryWhereUniqueInput[]
  }

  export type EntryUpdateManyWithoutAccountNestedInput = {
    create?: XOR<EntryCreateWithoutAccountInput, EntryUncheckedCreateWithoutAccountInput> | EntryCreateWithoutAccountInput[] | EntryUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: EntryCreateOrConnectWithoutAccountInput | EntryCreateOrConnectWithoutAccountInput[]
    upsert?: EntryUpsertWithWhereUniqueWithoutAccountInput | EntryUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: EntryCreateManyAccountInputEnvelope
    set?: EntryWhereUniqueInput | EntryWhereUniqueInput[]
    disconnect?: EntryWhereUniqueInput | EntryWhereUniqueInput[]
    delete?: EntryWhereUniqueInput | EntryWhereUniqueInput[]
    connect?: EntryWhereUniqueInput | EntryWhereUniqueInput[]
    update?: EntryUpdateWithWhereUniqueWithoutAccountInput | EntryUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: EntryUpdateManyWithWhereWithoutAccountInput | EntryUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: EntryScalarWhereInput | EntryScalarWhereInput[]
  }

  export type EntryUncheckedUpdateManyWithoutAccountNestedInput = {
    create?: XOR<EntryCreateWithoutAccountInput, EntryUncheckedCreateWithoutAccountInput> | EntryCreateWithoutAccountInput[] | EntryUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: EntryCreateOrConnectWithoutAccountInput | EntryCreateOrConnectWithoutAccountInput[]
    upsert?: EntryUpsertWithWhereUniqueWithoutAccountInput | EntryUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: EntryCreateManyAccountInputEnvelope
    set?: EntryWhereUniqueInput | EntryWhereUniqueInput[]
    disconnect?: EntryWhereUniqueInput | EntryWhereUniqueInput[]
    delete?: EntryWhereUniqueInput | EntryWhereUniqueInput[]
    connect?: EntryWhereUniqueInput | EntryWhereUniqueInput[]
    update?: EntryUpdateWithWhereUniqueWithoutAccountInput | EntryUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: EntryUpdateManyWithWhereWithoutAccountInput | EntryUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: EntryScalarWhereInput | EntryScalarWhereInput[]
  }

  export type EntryCreateNestedManyWithoutTransactionInput = {
    create?: XOR<EntryCreateWithoutTransactionInput, EntryUncheckedCreateWithoutTransactionInput> | EntryCreateWithoutTransactionInput[] | EntryUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: EntryCreateOrConnectWithoutTransactionInput | EntryCreateOrConnectWithoutTransactionInput[]
    createMany?: EntryCreateManyTransactionInputEnvelope
    connect?: EntryWhereUniqueInput | EntryWhereUniqueInput[]
  }

  export type LedgerIdempotencyCreateNestedOneWithoutTransactionInput = {
    create?: XOR<LedgerIdempotencyCreateWithoutTransactionInput, LedgerIdempotencyUncheckedCreateWithoutTransactionInput>
    connectOrCreate?: LedgerIdempotencyCreateOrConnectWithoutTransactionInput
    connect?: LedgerIdempotencyWhereUniqueInput
  }

  export type EntryUncheckedCreateNestedManyWithoutTransactionInput = {
    create?: XOR<EntryCreateWithoutTransactionInput, EntryUncheckedCreateWithoutTransactionInput> | EntryCreateWithoutTransactionInput[] | EntryUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: EntryCreateOrConnectWithoutTransactionInput | EntryCreateOrConnectWithoutTransactionInput[]
    createMany?: EntryCreateManyTransactionInputEnvelope
    connect?: EntryWhereUniqueInput | EntryWhereUniqueInput[]
  }

  export type LedgerIdempotencyUncheckedCreateNestedOneWithoutTransactionInput = {
    create?: XOR<LedgerIdempotencyCreateWithoutTransactionInput, LedgerIdempotencyUncheckedCreateWithoutTransactionInput>
    connectOrCreate?: LedgerIdempotencyCreateOrConnectWithoutTransactionInput
    connect?: LedgerIdempotencyWhereUniqueInput
  }

  export type EntryUpdateManyWithoutTransactionNestedInput = {
    create?: XOR<EntryCreateWithoutTransactionInput, EntryUncheckedCreateWithoutTransactionInput> | EntryCreateWithoutTransactionInput[] | EntryUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: EntryCreateOrConnectWithoutTransactionInput | EntryCreateOrConnectWithoutTransactionInput[]
    upsert?: EntryUpsertWithWhereUniqueWithoutTransactionInput | EntryUpsertWithWhereUniqueWithoutTransactionInput[]
    createMany?: EntryCreateManyTransactionInputEnvelope
    set?: EntryWhereUniqueInput | EntryWhereUniqueInput[]
    disconnect?: EntryWhereUniqueInput | EntryWhereUniqueInput[]
    delete?: EntryWhereUniqueInput | EntryWhereUniqueInput[]
    connect?: EntryWhereUniqueInput | EntryWhereUniqueInput[]
    update?: EntryUpdateWithWhereUniqueWithoutTransactionInput | EntryUpdateWithWhereUniqueWithoutTransactionInput[]
    updateMany?: EntryUpdateManyWithWhereWithoutTransactionInput | EntryUpdateManyWithWhereWithoutTransactionInput[]
    deleteMany?: EntryScalarWhereInput | EntryScalarWhereInput[]
  }

  export type LedgerIdempotencyUpdateOneWithoutTransactionNestedInput = {
    create?: XOR<LedgerIdempotencyCreateWithoutTransactionInput, LedgerIdempotencyUncheckedCreateWithoutTransactionInput>
    connectOrCreate?: LedgerIdempotencyCreateOrConnectWithoutTransactionInput
    upsert?: LedgerIdempotencyUpsertWithoutTransactionInput
    disconnect?: LedgerIdempotencyWhereInput | boolean
    delete?: LedgerIdempotencyWhereInput | boolean
    connect?: LedgerIdempotencyWhereUniqueInput
    update?: XOR<XOR<LedgerIdempotencyUpdateToOneWithWhereWithoutTransactionInput, LedgerIdempotencyUpdateWithoutTransactionInput>, LedgerIdempotencyUncheckedUpdateWithoutTransactionInput>
  }

  export type EntryUncheckedUpdateManyWithoutTransactionNestedInput = {
    create?: XOR<EntryCreateWithoutTransactionInput, EntryUncheckedCreateWithoutTransactionInput> | EntryCreateWithoutTransactionInput[] | EntryUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: EntryCreateOrConnectWithoutTransactionInput | EntryCreateOrConnectWithoutTransactionInput[]
    upsert?: EntryUpsertWithWhereUniqueWithoutTransactionInput | EntryUpsertWithWhereUniqueWithoutTransactionInput[]
    createMany?: EntryCreateManyTransactionInputEnvelope
    set?: EntryWhereUniqueInput | EntryWhereUniqueInput[]
    disconnect?: EntryWhereUniqueInput | EntryWhereUniqueInput[]
    delete?: EntryWhereUniqueInput | EntryWhereUniqueInput[]
    connect?: EntryWhereUniqueInput | EntryWhereUniqueInput[]
    update?: EntryUpdateWithWhereUniqueWithoutTransactionInput | EntryUpdateWithWhereUniqueWithoutTransactionInput[]
    updateMany?: EntryUpdateManyWithWhereWithoutTransactionInput | EntryUpdateManyWithWhereWithoutTransactionInput[]
    deleteMany?: EntryScalarWhereInput | EntryScalarWhereInput[]
  }

  export type LedgerIdempotencyUncheckedUpdateOneWithoutTransactionNestedInput = {
    create?: XOR<LedgerIdempotencyCreateWithoutTransactionInput, LedgerIdempotencyUncheckedCreateWithoutTransactionInput>
    connectOrCreate?: LedgerIdempotencyCreateOrConnectWithoutTransactionInput
    upsert?: LedgerIdempotencyUpsertWithoutTransactionInput
    disconnect?: LedgerIdempotencyWhereInput | boolean
    delete?: LedgerIdempotencyWhereInput | boolean
    connect?: LedgerIdempotencyWhereUniqueInput
    update?: XOR<XOR<LedgerIdempotencyUpdateToOneWithWhereWithoutTransactionInput, LedgerIdempotencyUpdateWithoutTransactionInput>, LedgerIdempotencyUncheckedUpdateWithoutTransactionInput>
  }

  export type LedgerTransactionCreateNestedOneWithoutEntriesInput = {
    create?: XOR<LedgerTransactionCreateWithoutEntriesInput, LedgerTransactionUncheckedCreateWithoutEntriesInput>
    connectOrCreate?: LedgerTransactionCreateOrConnectWithoutEntriesInput
    connect?: LedgerTransactionWhereUniqueInput
  }

  export type AccountCreateNestedOneWithoutEntriesInput = {
    create?: XOR<AccountCreateWithoutEntriesInput, AccountUncheckedCreateWithoutEntriesInput>
    connectOrCreate?: AccountCreateOrConnectWithoutEntriesInput
    connect?: AccountWhereUniqueInput
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type LedgerTransactionUpdateOneRequiredWithoutEntriesNestedInput = {
    create?: XOR<LedgerTransactionCreateWithoutEntriesInput, LedgerTransactionUncheckedCreateWithoutEntriesInput>
    connectOrCreate?: LedgerTransactionCreateOrConnectWithoutEntriesInput
    upsert?: LedgerTransactionUpsertWithoutEntriesInput
    connect?: LedgerTransactionWhereUniqueInput
    update?: XOR<XOR<LedgerTransactionUpdateToOneWithWhereWithoutEntriesInput, LedgerTransactionUpdateWithoutEntriesInput>, LedgerTransactionUncheckedUpdateWithoutEntriesInput>
  }

  export type AccountUpdateOneRequiredWithoutEntriesNestedInput = {
    create?: XOR<AccountCreateWithoutEntriesInput, AccountUncheckedCreateWithoutEntriesInput>
    connectOrCreate?: AccountCreateOrConnectWithoutEntriesInput
    upsert?: AccountUpsertWithoutEntriesInput
    connect?: AccountWhereUniqueInput
    update?: XOR<XOR<AccountUpdateToOneWithWhereWithoutEntriesInput, AccountUpdateWithoutEntriesInput>, AccountUncheckedUpdateWithoutEntriesInput>
  }

  export type LedgerTransactionCreateNestedOneWithoutIdempotencyInput = {
    create?: XOR<LedgerTransactionCreateWithoutIdempotencyInput, LedgerTransactionUncheckedCreateWithoutIdempotencyInput>
    connectOrCreate?: LedgerTransactionCreateOrConnectWithoutIdempotencyInput
    connect?: LedgerTransactionWhereUniqueInput
  }

  export type LedgerTransactionUpdateOneRequiredWithoutIdempotencyNestedInput = {
    create?: XOR<LedgerTransactionCreateWithoutIdempotencyInput, LedgerTransactionUncheckedCreateWithoutIdempotencyInput>
    connectOrCreate?: LedgerTransactionCreateOrConnectWithoutIdempotencyInput
    upsert?: LedgerTransactionUpsertWithoutIdempotencyInput
    connect?: LedgerTransactionWhereUniqueInput
    update?: XOR<XOR<LedgerTransactionUpdateToOneWithWhereWithoutIdempotencyInput, LedgerTransactionUpdateWithoutIdempotencyInput>, LedgerTransactionUncheckedUpdateWithoutIdempotencyInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type DemoCreateWithoutLeadInput = {
    id?: string
    slug: string
    config?: NullableJsonNullValueInput | InputJsonValue
    approved?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DemoUncheckedCreateWithoutLeadInput = {
    id?: string
    slug: string
    config?: NullableJsonNullValueInput | InputJsonValue
    approved?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DemoCreateOrConnectWithoutLeadInput = {
    where: DemoWhereUniqueInput
    create: XOR<DemoCreateWithoutLeadInput, DemoUncheckedCreateWithoutLeadInput>
  }

  export type EmailEventCreateWithoutLeadInput = {
    id?: string
    type: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type EmailEventUncheckedCreateWithoutLeadInput = {
    id?: string
    type: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type EmailEventCreateOrConnectWithoutLeadInput = {
    where: EmailEventWhereUniqueInput
    create: XOR<EmailEventCreateWithoutLeadInput, EmailEventUncheckedCreateWithoutLeadInput>
  }

  export type EmailEventCreateManyLeadInputEnvelope = {
    data: EmailEventCreateManyLeadInput | EmailEventCreateManyLeadInput[]
    skipDuplicates?: boolean
  }

  export type PaymentCreateWithoutLeadInput = {
    id?: string
    amount: number
    status?: string
    reference: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUncheckedCreateWithoutLeadInput = {
    id?: string
    amount: number
    status?: string
    reference: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentCreateOrConnectWithoutLeadInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutLeadInput, PaymentUncheckedCreateWithoutLeadInput>
  }

  export type PaymentCreateManyLeadInputEnvelope = {
    data: PaymentCreateManyLeadInput | PaymentCreateManyLeadInput[]
    skipDuplicates?: boolean
  }

  export type DemoUpsertWithoutLeadInput = {
    update: XOR<DemoUpdateWithoutLeadInput, DemoUncheckedUpdateWithoutLeadInput>
    create: XOR<DemoCreateWithoutLeadInput, DemoUncheckedCreateWithoutLeadInput>
    where?: DemoWhereInput
  }

  export type DemoUpdateToOneWithWhereWithoutLeadInput = {
    where?: DemoWhereInput
    data: XOR<DemoUpdateWithoutLeadInput, DemoUncheckedUpdateWithoutLeadInput>
  }

  export type DemoUpdateWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    config?: NullableJsonNullValueInput | InputJsonValue
    approved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DemoUncheckedUpdateWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    config?: NullableJsonNullValueInput | InputJsonValue
    approved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailEventUpsertWithWhereUniqueWithoutLeadInput = {
    where: EmailEventWhereUniqueInput
    update: XOR<EmailEventUpdateWithoutLeadInput, EmailEventUncheckedUpdateWithoutLeadInput>
    create: XOR<EmailEventCreateWithoutLeadInput, EmailEventUncheckedCreateWithoutLeadInput>
  }

  export type EmailEventUpdateWithWhereUniqueWithoutLeadInput = {
    where: EmailEventWhereUniqueInput
    data: XOR<EmailEventUpdateWithoutLeadInput, EmailEventUncheckedUpdateWithoutLeadInput>
  }

  export type EmailEventUpdateManyWithWhereWithoutLeadInput = {
    where: EmailEventScalarWhereInput
    data: XOR<EmailEventUpdateManyMutationInput, EmailEventUncheckedUpdateManyWithoutLeadInput>
  }

  export type EmailEventScalarWhereInput = {
    AND?: EmailEventScalarWhereInput | EmailEventScalarWhereInput[]
    OR?: EmailEventScalarWhereInput[]
    NOT?: EmailEventScalarWhereInput | EmailEventScalarWhereInput[]
    id?: StringFilter<"EmailEvent"> | string
    leadId?: StringFilter<"EmailEvent"> | string
    type?: StringFilter<"EmailEvent"> | string
    metadata?: JsonNullableFilter<"EmailEvent">
    createdAt?: DateTimeFilter<"EmailEvent"> | Date | string
  }

  export type PaymentUpsertWithWhereUniqueWithoutLeadInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutLeadInput, PaymentUncheckedUpdateWithoutLeadInput>
    create: XOR<PaymentCreateWithoutLeadInput, PaymentUncheckedCreateWithoutLeadInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutLeadInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutLeadInput, PaymentUncheckedUpdateWithoutLeadInput>
  }

  export type PaymentUpdateManyWithWhereWithoutLeadInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutLeadInput>
  }

  export type PaymentScalarWhereInput = {
    AND?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    OR?: PaymentScalarWhereInput[]
    NOT?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    id?: StringFilter<"Payment"> | string
    amount?: IntFilter<"Payment"> | number
    status?: StringFilter<"Payment"> | string
    reference?: StringFilter<"Payment"> | string
    leadId?: StringFilter<"Payment"> | string
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
  }

  export type TokenHolderCreateWithoutTokenizedAssetInput = {
    id?: string
    leadId?: string | null
    shares: number
    purchasePrice: Decimal | DecimalJsLike | number | string
    totalPaid: Decimal | DecimalJsLike | number | string
    transactionId?: string | null
    purchasedAt?: Date | string
  }

  export type TokenHolderUncheckedCreateWithoutTokenizedAssetInput = {
    id?: string
    leadId?: string | null
    shares: number
    purchasePrice: Decimal | DecimalJsLike | number | string
    totalPaid: Decimal | DecimalJsLike | number | string
    transactionId?: string | null
    purchasedAt?: Date | string
  }

  export type TokenHolderCreateOrConnectWithoutTokenizedAssetInput = {
    where: TokenHolderWhereUniqueInput
    create: XOR<TokenHolderCreateWithoutTokenizedAssetInput, TokenHolderUncheckedCreateWithoutTokenizedAssetInput>
  }

  export type TokenHolderCreateManyTokenizedAssetInputEnvelope = {
    data: TokenHolderCreateManyTokenizedAssetInput | TokenHolderCreateManyTokenizedAssetInput[]
    skipDuplicates?: boolean
  }

  export type TokenHolderUpsertWithWhereUniqueWithoutTokenizedAssetInput = {
    where: TokenHolderWhereUniqueInput
    update: XOR<TokenHolderUpdateWithoutTokenizedAssetInput, TokenHolderUncheckedUpdateWithoutTokenizedAssetInput>
    create: XOR<TokenHolderCreateWithoutTokenizedAssetInput, TokenHolderUncheckedCreateWithoutTokenizedAssetInput>
  }

  export type TokenHolderUpdateWithWhereUniqueWithoutTokenizedAssetInput = {
    where: TokenHolderWhereUniqueInput
    data: XOR<TokenHolderUpdateWithoutTokenizedAssetInput, TokenHolderUncheckedUpdateWithoutTokenizedAssetInput>
  }

  export type TokenHolderUpdateManyWithWhereWithoutTokenizedAssetInput = {
    where: TokenHolderScalarWhereInput
    data: XOR<TokenHolderUpdateManyMutationInput, TokenHolderUncheckedUpdateManyWithoutTokenizedAssetInput>
  }

  export type TokenHolderScalarWhereInput = {
    AND?: TokenHolderScalarWhereInput | TokenHolderScalarWhereInput[]
    OR?: TokenHolderScalarWhereInput[]
    NOT?: TokenHolderScalarWhereInput | TokenHolderScalarWhereInput[]
    id?: StringFilter<"TokenHolder"> | string
    tokenizedAssetId?: StringFilter<"TokenHolder"> | string
    leadId?: StringNullableFilter<"TokenHolder"> | string | null
    shares?: IntFilter<"TokenHolder"> | number
    purchasePrice?: DecimalFilter<"TokenHolder"> | Decimal | DecimalJsLike | number | string
    totalPaid?: DecimalFilter<"TokenHolder"> | Decimal | DecimalJsLike | number | string
    transactionId?: StringNullableFilter<"TokenHolder"> | string | null
    purchasedAt?: DateTimeFilter<"TokenHolder"> | Date | string
  }

  export type TokenizedAssetCreateWithoutTokenHoldersInput = {
    id?: string
    assetType: string
    name: string
    location?: string | null
    totalShares: number
    availableShares: number
    pricePerShare: Decimal | DecimalJsLike | number | string
    currency?: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TokenizedAssetUncheckedCreateWithoutTokenHoldersInput = {
    id?: string
    assetType: string
    name: string
    location?: string | null
    totalShares: number
    availableShares: number
    pricePerShare: Decimal | DecimalJsLike | number | string
    currency?: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TokenizedAssetCreateOrConnectWithoutTokenHoldersInput = {
    where: TokenizedAssetWhereUniqueInput
    create: XOR<TokenizedAssetCreateWithoutTokenHoldersInput, TokenizedAssetUncheckedCreateWithoutTokenHoldersInput>
  }

  export type TokenizedAssetUpsertWithoutTokenHoldersInput = {
    update: XOR<TokenizedAssetUpdateWithoutTokenHoldersInput, TokenizedAssetUncheckedUpdateWithoutTokenHoldersInput>
    create: XOR<TokenizedAssetCreateWithoutTokenHoldersInput, TokenizedAssetUncheckedCreateWithoutTokenHoldersInput>
    where?: TokenizedAssetWhereInput
  }

  export type TokenizedAssetUpdateToOneWithWhereWithoutTokenHoldersInput = {
    where?: TokenizedAssetWhereInput
    data: XOR<TokenizedAssetUpdateWithoutTokenHoldersInput, TokenizedAssetUncheckedUpdateWithoutTokenHoldersInput>
  }

  export type TokenizedAssetUpdateWithoutTokenHoldersInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetType?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    totalShares?: IntFieldUpdateOperationsInput | number
    availableShares?: IntFieldUpdateOperationsInput | number
    pricePerShare?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenizedAssetUncheckedUpdateWithoutTokenHoldersInput = {
    id?: StringFieldUpdateOperationsInput | string
    assetType?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    totalShares?: IntFieldUpdateOperationsInput | number
    availableShares?: IntFieldUpdateOperationsInput | number
    pricePerShare?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadCreateWithoutPaymentsInput = {
    id?: string
    phoneNumber?: string | null
    email?: string | null
    intent?: string | null
    status: string
    leadScore?: number | null
    tier?: string | null
    lastMessage?: string | null
    nextFollowUpAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    termsAccepted?: boolean
    miniAuditData?: NullableJsonNullValueInput | InputJsonValue
    paymentRef?: string | null
    demoApproved?: boolean
    demoScheduled?: boolean
    updatedAt?: Date | string
    createdAt?: Date | string
    demo?: DemoCreateNestedOneWithoutLeadInput
    emailEvents?: EmailEventCreateNestedManyWithoutLeadInput
  }

  export type LeadUncheckedCreateWithoutPaymentsInput = {
    id?: string
    phoneNumber?: string | null
    email?: string | null
    intent?: string | null
    status: string
    leadScore?: number | null
    tier?: string | null
    lastMessage?: string | null
    nextFollowUpAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    termsAccepted?: boolean
    miniAuditData?: NullableJsonNullValueInput | InputJsonValue
    paymentRef?: string | null
    demoApproved?: boolean
    demoScheduled?: boolean
    updatedAt?: Date | string
    createdAt?: Date | string
    demo?: DemoUncheckedCreateNestedOneWithoutLeadInput
    emailEvents?: EmailEventUncheckedCreateNestedManyWithoutLeadInput
  }

  export type LeadCreateOrConnectWithoutPaymentsInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutPaymentsInput, LeadUncheckedCreateWithoutPaymentsInput>
  }

  export type LeadUpsertWithoutPaymentsInput = {
    update: XOR<LeadUpdateWithoutPaymentsInput, LeadUncheckedUpdateWithoutPaymentsInput>
    create: XOR<LeadCreateWithoutPaymentsInput, LeadUncheckedCreateWithoutPaymentsInput>
    where?: LeadWhereInput
  }

  export type LeadUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: LeadWhereInput
    data: XOR<LeadUpdateWithoutPaymentsInput, LeadUncheckedUpdateWithoutPaymentsInput>
  }

  export type LeadUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    leadScore?: NullableIntFieldUpdateOperationsInput | number | null
    tier?: NullableStringFieldUpdateOperationsInput | string | null
    lastMessage?: NullableStringFieldUpdateOperationsInput | string | null
    nextFollowUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    termsAccepted?: BoolFieldUpdateOperationsInput | boolean
    miniAuditData?: NullableJsonNullValueInput | InputJsonValue
    paymentRef?: NullableStringFieldUpdateOperationsInput | string | null
    demoApproved?: BoolFieldUpdateOperationsInput | boolean
    demoScheduled?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    demo?: DemoUpdateOneWithoutLeadNestedInput
    emailEvents?: EmailEventUpdateManyWithoutLeadNestedInput
  }

  export type LeadUncheckedUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    leadScore?: NullableIntFieldUpdateOperationsInput | number | null
    tier?: NullableStringFieldUpdateOperationsInput | string | null
    lastMessage?: NullableStringFieldUpdateOperationsInput | string | null
    nextFollowUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    termsAccepted?: BoolFieldUpdateOperationsInput | boolean
    miniAuditData?: NullableJsonNullValueInput | InputJsonValue
    paymentRef?: NullableStringFieldUpdateOperationsInput | string | null
    demoApproved?: BoolFieldUpdateOperationsInput | boolean
    demoScheduled?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    demo?: DemoUncheckedUpdateOneWithoutLeadNestedInput
    emailEvents?: EmailEventUncheckedUpdateManyWithoutLeadNestedInput
  }

  export type LeadCreateWithoutDemoInput = {
    id?: string
    phoneNumber?: string | null
    email?: string | null
    intent?: string | null
    status: string
    leadScore?: number | null
    tier?: string | null
    lastMessage?: string | null
    nextFollowUpAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    termsAccepted?: boolean
    miniAuditData?: NullableJsonNullValueInput | InputJsonValue
    paymentRef?: string | null
    demoApproved?: boolean
    demoScheduled?: boolean
    updatedAt?: Date | string
    createdAt?: Date | string
    emailEvents?: EmailEventCreateNestedManyWithoutLeadInput
    payments?: PaymentCreateNestedManyWithoutLeadInput
  }

  export type LeadUncheckedCreateWithoutDemoInput = {
    id?: string
    phoneNumber?: string | null
    email?: string | null
    intent?: string | null
    status: string
    leadScore?: number | null
    tier?: string | null
    lastMessage?: string | null
    nextFollowUpAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    termsAccepted?: boolean
    miniAuditData?: NullableJsonNullValueInput | InputJsonValue
    paymentRef?: string | null
    demoApproved?: boolean
    demoScheduled?: boolean
    updatedAt?: Date | string
    createdAt?: Date | string
    emailEvents?: EmailEventUncheckedCreateNestedManyWithoutLeadInput
    payments?: PaymentUncheckedCreateNestedManyWithoutLeadInput
  }

  export type LeadCreateOrConnectWithoutDemoInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutDemoInput, LeadUncheckedCreateWithoutDemoInput>
  }

  export type LeadUpsertWithoutDemoInput = {
    update: XOR<LeadUpdateWithoutDemoInput, LeadUncheckedUpdateWithoutDemoInput>
    create: XOR<LeadCreateWithoutDemoInput, LeadUncheckedCreateWithoutDemoInput>
    where?: LeadWhereInput
  }

  export type LeadUpdateToOneWithWhereWithoutDemoInput = {
    where?: LeadWhereInput
    data: XOR<LeadUpdateWithoutDemoInput, LeadUncheckedUpdateWithoutDemoInput>
  }

  export type LeadUpdateWithoutDemoInput = {
    id?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    leadScore?: NullableIntFieldUpdateOperationsInput | number | null
    tier?: NullableStringFieldUpdateOperationsInput | string | null
    lastMessage?: NullableStringFieldUpdateOperationsInput | string | null
    nextFollowUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    termsAccepted?: BoolFieldUpdateOperationsInput | boolean
    miniAuditData?: NullableJsonNullValueInput | InputJsonValue
    paymentRef?: NullableStringFieldUpdateOperationsInput | string | null
    demoApproved?: BoolFieldUpdateOperationsInput | boolean
    demoScheduled?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailEvents?: EmailEventUpdateManyWithoutLeadNestedInput
    payments?: PaymentUpdateManyWithoutLeadNestedInput
  }

  export type LeadUncheckedUpdateWithoutDemoInput = {
    id?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    leadScore?: NullableIntFieldUpdateOperationsInput | number | null
    tier?: NullableStringFieldUpdateOperationsInput | string | null
    lastMessage?: NullableStringFieldUpdateOperationsInput | string | null
    nextFollowUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    termsAccepted?: BoolFieldUpdateOperationsInput | boolean
    miniAuditData?: NullableJsonNullValueInput | InputJsonValue
    paymentRef?: NullableStringFieldUpdateOperationsInput | string | null
    demoApproved?: BoolFieldUpdateOperationsInput | boolean
    demoScheduled?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailEvents?: EmailEventUncheckedUpdateManyWithoutLeadNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutLeadNestedInput
  }

  export type LeadCreateWithoutEmailEventsInput = {
    id?: string
    phoneNumber?: string | null
    email?: string | null
    intent?: string | null
    status: string
    leadScore?: number | null
    tier?: string | null
    lastMessage?: string | null
    nextFollowUpAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    termsAccepted?: boolean
    miniAuditData?: NullableJsonNullValueInput | InputJsonValue
    paymentRef?: string | null
    demoApproved?: boolean
    demoScheduled?: boolean
    updatedAt?: Date | string
    createdAt?: Date | string
    demo?: DemoCreateNestedOneWithoutLeadInput
    payments?: PaymentCreateNestedManyWithoutLeadInput
  }

  export type LeadUncheckedCreateWithoutEmailEventsInput = {
    id?: string
    phoneNumber?: string | null
    email?: string | null
    intent?: string | null
    status: string
    leadScore?: number | null
    tier?: string | null
    lastMessage?: string | null
    nextFollowUpAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    termsAccepted?: boolean
    miniAuditData?: NullableJsonNullValueInput | InputJsonValue
    paymentRef?: string | null
    demoApproved?: boolean
    demoScheduled?: boolean
    updatedAt?: Date | string
    createdAt?: Date | string
    demo?: DemoUncheckedCreateNestedOneWithoutLeadInput
    payments?: PaymentUncheckedCreateNestedManyWithoutLeadInput
  }

  export type LeadCreateOrConnectWithoutEmailEventsInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutEmailEventsInput, LeadUncheckedCreateWithoutEmailEventsInput>
  }

  export type LeadUpsertWithoutEmailEventsInput = {
    update: XOR<LeadUpdateWithoutEmailEventsInput, LeadUncheckedUpdateWithoutEmailEventsInput>
    create: XOR<LeadCreateWithoutEmailEventsInput, LeadUncheckedCreateWithoutEmailEventsInput>
    where?: LeadWhereInput
  }

  export type LeadUpdateToOneWithWhereWithoutEmailEventsInput = {
    where?: LeadWhereInput
    data: XOR<LeadUpdateWithoutEmailEventsInput, LeadUncheckedUpdateWithoutEmailEventsInput>
  }

  export type LeadUpdateWithoutEmailEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    leadScore?: NullableIntFieldUpdateOperationsInput | number | null
    tier?: NullableStringFieldUpdateOperationsInput | string | null
    lastMessage?: NullableStringFieldUpdateOperationsInput | string | null
    nextFollowUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    termsAccepted?: BoolFieldUpdateOperationsInput | boolean
    miniAuditData?: NullableJsonNullValueInput | InputJsonValue
    paymentRef?: NullableStringFieldUpdateOperationsInput | string | null
    demoApproved?: BoolFieldUpdateOperationsInput | boolean
    demoScheduled?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    demo?: DemoUpdateOneWithoutLeadNestedInput
    payments?: PaymentUpdateManyWithoutLeadNestedInput
  }

  export type LeadUncheckedUpdateWithoutEmailEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    leadScore?: NullableIntFieldUpdateOperationsInput | number | null
    tier?: NullableStringFieldUpdateOperationsInput | string | null
    lastMessage?: NullableStringFieldUpdateOperationsInput | string | null
    nextFollowUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    termsAccepted?: BoolFieldUpdateOperationsInput | boolean
    miniAuditData?: NullableJsonNullValueInput | InputJsonValue
    paymentRef?: NullableStringFieldUpdateOperationsInput | string | null
    demoApproved?: BoolFieldUpdateOperationsInput | boolean
    demoScheduled?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    demo?: DemoUncheckedUpdateOneWithoutLeadNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutLeadNestedInput
  }

  export type EntryCreateWithoutAccountInput = {
    id?: string
    debit?: bigint | number
    credit?: bigint | number
    currency?: string
    description?: string | null
    createdAt?: Date | string
    transaction: LedgerTransactionCreateNestedOneWithoutEntriesInput
  }

  export type EntryUncheckedCreateWithoutAccountInput = {
    id?: string
    transactionId: string
    debit?: bigint | number
    credit?: bigint | number
    currency?: string
    description?: string | null
    createdAt?: Date | string
  }

  export type EntryCreateOrConnectWithoutAccountInput = {
    where: EntryWhereUniqueInput
    create: XOR<EntryCreateWithoutAccountInput, EntryUncheckedCreateWithoutAccountInput>
  }

  export type EntryCreateManyAccountInputEnvelope = {
    data: EntryCreateManyAccountInput | EntryCreateManyAccountInput[]
    skipDuplicates?: boolean
  }

  export type EntryUpsertWithWhereUniqueWithoutAccountInput = {
    where: EntryWhereUniqueInput
    update: XOR<EntryUpdateWithoutAccountInput, EntryUncheckedUpdateWithoutAccountInput>
    create: XOR<EntryCreateWithoutAccountInput, EntryUncheckedCreateWithoutAccountInput>
  }

  export type EntryUpdateWithWhereUniqueWithoutAccountInput = {
    where: EntryWhereUniqueInput
    data: XOR<EntryUpdateWithoutAccountInput, EntryUncheckedUpdateWithoutAccountInput>
  }

  export type EntryUpdateManyWithWhereWithoutAccountInput = {
    where: EntryScalarWhereInput
    data: XOR<EntryUpdateManyMutationInput, EntryUncheckedUpdateManyWithoutAccountInput>
  }

  export type EntryScalarWhereInput = {
    AND?: EntryScalarWhereInput | EntryScalarWhereInput[]
    OR?: EntryScalarWhereInput[]
    NOT?: EntryScalarWhereInput | EntryScalarWhereInput[]
    id?: StringFilter<"Entry"> | string
    transactionId?: StringFilter<"Entry"> | string
    accountId?: StringFilter<"Entry"> | string
    debit?: BigIntFilter<"Entry"> | bigint | number
    credit?: BigIntFilter<"Entry"> | bigint | number
    currency?: StringFilter<"Entry"> | string
    description?: StringNullableFilter<"Entry"> | string | null
    createdAt?: DateTimeFilter<"Entry"> | Date | string
  }

  export type EntryCreateWithoutTransactionInput = {
    id?: string
    debit?: bigint | number
    credit?: bigint | number
    currency?: string
    description?: string | null
    createdAt?: Date | string
    account: AccountCreateNestedOneWithoutEntriesInput
  }

  export type EntryUncheckedCreateWithoutTransactionInput = {
    id?: string
    accountId: string
    debit?: bigint | number
    credit?: bigint | number
    currency?: string
    description?: string | null
    createdAt?: Date | string
  }

  export type EntryCreateOrConnectWithoutTransactionInput = {
    where: EntryWhereUniqueInput
    create: XOR<EntryCreateWithoutTransactionInput, EntryUncheckedCreateWithoutTransactionInput>
  }

  export type EntryCreateManyTransactionInputEnvelope = {
    data: EntryCreateManyTransactionInput | EntryCreateManyTransactionInput[]
    skipDuplicates?: boolean
  }

  export type LedgerIdempotencyCreateWithoutTransactionInput = {
    id?: string
    idempotencyKey: string
    createdAt?: Date | string
  }

  export type LedgerIdempotencyUncheckedCreateWithoutTransactionInput = {
    id?: string
    idempotencyKey: string
    createdAt?: Date | string
  }

  export type LedgerIdempotencyCreateOrConnectWithoutTransactionInput = {
    where: LedgerIdempotencyWhereUniqueInput
    create: XOR<LedgerIdempotencyCreateWithoutTransactionInput, LedgerIdempotencyUncheckedCreateWithoutTransactionInput>
  }

  export type EntryUpsertWithWhereUniqueWithoutTransactionInput = {
    where: EntryWhereUniqueInput
    update: XOR<EntryUpdateWithoutTransactionInput, EntryUncheckedUpdateWithoutTransactionInput>
    create: XOR<EntryCreateWithoutTransactionInput, EntryUncheckedCreateWithoutTransactionInput>
  }

  export type EntryUpdateWithWhereUniqueWithoutTransactionInput = {
    where: EntryWhereUniqueInput
    data: XOR<EntryUpdateWithoutTransactionInput, EntryUncheckedUpdateWithoutTransactionInput>
  }

  export type EntryUpdateManyWithWhereWithoutTransactionInput = {
    where: EntryScalarWhereInput
    data: XOR<EntryUpdateManyMutationInput, EntryUncheckedUpdateManyWithoutTransactionInput>
  }

  export type LedgerIdempotencyUpsertWithoutTransactionInput = {
    update: XOR<LedgerIdempotencyUpdateWithoutTransactionInput, LedgerIdempotencyUncheckedUpdateWithoutTransactionInput>
    create: XOR<LedgerIdempotencyCreateWithoutTransactionInput, LedgerIdempotencyUncheckedCreateWithoutTransactionInput>
    where?: LedgerIdempotencyWhereInput
  }

  export type LedgerIdempotencyUpdateToOneWithWhereWithoutTransactionInput = {
    where?: LedgerIdempotencyWhereInput
    data: XOR<LedgerIdempotencyUpdateWithoutTransactionInput, LedgerIdempotencyUncheckedUpdateWithoutTransactionInput>
  }

  export type LedgerIdempotencyUpdateWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LedgerIdempotencyUncheckedUpdateWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LedgerTransactionCreateWithoutEntriesInput = {
    id?: string
    userId: string
    reference: string
    description?: string | null
    state?: string
    idempotencyKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    postedAt?: Date | string | null
    idempotency?: LedgerIdempotencyCreateNestedOneWithoutTransactionInput
  }

  export type LedgerTransactionUncheckedCreateWithoutEntriesInput = {
    id?: string
    userId: string
    reference: string
    description?: string | null
    state?: string
    idempotencyKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    postedAt?: Date | string | null
    idempotency?: LedgerIdempotencyUncheckedCreateNestedOneWithoutTransactionInput
  }

  export type LedgerTransactionCreateOrConnectWithoutEntriesInput = {
    where: LedgerTransactionWhereUniqueInput
    create: XOR<LedgerTransactionCreateWithoutEntriesInput, LedgerTransactionUncheckedCreateWithoutEntriesInput>
  }

  export type AccountCreateWithoutEntriesInput = {
    id?: string
    userId: string
    type: string
    currency?: string
    createdAt?: Date | string
  }

  export type AccountUncheckedCreateWithoutEntriesInput = {
    id?: string
    userId: string
    type: string
    currency?: string
    createdAt?: Date | string
  }

  export type AccountCreateOrConnectWithoutEntriesInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutEntriesInput, AccountUncheckedCreateWithoutEntriesInput>
  }

  export type LedgerTransactionUpsertWithoutEntriesInput = {
    update: XOR<LedgerTransactionUpdateWithoutEntriesInput, LedgerTransactionUncheckedUpdateWithoutEntriesInput>
    create: XOR<LedgerTransactionCreateWithoutEntriesInput, LedgerTransactionUncheckedCreateWithoutEntriesInput>
    where?: LedgerTransactionWhereInput
  }

  export type LedgerTransactionUpdateToOneWithWhereWithoutEntriesInput = {
    where?: LedgerTransactionWhereInput
    data: XOR<LedgerTransactionUpdateWithoutEntriesInput, LedgerTransactionUncheckedUpdateWithoutEntriesInput>
  }

  export type LedgerTransactionUpdateWithoutEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    state?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    postedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    idempotency?: LedgerIdempotencyUpdateOneWithoutTransactionNestedInput
  }

  export type LedgerTransactionUncheckedUpdateWithoutEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    state?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    postedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    idempotency?: LedgerIdempotencyUncheckedUpdateOneWithoutTransactionNestedInput
  }

  export type AccountUpsertWithoutEntriesInput = {
    update: XOR<AccountUpdateWithoutEntriesInput, AccountUncheckedUpdateWithoutEntriesInput>
    create: XOR<AccountCreateWithoutEntriesInput, AccountUncheckedCreateWithoutEntriesInput>
    where?: AccountWhereInput
  }

  export type AccountUpdateToOneWithWhereWithoutEntriesInput = {
    where?: AccountWhereInput
    data: XOR<AccountUpdateWithoutEntriesInput, AccountUncheckedUpdateWithoutEntriesInput>
  }

  export type AccountUpdateWithoutEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateWithoutEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LedgerTransactionCreateWithoutIdempotencyInput = {
    id?: string
    userId: string
    reference: string
    description?: string | null
    state?: string
    idempotencyKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    postedAt?: Date | string | null
    entries?: EntryCreateNestedManyWithoutTransactionInput
  }

  export type LedgerTransactionUncheckedCreateWithoutIdempotencyInput = {
    id?: string
    userId: string
    reference: string
    description?: string | null
    state?: string
    idempotencyKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    postedAt?: Date | string | null
    entries?: EntryUncheckedCreateNestedManyWithoutTransactionInput
  }

  export type LedgerTransactionCreateOrConnectWithoutIdempotencyInput = {
    where: LedgerTransactionWhereUniqueInput
    create: XOR<LedgerTransactionCreateWithoutIdempotencyInput, LedgerTransactionUncheckedCreateWithoutIdempotencyInput>
  }

  export type LedgerTransactionUpsertWithoutIdempotencyInput = {
    update: XOR<LedgerTransactionUpdateWithoutIdempotencyInput, LedgerTransactionUncheckedUpdateWithoutIdempotencyInput>
    create: XOR<LedgerTransactionCreateWithoutIdempotencyInput, LedgerTransactionUncheckedCreateWithoutIdempotencyInput>
    where?: LedgerTransactionWhereInput
  }

  export type LedgerTransactionUpdateToOneWithWhereWithoutIdempotencyInput = {
    where?: LedgerTransactionWhereInput
    data: XOR<LedgerTransactionUpdateWithoutIdempotencyInput, LedgerTransactionUncheckedUpdateWithoutIdempotencyInput>
  }

  export type LedgerTransactionUpdateWithoutIdempotencyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    state?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    postedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    entries?: EntryUpdateManyWithoutTransactionNestedInput
  }

  export type LedgerTransactionUncheckedUpdateWithoutIdempotencyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    state?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    postedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    entries?: EntryUncheckedUpdateManyWithoutTransactionNestedInput
  }

  export type EmailEventCreateManyLeadInput = {
    id?: string
    type: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type PaymentCreateManyLeadInput = {
    id?: string
    amount: number
    status?: string
    reference: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmailEventUpdateWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailEventUncheckedUpdateWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailEventUncheckedUpdateManyWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUpdateWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenHolderCreateManyTokenizedAssetInput = {
    id?: string
    leadId?: string | null
    shares: number
    purchasePrice: Decimal | DecimalJsLike | number | string
    totalPaid: Decimal | DecimalJsLike | number | string
    transactionId?: string | null
    purchasedAt?: Date | string
  }

  export type TokenHolderUpdateWithoutTokenizedAssetInput = {
    id?: StringFieldUpdateOperationsInput | string
    leadId?: NullableStringFieldUpdateOperationsInput | string | null
    shares?: IntFieldUpdateOperationsInput | number
    purchasePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    purchasedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenHolderUncheckedUpdateWithoutTokenizedAssetInput = {
    id?: StringFieldUpdateOperationsInput | string
    leadId?: NullableStringFieldUpdateOperationsInput | string | null
    shares?: IntFieldUpdateOperationsInput | number
    purchasePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    purchasedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenHolderUncheckedUpdateManyWithoutTokenizedAssetInput = {
    id?: StringFieldUpdateOperationsInput | string
    leadId?: NullableStringFieldUpdateOperationsInput | string | null
    shares?: IntFieldUpdateOperationsInput | number
    purchasePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPaid?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    purchasedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntryCreateManyAccountInput = {
    id?: string
    transactionId: string
    debit?: bigint | number
    credit?: bigint | number
    currency?: string
    description?: string | null
    createdAt?: Date | string
  }

  export type EntryUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    debit?: BigIntFieldUpdateOperationsInput | bigint | number
    credit?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transaction?: LedgerTransactionUpdateOneRequiredWithoutEntriesNestedInput
  }

  export type EntryUncheckedUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    transactionId?: StringFieldUpdateOperationsInput | string
    debit?: BigIntFieldUpdateOperationsInput | bigint | number
    credit?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntryUncheckedUpdateManyWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    transactionId?: StringFieldUpdateOperationsInput | string
    debit?: BigIntFieldUpdateOperationsInput | bigint | number
    credit?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntryCreateManyTransactionInput = {
    id?: string
    accountId: string
    debit?: bigint | number
    credit?: bigint | number
    currency?: string
    description?: string | null
    createdAt?: Date | string
  }

  export type EntryUpdateWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    debit?: BigIntFieldUpdateOperationsInput | bigint | number
    credit?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    account?: AccountUpdateOneRequiredWithoutEntriesNestedInput
  }

  export type EntryUncheckedUpdateWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    debit?: BigIntFieldUpdateOperationsInput | bigint | number
    credit?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntryUncheckedUpdateManyWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    debit?: BigIntFieldUpdateOperationsInput | bigint | number
    credit?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}