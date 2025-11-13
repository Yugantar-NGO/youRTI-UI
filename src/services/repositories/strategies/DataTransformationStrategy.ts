/**
 * Data Transformation Strategy Pattern
 *
 * Provides a flexible way to transform raw data into application-specific formats.
 * Each strategy encapsulates a specific transformation logic.
 */

/**
 * Generic transformation strategy interface
 *
 * @template TInput - The input data type
 * @template TOutput - The transformed output type
 */
export interface DataTransformationStrategy<TInput, TOutput> {
  /**
   * Transform input data to output format
   *
   * @param data - The input data to transform
   * @returns The transformed data
   */
  transform(data: TInput): TOutput

  /**
   * Optional validation of input data before transformation
   *
   * @param data - The input data to validate
   * @returns true if valid, false otherwise
   */
  validate?(data: TInput): boolean
}

/**
 * Identity transformation strategy (no transformation)
 */
export class IdentityTransformationStrategy<T>
  implements DataTransformationStrategy<T, T>
{
  transform(data: T): T {
    return data
  }
}

/**
 * Compose multiple transformation strategies
 *
 * Allows chaining multiple transformations in sequence.
 *
 * @example
 * ```ts
 * const composedStrategy = new ComposedTransformationStrategy([
 *   new NormalizeDataStrategy(),
 *   new EnrichDataStrategy(),
 *   new FormatDataStrategy()
 * ])
 * ```
 */
export class ComposedTransformationStrategy<TInput, TOutput>
  implements DataTransformationStrategy<TInput, TOutput>
{
  constructor(
    private readonly strategies: DataTransformationStrategy<any, any>[]
  ) {}

  transform(data: TInput): TOutput {
    return this.strategies.reduce(
      (result, strategy) => strategy.transform(result),
      data as any
    ) as TOutput
  }

  validate(data: TInput): boolean {
    return this.strategies.every((strategy) => {
      if (strategy.validate) {
        return strategy.validate(data)
      }
      return true
    })
  }
}

/**
 * Array transformation strategy
 *
 * Transforms each item in an array using a provided strategy.
 *
 * @example
 * ```ts
 * const arrayStrategy = new ArrayTransformationStrategy(
 *   new UserTransformationStrategy()
 * )
 * const transformedUsers = arrayStrategy.transform(rawUsers)
 * ```
 */
export class ArrayTransformationStrategy<TInput, TOutput>
  implements DataTransformationStrategy<TInput[], TOutput[]>
{
  constructor(
    private readonly itemStrategy: DataTransformationStrategy<TInput, TOutput>
  ) {}

  transform(data: TInput[]): TOutput[] {
    return data.map((item) => this.itemStrategy.transform(item))
  }

  validate(data: TInput[]): boolean {
    if (!Array.isArray(data)) {
      return false
    }

    if (this.itemStrategy.validate) {
      return data.every((item) => this.itemStrategy.validate!(item))
    }

    return true
  }
}

/**
 * Filtering transformation strategy
 *
 * Filters data based on a predicate before transformation.
 *
 * @example
 * ```ts
 * const filterStrategy = new FilteringTransformationStrategy(
 *   (user) => user.active === true,
 *   new UserTransformationStrategy()
 * )
 * ```
 */
export class FilteringTransformationStrategy<TInput, TOutput>
  implements DataTransformationStrategy<TInput[], TOutput[]>
{
  constructor(
    private readonly predicate: (item: TInput) => boolean,
    private readonly itemStrategy: DataTransformationStrategy<TInput, TOutput>
  ) {}

  transform(data: TInput[]): TOutput[] {
    return data
      .filter(this.predicate)
      .map((item) => this.itemStrategy.transform(item))
  }

  validate(data: TInput[]): boolean {
    return Array.isArray(data)
  }
}

/**
 * Conditional transformation strategy
 *
 * Applies different transformation strategies based on a condition.
 *
 * @example
 * ```ts
 * const conditionalStrategy = new ConditionalTransformationStrategy(
 *   (data) => data.version === 'v2',
 *   new V2TransformationStrategy(),
 *   new V1TransformationStrategy()
 * )
 * ```
 */
export class ConditionalTransformationStrategy<TInput, TOutput>
  implements DataTransformationStrategy<TInput, TOutput>
{
  constructor(
    private readonly condition: (data: TInput) => boolean,
    private readonly trueStrategy: DataTransformationStrategy<TInput, TOutput>,
    private readonly falseStrategy: DataTransformationStrategy<TInput, TOutput>
  ) {}

  transform(data: TInput): TOutput {
    const strategy = this.condition(data)
      ? this.trueStrategy
      : this.falseStrategy
    return strategy.transform(data)
  }

  validate(data: TInput): boolean {
    const strategy = this.condition(data)
      ? this.trueStrategy
      : this.falseStrategy

    return strategy.validate ? strategy.validate(data) : true
  }
}

/**
 * Memoized transformation strategy
 *
 * Caches transformation results to avoid redundant computations.
 * Useful for expensive transformations on the same data.
 *
 * @example
 * ```ts
 * const memoizedStrategy = new MemoizedTransformationStrategy(
 *   new ExpensiveTransformationStrategy()
 * )
 * ```
 */
export class MemoizedTransformationStrategy<TInput, TOutput>
  implements DataTransformationStrategy<TInput, TOutput>
{
  private cache = new Map<string, TOutput>()

  constructor(
    private readonly strategy: DataTransformationStrategy<TInput, TOutput>,
    private readonly keyGenerator: (data: TInput) => string = (data) =>
      JSON.stringify(data)
  ) {}

  transform(data: TInput): TOutput {
    const key = this.keyGenerator(data)

    if (this.cache.has(key)) {
      return this.cache.get(key)!
    }

    const result = this.strategy.transform(data)
    this.cache.set(key, result)

    return result
  }

  validate(data: TInput): boolean {
    return this.strategy.validate ? this.strategy.validate(data) : true
  }

  clearCache(): void {
    this.cache.clear()
  }
}

/**
 * Factory for creating transformation strategies
 *
 * Provides a centralized way to create and manage transformation strategies.
 *
 * @example
 * ```ts
 * const factory = new TransformationStrategyFactory()
 * factory.register('user', new UserTransformationStrategy())
 * factory.register('post', new PostTransformationStrategy())
 *
 * const userStrategy = factory.get('user')
 * ```
 */
export class TransformationStrategyFactory {
  private strategies = new Map<string, DataTransformationStrategy<any, any>>()

  register<TInput, TOutput>(
    key: string,
    strategy: DataTransformationStrategy<TInput, TOutput>
  ): void {
    this.strategies.set(key, strategy)
  }

  get<TInput, TOutput>(
    key: string
  ): DataTransformationStrategy<TInput, TOutput> | undefined {
    return this.strategies.get(key)
  }

  has(key: string): boolean {
    return this.strategies.has(key)
  }

  clear(): void {
    this.strategies.clear()
  }
}
