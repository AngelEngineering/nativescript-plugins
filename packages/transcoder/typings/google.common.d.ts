/* eslint-disable @typescript-eslint/no-loss-of-precision */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/prefer-namespace-keyword */
/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="android-declarations.d.ts"/>

declare module com {
  export module google {
    export module common {
      export module annotations {
        export class GwtCompatible {
          public static class: java.lang.Class<com.google.common.annotations.GwtCompatible>;
          /**
           * Constructs a new instance of the com.google.common.annotations.GwtCompatible interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { serializable(): boolean; emulated(): boolean });
          public constructor();
          public emulated(): boolean;
          public serializable(): boolean;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module annotations {
        export class GwtIncompatible {
          public static class: java.lang.Class<com.google.common.annotations.GwtIncompatible>;
          /**
           * Constructs a new instance of the com.google.common.annotations.GwtIncompatible interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { value(): string });
          public constructor();
          public value(): string;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module annotations {
        export class VisibleForTesting {
          public static class: java.lang.Class<com.google.common.annotations.VisibleForTesting>;
          /**
           * Constructs a new instance of the com.google.common.annotations.VisibleForTesting interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module base {
        export abstract class FinalizablePhantomReference<T> extends java.lang.ref.PhantomReference<any> implements com.google.common.base.FinalizableReference {
          public static class: java.lang.Class<com.google.common.base.FinalizablePhantomReference<any>>;
          public constructor(referent: any, queue: com.google.common.base.FinalizableReferenceQueue);
          public finalizeReferent(): void;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module base {
        export class FinalizableReference {
          public static class: java.lang.Class<com.google.common.base.FinalizableReference>;
          /**
           * Constructs a new instance of the com.google.common.base.FinalizableReference interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { finalizeReferent(): void });
          public constructor();
          public finalizeReferent(): void;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module base {
        export class FinalizableReferenceQueue {
          public static class: java.lang.Class<com.google.common.base.FinalizableReferenceQueue>;
          public constructor();
        }
        export module FinalizableReferenceQueue {
          export class DecoupledLoader extends com.google.common.base.FinalizableReferenceQueue.FinalizerLoader {
            public static class: java.lang.Class<com.google.common.base.FinalizableReferenceQueue.DecoupledLoader>;
            public loadFinalizer(): java.lang.Class<any>;
          }
          export class DirectLoader extends com.google.common.base.FinalizableReferenceQueue.FinalizerLoader {
            public static class: java.lang.Class<com.google.common.base.FinalizableReferenceQueue.DirectLoader>;
            public loadFinalizer(): java.lang.Class<any>;
          }
          export class FinalizerLoader {
            public static class: java.lang.Class<com.google.common.base.FinalizableReferenceQueue.FinalizerLoader>;
            /**
             * Constructs a new instance of the com.google.common.base.FinalizableReferenceQueue$FinalizerLoader interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: { loadFinalizer(): java.lang.Class<any> });
            public constructor();
            public loadFinalizer(): java.lang.Class<any>;
          }
          export class SystemLoader extends com.google.common.base.FinalizableReferenceQueue.FinalizerLoader {
            public static class: java.lang.Class<com.google.common.base.FinalizableReferenceQueue.SystemLoader>;
            public loadFinalizer(): java.lang.Class<any>;
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module base {
        export abstract class FinalizableSoftReference<T> extends java.lang.ref.SoftReference<any> implements com.google.common.base.FinalizableReference {
          public static class: java.lang.Class<com.google.common.base.FinalizableSoftReference<any>>;
          public constructor(referent: any, queue: com.google.common.base.FinalizableReferenceQueue);
          public finalizeReferent(): void;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module base {
        export abstract class FinalizableWeakReference<T> extends java.lang.ref.WeakReference<any> implements com.google.common.base.FinalizableReference {
          public static class: java.lang.Class<com.google.common.base.FinalizableWeakReference<any>>;
          public constructor(referent: any, queue: com.google.common.base.FinalizableReferenceQueue);
          public finalizeReferent(): void;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module base {
        export class Function<F, T> extends java.lang.Object {
          public static class: java.lang.Class<com.google.common.base.Function<any, any>>;
          /**
           * Constructs a new instance of the com.google.common.base.Function<any,any> interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { apply(param0: F): T; equals(param0: any): boolean });
          public constructor();
          public equals(param0: any): boolean;
          public apply(param0: F): T;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module base {
        export class Functions {
          public static class: java.lang.Class<com.google.common.base.Functions>;
          public static compose(g: com.google.common.base.Function<any, any>, f: com.google.common.base.Function<any, any>): com.google.common.base.Function<any, any>;
          public static forPredicate(predicate: com.google.common.base.Predicate<any>): com.google.common.base.Function<any, any>;
          public static forMap(map: java.util.Map<any, any>, defaultValue: any): com.google.common.base.Function<any, any>;
          public static identity(): com.google.common.base.Function<any, any>;
          public static toStringFunction(): com.google.common.base.Function<any, string>;
          public static forMap(map: java.util.Map<any, any>): com.google.common.base.Function<any, any>;
          public static constant(value: any): com.google.common.base.Function<any, any>;
        }
        export module Functions {
          export class ConstantFunction<E> extends java.lang.Object {
            public static class: java.lang.Class<com.google.common.base.Functions.ConstantFunction<any>>;
            public apply(from: any): E;
            public equals(this_: any): boolean;
            public hashCode(): number;
            public equals(param0: any): boolean;
            public constructor(value: E);
            public apply(param0: any): any;
            public toString(): string;
          }
          export class ForMapWithDefault<K, V> extends java.lang.Object {
            public static class: java.lang.Class<com.google.common.base.Functions.ForMapWithDefault<any, any>>;
            public equals(this_: any): boolean;
            public apply(a: K): V;
            public hashCode(): number;
            public equals(param0: any): boolean;
            public apply(param0: any): any;
            public toString(): string;
            public constructor(map: java.util.Map<K, any>, defaultValue: V);
          }
          export class FunctionComposition<A, B, C> extends java.lang.Object {
            public static class: java.lang.Class<com.google.common.base.Functions.FunctionComposition<any, any, any>>;
            public equals(this_: any): boolean;
            public constructor(g: com.google.common.base.Function<B, C>, f: com.google.common.base.Function<A, any>);
            public apply(a: A): C;
            public hashCode(): number;
            public equals(param0: any): boolean;
            public apply(param0: any): any;
            public toString(): string;
          }
          export class FunctionForMapNoDefault<K, V> extends java.lang.Object {
            public static class: java.lang.Class<com.google.common.base.Functions.FunctionForMapNoDefault<any, any>>;
            public equals(this_: any): boolean;
            public apply(a: K): V;
            public constructor(map: java.util.Map<K, V>);
            public hashCode(): number;
            public equals(param0: any): boolean;
            public apply(param0: any): any;
            public toString(): string;
          }
          export class IdentityFunction extends com.google.common.base.Function<any, any> {
            public static class: java.lang.Class<com.google.common.base.Functions.IdentityFunction>;
            public static INSTANCE: com.google.common.base.Functions.IdentityFunction;
            public static valueOf(name: string): com.google.common.base.Functions.IdentityFunction;
            public equals(param0: any): boolean;
            public static values(): androidNative.Array<com.google.common.base.Functions.IdentityFunction>;
            public apply(o: any): any;
            public apply(param0: any): any;
            public toString(): string;
          }
          export class PredicateFunction<T> extends java.lang.Object {
            public static class: java.lang.Class<com.google.common.base.Functions.PredicateFunction<any>>;
            public apply(t: T): java.lang.Boolean;
            public apply(param0: any): T;
            public equals(this_: any): boolean;
            public hashCode(): number;
            public equals(param0: any): boolean;
            public toString(): string;
          }
          export class ToStringFunction extends com.google.common.base.Function<any, string> {
            public static class: java.lang.Class<com.google.common.base.Functions.ToStringFunction>;
            public static INSTANCE: com.google.common.base.Functions.ToStringFunction;
            public equals(param0: any): boolean;
            public static valueOf(name: string): com.google.common.base.Functions.ToStringFunction;
            public static values(): androidNative.Array<com.google.common.base.Functions.ToStringFunction>;
            public apply(param0: any): any;
            public apply(o: any): string;
            public toString(): string;
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module base {
        export class Joiner {
          public static class: java.lang.Class<com.google.common.base.Joiner>;
          public appendTo(this_: java.lang.StringBuilder, builder: java.lang.Iterable<any>): java.lang.StringBuilder;
          public join(first: any, second: any, rest: androidNative.Array<any>): string;
          public appendTo(builder: java.lang.StringBuilder, parts: androidNative.Array<any>): java.lang.StringBuilder;
          public static on(separator: string): com.google.common.base.Joiner;
          public appendTo(appendable: java.lang.Appendable, parts: java.lang.Iterable<any>): java.lang.Appendable;
          public join(parts: java.lang.Iterable<any>): string;
          public withKeyValueSeparator(keyValueSeparator: string): com.google.common.base.Joiner.MapJoiner;
          public appendTo(appendable: java.lang.Appendable, parts: androidNative.Array<any>): java.lang.Appendable;
          public skipNulls(): com.google.common.base.Joiner;
          public appendTo(appendable: java.lang.Appendable, first: any, second: any, rest: androidNative.Array<any>): java.lang.Appendable;
          public useForNull(nullText: string): com.google.common.base.Joiner;
          public join(parts: androidNative.Array<any>): string;
          public appendTo(builder: java.lang.StringBuilder, first: any, second: any, rest: androidNative.Array<any>): java.lang.StringBuilder;
        }
        export module Joiner {
          export class MapJoiner {
            public static class: java.lang.Class<com.google.common.base.Joiner.MapJoiner>;
            public appendTo(entry: java.lang.Appendable, this_: java.util.Map<any, any>): java.lang.Appendable;
            public useForNull(nullText: string): com.google.common.base.Joiner.MapJoiner;
            public join(map: java.util.Map<any, any>): string;
            public appendTo(this_: java.lang.StringBuilder, builder: java.util.Map<any, any>): java.lang.StringBuilder;
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module base {
        export class Objects {
          public static class: java.lang.Class<com.google.common.base.Objects>;
          public static equal(a: any, b: any): boolean;
          public static hashCode(objects: androidNative.Array<any>): number;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module base {
        export class Platform {
          public static class: java.lang.Class<com.google.common.base.Platform>;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module base {
        export class Preconditions {
          public static class: java.lang.Class<com.google.common.base.Preconditions>;
          public static checkNotNull(reference: any, errorMessage: any): any;
          public static checkPositionIndex(index: number, size: number, desc: string): void;
          public static checkElementIndex(index: number, size: number): void;
          public static checkPositionIndex(index: number, size: number): void;
          public static checkState(expression: boolean, errorMessageTemplate: string, errorMessageArgs: androidNative.Array<any>): void;
          public static checkArgument(expression: boolean, errorMessageTemplate: string, errorMessageArgs: androidNative.Array<any>): void;
          public static checkState(expression: boolean, errorMessage: any): void;
          public static checkArgument(expression: boolean): void;
          public static checkState(expression: boolean): void;
          public static checkNotNull(reference: any, errorMessageTemplate: string, errorMessageArgs: androidNative.Array<any>): any;
          public static checkArgument(expression: boolean, errorMessage: any): void;
          public static checkElementIndex(index: number, size: number, desc: string): void;
          public static checkPositionIndexes(start: number, end: number, size: number): void;
          public static checkNotNull(reference: any): any;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module base {
        export class Predicate<T> extends java.lang.Object {
          public static class: java.lang.Class<com.google.common.base.Predicate<any>>;
          /**
           * Constructs a new instance of the com.google.common.base.Predicate<any> interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { apply(param0: T): boolean; equals(param0: any): boolean });
          public constructor();
          public equals(param0: any): boolean;
          public apply(param0: T): boolean;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module base {
        export class Predicates {
          public static class: java.lang.Class<com.google.common.base.Predicates>;
          public static and(components: java.lang.Iterable<any>): com.google.common.base.Predicate<any>;
          public static or(first: com.google.common.base.Predicate<any>, second: com.google.common.base.Predicate<any>): com.google.common.base.Predicate<any>;
          public static in(target: java.util.Collection<any>): com.google.common.base.Predicate<any>;
          public static alwaysFalse(): com.google.common.base.Predicate<any>;
          public static alwaysTrue(): com.google.common.base.Predicate<any>;
          public static equalTo(target: any): com.google.common.base.Predicate<any>;
          public static compose(predicate: com.google.common.base.Predicate<any>, function_: com.google.common.base.Function<any, any>): com.google.common.base.Predicate<any>;
          public static and(components: androidNative.Array<com.google.common.base.Predicate<any>>): com.google.common.base.Predicate<any>;
          public static and(first: com.google.common.base.Predicate<any>, second: com.google.common.base.Predicate<any>): com.google.common.base.Predicate<any>;
          public static notNull(): com.google.common.base.Predicate<any>;
          public static or(components: androidNative.Array<com.google.common.base.Predicate<any>>): com.google.common.base.Predicate<any>;
          public static not(predicate: com.google.common.base.Predicate<any>): com.google.common.base.Predicate<any>;
          public static instanceOf(clazz: java.lang.Class<any>): com.google.common.base.Predicate<any>;
          public static isNull(): com.google.common.base.Predicate<any>;
          public static or(components: java.lang.Iterable<any>): com.google.common.base.Predicate<any>;
        }
        export module Predicates {
          export class AlwaysFalsePredicate extends com.google.common.base.Predicate<any> {
            public static class: java.lang.Class<com.google.common.base.Predicates.AlwaysFalsePredicate>;
            public static INSTANCE: com.google.common.base.Predicates.AlwaysFalsePredicate;
            public apply(o: any): boolean;
            public static values(): androidNative.Array<com.google.common.base.Predicates.AlwaysFalsePredicate>;
            public static valueOf(name: string): com.google.common.base.Predicates.AlwaysFalsePredicate;
            public equals(param0: any): boolean;
            public apply(param0: any): boolean;
            public toString(): string;
          }
          export class AlwaysTruePredicate extends com.google.common.base.Predicate<any> {
            public static class: java.lang.Class<com.google.common.base.Predicates.AlwaysTruePredicate>;
            public static INSTANCE: com.google.common.base.Predicates.AlwaysTruePredicate;
            public apply(o: any): boolean;
            public static valueOf(name: string): com.google.common.base.Predicates.AlwaysTruePredicate;
            public static values(): androidNative.Array<com.google.common.base.Predicates.AlwaysTruePredicate>;
            public equals(param0: any): boolean;
            public apply(param0: any): boolean;
            public toString(): string;
          }
          export class AndPredicate<T> extends java.lang.Object {
            public static class: java.lang.Class<com.google.common.base.Predicates.AndPredicate<any>>;
            public equals(this_: any): boolean;
            public apply(param0: T): boolean;
            public hashCode(): number;
            public equals(param0: any): boolean;
            public apply(i$: T): boolean;
            public toString(): string;
          }
          export class CompositionPredicate<A, B> extends java.lang.Object {
            public static class: java.lang.Class<com.google.common.base.Predicates.CompositionPredicate<any, any>>;
            public equals(this_: any): boolean;
            public apply(a: A): boolean;
            public hashCode(): number;
            public equals(param0: any): boolean;
            public apply(param0: any): boolean;
            public toString(): string;
          }
          export class InPredicate<T> extends java.lang.Object {
            public static class: java.lang.Class<com.google.common.base.Predicates.InPredicate<any>>;
            public equals(this_: any): boolean;
            public apply(param0: T): boolean;
            public apply(e: T): boolean;
            public hashCode(): number;
            public equals(param0: any): boolean;
            public toString(): string;
          }
          export class InstanceOfPredicate extends java.lang.Object {
            public static class: java.lang.Class<com.google.common.base.Predicates.InstanceOfPredicate>;
            public apply(o: any): boolean;
            public equals(this_: any): boolean;
            public hashCode(): number;
            public equals(param0: any): boolean;
            public apply(param0: any): boolean;
            public toString(): string;
          }
          export class IsEqualToPredicate<T> extends java.lang.Object {
            public static class: java.lang.Class<com.google.common.base.Predicates.IsEqualToPredicate<any>>;
            public equals(this_: any): boolean;
            public apply(param0: T): boolean;
            public hashCode(): number;
            public equals(param0: any): boolean;
            public apply(t: T): boolean;
            public toString(): string;
          }
          export class IsNullPredicate extends com.google.common.base.Predicate<any> {
            public static class: java.lang.Class<com.google.common.base.Predicates.IsNullPredicate>;
            public static INSTANCE: com.google.common.base.Predicates.IsNullPredicate;
            public apply(o: any): boolean;
            public static valueOf(name: string): com.google.common.base.Predicates.IsNullPredicate;
            public equals(param0: any): boolean;
            public apply(param0: any): boolean;
            public toString(): string;
            public static values(): androidNative.Array<com.google.common.base.Predicates.IsNullPredicate>;
          }
          export class NotNullPredicate extends com.google.common.base.Predicate<any> {
            public static class: java.lang.Class<com.google.common.base.Predicates.NotNullPredicate>;
            public static INSTANCE: com.google.common.base.Predicates.NotNullPredicate;
            public apply(o: any): boolean;
            public static values(): androidNative.Array<com.google.common.base.Predicates.NotNullPredicate>;
            public static valueOf(name: string): com.google.common.base.Predicates.NotNullPredicate;
            public equals(param0: any): boolean;
            public apply(param0: any): boolean;
            public toString(): string;
          }
          export class NotPredicate<T> extends java.lang.Object {
            public static class: java.lang.Class<com.google.common.base.Predicates.NotPredicate<any>>;
            public equals(this_: any): boolean;
            public apply(param0: T): boolean;
            public hashCode(): number;
            public equals(param0: any): boolean;
            public apply(t: T): boolean;
            public toString(): string;
          }
          export class OrPredicate<T> extends java.lang.Object {
            public static class: java.lang.Class<com.google.common.base.Predicates.OrPredicate<any>>;
            public equals(this_: any): boolean;
            public apply(param0: T): boolean;
            public hashCode(): number;
            public equals(param0: any): boolean;
            public apply(i$: T): boolean;
            public toString(): string;
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module base {
        export class Supplier<T> extends java.lang.Object {
          public static class: java.lang.Class<com.google.common.base.Supplier<any>>;
          /**
           * Constructs a new instance of the com.google.common.base.Supplier<any> interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { get(): T });
          public constructor();
          public get(): T;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module base {
        export class Suppliers {
          public static class: java.lang.Class<com.google.common.base.Suppliers>;
          public static ofInstance(instance: any): com.google.common.base.Supplier<any>;
          public static synchronizedSupplier(delegate: com.google.common.base.Supplier<any>): com.google.common.base.Supplier<any>;
          public static memoize(delegate: com.google.common.base.Supplier<any>): com.google.common.base.Supplier<any>;
          public static compose(function_: com.google.common.base.Function<any, any>, first: com.google.common.base.Supplier<any>): com.google.common.base.Supplier<any>;
        }
        export module Suppliers {
          export class CyclicDependencyException {
            public static class: java.lang.Class<com.google.common.base.Suppliers.CyclicDependencyException>;
          }
          export class MemoizationState {
            public static class: java.lang.Class<com.google.common.base.Suppliers.MemoizationState>;
            public static NOT_YET: com.google.common.base.Suppliers.MemoizationState;
            public static COMPUTING: com.google.common.base.Suppliers.MemoizationState;
            public static DONE: com.google.common.base.Suppliers.MemoizationState;
            public static valueOf(name: string): com.google.common.base.Suppliers.MemoizationState;
            public static values(): androidNative.Array<com.google.common.base.Suppliers.MemoizationState>;
          }
          export class MemoizingSupplier<T> extends java.lang.Object {
            public static class: java.lang.Class<com.google.common.base.Suppliers.MemoizingSupplier<any>>;
            public get(): T;
          }
          export class SupplierComposition<F, T> extends java.lang.Object {
            public static class: java.lang.Class<com.google.common.base.Suppliers.SupplierComposition<any, any>>;
            public get(): T;
          }
          export class SupplierOfInstance<T> extends java.lang.Object {
            public static class: java.lang.Class<com.google.common.base.Suppliers.SupplierOfInstance<any>>;
            public get(): T;
          }
          export class ThreadSafeSupplier<T> extends java.lang.Object {
            public static class: java.lang.Class<com.google.common.base.Suppliers.ThreadSafeSupplier<any>>;
            public get(): T;
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module base {
        export module internal {
          export class Finalizer {
            public static class: java.lang.Class<com.google.common.base.internal.Finalizer>;
            public static startFinalizer(finalizableReferenceClass: java.lang.Class<any>, frq: any): java.lang.ref.ReferenceQueue<any>;
            public run(): void;
            public static getInheritableThreadLocalsField(): java.lang.reflect.Field;
          }
          export module Finalizer {
            export class ShutDown {
              public static class: java.lang.Class<com.google.common.base.internal.Finalizer.ShutDown>;
            }
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export abstract class AbstractImmutableMultimap<K, V, C> extends java.lang.Object {
          public static class: java.lang.Class<com.google.common.collect.AbstractImmutableMultimap<any, any, any>>;
          public containsKey(key: any): boolean;
          public isEmpty(): boolean;
          public values(): java.util.Collection<V>;
          public put(key: K, value: V): boolean;
          public replaceValues(param0: K, param1: java.lang.Iterable<any>): java.util.Collection<V>;
          public keySet(): java.util.Set<K>;
          public size(): number;
          public keys(): com.google.common.collect.Multiset<K>;
          public remove(key: any, value: any): boolean;
          public keySet(): com.google.common.collect.ImmutableSet<K>;
          public keys(): com.google.common.collect.ImmutableMultiset<K>;
          public toString(): string;
          public containsValue(param0: any): boolean;
          public clear(): void;
          public get(param0: K): java.util.Collection<V>;
          public containsEntry(key: any, value: any): boolean;
          public hashCode(): number;
          public remove(param0: any, param1: any): boolean;
          public entries(): com.google.common.collect.ImmutableCollection<java.util.Map.Entry<K, V>>;
          public values(): com.google.common.collect.ImmutableCollection<V>;
          public removeAll(param0: any): java.util.Collection<V>;
          public containsValue(i$: any): boolean;
          public equals(this_: any): boolean;
          public put(param0: K, param1: V): boolean;
          public putAll(param0: K, param1: java.lang.Iterable<any>): boolean;
          public putAll(param0: com.google.common.collect.Multimap<any, any>): boolean;
          public entries(): java.util.Collection<java.util.Map.Entry<K, V>>;
          public removeAll(key: any): C;
          public equals(param0: any): boolean;
          public containsKey(param0: any): boolean;
          public putAll(multimap: com.google.common.collect.Multimap<any, any>): boolean;
          public putAll(key: K, values: java.lang.Iterable<any>): boolean;
          public replaceValues(key: K, values: java.lang.Iterable<any>): C;
          public containsEntry(param0: any, param1: any): boolean;
          public asMap(): java.util.Map<K, java.util.Collection<V>>;
          public asMap(): com.google.common.collect.ImmutableMap<K, java.util.Collection<V>>;
        }
        export module AbstractImmutableMultimap {
          export class CountMap<K, V, C> extends com.google.common.collect.ImmutableMap<any, java.lang.Integer> {
            public static class: java.lang.Class<com.google.common.collect.AbstractImmutableMultimap.CountMap<any, any, any>>;
            public get(key: any): java.lang.Integer;
            public values(): com.google.common.collect.ImmutableCollection<java.lang.Integer>;
            public containsValue(value: any): boolean;
            public get(param0: any): any;
            public isEmpty(): boolean;
            public containsKey(key: any): boolean;
            public size(): number;
            public entrySet(): com.google.common.collect.ImmutableSet<java.util.Map.Entry<any, java.lang.Integer>>;
            public keySet(): com.google.common.collect.ImmutableSet<any>;
          }
          export module CountMap {
            export class EntrySet<K, V, C> extends com.google.common.collect.ImmutableSet<java.util.Map.Entry<any, java.lang.Integer>> {
              public static class: java.lang.Class<com.google.common.collect.AbstractImmutableMultimap.CountMap.EntrySet<any, any, any>>;
              public size(): number;
              public iterator(): com.google.common.collect.UnmodifiableIterator<java.util.Map.Entry<any, java.lang.Integer>>;
            }
          }
          export class EntryCollection<K, V, C> extends com.google.common.collect.ImmutableCollection<java.util.Map.Entry<any, any>> {
            public static class: java.lang.Class<com.google.common.collect.AbstractImmutableMultimap.EntryCollection<any, any, any>>;
            public iterator(): com.google.common.collect.UnmodifiableIterator<java.util.Map.Entry<any, any>>;
            public contains(this_: any): boolean;
            public size(): number;
          }
          export class FieldSettersHolder {
            public static class: java.lang.Class<com.google.common.collect.AbstractImmutableMultimap.FieldSettersHolder>;
          }
          export class Values<V> extends com.google.common.collect.ImmutableCollection<any> {
            public static class: java.lang.Class<com.google.common.collect.AbstractImmutableMultimap.Values<any>>;
            public iterator(): com.google.common.collect.UnmodifiableIterator<any>;
            public size(): number;
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export abstract class AbstractIterator<T> extends com.google.common.collect.UnmodifiableIterator<any> {
          public static class: java.lang.Class<com.google.common.collect.AbstractIterator<any>>;
          public next(): any;
          public peek(): any;
          public constructor();
          public endOfData(): any;
          public computeNext(): any;
          public hasNext(): boolean;
        }
        export module AbstractIterator {
          export class State {
            public static class: java.lang.Class<com.google.common.collect.AbstractIterator.State>;
            public static READY: com.google.common.collect.AbstractIterator.State;
            public static NOT_READY: com.google.common.collect.AbstractIterator.State;
            public static DONE: com.google.common.collect.AbstractIterator.State;
            public static FAILED: com.google.common.collect.AbstractIterator.State;
            public static valueOf(name: string): com.google.common.collect.AbstractIterator.State;
            public static values(): androidNative.Array<com.google.common.collect.AbstractIterator.State>;
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export abstract class AbstractMapBasedMultiset<E> extends com.google.common.collect.AbstractMultiset<any> implements java.io.Serializable {
          public static class: java.lang.Class<com.google.common.collect.AbstractMapBasedMultiset<any>>;
          public remove(this_: any, element: number): number;
          public add(newCount: any, this_: number): number;
          public setCount(param0: any, param1: number): number;
          public add(param0: any): boolean;
          public containsAll(param0: java.util.Collection<any>): boolean;
          public size(): number;
          public remove(element: any): boolean;
          public add(element: any): boolean;
          public iterator(): java.util.Iterator<any>;
          public toString(): string;
          public add(param0: any, param1: number): number;
          public remove(param0: any, param1: number): number;
          public count(param0: any): number;
          public hashCode(): number;
          public contains(param0: any): boolean;
          public setCount(element: any, oldCount: number, newCount: number): boolean;
          public remove(param0: any): boolean;
          public removeAll(param0: java.util.Collection<any>): boolean;
          public constructor(backingMap: java.util.Map<any, java.util.concurrent.atomic.AtomicInteger>);
          public retainAll(param0: java.util.Collection<any>): boolean;
          public setCount(param0: any, param1: number, param2: number): boolean;
          public createElementSet(): java.util.Set<any>;
          public equals(param0: any): boolean;
          public elementSet(): java.util.Set<any>;
          public setCount(oldCount: any, this_: number): number;
          public entrySet(): java.util.Set<com.google.common.collect.Multiset.Entry<any>>;
          public count(element: any): number;
        }
        export module AbstractMapBasedMultiset {
          export class EntrySet extends java.util.AbstractSet<com.google.common.collect.Multiset.Entry<any>> {
            public static class: java.lang.Class<com.google.common.collect.AbstractMapBasedMultiset.EntrySet>;
            public iterator(): java.util.Iterator<com.google.common.collect.Multiset.Entry<any>>;
            public clear(): void;
            public size(): number;
            public remove(frequency: any): boolean;
            public contains(count: any): boolean;
          }
          export class MapBasedElementSet extends com.google.common.collect.ForwardingSet<any> {
            public static class: java.lang.Class<com.google.common.collect.AbstractMapBasedMultiset.MapBasedElementSet>;
            public delegate(): any;
            public iterator(): java.util.Iterator<any>;
            public delegate(): java.util.Collection<any>;
            public delegate(): java.util.Set<any>;
            public remove(element: any): boolean;
            public clear(): void;
            public getMap(): java.util.Map<any, java.util.concurrent.atomic.AtomicInteger>;
            public removeAll(elementsToRemove: java.util.Collection<any>): boolean;
            public retainAll(elementsToRetain: java.util.Collection<any>): boolean;
          }
          export class MapBasedMultisetIterator extends java.util.Iterator<any> {
            public static class: java.lang.Class<com.google.common.collect.AbstractMapBasedMultiset.MapBasedMultisetIterator>;
            public next(): any;
            public hasNext(): boolean;
            public remove(): void;
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export abstract class AbstractMapEntry<K, V> extends java.util.Map.Entry<any, any> {
          public static class: java.lang.Class<com.google.common.collect.AbstractMapEntry<any, any>>;
          public getValue(): any;
          public toString(): string;
          public equals(this_: any): boolean;
          public setValue(value: any): any;
          public getKey(): any;
          public hashCode(): number;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export abstract class AbstractMultiset<E> extends java.util.AbstractCollection<any> implements com.google.common.collect.Multiset<any> {
          public static class: java.lang.Class<com.google.common.collect.AbstractMultiset<any>>;
          public equals(i$: any): boolean;
          public isEmpty(): boolean;
          public add(element: any, occurrences: number): number;
          public setCount(param0: any, param1: number): number;
          public add(param0: any): boolean;
          public containsAll(param0: java.util.Collection<any>): boolean;
          public addAll(i$: java.util.Collection<any>): boolean;
          public size(): number;
          public remove(element: any): boolean;
          public setCount(element: any, count: number): number;
          public containsAll(elements: java.util.Collection<any>): boolean;
          public add(element: any): boolean;
          public count(i$: any): number;
          public iterator(): java.util.Iterator<any>;
          public toString(): string;
          public add(param0: any, param1: number): number;
          public clear(): void;
          public remove(param0: any, param1: number): number;
          public contains(element: any): boolean;
          public remove(element: any, occurrences: number): number;
          public count(param0: any): number;
          public hashCode(): number;
          public contains(param0: any): boolean;
          public setCount(element: any, oldCount: number, newCount: number): boolean;
          public remove(param0: any): boolean;
          public removeAll(param0: java.util.Collection<any>): boolean;
          public retainAll(param0: java.util.Collection<any>): boolean;
          public setCount(param0: any, param1: number, param2: number): boolean;
          public createElementSet(): java.util.Set<any>;
          public equals(param0: any): boolean;
          public retainAll(this_: java.util.Collection<any>): boolean;
          public removeAll(elementsToRemove: java.util.Collection<any>): boolean;
          public elementSet(): java.util.Set<any>;
          public entrySet(): java.util.Set<com.google.common.collect.Multiset.Entry<any>>;
        }
        export module AbstractMultiset {
          export class ElementSet extends java.util.AbstractSet<any> {
            public static class: java.lang.Class<com.google.common.collect.AbstractMultiset.ElementSet>;
            public iterator(): java.util.Iterator<any>;
            public size(): number;
          }
          export class MultisetIterator extends java.util.Iterator<any> {
            public static class: java.lang.Class<com.google.common.collect.AbstractMultiset.MultisetIterator>;
            public next(): any;
            public hasNext(): boolean;
            public remove(): void;
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class ArrayListMultimap<K, V> extends com.google.common.collect.StandardListMultimap<any, any> {
          public static class: java.lang.Class<com.google.common.collect.ArrayListMultimap<any, any>>;
          public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.List<any>;
          public isEmpty(): boolean;
          public keys(): com.google.common.collect.Multiset<any>;
          public asMap(): java.util.Map<any, java.util.Collection<any>>;
          public size(): number;
          public static create(expectedKeys: number, expectedValuesPerKey: number): com.google.common.collect.ArrayListMultimap<any, any>;
          public replaceValues(key: any, values: java.lang.Iterable<any>): java.util.Collection<any>;
          public removeAll(param0: any): java.util.List<any>;
          public entries(): java.util.Collection<java.util.Map.Entry<any, any>>;
          public static create(): com.google.common.collect.ArrayListMultimap<any, any>;
          public containsValue(param0: any): boolean;
          public get(key: any): java.util.Collection<any>;
          public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Collection<any>;
          public removeAll(key: any): java.util.Collection<any>;
          public keySet(): java.util.Set<any>;
          public clear(): void;
          public trimToSize(): void;
          public putAll(param0: any, param1: java.lang.Iterable<any>): boolean;
          public hashCode(): number;
          public remove(param0: any, param1: any): boolean;
          public putAll(param0: com.google.common.collect.Multimap<any, any>): boolean;
          public values(): java.util.Collection<any>;
          public static create(multimap: com.google.common.collect.Multimap<any, any>): com.google.common.collect.ArrayListMultimap<any, any>;
          public equals(param0: any): boolean;
          public put(param0: any, param1: any): boolean;
          public containsKey(param0: any): boolean;
          public get(param0: any): java.util.List<any>;
          public get(param0: any): java.util.Collection<any>;
          public containsEntry(param0: any, param1: any): boolean;
          public removeAll(param0: any): java.util.Collection<any>;
          public putAll(i$: com.google.common.collect.Multimap<any, any>): boolean;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class AsynchronousComputationException extends com.google.common.collect.ComputationException {
          public static class: java.lang.Class<com.google.common.collect.AsynchronousComputationException>;
          public constructor(cause: java.lang.Throwable);
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class BiMap<K, V> extends java.util.Map<any, any> {
          public static class: java.lang.Class<com.google.common.collect.BiMap<any, any>>;
          /**
           * Constructs a new instance of the com.google.common.collect.BiMap<any,any> interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            put(param0: any, param1: any): any;
            forcePut(param0: any, param1: any): any;
            putAll(param0: java.util.Map<any, any>): void;
            values(): java.util.Set<any>;
            inverse(): com.google.common.collect.BiMap<any, any>;
          });
          public constructor();
          public putAll(param0: java.util.Map<any, any>): void;
          public values(): java.util.Set<any>;
          public inverse(): com.google.common.collect.BiMap<any, any>;
          public forcePut(param0: any, param1: any): any;
          public put(param0: any, param1: any): any;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class ClassToInstanceMap<B> extends java.util.Map<java.lang.Class<any>, any> {
          public static class: java.lang.Class<com.google.common.collect.ClassToInstanceMap<any>>;
          /**
           * Constructs a new instance of the com.google.common.collect.ClassToInstanceMap<any> interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { getInstance(param0: java.lang.Class<any>): any; putInstance(param0: java.lang.Class<any>, param1: any): any });
          public constructor();
          public putInstance(param0: java.lang.Class<any>, param1: any): any;
          public getInstance(param0: java.lang.Class<any>): any;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class Collections2 {
          public static class: java.lang.Class<com.google.common.collect.Collections2>;
          public static transform(fromCollection: java.util.Collection<any>, function_: com.google.common.base.Function<any, any>): java.util.Collection<any>;
          public static filter(filtered: java.util.Collection<any>, combinedPredicate: com.google.common.base.Predicate<any>): java.util.Collection<any>;
        }
        export module Collections2 {
          export class FilteredCollection<E> extends java.util.Collection<any> {
            public static class: java.lang.Class<com.google.common.collect.Collections2.FilteredCollection<any>>;
            public addAll(i$: java.util.Collection<any>): boolean;
            public iterator(): java.util.Iterator<any>;
            public containsAll(i$: java.util.Collection<any>): boolean;
            public remove(e: any): boolean;
            public retainAll(this_: java.util.Collection<any>): boolean;
            public toArray(): androidNative.Array<any>;
            public contains(e: any): boolean;
            public toString(): string;
            public toArray(array: androidNative.Array<any>): androidNative.Array<any>;
            public isEmpty(): boolean;
            public clear(): void;
            public add(element: any): boolean;
            public size(): number;
            public removeAll(this_: java.util.Collection<any>): boolean;
          }
          export class TransformedCollection<F, T> extends java.util.AbstractCollection<any> {
            public static class: java.lang.Class<com.google.common.collect.Collections2.TransformedCollection<any, any>>;
            public iterator(): java.util.Iterator<any>;
            public isEmpty(): boolean;
            public clear(): void;
            public size(): number;
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class ComputationException {
          public static class: java.lang.Class<com.google.common.collect.ComputationException>;
          public constructor(cause: java.lang.Throwable);
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class ConcurrentHashMultiset<E> extends com.google.common.collect.AbstractMultiset<any> implements java.io.Serializable {
          public static class: java.lang.Class<com.google.common.collect.ConcurrentHashMultiset<any>>;
          public removeExactly(current: any, this_: number): boolean;
          public setCount(param0: any, param1: number): number;
          public add(param0: any): boolean;
          public count(e: any): number;
          public containsAll(param0: java.util.Collection<any>): boolean;
          public static create(): com.google.common.collect.ConcurrentHashMultiset<any>;
          public size(): number;
          public remove(element: any): boolean;
          public setCount(element: any, count: number): number;
          public add(current: any, this_: number): number;
          public add(element: any): boolean;
          public toString(): string;
          public add(param0: any, param1: number): number;
          public remove(param0: any, param1: number): number;
          public remove(current: any, this_: number): number;
          public count(param0: any): number;
          public hashCode(): number;
          public contains(param0: any): boolean;
          public setCount(element: any, oldCount: number, newCount: number): boolean;
          public remove(param0: any): boolean;
          public removeAll(param0: java.util.Collection<any>): boolean;
          public static create(elements: java.lang.Iterable<any>): com.google.common.collect.ConcurrentHashMultiset<any>;
          public toArray(): androidNative.Array<any>;
          public retainAll(param0: java.util.Collection<any>): boolean;
          public setCount(param0: any, param1: number, param2: number): boolean;
          public createElementSet(): java.util.Set<any>;
          public equals(param0: any): boolean;
          public elementSet(): java.util.Set<any>;
          public toArray(array: androidNative.Array<any>): androidNative.Array<any>;
          public entrySet(): java.util.Set<com.google.common.collect.Multiset.Entry<any>>;
        }
        export module ConcurrentHashMultiset {
          export class EntrySet extends java.util.AbstractSet<com.google.common.collect.Multiset.Entry<any>> {
            public static class: java.lang.Class<com.google.common.collect.ConcurrentHashMultiset.EntrySet>;
            public toArray(array: androidNative.Array<any>): androidNative.Array<any>;
            public remove(element: any): boolean;
            public isEmpty(): boolean;
            public toArray(): androidNative.Array<any>;
            public hashCode(): number;
            public iterator(): java.util.Iterator<com.google.common.collect.Multiset.Entry<any>>;
            public contains(element: any): boolean;
            public clear(): void;
            public size(): number;
          }
          export class FieldSettersHolder {
            public static class: java.lang.Class<com.google.common.collect.ConcurrentHashMultiset.FieldSettersHolder>;
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class CustomConcurrentHashMap {
          public static class: java.lang.Class<com.google.common.collect.CustomConcurrentHashMap>;
        }
        export module CustomConcurrentHashMap {
          export class Builder {
            public static class: java.lang.Class<com.google.common.collect.CustomConcurrentHashMap.Builder>;
            public initialCapacity(initialCapacity: number): com.google.common.collect.CustomConcurrentHashMap.Builder;
            public buildMap(strategy: com.google.common.collect.CustomConcurrentHashMap.Strategy<any, any, any>): java.util.concurrent.ConcurrentMap<any, any>;
            public concurrencyLevel(concurrencyLevel: number): com.google.common.collect.CustomConcurrentHashMap.Builder;
            public buildComputingMap(
              strategy: com.google.common.collect.CustomConcurrentHashMap.ComputingStrategy<any, any, any>,
              computer: com.google.common.base.Function<any, any>
            ): java.util.concurrent.ConcurrentMap<any, any>;
            public loadFactor(loadFactor: number): com.google.common.collect.CustomConcurrentHashMap.Builder;
          }
          export class ComputingImpl<K, V, E> extends com.google.common.collect.CustomConcurrentHashMap.Impl<any, any, any> {
            public static class: java.lang.Class<com.google.common.collect.CustomConcurrentHashMap.ComputingImpl<any, any, any>>;
            public get(table: any): any;
          }
          export class ComputingStrategy<K, V, E> extends com.google.common.collect.CustomConcurrentHashMap.Strategy<any, any, any> {
            public static class: java.lang.Class<com.google.common.collect.CustomConcurrentHashMap.ComputingStrategy<any, any, any>>;
            /**
             * Constructs a new instance of the com.google.common.collect.CustomConcurrentHashMap$ComputingStrategy interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: {
              compute(param0: any, param1: any, param2: com.google.common.base.Function<any, any>): any;
              waitForValue(param0: any): any;
              newEntry(param0: any, param1: number, param2: any): any;
              copyEntry(param0: any, param1: any, param2: any): any;
              setValue(param0: any, param1: any): void;
              getValue(param0: any): any;
              equalKeys(param0: any, param1: any): boolean;
              equalValues(param0: any, param1: any): boolean;
              hashKey(param0: any): number;
              getKey(param0: any): any;
              getNext(param0: any): any;
              getHash(param0: any): number;
              setInternals(param0: com.google.common.collect.CustomConcurrentHashMap.Internals<any, any, any>): void;
            });
            public constructor();
            public newEntry(param0: any, param1: number, param2: any): any;
            public getKey(param0: any): any;
            public setInternals(param0: com.google.common.collect.CustomConcurrentHashMap.Internals<any, any, any>): void;
            public setValue(param0: any, param1: any): void;
            public copyEntry(param0: any, param1: any, param2: any): any;
            public getNext(param0: any): any;
            public getHash(param0: any): number;
            public hashKey(param0: any): number;
            public equalValues(param0: any, param1: any): boolean;
            public equalKeys(param0: any, param1: any): boolean;
            public getValue(param0: any): any;
            public compute(param0: any, param1: any, param2: com.google.common.base.Function<any, any>): any;
            public waitForValue(param0: any): any;
          }
          export class Impl<K, V, E> extends java.util.AbstractMap<any, any> {
            public static class: java.lang.Class<com.google.common.collect.CustomConcurrentHashMap.Impl<any, any, any>>;
            public replace(key: any, value: any): any;
            public put(key: any, value: any): any;
            public putAll(i$: java.util.Map<any, any>): void;
            public entrySet(): java.util.Set<java.util.Map.Entry<any, any>>;
            public get(key: any): any;
            public containsKey(key: any): boolean;
            public values(): java.util.Collection<any>;
            public containsValue(i: any): boolean;
            public remove(key: any, value: any): boolean;
            public putIfAbsent(key: any, value: any): any;
            public remove(key: any): any;
            public replace(key: any, oldValue: any, newValue: any): boolean;
            public isEmpty(): boolean;
            public clear(): void;
            public size(): number;
            public keySet(): java.util.Set<any>;
          }
          export module Impl {
            export class EntryIterator extends com.google.common.collect.CustomConcurrentHashMap.Impl.HashIterator implements java.util.Iterator<java.util.Map.Entry<any, any>> {
              public static class: java.lang.Class<com.google.common.collect.CustomConcurrentHashMap.Impl.EntryIterator>;
              public next(): java.util.Map.Entry<any, any>;
            }
            export class EntrySet extends java.util.AbstractSet<java.util.Map.Entry<any, any>> {
              public static class: java.lang.Class<com.google.common.collect.CustomConcurrentHashMap.Impl.EntrySet>;
              public size(): number;
              public contains(o: any): boolean;
              public clear(): void;
              public isEmpty(): boolean;
              public iterator(): java.util.Iterator<java.util.Map.Entry<any, any>>;
              public remove(o: any): boolean;
            }
            export class Fields {
              public static class: java.lang.Class<com.google.common.collect.CustomConcurrentHashMap.Impl.Fields>;
            }
            export abstract class HashIterator {
              public static class: java.lang.Class<com.google.common.collect.CustomConcurrentHashMap.Impl.HashIterator>;
              public hasMoreElements(): boolean;
              public hasNext(): boolean;
              public remove(): void;
            }
            export class InternalsImpl extends java.lang.Object {
              public static class: java.lang.Class<com.google.common.collect.CustomConcurrentHashMap.Impl.InternalsImpl>;
              public removeEntry(param0: any): boolean;
              public getEntry(param0: any): any;
              public getEntry(key: any): any;
              public removeEntry(entry: any): boolean;
              public removeEntry(entry: any, value: any): boolean;
              public removeEntry(param0: any, param1: any): boolean;
            }
            export class KeyIterator extends com.google.common.collect.CustomConcurrentHashMap.Impl.HashIterator implements java.util.Iterator<any> {
              public static class: java.lang.Class<com.google.common.collect.CustomConcurrentHashMap.Impl.KeyIterator>;
              public next(): any;
            }
            export class KeySet extends java.util.AbstractSet<any> {
              public static class: java.lang.Class<com.google.common.collect.CustomConcurrentHashMap.Impl.KeySet>;
              public size(): number;
              public iterator(): java.util.Iterator<any>;
              public contains(o: any): boolean;
              public clear(): void;
              public isEmpty(): boolean;
              public remove(o: any): boolean;
            }
            export class Segment {
              public static class: java.lang.Class<com.google.common.collect.CustomConcurrentHashMap.Impl.Segment>;
              public removeEntry(p: any, newFirst: number): boolean;
              public removeEntry(p: any, newFirst: number, entryValue: any): boolean;
              public getEntry(e: any, this_: number): any;
            }
            export class ValueIterator extends com.google.common.collect.CustomConcurrentHashMap.Impl.HashIterator implements java.util.Iterator<any> {
              public static class: java.lang.Class<com.google.common.collect.CustomConcurrentHashMap.Impl.ValueIterator>;
              public next(): any;
            }
            export class Values extends java.util.AbstractCollection<any> {
              public static class: java.lang.Class<com.google.common.collect.CustomConcurrentHashMap.Impl.Values>;
              public size(): number;
              public iterator(): java.util.Iterator<any>;
              public contains(o: any): boolean;
              public clear(): void;
              public isEmpty(): boolean;
            }
            export class WriteThroughEntry extends com.google.common.collect.AbstractMapEntry<any, any> {
              public static class: java.lang.Class<com.google.common.collect.CustomConcurrentHashMap.Impl.WriteThroughEntry>;
              public getValue(): any;
              public setValue(value: any): any;
              public getKey(): any;
            }
          }
          export class Internals<K, V, E> extends java.lang.Object {
            public static class: java.lang.Class<com.google.common.collect.CustomConcurrentHashMap.Internals<any, any, any>>;
            /**
             * Constructs a new instance of the com.google.common.collect.CustomConcurrentHashMap$Internals interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: { getEntry(param0: K): E; removeEntry(param0: E, param1: V): boolean; removeEntry(param0: E): boolean });
            public constructor();
            public getEntry(param0: K): E;
            public removeEntry(param0: E, param1: V): boolean;
            public removeEntry(param0: E): boolean;
          }
          export class SimpleInternalEntry<K, V> extends java.lang.Object {
            public static class: java.lang.Class<com.google.common.collect.CustomConcurrentHashMap.SimpleInternalEntry<any, any>>;
          }
          export class SimpleStrategy<K, V> extends com.google.common.collect.CustomConcurrentHashMap.Strategy<
            any,
            any,
            com.google.common.collect.CustomConcurrentHashMap.SimpleInternalEntry<any, any>
          > {
            public static class: java.lang.Class<com.google.common.collect.CustomConcurrentHashMap.SimpleStrategy<any, any>>;
            public setValue(entry: com.google.common.collect.CustomConcurrentHashMap.SimpleInternalEntry<any, any>, value: any): void;
            public newEntry(param0: any, param1: number, param2: any): any;
            public getKey(param0: any): any;
            public setInternals(param0: com.google.common.collect.CustomConcurrentHashMap.Internals<any, any, any>): void;
            public setValue(param0: any, param1: any): void;
            public copyEntry(param0: any, param1: any, param2: any): any;
            public newEntry(
              key: any,
              hash: number,
              next: com.google.common.collect.CustomConcurrentHashMap.SimpleInternalEntry<any, any>
            ): com.google.common.collect.CustomConcurrentHashMap.SimpleInternalEntry<any, any>;
            public equalKeys(a: any, b: any): boolean;
            public getKey(entry: com.google.common.collect.CustomConcurrentHashMap.SimpleInternalEntry<any, any>): any;
            public getNext(param0: any): any;
            public getHash(param0: any): number;
            public getNext(entry: com.google.common.collect.CustomConcurrentHashMap.SimpleInternalEntry<any, any>): com.google.common.collect.CustomConcurrentHashMap.SimpleInternalEntry<any, any>;
            public hashKey(param0: any): number;
            public setInternals(
              internals: com.google.common.collect.CustomConcurrentHashMap.Internals<any, any, com.google.common.collect.CustomConcurrentHashMap.SimpleInternalEntry<any, any>>
            ): void;
            public copyEntry(
              key: any,
              original: com.google.common.collect.CustomConcurrentHashMap.SimpleInternalEntry<any, any>,
              next: com.google.common.collect.CustomConcurrentHashMap.SimpleInternalEntry<any, any>
            ): com.google.common.collect.CustomConcurrentHashMap.SimpleInternalEntry<any, any>;
            public equalValues(param0: any, param1: any): boolean;
            public getHash(entry: com.google.common.collect.CustomConcurrentHashMap.SimpleInternalEntry<any, any>): number;
            public hashKey(key: any): number;
            public equalValues(a: any, b: any): boolean;
            public equalKeys(param0: any, param1: any): boolean;
            public getValue(param0: any): any;
            public getValue(entry: com.google.common.collect.CustomConcurrentHashMap.SimpleInternalEntry<any, any>): any;
          }
          export class Strategy<K, V, E> extends java.lang.Object {
            public static class: java.lang.Class<com.google.common.collect.CustomConcurrentHashMap.Strategy<any, any, any>>;
            /**
             * Constructs a new instance of the com.google.common.collect.CustomConcurrentHashMap$Strategy interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: {
              newEntry(param0: K, param1: number, param2: E): E;
              copyEntry(param0: K, param1: E, param2: E): E;
              setValue(param0: E, param1: V): void;
              getValue(param0: E): V;
              equalKeys(param0: K, param1: any): boolean;
              equalValues(param0: V, param1: any): boolean;
              hashKey(param0: any): number;
              getKey(param0: E): K;
              getNext(param0: E): E;
              getHash(param0: E): number;
              setInternals(param0: com.google.common.collect.CustomConcurrentHashMap.Internals<K, V, E>): void;
            });
            public constructor();
            public newEntry(param0: K, param1: number, param2: E): E;
            public getNext(param0: E): E;
            public getValue(param0: E): V;
            public copyEntry(param0: K, param1: E, param2: E): E;
            public equalValues(param0: V, param1: any): boolean;
            public getHash(param0: E): number;
            public setInternals(param0: com.google.common.collect.CustomConcurrentHashMap.Internals<K, V, E>): void;
            public getKey(param0: E): K;
            public setValue(param0: E, param1: V): void;
            public equalKeys(param0: K, param1: any): boolean;
            public hashKey(param0: any): number;
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class EnumBiMap<K, V> extends com.google.common.collect.StandardBiMap<any, any> {
          public static class: java.lang.Class<com.google.common.collect.EnumBiMap<any, any>>;
          public putAll(param0: java.util.Map<any, any>): void;
          public values(): java.util.Set<any>;
          public static create(keyType: java.lang.Class<any>, valueType: java.lang.Class<any>): com.google.common.collect.EnumBiMap<any, any>;
          public valueType(): java.lang.Class<any>;
          public inverse(): com.google.common.collect.BiMap<any, any>;
          public values(): java.util.Collection<any>;
          public forcePut(param0: any, param1: any): any;
          public put(param0: any, param1: any): any;
          public static create(map: java.util.Map<any, any>): com.google.common.collect.EnumBiMap<any, any>;
          public keyType(): java.lang.Class<any>;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class EnumHashBiMap<K, V> extends com.google.common.collect.StandardBiMap<any, any> {
          public static class: java.lang.Class<com.google.common.collect.EnumHashBiMap<any, any>>;
          public putAll(param0: java.util.Map<any, any>): void;
          public static create(keyType: java.lang.Class<any>): com.google.common.collect.EnumHashBiMap<any, any>;
          public values(): java.util.Set<any>;
          public forcePut(key: any, value: any): any;
          public put(key: any, value: any): any;
          public inverse(): com.google.common.collect.BiMap<any, any>;
          public values(): java.util.Collection<any>;
          public forcePut(param0: any, param1: any): any;
          public static create(map: java.util.Map<any, any>): com.google.common.collect.EnumHashBiMap<any, any>;
          public put(param0: any, param1: any): any;
          public keyType(): java.lang.Class<any>;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class EnumMultiset<E> extends com.google.common.collect.AbstractMapBasedMultiset<any> {
          public static class: java.lang.Class<com.google.common.collect.EnumMultiset<any>>;
          public remove(param0: any): boolean;
          public removeAll(param0: java.util.Collection<any>): boolean;
          public setCount(param0: any, param1: number): number;
          public add(param0: any): boolean;
          public static create(elements: java.lang.Iterable<any>): com.google.common.collect.EnumMultiset<any>;
          public containsAll(param0: java.util.Collection<any>): boolean;
          public retainAll(param0: java.util.Collection<any>): boolean;
          public setCount(param0: any, param1: number, param2: number): boolean;
          public remove(element: any): boolean;
          public add(element: any): boolean;
          public equals(param0: any): boolean;
          public toString(): string;
          public add(param0: any, param1: number): number;
          public static create(type: java.lang.Class<any>): com.google.common.collect.EnumMultiset<any>;
          public remove(param0: any, param1: number): number;
          public count(param0: any): number;
          public elementSet(): java.util.Set<any>;
          public hashCode(): number;
          public entrySet(): java.util.Set<com.google.common.collect.Multiset.Entry<any>>;
          public contains(param0: any): boolean;
          public setCount(element: any, oldCount: number, newCount: number): boolean;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class ExpirationTimer {
          public static class: java.lang.Class<com.google.common.collect.ExpirationTimer>;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export abstract class ForwardingCollection<E> extends com.google.common.collect.ForwardingObject implements java.util.Collection<any> {
          public static class: java.lang.Class<com.google.common.collect.ForwardingCollection<any>>;
          public delegate(): java.util.Collection<any>;
          public isEmpty(): boolean;
          public toArray(): androidNative.Array<any>;
          public contains(object: any): boolean;
          public containsAll(collection: java.util.Collection<any>): boolean;
          public size(): number;
          public addAll(collection: java.util.Collection<any>): boolean;
          public add(element: any): boolean;
          public removeAll(collection: java.util.Collection<any>): boolean;
          public iterator(): java.util.Iterator<any>;
          public constructor();
          public clear(): void;
          public retainAll(collection: java.util.Collection<any>): boolean;
          public delegate(): any;
          public toArray(array: androidNative.Array<any>): androidNative.Array<any>;
          public remove(object: any): boolean;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export abstract class ForwardingConcurrentMap<K, V> extends com.google.common.collect.ForwardingMap<any, any> implements java.util.concurrent.ConcurrentMap<any, any> {
          public static class: java.lang.Class<com.google.common.collect.ForwardingConcurrentMap<any, any>>;
          public remove(object: any): any;
          public putIfAbsent(key: any, value: any): any;
          public constructor();
          public replace(key: any, oldValue: any, newValue: any): boolean;
          public delegate(): java.util.Map<any, any>;
          public delegate(): any;
          public delegate(): java.util.concurrent.ConcurrentMap<any, any>;
          public remove(key: any, value: any): boolean;
          public replace(key: any, value: any): any;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export abstract class ForwardingIterator<T> extends com.google.common.collect.ForwardingObject implements java.util.Iterator<any> {
          public static class: java.lang.Class<com.google.common.collect.ForwardingIterator<any>>;
          public next(): any;
          public constructor();
          public delegate(): java.util.Iterator<any>;
          public delegate(): any;
          public hasNext(): boolean;
          public remove(): void;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export abstract class ForwardingList<E> extends com.google.common.collect.ForwardingCollection<any> implements java.util.List<any> {
          public static class: java.lang.Class<com.google.common.collect.ForwardingList<any>>;
          public delegate(): java.util.Collection<any>;
          public subList(fromIndex: number, toIndex: number): java.util.List<any>;
          public get(index: number): any;
          public set(index: number, element: any): any;
          public addAll(collection: java.util.Collection<any>): boolean;
          public remove(index: number): any;
          public add(element: any): boolean;
          public add(index: number, element: any): void;
          public equals(object: any): boolean;
          public indexOf(element: any): number;
          public constructor();
          public delegate(): java.util.List<any>;
          public addAll(index: number, elements: java.util.Collection<any>): boolean;
          public listIterator(): java.util.ListIterator<any>;
          public lastIndexOf(element: any): number;
          public listIterator(index: number): java.util.ListIterator<any>;
          public hashCode(): number;
          public delegate(): any;
          public remove(object: any): boolean;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export abstract class ForwardingListIterator<E> extends com.google.common.collect.ForwardingIterator<any> implements java.util.ListIterator<any> {
          public static class: java.lang.Class<com.google.common.collect.ForwardingListIterator<any>>;
          public set(element: any): void;
          public previousIndex(): number;
          public nextIndex(): number;
          public constructor();
          public hasPrevious(): boolean;
          public previous(): any;
          public delegate(): java.util.Iterator<any>;
          public add(element: any): void;
          public delegate(): any;
          public delegate(): java.util.ListIterator<any>;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export abstract class ForwardingMap<K, V> extends com.google.common.collect.ForwardingObject implements java.util.Map<any, any> {
          public static class: java.lang.Class<com.google.common.collect.ForwardingMap<any, any>>;
          public containsKey(key: any): boolean;
          public get(key: any): any;
          public createKeySet(): java.util.Set<any>;
          public createValues(): java.util.Collection<any>;
          public isEmpty(): boolean;
          public size(): number;
          public putAll(map: java.util.Map<any, any>): void;
          public values(): java.util.Collection<any>;
          public containsValue(value: any): boolean;
          public equals(object: any): boolean;
          public remove(object: any): any;
          public entrySet(): java.util.Set<java.util.Map.Entry<any, any>>;
          public constructor();
          public keySet(): java.util.Set<any>;
          public clear(): void;
          public put(key: any, value: any): any;
          public createEntrySet(): java.util.Set<java.util.Map.Entry<any, any>>;
          public hashCode(): number;
          public delegate(): any;
          public delegate(): java.util.Map<any, any>;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export abstract class ForwardingMapEntry<K, V> extends com.google.common.collect.ForwardingObject implements java.util.Map.Entry<any, any> {
          public static class: java.lang.Class<com.google.common.collect.ForwardingMapEntry<any, any>>;
          public delegate(): java.util.Map.Entry<any, any>;
          public getValue(): any;
          public equals(object: any): boolean;
          public constructor();
          public setValue(value: any): any;
          public getKey(): any;
          public hashCode(): number;
          public delegate(): any;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export abstract class ForwardingMultimap<K, V> extends com.google.common.collect.ForwardingObject implements com.google.common.collect.Multimap<any, any> {
          public static class: java.lang.Class<com.google.common.collect.ForwardingMultimap<any, any>>;
          public containsKey(key: any): boolean;
          public isEmpty(): boolean;
          public keys(): com.google.common.collect.Multiset<any>;
          public asMap(): java.util.Map<any, java.util.Collection<any>>;
          public size(): number;
          public replaceValues(key: any, values: java.lang.Iterable<any>): java.util.Collection<any>;
          public remove(key: any, value: any): boolean;
          public entries(): java.util.Collection<java.util.Map.Entry<any, any>>;
          public equals(object: any): boolean;
          public containsValue(param0: any): boolean;
          public get(key: any): java.util.Collection<any>;
          public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Collection<any>;
          public constructor();
          public keySet(): java.util.Set<any>;
          public removeAll(key: any): java.util.Collection<any>;
          public clear(): void;
          public containsEntry(key: any, value: any): boolean;
          public putAll(param0: any, param1: java.lang.Iterable<any>): boolean;
          public putAll(key: any, values: java.lang.Iterable<any>): boolean;
          public hashCode(): number;
          public delegate(): any;
          public remove(param0: any, param1: any): boolean;
          public putAll(param0: com.google.common.collect.Multimap<any, any>): boolean;
          public put(key: any, value: any): boolean;
          public values(): java.util.Collection<any>;
          public containsValue(value: any): boolean;
          public equals(param0: any): boolean;
          public put(param0: any, param1: any): boolean;
          public containsKey(param0: any): boolean;
          public putAll(multimap: com.google.common.collect.Multimap<any, any>): boolean;
          public delegate(): com.google.common.collect.Multimap<any, any>;
          public get(param0: any): java.util.Collection<any>;
          public containsEntry(param0: any, param1: any): boolean;
          public removeAll(param0: any): java.util.Collection<any>;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export abstract class ForwardingMultiset<E> extends com.google.common.collect.ForwardingCollection<any> implements com.google.common.collect.Multiset<any> {
          public static class: java.lang.Class<com.google.common.collect.ForwardingMultiset<any>>;
          public delegate(): java.util.Collection<any>;
          public add(element: any, occurrences: number): number;
          public setCount(param0: any, param1: number): number;
          public add(param0: any): boolean;
          public containsAll(param0: java.util.Collection<any>): boolean;
          public setCount(element: any, count: number): number;
          public add(element: any): boolean;
          public equals(object: any): boolean;
          public toString(): string;
          public add(param0: any, param1: number): number;
          public constructor();
          public remove(param0: any, param1: number): number;
          public remove(element: any, occurrences: number): number;
          public count(param0: any): number;
          public hashCode(): number;
          public delegate(): any;
          public contains(param0: any): boolean;
          public remove(object: any): boolean;
          public setCount(element: any, oldCount: number, newCount: number): boolean;
          public remove(param0: any): boolean;
          public removeAll(param0: java.util.Collection<any>): boolean;
          public retainAll(param0: java.util.Collection<any>): boolean;
          public setCount(param0: any, param1: number, param2: number): boolean;
          public equals(param0: any): boolean;
          public elementSet(): java.util.Set<any>;
          public delegate(): com.google.common.collect.Multiset<any>;
          public count(element: any): number;
          public entrySet(): java.util.Set<com.google.common.collect.Multiset.Entry<any>>;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export abstract class ForwardingObject {
          public static class: java.lang.Class<com.google.common.collect.ForwardingObject>;
          public toString(): string;
          public constructor();
          public delegate(): any;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export abstract class ForwardingQueue<E> extends com.google.common.collect.ForwardingCollection<any> implements java.util.Queue<any> {
          public static class: java.lang.Class<com.google.common.collect.ForwardingQueue<any>>;
          public delegate(): java.util.Collection<any>;
          public poll(): any;
          public peek(): any;
          public delegate(): java.util.Queue<any>;
          public constructor();
          public remove(): any;
          public element(): any;
          public delegate(): any;
          public offer(o: any): boolean;
          public remove(object: any): boolean;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export abstract class ForwardingSet<E> extends com.google.common.collect.ForwardingCollection<any> implements java.util.Set<any> {
          public static class: java.lang.Class<com.google.common.collect.ForwardingSet<any>>;
          public delegate(): java.util.Collection<any>;
          public equals(object: any): boolean;
          public constructor();
          public hashCode(): number;
          public delegate(): any;
          public delegate(): java.util.Set<any>;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export abstract class ForwardingSortedMap<K, V> extends com.google.common.collect.ForwardingMap<any, any> implements java.util.SortedMap<any, any> {
          public static class: java.lang.Class<com.google.common.collect.ForwardingSortedMap<any, any>>;
          public headMap(toKey: any): java.util.SortedMap<any, any>;
          public subMap(fromKey: any, toKey: any): java.util.SortedMap<any, any>;
          public constructor();
          public comparator(): java.util.Comparator<any>;
          public firstKey(): any;
          public tailMap(fromKey: any): java.util.SortedMap<any, any>;
          public delegate(): java.util.SortedMap<any, any>;
          public lastKey(): any;
          public delegate(): java.util.Map<any, any>;
          public delegate(): any;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export abstract class ForwardingSortedSet<E> extends com.google.common.collect.ForwardingSet<any> implements java.util.SortedSet<any> {
          public static class: java.lang.Class<com.google.common.collect.ForwardingSortedSet<any>>;
          public delegate(): java.util.Collection<any>;
          public first(): any;
          public constructor();
          public last(): any;
          public comparator(): java.util.Comparator<any>;
          public tailSet(fromElement: any): java.util.SortedSet<any>;
          public headSet(toElement: any): java.util.SortedSet<any>;
          public delegate(): any;
          public subSet(fromElement: any, toElement: any): java.util.SortedSet<any>;
          public delegate(): java.util.Set<any>;
          public delegate(): java.util.SortedSet<any>;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class HashBiMap<K, V> extends com.google.common.collect.StandardBiMap<any, any> {
          public static class: java.lang.Class<com.google.common.collect.HashBiMap<any, any>>;
          public putAll(param0: java.util.Map<any, any>): void;
          public values(): java.util.Set<any>;
          public forcePut(key: any, value: any): any;
          public put(key: any, value: any): any;
          public inverse(): com.google.common.collect.BiMap<any, any>;
          public static create(): com.google.common.collect.HashBiMap<any, any>;
          public values(): java.util.Collection<any>;
          public forcePut(param0: any, param1: any): any;
          public static create(expectedSize: number): com.google.common.collect.HashBiMap<any, any>;
          public put(param0: any, param1: any): any;
          public static create(map: java.util.Map<any, any>): com.google.common.collect.HashBiMap<any, any>;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class HashMultimap<K, V> extends com.google.common.collect.StandardSetMultimap<any, any> {
          public static class: java.lang.Class<com.google.common.collect.HashMultimap<any, any>>;
          public static create(): com.google.common.collect.HashMultimap<any, any>;
          public isEmpty(): boolean;
          public keys(): com.google.common.collect.Multiset<any>;
          public asMap(): java.util.Map<any, java.util.Collection<any>>;
          public size(): number;
          public entries(): java.util.Collection<java.util.Map.Entry<any, any>>;
          public containsValue(param0: any): boolean;
          public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Set<any>;
          public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Collection<any>;
          public keySet(): java.util.Set<any>;
          public clear(): void;
          public putAll(param0: any, param1: java.lang.Iterable<any>): boolean;
          public hashCode(): number;
          public remove(param0: any, param1: any): boolean;
          public removeAll(key: any): java.util.Set<any>;
          public static create(expectedKeys: number, expectedValuesPerKey: number): com.google.common.collect.HashMultimap<any, any>;
          public putAll(param0: com.google.common.collect.Multimap<any, any>): boolean;
          public values(): java.util.Collection<any>;
          public removeAll(param0: any): java.util.Set<any>;
          public equals(param0: any): boolean;
          public put(param0: any, param1: any): boolean;
          public containsKey(param0: any): boolean;
          public entries(): java.util.Set<java.util.Map.Entry<any, any>>;
          public replaceValues(key: any, values: java.lang.Iterable<any>): java.util.Set<any>;
          public get(param0: any): java.util.Collection<any>;
          public get(param0: any): java.util.Set<any>;
          public static create(multimap: com.google.common.collect.Multimap<any, any>): com.google.common.collect.HashMultimap<any, any>;
          public containsEntry(param0: any, param1: any): boolean;
          public get(key: any): java.util.Set<any>;
          public removeAll(param0: any): java.util.Collection<any>;
          public putAll(i$: com.google.common.collect.Multimap<any, any>): boolean;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class HashMultiset<E> extends com.google.common.collect.AbstractMapBasedMultiset<any> {
          public static class: java.lang.Class<com.google.common.collect.HashMultiset<any>>;
          public remove(param0: any): boolean;
          public removeAll(param0: java.util.Collection<any>): boolean;
          public setCount(param0: any, param1: number): number;
          public add(param0: any): boolean;
          public containsAll(param0: java.util.Collection<any>): boolean;
          public retainAll(param0: java.util.Collection<any>): boolean;
          public setCount(param0: any, param1: number, param2: number): boolean;
          public remove(element: any): boolean;
          public add(element: any): boolean;
          public equals(param0: any): boolean;
          public static create(elements: java.lang.Iterable<any>): com.google.common.collect.HashMultiset<any>;
          public toString(): string;
          public add(param0: any, param1: number): number;
          public static create(): com.google.common.collect.HashMultiset<any>;
          public remove(param0: any, param1: number): number;
          public count(param0: any): number;
          public elementSet(): java.util.Set<any>;
          public hashCode(): number;
          public static create(distinctElements: number): com.google.common.collect.HashMultiset<any>;
          public entrySet(): java.util.Set<com.google.common.collect.Multiset.Entry<any>>;
          public contains(param0: any): boolean;
          public setCount(element: any, oldCount: number, newCount: number): boolean;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class Hashing {
          public static class: java.lang.Class<com.google.common.collect.Hashing>;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export abstract class ImmutableBiMap<K, V> extends com.google.common.collect.ImmutableMap<any, any> implements com.google.common.collect.BiMap<any, any> {
          public static class: java.lang.Class<com.google.common.collect.ImmutableBiMap<any, any>>;
          public containsKey(key: any): boolean;
          public get(key: any): any;
          public inverse(): com.google.common.collect.ImmutableBiMap<any, any>;
          public isEmpty(): boolean;
          public static of(k1: any, v1: any, k2: any, v2: any, k3: any, v3: any, k4: any, v4: any): com.google.common.collect.ImmutableMap<any, any>;
          public static of(k1: any, v1: any, k2: any, v2: any, k3: any, v3: any): com.google.common.collect.ImmutableBiMap<any, any>;
          public entrySet(): com.google.common.collect.ImmutableSet<java.util.Map.Entry<any, any>>;
          public static of(k1: any, v1: any, k2: any, v2: any, k3: any, v3: any, k4: any, v4: any, k5: any, v5: any): com.google.common.collect.ImmutableBiMap<any, any>;
          public size(): number;
          public inverse(): com.google.common.collect.BiMap<any, any>;
          public static of(k1: any, v1: any, k2: any, v2: any, k3: any, v3: any): com.google.common.collect.ImmutableMap<any, any>;
          public static of(k1: any, v1: any): com.google.common.collect.ImmutableBiMap<any, any>;
          public put(param0: any, param1: any): any;
          public static of(k1: any, v1: any, k2: any, v2: any): com.google.common.collect.ImmutableBiMap<any, any>;
          public static builder(): com.google.common.collect.ImmutableMap.Builder<any, any>;
          public keySet(): com.google.common.collect.ImmutableSet<any>;
          public putAll(param0: java.util.Map<any, any>): void;
          public equals(object: any): boolean;
          public toString(): string;
          public static of(k1: any, v1: any): com.google.common.collect.ImmutableMap<any, any>;
          public static of(k1: any, v1: any, k2: any, v2: any, k3: any, v3: any, k4: any, v4: any, k5: any, v5: any): com.google.common.collect.ImmutableMap<any, any>;
          public static of(k1: any, v1: any, k2: any, v2: any, k3: any, v3: any, k4: any, v4: any): com.google.common.collect.ImmutableBiMap<any, any>;
          public static of(k1: any, v1: any, k2: any, v2: any): com.google.common.collect.ImmutableMap<any, any>;
          public hashCode(): number;
          public forcePut(param0: any, param1: any): any;
          public static builder(): com.google.common.collect.ImmutableBiMap.Builder<any, any>;
          public values(): com.google.common.collect.ImmutableSet<any>;
          public static copyOf(bimap: java.util.Map<any, any>): com.google.common.collect.ImmutableBiMap<any, any>;
          public static of(): com.google.common.collect.ImmutableMap<any, any>;
          public containsValue(value: any): boolean;
          public values(): java.util.Set<any>;
          public forcePut(key: any, value: any): any;
          public static copyOf(kvMap: java.util.Map<any, any>): com.google.common.collect.ImmutableMap<any, any>;
          public values(): com.google.common.collect.ImmutableCollection<any>;
          public static of(): com.google.common.collect.ImmutableBiMap<any, any>;
        }
        export module ImmutableBiMap {
          export class Builder<K, V> extends com.google.common.collect.ImmutableMap.Builder<any, any> {
            public static class: java.lang.Class<com.google.common.collect.ImmutableBiMap.Builder<any, any>>;
            public build(): com.google.common.collect.ImmutableMap<any, any>;
            public constructor();
            public putAll(i$: java.util.Map<any, any>): com.google.common.collect.ImmutableMap.Builder<any, any>;
            public build(): com.google.common.collect.ImmutableBiMap<any, any>;
            public put(key: any, value: any): com.google.common.collect.ImmutableMap.Builder<any, any>;
            public putAll(map: java.util.Map<any, any>): com.google.common.collect.ImmutableBiMap.Builder<any, any>;
            public put(key: any, value: any): com.google.common.collect.ImmutableBiMap.Builder<any, any>;
          }
          export class EmptyBiMap extends com.google.common.collect.ImmutableBiMap<any, any> {
            public static class: java.lang.Class<com.google.common.collect.ImmutableBiMap.EmptyBiMap>;
            public put(param0: any, param1: any): any;
            public putAll(param0: java.util.Map<any, any>): void;
            public values(): com.google.common.collect.ImmutableCollection<any>;
            public values(): java.util.Set<any>;
            public forcePut(param0: any, param1: any): any;
            public inverse(): com.google.common.collect.BiMap<any, any>;
            public values(): com.google.common.collect.ImmutableSet<any>;
            public inverse(): com.google.common.collect.ImmutableBiMap<any, any>;
          }
          export class RegularImmutableBiMap<K, V> extends com.google.common.collect.ImmutableBiMap<any, any> {
            public static class: java.lang.Class<com.google.common.collect.ImmutableBiMap.RegularImmutableBiMap<any, any>>;
            public put(param0: any, param1: any): any;
            public putAll(param0: java.util.Map<any, any>): void;
            public values(): com.google.common.collect.ImmutableCollection<any>;
            public values(): java.util.Set<any>;
            public forcePut(param0: any, param1: any): any;
            public inverse(): com.google.common.collect.BiMap<any, any>;
            public values(): com.google.common.collect.ImmutableSet<any>;
            public inverse(): com.google.common.collect.ImmutableBiMap<any, any>;
          }
          export class SerializedForm extends com.google.common.collect.ImmutableMap.SerializedForm {
            public static class: java.lang.Class<com.google.common.collect.ImmutableBiMap.SerializedForm>;
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class ImmutableClassToInstanceMap<B> extends com.google.common.collect.ForwardingMap<java.lang.Class<any>, any> implements com.google.common.collect.ClassToInstanceMap<any> {
          public static class: java.lang.Class<com.google.common.collect.ImmutableClassToInstanceMap<any>>;
          public putInstance(param0: java.lang.Class<any>, param1: any): any;
          public putInstance(type: java.lang.Class<any>, value: any): any;
          public getInstance(type: java.lang.Class<any>): any;
          public static builder(): com.google.common.collect.ImmutableClassToInstanceMap.Builder<any>;
          public static copyOf(map: java.util.Map<any, any>): com.google.common.collect.ImmutableClassToInstanceMap<any>;
          public delegate(): java.util.Map<java.lang.Class<any>, any>;
          public delegate(): any;
          public getInstance(param0: java.lang.Class<any>): any;
        }
        export module ImmutableClassToInstanceMap {
          export class Builder<B> extends java.lang.Object {
            public static class: java.lang.Class<com.google.common.collect.ImmutableClassToInstanceMap.Builder<any>>;
            public putAll(value: java.util.Map<any, any>): com.google.common.collect.ImmutableClassToInstanceMap.Builder<any>;
            public constructor();
            public put(type: java.lang.Class<any>, value: any): com.google.common.collect.ImmutableClassToInstanceMap.Builder<any>;
            public build(): com.google.common.collect.ImmutableClassToInstanceMap<B>;
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export abstract class ImmutableCollection<E> extends java.lang.Object {
          public static class: java.lang.Class<com.google.common.collect.ImmutableCollection<any>>;
          public add(e: E): boolean;
          public contains(i$: any): boolean;
          public isEmpty(): boolean;
          public toArray(element: androidNative.Array<any>): androidNative.Array<any>;
          public toArray(): androidNative.Array<any>;
          public retainAll(elementsToKeep: java.util.Collection<any>): boolean;
          public iterator(): com.google.common.collect.UnmodifiableIterator<E>;
          public toString(): string;
          public removeAll(oldElements: java.util.Collection<any>): boolean;
          public clear(): void;
          public containsAll(i$: java.util.Collection<any>): boolean;
          public remove(object: any): boolean;
          public addAll(newElements: java.util.Collection<any>): boolean;
        }
        export module ImmutableCollection {
          export class ArrayImmutableCollection<E> extends com.google.common.collect.ImmutableCollection<any> {
            public static class: java.lang.Class<com.google.common.collect.ImmutableCollection.ArrayImmutableCollection<any>>;
            public iterator(): com.google.common.collect.UnmodifiableIterator<any>;
            public isEmpty(): boolean;
            public size(): number;
          }
          export class EmptyImmutableCollection extends com.google.common.collect.ImmutableCollection<any> {
            public static class: java.lang.Class<com.google.common.collect.ImmutableCollection.EmptyImmutableCollection>;
            public toArray(array: androidNative.Array<any>): androidNative.Array<any>;
            public toArray(element: androidNative.Array<any>): androidNative.Array<any>;
            public contains(object: any): boolean;
            public iterator(): com.google.common.collect.UnmodifiableIterator<any>;
            public isEmpty(): boolean;
            public toArray(): androidNative.Array<any>;
            public size(): number;
          }
          export class SerializedForm {
            public static class: java.lang.Class<com.google.common.collect.ImmutableCollection.SerializedForm>;
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class ImmutableEntry<K, V> extends com.google.common.collect.AbstractMapEntry<any, any> implements java.io.Serializable {
          public static class: java.lang.Class<com.google.common.collect.ImmutableEntry<any, any>>;
          public getValue(): any;
          public getKey(): any;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export abstract class ImmutableList<E> extends com.google.common.collect.ImmutableCollection<any> {
          public static class: java.lang.Class<com.google.common.collect.ImmutableList<any>>;
          public static of(element: any): com.google.common.collect.ImmutableList<any>;
          public static builder(): com.google.common.collect.ImmutableList.Builder<any>;
          public static copyOf(elements: java.util.Iterator<any>): com.google.common.collect.ImmutableList<any>;
          public add(e: any): boolean;
          public static of(elements: androidNative.Array<any>): com.google.common.collect.ImmutableList<any>;
          public addAll(index: number, newElements: java.util.Collection<any>): boolean;
          public set(index: number, element: any): any;
          public static of(e1: any, e2: any, e3: any, e4: any): com.google.common.collect.ImmutableList<any>;
          public static of(e1: any, e2: any, e3: any, e4: any, e5: any): com.google.common.collect.ImmutableList<any>;
          public lastIndexOf(param0: any): number;
          public indexOf(param0: any): number;
          public remove(index: number): any;
          public subList(param0: number, param1: number): com.google.common.collect.ImmutableList<any>;
          public static of(): com.google.common.collect.ImmutableList<any>;
          public add(index: number, element: any): void;
          public static copyOf(list: java.lang.Iterable<any>): com.google.common.collect.ImmutableList<any>;
          public iterator(): com.google.common.collect.UnmodifiableIterator<any>;
          public static of(e1: any, e2: any): com.google.common.collect.ImmutableList<any>;
          public static of(e1: any, e2: any, e3: any): com.google.common.collect.ImmutableList<any>;
          public addAll(newElements: java.util.Collection<any>): boolean;
          public remove(object: any): boolean;
        }
        export module ImmutableList {
          export class Builder<E> extends java.lang.Object {
            public static class: java.lang.Class<com.google.common.collect.ImmutableList.Builder<any>>;
            public constructor();
            public build(): com.google.common.collect.ImmutableList<E>;
            public addAll(elem: java.lang.Iterable<any>): com.google.common.collect.ImmutableList.Builder<E>;
            public add(element: E): com.google.common.collect.ImmutableList.Builder<E>;
          }
          export class EmptyImmutableList extends com.google.common.collect.ImmutableList<any> {
            public static class: java.lang.Class<com.google.common.collect.ImmutableList.EmptyImmutableList>;
            public indexOf(target: any): number;
            public toArray(element: androidNative.Array<any>): androidNative.Array<any>;
            public listIterator(): java.util.ListIterator<any>;
            public equals(this_: any): boolean;
            public iterator(): com.google.common.collect.UnmodifiableIterator<any>;
            public contains(target: any): boolean;
            public get(index: number): any;
            public toArray(): androidNative.Array<any>;
            public hashCode(): number;
            public listIterator(start: number): java.util.ListIterator<any>;
            public toString(): string;
            public lastIndexOf(target: any): number;
            public isEmpty(): boolean;
            public toArray(a: androidNative.Array<any>): androidNative.Array<any>;
            public size(): number;
            public containsAll(targets: java.util.Collection<any>): boolean;
            public subList(fromIndex: number, toIndex: number): com.google.common.collect.ImmutableList<any>;
          }
          export class SerializedForm {
            public static class: java.lang.Class<com.google.common.collect.ImmutableList.SerializedForm>;
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export abstract class ImmutableMap<K, V> extends java.lang.Object {
          public static class: java.lang.Class<com.google.common.collect.ImmutableMap<any, any>>;
          public replace(key: K, oldValue: V, newValue: V): boolean;
          public entrySet(): com.google.common.collect.ImmutableSet<java.util.Map.Entry<K, V>>;
          public static of(k1: any, v1: any, k2: any, v2: any, k3: any, v3: any, k4: any, v4: any): com.google.common.collect.ImmutableMap<any, any>;
          public remove(o: any): V;
          public putIfAbsent(key: K, value: V): V;
          public static of(k1: any, v1: any, k2: any, v2: any, k3: any, v3: any): com.google.common.collect.ImmutableMap<any, any>;
          public static builder(): com.google.common.collect.ImmutableMap.Builder<any, any>;
          public remove(key: any, value: any): boolean;
          public keySet(): com.google.common.collect.ImmutableSet<K>;
          public put(k: K, v: V): V;
          public containsValue(param0: any): boolean;
          public toString(): string;
          public static of(k1: any, v1: any): com.google.common.collect.ImmutableMap<any, any>;
          public static of(k1: any, v1: any, k2: any, v2: any, k3: any, v3: any, k4: any, v4: any, k5: any, v5: any): com.google.common.collect.ImmutableMap<any, any>;
          public clear(): void;
          public static of(k1: any, v1: any, k2: any, v2: any): com.google.common.collect.ImmutableMap<any, any>;
          public hashCode(): number;
          public values(): com.google.common.collect.ImmutableCollection<V>;
          public equals(this_: any): boolean;
          public putAll(map: java.util.Map<any, any>): void;
          public static of(): com.google.common.collect.ImmutableMap<any, any>;
          public get(param0: any): V;
          public containsKey(param0: any): boolean;
          public replace(key: K, value: V): V;
          public static copyOf(kvMap: java.util.Map<any, any>): com.google.common.collect.ImmutableMap<any, any>;
        }
        export module ImmutableMap {
          export class Builder<K, V> extends java.lang.Object {
            public static class: java.lang.Class<com.google.common.collect.ImmutableMap.Builder<any, any>>;
            public constructor();
            public build(): com.google.common.collect.ImmutableMap<K, V>;
            public putAll(i$: java.util.Map<any, any>): com.google.common.collect.ImmutableMap.Builder<K, V>;
            public put(key: K, value: V): com.google.common.collect.ImmutableMap.Builder<K, V>;
          }
          export class EmptyImmutableMap extends com.google.common.collect.ImmutableMap<any, any> {
            public static class: java.lang.Class<com.google.common.collect.ImmutableMap.EmptyImmutableMap>;
            public entrySet(): com.google.common.collect.ImmutableSet<java.util.Map.Entry<any, any>>;
            public equals(this_: any): boolean;
            public containsValue(value: any): boolean;
            public values(): com.google.common.collect.ImmutableCollection<any>;
            public get(key: any): any;
            public isEmpty(): boolean;
            public hashCode(): number;
            public containsKey(key: any): boolean;
            public size(): number;
            public toString(): string;
            public keySet(): com.google.common.collect.ImmutableSet<any>;
          }
          export class SerializedForm {
            public static class: java.lang.Class<com.google.common.collect.ImmutableMap.SerializedForm>;
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class ImmutableMultimap<K, V>
          extends com.google.common.collect.AbstractImmutableMultimap<any, any, com.google.common.collect.ImmutableList<any>>
          implements com.google.common.collect.ListMultimap<any, any>
        {
          public static class: java.lang.Class<com.google.common.collect.ImmutableMultimap<any, any>>;
          public replaceValues(key: any, values: java.lang.Iterable<any>): any;
          public keys(): com.google.common.collect.ImmutableMultiset<any>;
          public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.List<any>;
          public isEmpty(): boolean;
          public keys(): com.google.common.collect.Multiset<any>;
          public static of(): com.google.common.collect.ImmutableMultimap<any, any>;
          public asMap(): java.util.Map<any, java.util.Collection<any>>;
          public get(key: any): com.google.common.collect.ImmutableList<any>;
          public size(): number;
          public removeAll(param0: any): java.util.List<any>;
          public keySet(): com.google.common.collect.ImmutableSet<any>;
          public entries(): java.util.Collection<java.util.Map.Entry<any, any>>;
          public containsValue(param0: any): boolean;
          public static builder(): com.google.common.collect.ImmutableMultimap.Builder<any, any>;
          public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Collection<any>;
          public keySet(): java.util.Set<any>;
          public clear(): void;
          public static of(k1: any, v1: any, k2: any, v2: any): com.google.common.collect.ImmutableMultimap<any, any>;
          public putAll(param0: any, param1: java.lang.Iterable<any>): boolean;
          public static of(k1: any, v1: any, k2: any, v2: any, k3: any, v3: any): com.google.common.collect.ImmutableMultimap<any, any>;
          public hashCode(): number;
          public removeAll(key: any): any;
          public remove(param0: any, param1: any): boolean;
          public asMap(): com.google.common.collect.ImmutableMap<any, java.util.Collection<any>>;
          public entries(): com.google.common.collect.ImmutableCollection<java.util.Map.Entry<any, any>>;
          public putAll(param0: com.google.common.collect.Multimap<any, any>): boolean;
          public static of(k1: any, v1: any, k2: any, v2: any, k3: any, v3: any, k4: any, v4: any, k5: any, v5: any): com.google.common.collect.ImmutableMultimap<any, any>;
          public values(): java.util.Collection<any>;
          public equals(param0: any): boolean;
          public static of(k1: any, v1: any): com.google.common.collect.ImmutableMultimap<any, any>;
          public put(param0: any, param1: any): boolean;
          public containsKey(param0: any): boolean;
          public get(param0: any): java.util.List<any>;
          public putAll(multimap: com.google.common.collect.Multimap<any, any>): boolean;
          public get(param0: any): java.util.Collection<any>;
          public static of(k1: any, v1: any, k2: any, v2: any, k3: any, v3: any, k4: any, v4: any): com.google.common.collect.ImmutableMultimap<any, any>;
          public containsEntry(param0: any, param1: any): boolean;
          public static copyOf(kvMultimap: com.google.common.collect.Multimap<any, any>): com.google.common.collect.ImmutableMultimap<any, any>;
          public values(): com.google.common.collect.ImmutableCollection<any>;
          public removeAll(param0: any): java.util.Collection<any>;
        }
        export module ImmutableMultimap {
          export class Builder<K, V> extends java.lang.Object {
            public static class: java.lang.Class<com.google.common.collect.ImmutableMultimap.Builder<any, any>>;
            public constructor();
            public putAll(i$: K, this_: java.lang.Iterable<any>): com.google.common.collect.ImmutableMultimap.Builder<K, V>;
            public putAll(key: K, values: androidNative.Array<V>): com.google.common.collect.ImmutableMultimap.Builder<K, V>;
            public build(): com.google.common.collect.ImmutableMultimap<K, V>;
            public put(key: K, value: V): com.google.common.collect.ImmutableMultimap.Builder<K, V>;
            public putAll(i$: com.google.common.collect.Multimap<any, any>): com.google.common.collect.ImmutableMultimap.Builder<K, V>;
          }
          export class BuilderMultimap<K, V> extends com.google.common.collect.StandardMultimap<any, any> {
            public static class: java.lang.Class<com.google.common.collect.ImmutableMultimap.BuilderMultimap<any, any>>;
            public entries(): java.util.Collection<java.util.Map.Entry<any, any>>;
            public equals(param0: any): boolean;
            public hashCode(): number;
            public asMap(): java.util.Map<any, java.util.Collection<any>>;
            public containsValue(param0: any): boolean;
            public values(): java.util.Collection<any>;
            public containsKey(param0: any): boolean;
            public removeAll(param0: any): java.util.Collection<any>;
            public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Collection<any>;
            public putAll(param0: any, param1: java.lang.Iterable<any>): boolean;
            public putAll(param0: com.google.common.collect.Multimap<any, any>): boolean;
            public isEmpty(): boolean;
            public put(param0: any, param1: any): boolean;
            public putAll(i$: com.google.common.collect.Multimap<any, any>): boolean;
            public get(param0: any): java.util.Collection<any>;
            public remove(param0: any, param1: any): boolean;
            public clear(): void;
            public keys(): com.google.common.collect.Multiset<any>;
            public size(): number;
            public containsEntry(param0: any, param1: any): boolean;
            public keySet(): java.util.Set<any>;
          }
          export class EmptyMultimap extends com.google.common.collect.ImmutableMultimap<any, any> {
            public static class: java.lang.Class<com.google.common.collect.ImmutableMultimap.EmptyMultimap>;
            public values(): com.google.common.collect.ImmutableCollection<any>;
            public equals(param0: any): boolean;
            public hashCode(): number;
            public asMap(): java.util.Map<any, java.util.Collection<any>>;
            public values(): java.util.Collection<any>;
            public removeAll(param0: any): java.util.List<any>;
            public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Collection<any>;
            public keys(): com.google.common.collect.ImmutableMultiset<any>;
            public isEmpty(): boolean;
            public put(param0: any, param1: any): boolean;
            public remove(param0: any, param1: any): boolean;
            public replaceValues(key: any, values: java.lang.Iterable<any>): any;
            public keys(): com.google.common.collect.Multiset<any>;
            public size(): number;
            public removeAll(key: any): any;
            public asMap(): com.google.common.collect.ImmutableMap<any, java.util.Collection<any>>;
            public get(key: any): com.google.common.collect.ImmutableList<any>;
            public entries(): java.util.Collection<java.util.Map.Entry<any, any>>;
            public get(param0: any): java.util.List<any>;
            public containsValue(param0: any): boolean;
            public containsKey(param0: any): boolean;
            public removeAll(param0: any): java.util.Collection<any>;
            public keySet(): com.google.common.collect.ImmutableSet<any>;
            public putAll(multimap: com.google.common.collect.Multimap<any, any>): boolean;
            public putAll(param0: any, param1: java.lang.Iterable<any>): boolean;
            public putAll(param0: com.google.common.collect.Multimap<any, any>): boolean;
            public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.List<any>;
            public get(param0: any): java.util.Collection<any>;
            public clear(): void;
            public entries(): com.google.common.collect.ImmutableCollection<java.util.Map.Entry<any, any>>;
            public containsEntry(param0: any, param1: any): boolean;
            public keySet(): java.util.Set<any>;
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class ImmutableMultiset<E> extends com.google.common.collect.ImmutableCollection<any> implements com.google.common.collect.Multiset<any> {
          public static class: java.lang.Class<com.google.common.collect.ImmutableMultiset<any>>;
          public static of(elements: androidNative.Array<any>): com.google.common.collect.ImmutableMultiset<any>;
          public equals(i$: any): boolean;
          public add(element: any, occurrences: number): number;
          public setCount(param0: any, param1: number): number;
          public add(param0: any): boolean;
          public static of(): com.google.common.collect.ImmutableMultiset<any>;
          public containsAll(param0: java.util.Collection<any>): boolean;
          public size(): number;
          public setCount(element: any, count: number): number;
          public toString(): string;
          public add(param0: any, param1: number): number;
          public remove(param0: any, param1: number): number;
          public contains(element: any): boolean;
          public remove(element: any, occurrences: number): number;
          public count(param0: any): number;
          public hashCode(): number;
          public contains(param0: any): boolean;
          public remove(object: any): boolean;
          public setCount(element: any, oldCount: number, newCount: number): boolean;
          public remove(param0: any): boolean;
          public removeAll(param0: java.util.Collection<any>): boolean;
          public add(e: any): boolean;
          public retainAll(param0: java.util.Collection<any>): boolean;
          public setCount(param0: any, param1: number, param2: number): boolean;
          public equals(param0: any): boolean;
          public static copyOf(elements: java.util.Iterator<any>): com.google.common.collect.ImmutableMultiset<any>;
          public static copyOf(result: java.lang.Iterable<any>): com.google.common.collect.ImmutableMultiset<any>;
          public iterator(): com.google.common.collect.UnmodifiableIterator<any>;
          public elementSet(): java.util.Set<any>;
          public count(element: any): number;
          public entrySet(): java.util.Set<com.google.common.collect.Multiset.Entry<any>>;
        }
        export module ImmutableMultiset {
          export class EmptyMultiset extends com.google.common.collect.ImmutableMultiset<any> {
            public static class: java.lang.Class<com.google.common.collect.ImmutableMultiset.EmptyMultiset>;
            public setCount(param0: any, param1: number): number;
            public setCount(element: any, oldCount: number, newCount: number): boolean;
            public add(e: any): boolean;
            public contains(param0: any): boolean;
            public add(param0: any): boolean;
            public count(param0: any): number;
            public elementSet(): java.util.Set<any>;
            public equals(param0: any): boolean;
            public hashCode(): number;
            public add(param0: any, param1: number): number;
            public toString(): string;
            public remove(param0: any): boolean;
            public retainAll(param0: java.util.Collection<any>): boolean;
            public setCount(param0: any, param1: number, param2: number): boolean;
            public remove(param0: any, param1: number): number;
            public remove(object: any): boolean;
            public entrySet(): java.util.Set<com.google.common.collect.Multiset.Entry<any>>;
            public removeAll(param0: java.util.Collection<any>): boolean;
            public containsAll(param0: java.util.Collection<any>): boolean;
          }
          export class EntrySet<E> extends com.google.common.collect.ImmutableSet<com.google.common.collect.Multiset.Entry<any>> {
            public static class: java.lang.Class<com.google.common.collect.ImmutableMultiset.EntrySet<any>>;
            public iterator(): com.google.common.collect.UnmodifiableIterator<com.google.common.collect.Multiset.Entry<any>>;
            public hashCode(): number;
            public size(): number;
            public constructor(multiset: com.google.common.collect.ImmutableMultiset<any>);
            public contains(count: any): boolean;
          }
          export class FieldSettersHolder {
            public static class: java.lang.Class<com.google.common.collect.ImmutableMultiset.FieldSettersHolder>;
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export abstract class ImmutableSet<E> extends com.google.common.collect.ImmutableCollection<any> implements java.util.Set<any> {
          public static class: java.lang.Class<com.google.common.collect.ImmutableSet<any>>;
          public equals(object: any): boolean;
          public static of(): com.google.common.collect.ImmutableSet<any>;
          public static of(elements: androidNative.Array<any>): com.google.common.collect.ImmutableSet<any>;
          public iterator(): com.google.common.collect.UnmodifiableIterator<any>;
          public static copyOf(set: java.lang.Iterable<any>): com.google.common.collect.ImmutableSet<any>;
          public static builder(): com.google.common.collect.ImmutableSet.Builder<any>;
          public hashCode(): number;
          public static of(element: any): com.google.common.collect.ImmutableSet<any>;
          public static copyOf(elements: java.util.Iterator<any>): com.google.common.collect.ImmutableSet<any>;
        }
        export module ImmutableSet {
          export abstract class ArrayImmutableSet<E> extends com.google.common.collect.ImmutableSet<any> {
            public static class: java.lang.Class<com.google.common.collect.ImmutableSet.ArrayImmutableSet<any>>;
            public toArray(array: androidNative.Array<any>): androidNative.Array<any>;
            public toArray(element: androidNative.Array<any>): androidNative.Array<any>;
            public iterator(): com.google.common.collect.UnmodifiableIterator<any>;
            public isEmpty(): boolean;
            public toArray(): androidNative.Array<any>;
            public containsAll(arr$: java.util.Collection<any>): boolean;
            public size(): number;
          }
          export class Builder<E> extends java.lang.Object {
            public static class: java.lang.Class<com.google.common.collect.ImmutableSet.Builder<any>>;
            public constructor();
            public addAll(this_: java.util.Iterator<any>): com.google.common.collect.ImmutableSet.Builder<E>;
            public add(element: E): com.google.common.collect.ImmutableSet.Builder<E>;
            public addAll(elem: java.lang.Iterable<any>): com.google.common.collect.ImmutableSet.Builder<E>;
            public build(): com.google.common.collect.ImmutableSet<E>;
            public add(arr$: androidNative.Array<E>): com.google.common.collect.ImmutableSet.Builder<E>;
          }
          export class EmptyImmutableSet extends com.google.common.collect.ImmutableSet<any> {
            public static class: java.lang.Class<com.google.common.collect.ImmutableSet.EmptyImmutableSet>;
            public toArray(element: androidNative.Array<any>): androidNative.Array<any>;
            public equals(this_: any): boolean;
            public iterator(): com.google.common.collect.UnmodifiableIterator<any>;
            public contains(target: any): boolean;
            public isEmpty(): boolean;
            public toArray(): androidNative.Array<any>;
            public hashCode(): number;
            public toArray(a: androidNative.Array<any>): androidNative.Array<any>;
            public size(): number;
            public containsAll(targets: java.util.Collection<any>): boolean;
            public toString(): string;
          }
          export class SerializedForm {
            public static class: java.lang.Class<com.google.common.collect.ImmutableSet.SerializedForm>;
          }
          export abstract class TransformedImmutableSet<D, E> extends com.google.common.collect.ImmutableSet<any> {
            public static class: java.lang.Class<com.google.common.collect.ImmutableSet.TransformedImmutableSet<any, any>>;
            public toArray(i: androidNative.Array<any>): androidNative.Array<any>;
            public toArray(element: androidNative.Array<any>): androidNative.Array<any>;
            public iterator(): com.google.common.collect.UnmodifiableIterator<any>;
            public isEmpty(): boolean;
            public toArray(): androidNative.Array<any>;
            public hashCode(): number;
            public size(): number;
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class ImmutableSetMultimap<K, V>
          extends com.google.common.collect.AbstractImmutableMultimap<any, any, com.google.common.collect.ImmutableSet<any>>
          implements com.google.common.collect.SetMultimap<any, any>
        {
          public static class: java.lang.Class<com.google.common.collect.ImmutableSetMultimap<any, any>>;
          public replaceValues(key: any, values: java.lang.Iterable<any>): any;
          public keys(): com.google.common.collect.ImmutableMultiset<any>;
          public isEmpty(): boolean;
          public keys(): com.google.common.collect.Multiset<any>;
          public static of(): com.google.common.collect.ImmutableSetMultimap<any, any>;
          public asMap(): java.util.Map<any, java.util.Collection<any>>;
          public static builder(): com.google.common.collect.ImmutableSetMultimap.Builder<any, any>;
          public static of(k1: any, v1: any): com.google.common.collect.ImmutableSetMultimap<any, any>;
          public size(): number;
          public keySet(): com.google.common.collect.ImmutableSet<any>;
          public entries(): java.util.Collection<java.util.Map.Entry<any, any>>;
          public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Set<any>;
          public containsValue(param0: any): boolean;
          public static of(k1: any, v1: any, k2: any, v2: any, k3: any, v3: any, k4: any, v4: any): com.google.common.collect.ImmutableSetMultimap<any, any>;
          public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Collection<any>;
          public keySet(): java.util.Set<any>;
          public clear(): void;
          public putAll(param0: any, param1: java.lang.Iterable<any>): boolean;
          public hashCode(): number;
          public removeAll(key: any): any;
          public remove(param0: any, param1: any): boolean;
          public static copyOf(kvMultimap: com.google.common.collect.Multimap<any, any>): com.google.common.collect.ImmutableSetMultimap<any, any>;
          public asMap(): com.google.common.collect.ImmutableMap<any, java.util.Collection<any>>;
          public entries(): com.google.common.collect.ImmutableSet<java.util.Map.Entry<any, any>>;
          public entries(): com.google.common.collect.ImmutableCollection<java.util.Map.Entry<any, any>>;
          public putAll(param0: com.google.common.collect.Multimap<any, any>): boolean;
          public values(): java.util.Collection<any>;
          public removeAll(param0: any): java.util.Set<any>;
          public equals(param0: any): boolean;
          public put(param0: any, param1: any): boolean;
          public entries(): java.util.Set<java.util.Map.Entry<any, any>>;
          public containsKey(param0: any): boolean;
          public putAll(multimap: com.google.common.collect.Multimap<any, any>): boolean;
          public get(key: any): com.google.common.collect.ImmutableSet<any>;
          public get(param0: any): java.util.Set<any>;
          public get(param0: any): java.util.Collection<any>;
          public static of(k1: any, v1: any, k2: any, v2: any, k3: any, v3: any, k4: any, v4: any, k5: any, v5: any): com.google.common.collect.ImmutableSetMultimap<any, any>;
          public containsEntry(param0: any, param1: any): boolean;
          public values(): com.google.common.collect.ImmutableCollection<any>;
          public static of(k1: any, v1: any, k2: any, v2: any, k3: any, v3: any): com.google.common.collect.ImmutableSetMultimap<any, any>;
          public removeAll(param0: any): java.util.Collection<any>;
          public static of(k1: any, v1: any, k2: any, v2: any): com.google.common.collect.ImmutableSetMultimap<any, any>;
        }
        export module ImmutableSetMultimap {
          export class Builder<K, V> extends java.lang.Object {
            public static class: java.lang.Class<com.google.common.collect.ImmutableSetMultimap.Builder<any, any>>;
            public constructor();
            public build(): com.google.common.collect.ImmutableSetMultimap<K, V>;
            public putAll(i$: K, this_: java.lang.Iterable<any>): com.google.common.collect.ImmutableSetMultimap.Builder<K, V>;
            public put(key: K, value: V): com.google.common.collect.ImmutableSetMultimap.Builder<K, V>;
            public putAll(key: K, values: androidNative.Array<V>): com.google.common.collect.ImmutableSetMultimap.Builder<K, V>;
            public putAll(i$: com.google.common.collect.Multimap<any, any>): com.google.common.collect.ImmutableSetMultimap.Builder<K, V>;
          }
          export class BuilderMultimap<K, V> extends com.google.common.collect.StandardMultimap<any, any> {
            public static class: java.lang.Class<com.google.common.collect.ImmutableSetMultimap.BuilderMultimap<any, any>>;
            public entries(): java.util.Collection<java.util.Map.Entry<any, any>>;
            public equals(param0: any): boolean;
            public hashCode(): number;
            public asMap(): java.util.Map<any, java.util.Collection<any>>;
            public containsValue(param0: any): boolean;
            public values(): java.util.Collection<any>;
            public containsKey(param0: any): boolean;
            public removeAll(param0: any): java.util.Collection<any>;
            public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Collection<any>;
            public putAll(param0: any, param1: java.lang.Iterable<any>): boolean;
            public putAll(param0: com.google.common.collect.Multimap<any, any>): boolean;
            public isEmpty(): boolean;
            public put(param0: any, param1: any): boolean;
            public putAll(i$: com.google.common.collect.Multimap<any, any>): boolean;
            public get(param0: any): java.util.Collection<any>;
            public remove(param0: any, param1: any): boolean;
            public clear(): void;
            public keys(): com.google.common.collect.Multiset<any>;
            public size(): number;
            public containsEntry(param0: any, param1: any): boolean;
            public keySet(): java.util.Set<any>;
          }
          export class EmptyMultimap extends com.google.common.collect.ImmutableSetMultimap<any, any> {
            public static class: java.lang.Class<com.google.common.collect.ImmutableSetMultimap.EmptyMultimap>;
            public values(): com.google.common.collect.ImmutableCollection<any>;
            public equals(param0: any): boolean;
            public hashCode(): number;
            public asMap(): java.util.Map<any, java.util.Collection<any>>;
            public values(): java.util.Collection<any>;
            public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Set<any>;
            public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Collection<any>;
            public keys(): com.google.common.collect.ImmutableMultiset<any>;
            public entries(): com.google.common.collect.ImmutableSet<java.util.Map.Entry<any, any>>;
            public isEmpty(): boolean;
            public put(param0: any, param1: any): boolean;
            public remove(param0: any, param1: any): boolean;
            public replaceValues(key: any, values: java.lang.Iterable<any>): any;
            public keys(): com.google.common.collect.Multiset<any>;
            public size(): number;
            public removeAll(key: any): any;
            public asMap(): com.google.common.collect.ImmutableMap<any, java.util.Collection<any>>;
            public entries(): java.util.Collection<java.util.Map.Entry<any, any>>;
            public get(key: any): com.google.common.collect.ImmutableSet<any>;
            public containsValue(param0: any): boolean;
            public containsKey(param0: any): boolean;
            public removeAll(param0: any): java.util.Collection<any>;
            public keySet(): com.google.common.collect.ImmutableSet<any>;
            public removeAll(param0: any): java.util.Set<any>;
            public putAll(multimap: com.google.common.collect.Multimap<any, any>): boolean;
            public get(param0: any): java.util.Set<any>;
            public putAll(param0: any, param1: java.lang.Iterable<any>): boolean;
            public putAll(param0: com.google.common.collect.Multimap<any, any>): boolean;
            public get(param0: any): java.util.Collection<any>;
            public clear(): void;
            public entries(): com.google.common.collect.ImmutableCollection<java.util.Map.Entry<any, any>>;
            public containsEntry(param0: any, param1: any): boolean;
            public keySet(): java.util.Set<any>;
            public entries(): java.util.Set<java.util.Map.Entry<any, any>>;
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export abstract class ImmutableSortedSet<E> extends com.google.common.collect.ImmutableSet<any> implements java.util.SortedSet<any> {
          public static class: java.lang.Class<com.google.common.collect.ImmutableSortedSet<any>>;
          public static orderedBy(comparator: java.util.Comparator<any>): com.google.common.collect.ImmutableSortedSet.Builder<any>;
          public static naturalOrder(): com.google.common.collect.ImmutableSortedSet.Builder<any>;
          public static of(element: java.lang.Comparable<any>): com.google.common.collect.ImmutableSortedSet<any>;
          public static copyOf(elements: java.util.Iterator<any>): com.google.common.collect.ImmutableSortedSet<any>;
          public comparator(): java.util.Comparator<any>;
          public static copyOf(set: java.lang.Iterable<any>): com.google.common.collect.ImmutableSet<any>;
          public static builder(): com.google.common.collect.ImmutableSet.Builder<any>;
          public tailSet(fromElement: any): com.google.common.collect.ImmutableSortedSet<any>;
          public static copyOf(elements: java.lang.Iterable<any>): com.google.common.collect.ImmutableSortedSet<any>;
          public static of(element: any): com.google.common.collect.ImmutableSet<any>;
          public subSet(fromElement: any, toElement: any): com.google.common.collect.ImmutableSortedSet<any>;
          /** @deprecated */
          public static builder(): com.google.common.collect.ImmutableSortedSet.Builder<any>;
          public static of(): com.google.common.collect.ImmutableSet<any>;
          public static copyOfSorted(sortedSet: java.util.SortedSet<any>): com.google.common.collect.ImmutableSortedSet<any>;
          public static of(elements: androidNative.Array<any>): com.google.common.collect.ImmutableSet<any>;
          public static of(): com.google.common.collect.ImmutableSortedSet<any>;
          public static of(elements: androidNative.Array<java.lang.Comparable<any>>): com.google.common.collect.ImmutableSortedSet<any>;
          public headSet(toElement: any): com.google.common.collect.ImmutableSortedSet<any>;
          public static reverseOrder(): com.google.common.collect.ImmutableSortedSet.Builder<any>;
          public static copyOf(elements: java.util.Iterator<any>): com.google.common.collect.ImmutableSet<any>;
        }
        export module ImmutableSortedSet {
          export class Builder<E> extends com.google.common.collect.ImmutableSet.Builder<any> {
            public static class: java.lang.Class<com.google.common.collect.ImmutableSortedSet.Builder<any>>;
            public add(element: any): com.google.common.collect.ImmutableSortedSet.Builder<any>;
            public addAll(elem: java.lang.Iterable<any>): com.google.common.collect.ImmutableSet.Builder<any>;
            public build(): com.google.common.collect.ImmutableSet<any>;
            public constructor();
            public addAll(elements: java.lang.Iterable<any>): com.google.common.collect.ImmutableSortedSet.Builder<any>;
            public add(element: any): com.google.common.collect.ImmutableSet.Builder<any>;
            public addAll(this_: java.util.Iterator<any>): com.google.common.collect.ImmutableSet.Builder<any>;
            public addAll(elements: java.util.Iterator<any>): com.google.common.collect.ImmutableSortedSet.Builder<any>;
            public build(): com.google.common.collect.ImmutableSortedSet<any>;
            public add(elements: androidNative.Array<any>): com.google.common.collect.ImmutableSortedSet.Builder<any>;
            public constructor(comparator: java.util.Comparator<any>);
            public add(arr$: androidNative.Array<any>): com.google.common.collect.ImmutableSet.Builder<any>;
          }
          export class EmptyImmutableSortedSet<E> extends com.google.common.collect.ImmutableSortedSet<any> {
            public static class: java.lang.Class<com.google.common.collect.ImmutableSortedSet.EmptyImmutableSortedSet<any>>;
            public first(): any;
            public toArray(element: androidNative.Array<any>): androidNative.Array<any>;
            public last(): any;
            public equals(this_: any): boolean;
            public iterator(): com.google.common.collect.UnmodifiableIterator<any>;
            public contains(target: any): boolean;
            public toArray(): androidNative.Array<any>;
            public hashCode(): number;
            public toString(): string;
            public isEmpty(): boolean;
            public toArray(a: androidNative.Array<any>): androidNative.Array<any>;
            public size(): number;
            public containsAll(targets: java.util.Collection<any>): boolean;
          }
          export class RegularImmutableSortedSet<E> extends com.google.common.collect.ImmutableSortedSet<any> {
            public static class: java.lang.Class<com.google.common.collect.ImmutableSortedSet.RegularImmutableSortedSet<any>>;
            public toArray(array: androidNative.Array<any>): androidNative.Array<any>;
            public first(): any;
            public toArray(element: androidNative.Array<any>): androidNative.Array<any>;
            public last(): any;
            public containsAll(this_: java.util.Collection<any>): boolean;
            public contains(this_: any): boolean;
            public equals(i: any): boolean;
            public iterator(): com.google.common.collect.UnmodifiableIterator<any>;
            public isEmpty(): boolean;
            public toArray(): androidNative.Array<any>;
            public hashCode(): number;
            public size(): number;
          }
          export class SerializedForm<E> extends java.io.Serializable {
            public static class: java.lang.Class<com.google.common.collect.ImmutableSortedSet.SerializedForm<any>>;
            public constructor(comparator: java.util.Comparator<any>, elements: androidNative.Array<any>);
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class Iterables {
          public static class: java.lang.Class<com.google.common.collect.Iterables>;
          public static concat(a: java.lang.Iterable<any>, b: java.lang.Iterable<any>, c: java.lang.Iterable<any>, d: java.lang.Iterable<any>): java.lang.Iterable<any>;
          public static addAll(c: java.util.Collection<any>, addTo: java.lang.Iterable<any>): boolean;
          public static getOnlyElement(iterable: java.lang.Iterable<any>, defaultValue: any): any;
          public static toArray(iterable: java.lang.Iterable<any>, type: java.lang.Class<any>): androidNative.Array<any>;
          public static concat(inputs: androidNative.Array<java.lang.Iterable<any>>): java.lang.Iterable<any>;
          public static all(iterable: java.lang.Iterable<any>, predicate: com.google.common.base.Predicate<any>): boolean;
          public static concat(a: java.lang.Iterable<any>, b: java.lang.Iterable<any>): java.lang.Iterable<any>;
          public static cycle(iterable: java.lang.Iterable<any>): java.lang.Iterable<any>;
          public static concat(inputs: java.lang.Iterable<any>): java.lang.Iterable<any>;
          public static cycle(elements: androidNative.Array<any>): java.lang.Iterable<any>;
          public static getLast(list: java.lang.Iterable<any>): any;
          public static contains(e: java.lang.Iterable<any>, e: any): boolean;
          public static concat(a: java.lang.Iterable<any>, b: java.lang.Iterable<any>, c: java.lang.Iterable<any>): java.lang.Iterable<any>;
          public static isEmpty(iterable: java.lang.Iterable<any>): boolean;
          public static paddedPartition(iterable: java.lang.Iterable<any>, size: number): java.lang.Iterable<any>;
          public static getOnlyElement(iterable: java.lang.Iterable<any>): any;
          public static reverse(list: java.util.List<any>): java.lang.Iterable<any>;
          public static transform(fromIterable: java.lang.Iterable<any>, function_: com.google.common.base.Function<any, any>): java.lang.Iterable<any>;
          public static any(iterable: java.lang.Iterable<any>, predicate: com.google.common.base.Predicate<any>): boolean;
          public static get(collection: java.lang.Iterable<any>, iterable: number): any;
          public static find(iterable: java.lang.Iterable<any>, predicate: com.google.common.base.Predicate<any>): any;
          public static partition(iterable: java.lang.Iterable<any>, size: number): java.lang.Iterable<any>;
          public static retainAll(removeFrom: java.lang.Iterable<any>, elementsToRetain: java.util.Collection<any>): boolean;
          public static toString(iterable: java.lang.Iterable<any>): string;
          public static size(iterable: java.lang.Iterable<any>): number;
          public static frequency(iterable: java.lang.Iterable<any>, element: any): number;
          public static elementsEqual(iterable1: java.lang.Iterable<any>, iterable2: java.lang.Iterable<any>): boolean;
          public static removeAll(removeFrom: java.lang.Iterable<any>, elementsToRemove: java.util.Collection<any>): boolean;
          public static filter(unfiltered: java.lang.Iterable<any>, type: java.lang.Class<any>): java.lang.Iterable<any>;
          public static unmodifiableIterable(iterable: java.lang.Iterable<any>): java.lang.Iterable<any>;
          public static filter(unfiltered: java.lang.Iterable<any>, predicate: com.google.common.base.Predicate<any>): java.lang.Iterable<any>;
        }
        export module Iterables {
          export abstract class IterableWithToString<E> extends java.lang.Iterable<any> {
            public static class: java.lang.Class<com.google.common.collect.Iterables.IterableWithToString<any>>;
            public toString(): string;
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class Iterators {
          public static class: java.lang.Class<com.google.common.collect.Iterators>;
          public static concat(inputs: java.util.Iterator<any>): java.util.Iterator<any>;
          public static cycle(elements: androidNative.Array<any>): java.util.Iterator<any>;
          public static concat(a: java.util.Iterator<any>, b: java.util.Iterator<any>, c: java.util.Iterator<any>, d: java.util.Iterator<any>): java.util.Iterator<any>;
          public static forArray(array: androidNative.Array<any>, offset: number, length: number): com.google.common.collect.UnmodifiableIterator<any>;
          public static getOnlyElement(i: java.util.Iterator<any>): any;
          public static addAll(collection: java.util.Collection<any>, iterator: java.util.Iterator<any>): boolean;
          public static filter(unfiltered: java.util.Iterator<any>, type: java.lang.Class<any>): com.google.common.collect.UnmodifiableIterator<any>;
          public static partition(iterator: java.util.Iterator<any>, size: number): com.google.common.collect.UnmodifiableIterator<any>;
          public static transform(fromIterator: java.util.Iterator<any>, function_: com.google.common.base.Function<any, any>): java.util.Iterator<any>;
          public static cycle(iterable: java.lang.Iterable<any>): java.util.Iterator<any>;
          public static find(iterator: java.util.Iterator<any>, predicate: com.google.common.base.Predicate<any>): any;
          public static removeAll(iterator: java.util.Iterator<any>, c: java.util.Collection<any>): boolean;
          public static singletonIterator(value: any): com.google.common.collect.UnmodifiableIterator<any>;
          public static elementsEqual(o1: java.util.Iterator<any>, o2: java.util.Iterator<any>): boolean;
          public static any(element: java.util.Iterator<any>, iterator: com.google.common.base.Predicate<any>): boolean;
          public static contains(iterator: java.util.Iterator<any>, element: any): boolean;
          public static concat(a: java.util.Iterator<any>, b: java.util.Iterator<any>, c: java.util.Iterator<any>): java.util.Iterator<any>;
          public static peekingIterator(iterator: java.util.Iterator<any>): com.google.common.collect.PeekingIterator<any>;
          public static unmodifiableIterator(iterator: java.util.Iterator<any>): com.google.common.collect.UnmodifiableIterator<any>;
          public static get(t: java.util.Iterator<any>, iterator: number): any;
          public static asEnumeration(iterator: java.util.Iterator<any>): java.util.Enumeration<any>;
          public static retainAll(iterator: java.util.Iterator<any>, c: java.util.Collection<any>): boolean;
          public static paddedPartition(iterator: java.util.Iterator<any>, size: number): com.google.common.collect.UnmodifiableIterator<any>;
          public static frequency(iterator: java.util.Iterator<any>, element: any): number;
          public static toArray(iterator: java.util.Iterator<any>, type: java.lang.Class<any>): androidNative.Array<any>;
          public static getLast(current: java.util.Iterator<any>): any;
          public static filter(unfiltered: java.util.Iterator<any>, predicate: com.google.common.base.Predicate<any>): com.google.common.collect.UnmodifiableIterator<any>;
          public static forArray(array: androidNative.Array<any>): com.google.common.collect.UnmodifiableIterator<any>;
          public static emptyIterator(): com.google.common.collect.UnmodifiableIterator<any>;
          public static concat(a: java.util.Iterator<any>, b: java.util.Iterator<any>): java.util.Iterator<any>;
          public static forEnumeration(enumeration: java.util.Enumeration<any>): com.google.common.collect.UnmodifiableIterator<any>;
          public static toString(iterator: java.util.Iterator<any>): string;
          public static size(iterator: java.util.Iterator<any>): number;
          public static all(element: java.util.Iterator<any>, iterator: com.google.common.base.Predicate<any>): boolean;
          public static concat(inputs: androidNative.Array<java.util.Iterator<any>>): java.util.Iterator<any>;
          public static getOnlyElement(iterator: java.util.Iterator<any>, defaultValue: any): any;
        }
        export module Iterators {
          export class PeekingImpl<E> extends com.google.common.collect.PeekingIterator<any> {
            public static class: java.lang.Class<com.google.common.collect.Iterators.PeekingImpl<any>>;
            public next(): any;
            public peek(): any;
            public hasNext(): boolean;
            public constructor(iterator: java.util.Iterator<any>);
            public remove(): void;
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class LinkedHashMultimap<K, V> extends com.google.common.collect.StandardSetMultimap<any, any> {
          public static class: java.lang.Class<com.google.common.collect.LinkedHashMultimap<any, any>>;
          public isEmpty(): boolean;
          public keys(): com.google.common.collect.Multiset<any>;
          public static create(multimap: com.google.common.collect.Multimap<any, any>): com.google.common.collect.LinkedHashMultimap<any, any>;
          public asMap(): java.util.Map<any, java.util.Collection<any>>;
          public size(): number;
          public replaceValues(key: any, values: java.lang.Iterable<any>): java.util.Collection<any>;
          public entries(): java.util.Collection<java.util.Map.Entry<any, any>>;
          public containsValue(param0: any): boolean;
          public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Set<any>;
          public static create(expectedKeys: number, expectedValuesPerKey: number): com.google.common.collect.LinkedHashMultimap<any, any>;
          public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Collection<any>;
          public keySet(): java.util.Set<any>;
          public clear(): void;
          public putAll(param0: any, param1: java.lang.Iterable<any>): boolean;
          public hashCode(): number;
          public remove(param0: any, param1: any): boolean;
          public removeAll(key: any): java.util.Set<any>;
          public putAll(param0: com.google.common.collect.Multimap<any, any>): boolean;
          public values(): java.util.Collection<any>;
          public removeAll(param0: any): java.util.Set<any>;
          public equals(param0: any): boolean;
          public put(param0: any, param1: any): boolean;
          public entries(): java.util.Set<java.util.Map.Entry<any, any>>;
          public containsKey(param0: any): boolean;
          public replaceValues(key: any, values: java.lang.Iterable<any>): java.util.Set<any>;
          public get(param0: any): java.util.Collection<any>;
          public get(param0: any): java.util.Set<any>;
          public containsEntry(param0: any, param1: any): boolean;
          public get(key: any): java.util.Set<any>;
          public removeAll(param0: any): java.util.Collection<any>;
          public putAll(i$: com.google.common.collect.Multimap<any, any>): boolean;
          public static create(): com.google.common.collect.LinkedHashMultimap<any, any>;
        }
        export module LinkedHashMultimap {
          export class SetDecorator extends com.google.common.collect.ForwardingSet<any> {
            public static class: java.lang.Class<com.google.common.collect.LinkedHashMultimap.SetDecorator>;
            public delegate(): any;
            public iterator(): java.util.Iterator<any>;
            public addAll(values: java.util.Collection<any>): boolean;
            public retainAll(this_: java.util.Collection<any>): boolean;
            public delegate(): java.util.Collection<any>;
            public delegate(): java.util.Set<any>;
            public add(value: any): boolean;
            public clear(): void;
            public remove(value: any): boolean;
            public removeAll(values: java.util.Collection<any>): boolean;
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class LinkedHashMultiset<E> extends com.google.common.collect.AbstractMapBasedMultiset<any> {
          public static class: java.lang.Class<com.google.common.collect.LinkedHashMultiset<any>>;
          public static create(elements: java.lang.Iterable<any>): com.google.common.collect.LinkedHashMultiset<any>;
          public remove(param0: any): boolean;
          public removeAll(param0: java.util.Collection<any>): boolean;
          public setCount(param0: any, param1: number): number;
          public add(param0: any): boolean;
          public containsAll(param0: java.util.Collection<any>): boolean;
          public retainAll(param0: java.util.Collection<any>): boolean;
          public setCount(param0: any, param1: number, param2: number): boolean;
          public remove(element: any): boolean;
          public add(element: any): boolean;
          public equals(param0: any): boolean;
          public static create(distinctElements: number): com.google.common.collect.LinkedHashMultiset<any>;
          public static create(): com.google.common.collect.LinkedHashMultiset<any>;
          public toString(): string;
          public add(param0: any, param1: number): number;
          public remove(param0: any, param1: number): number;
          public count(param0: any): number;
          public elementSet(): java.util.Set<any>;
          public hashCode(): number;
          public entrySet(): java.util.Set<com.google.common.collect.Multiset.Entry<any>>;
          public contains(param0: any): boolean;
          public setCount(element: any, oldCount: number, newCount: number): boolean;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class LinkedListMultimap<K, V> extends java.lang.Object {
          public static class: java.lang.Class<com.google.common.collect.LinkedListMultimap<any, any>>;
          public containsKey(key: any): boolean;
          public isEmpty(): boolean;
          public values(): java.util.Collection<V>;
          public static create(): com.google.common.collect.LinkedListMultimap<any, any>;
          public put(key: K, value: V): boolean;
          public replaceValues(param0: K, param1: java.lang.Iterable<any>): java.util.Collection<V>;
          public keySet(): java.util.Set<K>;
          public size(): number;
          public replaceValues(key: K, values: java.lang.Iterable<any>): java.util.List<V>;
          public get(key: K): java.util.List<V>;
          public keys(): com.google.common.collect.Multiset<K>;
          public remove(key: any, value: any): boolean;
          public removeAll(key: any): java.util.List<V>;
          public toString(): string;
          public containsValue(param0: any): boolean;
          public containsEntry(this_: any, key: any): boolean;
          public clear(): void;
          public get(param0: K): java.util.Collection<V>;
          public static create(multimap: com.google.common.collect.Multimap<any, any>): com.google.common.collect.LinkedListMultimap<any, any>;
          public containsValue(this_: any): boolean;
          public hashCode(): number;
          public remove(param0: any, param1: any): boolean;
          public static create(expectedKeys: number): com.google.common.collect.LinkedListMultimap<any, any>;
          public get(param0: K): java.util.List<V>;
          public removeAll(param0: any): java.util.Collection<V>;
          public equals(this_: any): boolean;
          public removeAll(param0: any): java.util.List<V>;
          public put(param0: K, param1: V): boolean;
          public putAll(param0: K, param1: java.lang.Iterable<any>): boolean;
          public putAll(param0: com.google.common.collect.Multimap<any, any>): boolean;
          public entries(): java.util.Collection<java.util.Map.Entry<K, V>>;
          public putAll(i$: K, this_: java.lang.Iterable<any>): boolean;
          public equals(param0: any): boolean;
          public containsKey(param0: any): boolean;
          public containsEntry(param0: any, param1: any): boolean;
          public asMap(): java.util.Map<K, java.util.Collection<V>>;
          public putAll(i$: com.google.common.collect.Multimap<any, any>): boolean;
          public replaceValues(param0: K, param1: java.lang.Iterable<any>): java.util.List<V>;
        }
        export module LinkedListMultimap {
          export class AsMapEntries extends java.util.AbstractSet<java.util.Map.Entry<any, java.util.Collection<any>>> {
            public static class: java.lang.Class<com.google.common.collect.LinkedListMultimap.AsMapEntries>;
            public iterator(): java.util.Iterator<java.util.Map.Entry<any, java.util.Collection<any>>>;
            public size(): number;
          }
          export class DistinctKeyIterator extends java.util.Iterator<any> {
            public static class: java.lang.Class<com.google.common.collect.LinkedListMultimap.DistinctKeyIterator>;
            public next(): any;
            public hasNext(): boolean;
            public remove(): void;
          }
          export class MultisetView extends java.util.AbstractCollection<any> implements com.google.common.collect.Multiset<any> {
            public static class: java.lang.Class<com.google.common.collect.LinkedListMultimap.MultisetView>;
            public setCount(element: any, oldCount: number, newCount: number): boolean;
            public retainAll(c: java.util.Collection<any>): boolean;
            public iterator(): java.util.Iterator<any>;
            public remove(key: any, occurrences: number): number;
            public add(param0: any): boolean;
            public elementSet(): java.util.Set<any>;
            public hashCode(): number;
            public equals(param0: any): boolean;
            public removeAll(c: java.util.Collection<any>): boolean;
            public retainAll(param0: java.util.Collection<any>): boolean;
            public remove(param0: any, param1: number): number;
            public size(): number;
            public removeAll(param0: java.util.Collection<any>): boolean;
            public count(key: any): number;
            public setCount(element: any, count: number): number;
            public setCount(param0: any, param1: number): number;
            public contains(param0: any): boolean;
            public count(param0: any): number;
            public add(param0: any, param1: number): number;
            public toString(): string;
            public remove(param0: any): boolean;
            public setCount(param0: any, param1: number, param2: number): boolean;
            public add(key: any, occurrences: number): number;
            public entrySet(): java.util.Set<com.google.common.collect.Multiset.Entry<any>>;
            public equals(object: any): boolean;
            public containsAll(param0: java.util.Collection<any>): boolean;
          }
          export class Node<K, V> extends java.lang.Object {
            public static class: java.lang.Class<com.google.common.collect.LinkedListMultimap.Node<any, any>>;
            public toString(): string;
          }
          export class NodeIterator extends java.util.Iterator<com.google.common.collect.LinkedListMultimap.Node<any, any>> {
            public static class: java.lang.Class<com.google.common.collect.LinkedListMultimap.NodeIterator>;
            public next(): com.google.common.collect.LinkedListMultimap.Node<any, any>;
            public hasNext(): boolean;
            public remove(): void;
          }
          export class ValueForKeyIterator extends java.util.ListIterator<any> {
            public static class: java.lang.Class<com.google.common.collect.LinkedListMultimap.ValueForKeyIterator>;
            public previousIndex(): number;
            public constructor(key: com.google.common.collect.LinkedListMultimap<any, any>, index: any, size: number);
            public set(value: any): void;
            public hasPrevious(): boolean;
            public next(): any;
            public hasNext(): boolean;
            public previous(): any;
            public add(value: any): void;
            public nextIndex(): number;
            public remove(): void;
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class ListMultimap<K, V> extends com.google.common.collect.Multimap<any, any> {
          public static class: java.lang.Class<com.google.common.collect.ListMultimap<any, any>>;
          /**
           * Constructs a new instance of the com.google.common.collect.ListMultimap<any,any> interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            get(param0: any): java.util.List<any>;
            removeAll(param0: any): java.util.List<any>;
            replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.List<any>;
            asMap(): java.util.Map<any, java.util.Collection<any>>;
            equals(param0: any): boolean;
            size(): number;
            isEmpty(): boolean;
            containsKey(param0: any): boolean;
            containsValue(param0: any): boolean;
            containsEntry(param0: any, param1: any): boolean;
            put(param0: any, param1: any): boolean;
            remove(param0: any, param1: any): boolean;
            putAll(param0: any, param1: java.lang.Iterable<any>): boolean;
            putAll(param0: com.google.common.collect.Multimap<any, any>): boolean;
            replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Collection<any>;
            removeAll(param0: any): java.util.Collection<any>;
            clear(): void;
            get(param0: any): java.util.Collection<any>;
            keySet(): java.util.Set<any>;
            keys(): com.google.common.collect.Multiset<any>;
            values(): java.util.Collection<any>;
            entries(): java.util.Collection<java.util.Map.Entry<any, any>>;
            asMap(): java.util.Map<any, java.util.Collection<any>>;
            equals(param0: any): boolean;
            hashCode(): number;
          });
          public constructor();
          public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.List<any>;
          public isEmpty(): boolean;
          public keys(): com.google.common.collect.Multiset<any>;
          public asMap(): java.util.Map<any, java.util.Collection<any>>;
          public size(): number;
          public putAll(param0: com.google.common.collect.Multimap<any, any>): boolean;
          public values(): java.util.Collection<any>;
          public removeAll(param0: any): java.util.List<any>;
          public equals(param0: any): boolean;
          public entries(): java.util.Collection<java.util.Map.Entry<any, any>>;
          public put(param0: any, param1: any): boolean;
          public containsKey(param0: any): boolean;
          public containsValue(param0: any): boolean;
          public get(param0: any): java.util.List<any>;
          public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Collection<any>;
          public get(param0: any): java.util.Collection<any>;
          public keySet(): java.util.Set<any>;
          public containsEntry(param0: any, param1: any): boolean;
          public clear(): void;
          public putAll(param0: any, param1: java.lang.Iterable<any>): boolean;
          public removeAll(param0: any): java.util.Collection<any>;
          public hashCode(): number;
          public remove(param0: any, param1: any): boolean;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class Lists {
          public static class: java.lang.Class<com.google.common.collect.Lists>;
          public static newArrayList(elements: androidNative.Array<any>): java.util.ArrayList<any>;
          public static newLinkedList(): java.util.LinkedList<any>;
          public static newArrayList(): java.util.ArrayList<any>;
          public static newArrayList(collection: java.lang.Iterable<any>): java.util.ArrayList<any>;
          public static asList(first: any, second: any, rest: androidNative.Array<any>): java.util.List<any>;
          public static newArrayList(elements: java.util.Iterator<any>): java.util.ArrayList<any>;
          public static newArrayListWithCapacity(initialArraySize: number): java.util.ArrayList<any>;
          public static partition(list: java.util.List<any>, size: number): java.util.List<any>;
          public static asList(first: any, rest: androidNative.Array<any>): java.util.List<any>;
          public static transform(fromList: java.util.List<any>, function_: com.google.common.base.Function<any, any>): java.util.List<any>;
          public static newArrayListWithExpectedSize(estimatedSize: number): java.util.ArrayList<any>;
          public static newLinkedList(element: java.lang.Iterable<any>): java.util.LinkedList<any>;
        }
        export module Lists {
          export class OnePlusArrayList<E> extends java.util.AbstractList<any> {
            public static class: java.lang.Class<com.google.common.collect.Lists.OnePlusArrayList<any>>;
            public get(index: number): any;
            public size(): number;
          }
          export class Partition<T> extends java.util.AbstractList<java.util.List<any>> {
            public static class: java.lang.Class<com.google.common.collect.Lists.Partition<any>>;
            public isEmpty(): boolean;
            public size(): number;
            public get(index: number): java.util.List<any>;
          }
          export class RandomAccessPartition<T> extends com.google.common.collect.Lists.Partition<any> implements java.util.RandomAccess {
            public static class: java.lang.Class<com.google.common.collect.Lists.RandomAccessPartition<any>>;
          }
          export class TransformingRandomAccessList<F, T> extends java.util.AbstractList<any> {
            public static class: java.lang.Class<com.google.common.collect.Lists.TransformingRandomAccessList<any, any>>;
            public remove(index: number): any;
            public get(index: number): any;
            public isEmpty(): boolean;
            public clear(): void;
            public size(): number;
          }
          export class TransformingSequentialList<F, T> extends java.util.AbstractSequentialList<any> implements java.io.Serializable {
            public static class: java.lang.Class<com.google.common.collect.Lists.TransformingSequentialList<any, any>>;
            public clear(): void;
            public size(): number;
            public listIterator(index: number): java.util.ListIterator<any>;
          }
          export class TwoPlusArrayList<E> extends java.util.AbstractList<any> {
            public static class: java.lang.Class<com.google.common.collect.Lists.TwoPlusArrayList<any>>;
            public get(index: number): any;
            public size(): number;
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class MapConstraint<K, V> extends java.lang.Object {
          public static class: java.lang.Class<com.google.common.collect.MapConstraint<any, any>>;
          /**
           * Constructs a new instance of the com.google.common.collect.MapConstraint<any,any> interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { checkKeyValue(param0: K, param1: V): void; toString(): string });
          public constructor();
          public toString(): string;
          public checkKeyValue(param0: K, param1: V): void;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class MapConstraints {
          public static class: java.lang.Class<com.google.common.collect.MapConstraints>;
        }
        export module MapConstraints {
          export class ConstrainedEntries<K, V> extends com.google.common.collect.ForwardingCollection<java.util.Map.Entry<any, any>> {
            public static class: java.lang.Class<com.google.common.collect.MapConstraints.ConstrainedEntries<any, any>>;
            public delegate(): any;
            public toArray(array: androidNative.Array<any>): androidNative.Array<any>;
            public contains(o: any): boolean;
            public removeAll(c: java.util.Collection<any>): boolean;
            public retainAll(c: java.util.Collection<any>): boolean;
            public iterator(): java.util.Iterator<java.util.Map.Entry<any, any>>;
            public toArray(): androidNative.Array<any>;
            public remove(o: any): boolean;
            public containsAll(c: java.util.Collection<any>): boolean;
            public delegate(): java.util.Collection<java.util.Map.Entry<any, any>>;
          }
          export class ConstrainedEntrySet<K, V> extends com.google.common.collect.MapConstraints.ConstrainedEntries<any, any> implements java.util.Set<java.util.Map.Entry<any, any>> {
            public static class: java.lang.Class<com.google.common.collect.MapConstraints.ConstrainedEntrySet<any, any>>;
            public hashCode(): number;
            public equals(object: any): boolean;
          }
          export class ConstrainedMap<K, V> extends com.google.common.collect.ForwardingMap<any, any> {
            public static class: java.lang.Class<com.google.common.collect.MapConstraints.ConstrainedMap<any, any>>;
            public delegate(): any;
            public put(key: any, value: any): any;
            public entrySet(): java.util.Set<java.util.Map.Entry<any, any>>;
            public delegate(): java.util.Map<any, any>;
            public putAll(map: java.util.Map<any, any>): void;
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class MapDifference<K, V> extends java.lang.Object {
          public static class: java.lang.Class<com.google.common.collect.MapDifference<any, any>>;
          /**
           * Constructs a new instance of the com.google.common.collect.MapDifference<any,any> interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            areEqual(): boolean;
            entriesOnlyOnLeft(): java.util.Map<K, V>;
            entriesOnlyOnRight(): java.util.Map<K, V>;
            entriesInCommon(): java.util.Map<K, V>;
            entriesDiffering(): java.util.Map<K, com.google.common.collect.MapDifference.ValueDifference<V>>;
            equals(param0: any): boolean;
            hashCode(): number;
          });
          public constructor();
          public equals(param0: any): boolean;
          public entriesInCommon(): java.util.Map<K, V>;
          public entriesOnlyOnLeft(): java.util.Map<K, V>;
          public areEqual(): boolean;
          public entriesOnlyOnRight(): java.util.Map<K, V>;
          public hashCode(): number;
          public entriesDiffering(): java.util.Map<K, com.google.common.collect.MapDifference.ValueDifference<V>>;
        }
        export module MapDifference {
          export class ValueDifference<V> extends java.lang.Object {
            public static class: java.lang.Class<com.google.common.collect.MapDifference.ValueDifference<any>>;
            /**
             * Constructs a new instance of the com.google.common.collect.MapDifference$ValueDifference interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: { leftValue(): V; rightValue(): V; equals(param0: any): boolean; hashCode(): number });
            public constructor();
            public equals(param0: any): boolean;
            public hashCode(): number;
            public rightValue(): V;
            public leftValue(): V;
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class MapMaker {
          public static class: java.lang.Class<com.google.common.collect.MapMaker>;
          public loadFactor(loadFactor: number): com.google.common.collect.MapMaker;
          public weakKeys(): com.google.common.collect.MapMaker;
          public constructor();
          public initialCapacity(initialCapacity: number): com.google.common.collect.MapMaker;
          public softKeys(): com.google.common.collect.MapMaker;
          public weakValues(): com.google.common.collect.MapMaker;
          public makeMap(): java.util.concurrent.ConcurrentMap<any, any>;
          public expiration(duration: number, unit: java.util.concurrent.TimeUnit): com.google.common.collect.MapMaker;
          public makeComputingMap(computer: com.google.common.base.Function<any, any>): java.util.concurrent.ConcurrentMap<any, any>;
          public concurrencyLevel(concurrencyLevel: number): com.google.common.collect.MapMaker;
          public softValues(): com.google.common.collect.MapMaker;
        }
        export module MapMaker {
          export class ComputationExceptionReference<K, V> extends com.google.common.collect.MapMaker.ValueReference<any, any> {
            public static class: java.lang.Class<com.google.common.collect.MapMaker.ComputationExceptionReference<any, any>>;
            public waitForValue(): any;
            public copyFor(param0: com.google.common.collect.MapMaker.ReferenceEntry<any, any>): com.google.common.collect.MapMaker.ValueReference<any, any>;
            public copyFor(entry: com.google.common.collect.MapMaker.ReferenceEntry<any, any>): com.google.common.collect.MapMaker.ValueReference<any, any>;
            public get(): any;
          }
          export class LinkedSoftEntry<K, V> extends com.google.common.collect.MapMaker.SoftEntry<any, any> {
            public static class: java.lang.Class<com.google.common.collect.MapMaker.LinkedSoftEntry<any, any>>;
            public finalizeReferent(): void;
            public setValueReference(param0: com.google.common.collect.MapMaker.ValueReference<any, any>): void;
            public getKey(): any;
            public getNext(): com.google.common.collect.MapMaker.ReferenceEntry<any, any>;
            public valueReclaimed(): void;
            public getHash(): number;
            public getValueReference(): com.google.common.collect.MapMaker.ValueReference<any, any>;
          }
          export class LinkedStrongEntry<K, V> extends com.google.common.collect.MapMaker.StrongEntry<any, any> {
            public static class: java.lang.Class<com.google.common.collect.MapMaker.LinkedStrongEntry<any, any>>;
            public setValueReference(param0: com.google.common.collect.MapMaker.ValueReference<any, any>): void;
            public getKey(): any;
            public getNext(): com.google.common.collect.MapMaker.ReferenceEntry<any, any>;
            public valueReclaimed(): void;
            public getHash(): number;
            public getValueReference(): com.google.common.collect.MapMaker.ValueReference<any, any>;
          }
          export class LinkedWeakEntry<K, V> extends com.google.common.collect.MapMaker.WeakEntry<any, any> {
            public static class: java.lang.Class<com.google.common.collect.MapMaker.LinkedWeakEntry<any, any>>;
            public finalizeReferent(): void;
            public setValueReference(param0: com.google.common.collect.MapMaker.ValueReference<any, any>): void;
            public getKey(): any;
            public getNext(): com.google.common.collect.MapMaker.ReferenceEntry<any, any>;
            public valueReclaimed(): void;
            public getHash(): number;
            public getValueReference(): com.google.common.collect.MapMaker.ValueReference<any, any>;
          }
          export class NullOutputExceptionReference<K, V> extends com.google.common.collect.MapMaker.ValueReference<any, any> {
            public static class: java.lang.Class<com.google.common.collect.MapMaker.NullOutputExceptionReference<any, any>>;
            public waitForValue(): any;
            public copyFor(param0: com.google.common.collect.MapMaker.ReferenceEntry<any, any>): com.google.common.collect.MapMaker.ValueReference<any, any>;
            public copyFor(entry: com.google.common.collect.MapMaker.ReferenceEntry<any, any>): com.google.common.collect.MapMaker.ValueReference<any, any>;
            public get(): any;
          }
          export class QueueHolder {
            public static class: java.lang.Class<com.google.common.collect.MapMaker.QueueHolder>;
          }
          export class ReferenceEntry<K, V> extends java.lang.Object {
            public static class: java.lang.Class<com.google.common.collect.MapMaker.ReferenceEntry<any, any>>;
            /**
             * Constructs a new instance of the com.google.common.collect.MapMaker$ReferenceEntry interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: {
              getValueReference(): com.google.common.collect.MapMaker.ValueReference<K, V>;
              setValueReference(param0: com.google.common.collect.MapMaker.ValueReference<K, V>): void;
              valueReclaimed(): void;
              getNext(): com.google.common.collect.MapMaker.ReferenceEntry<K, V>;
              getHash(): number;
              getKey(): K;
            });
            public constructor();
            public setValueReference(param0: com.google.common.collect.MapMaker.ValueReference<K, V>): void;
            public getNext(): com.google.common.collect.MapMaker.ReferenceEntry<K, V>;
            public valueReclaimed(): void;
            public getKey(): K;
            public getValueReference(): com.google.common.collect.MapMaker.ValueReference<K, V>;
            public getHash(): number;
          }
          export class SoftEntry<K, V> extends com.google.common.base.FinalizableSoftReference<any> implements com.google.common.collect.MapMaker.ReferenceEntry<any, any> {
            public static class: java.lang.Class<com.google.common.collect.MapMaker.SoftEntry<any, any>>;
            public finalizeReferent(): void;
            public setValueReference(param0: com.google.common.collect.MapMaker.ValueReference<any, any>): void;
            public getKey(): any;
            public getNext(): com.google.common.collect.MapMaker.ReferenceEntry<any, any>;
            public valueReclaimed(): void;
            public getHash(): number;
            public setValueReference(valueReference: com.google.common.collect.MapMaker.ValueReference<any, any>): void;
            public getValueReference(): com.google.common.collect.MapMaker.ValueReference<any, any>;
          }
          export class SoftValueReference<K, V> extends com.google.common.base.FinalizableSoftReference<any> implements com.google.common.collect.MapMaker.ValueReference<any, any> {
            public static class: java.lang.Class<com.google.common.collect.MapMaker.SoftValueReference<any, any>>;
            public waitForValue(): any;
            public finalizeReferent(): void;
            public copyFor(param0: com.google.common.collect.MapMaker.ReferenceEntry<any, any>): com.google.common.collect.MapMaker.ValueReference<any, any>;
            public copyFor(entry: com.google.common.collect.MapMaker.ReferenceEntry<any, any>): com.google.common.collect.MapMaker.ValueReference<any, any>;
            public get(): any;
          }
          export class StrategyImpl<K, V> extends java.lang.Object {
            public static class: java.lang.Class<com.google.common.collect.MapMaker.StrategyImpl<any, any>>;
            public setInternals(internals: com.google.common.collect.CustomConcurrentHashMap.Internals<K, V, com.google.common.collect.MapMaker.ReferenceEntry<K, V>>): void;
            public waitForValue(entry: com.google.common.collect.MapMaker.ReferenceEntry<K, V>): V;
            public getNext(entry: com.google.common.collect.MapMaker.ReferenceEntry<K, V>): com.google.common.collect.MapMaker.ReferenceEntry<K, V>;
            public getValue(entry: com.google.common.collect.MapMaker.ReferenceEntry<K, V>): V;
            public getNext(param0: any): any;
            public equalKeys(a: K, b: any): boolean;
            public copyEntry(param0: K, param1: any, param2: any): any;
            public getValue(param0: any): V;
            public waitForValue(param0: any): V;
            public newEntry(param0: K, param1: number, param2: any): any;
            public setValue(entry: com.google.common.collect.MapMaker.ReferenceEntry<K, V>, value: V): void;
            public getKey(entry: com.google.common.collect.MapMaker.ReferenceEntry<K, V>): K;
            public newEntry(key: K, hash: number, next: com.google.common.collect.MapMaker.ReferenceEntry<K, V>): com.google.common.collect.MapMaker.ReferenceEntry<K, V>;
            public hashKey(key: any): number;
            public equalValues(param0: V, param1: any): boolean;
            public setValue(param0: any, param1: V): void;
            public getKey(param0: any): K;
            public copyEntry(
              newEntry: K,
              this_: com.google.common.collect.MapMaker.ReferenceEntry<K, V>,
              key: com.google.common.collect.MapMaker.ReferenceEntry<K, V>
            ): com.google.common.collect.MapMaker.ReferenceEntry<K, V>;
            public getHash(param0: any): number;
            public getHash(entry: com.google.common.collect.MapMaker.ReferenceEntry<any, any>): number;
            public equalKeys(param0: K, param1: any): boolean;
            public hashKey(param0: any): number;
            public compute(message: K, this_: com.google.common.collect.MapMaker.ReferenceEntry<K, V>, key: com.google.common.base.Function<any, any>): V;
            public equalValues(a: V, b: any): boolean;
            public compute(param0: K, param1: any, param2: com.google.common.base.Function<any, any>): V;
            public setInternals(param0: com.google.common.collect.CustomConcurrentHashMap.Internals<K, V, any>): void;
          }
          export module StrategyImpl {
            export class Fields {
              public static class: java.lang.Class<com.google.common.collect.MapMaker.StrategyImpl.Fields>;
            }
            export class FutureValueReference extends com.google.common.collect.MapMaker.ValueReference<any, any> {
              public static class: java.lang.Class<com.google.common.collect.MapMaker.StrategyImpl.FutureValueReference>;
              public get(): any;
              public copyFor(entry: com.google.common.collect.MapMaker.ReferenceEntry<any, any>): com.google.common.collect.MapMaker.ValueReference<any, any>;
              public copyFor(param0: com.google.common.collect.MapMaker.ReferenceEntry<any, any>): com.google.common.collect.MapMaker.ValueReference<any, any>;
              public waitForValue(): any;
            }
          }
          export abstract class Strength {
            public static class: java.lang.Class<com.google.common.collect.MapMaker.Strength>;
            public static WEAK: com.google.common.collect.MapMaker.Strength;
            public static SOFT: com.google.common.collect.MapMaker.Strength;
            public static STRONG: com.google.common.collect.MapMaker.Strength;
            public static valueOf(name: string): com.google.common.collect.MapMaker.Strength;
            public static values(): androidNative.Array<com.google.common.collect.MapMaker.Strength>;
          }
          export class StrongEntry<K, V> extends com.google.common.collect.MapMaker.ReferenceEntry<any, any> {
            public static class: java.lang.Class<com.google.common.collect.MapMaker.StrongEntry<any, any>>;
            public setValueReference(param0: com.google.common.collect.MapMaker.ValueReference<any, any>): void;
            public getKey(): any;
            public getNext(): com.google.common.collect.MapMaker.ReferenceEntry<any, any>;
            public valueReclaimed(): void;
            public getHash(): number;
            public setValueReference(valueReference: com.google.common.collect.MapMaker.ValueReference<any, any>): void;
            public getValueReference(): com.google.common.collect.MapMaker.ValueReference<any, any>;
          }
          export class StrongValueReference<K, V> extends com.google.common.collect.MapMaker.ValueReference<any, any> {
            public static class: java.lang.Class<com.google.common.collect.MapMaker.StrongValueReference<any, any>>;
            public waitForValue(): any;
            public copyFor(param0: com.google.common.collect.MapMaker.ReferenceEntry<any, any>): com.google.common.collect.MapMaker.ValueReference<any, any>;
            public copyFor(entry: com.google.common.collect.MapMaker.ReferenceEntry<any, any>): com.google.common.collect.MapMaker.ValueReference<any, any>;
            public get(): any;
          }
          export class ValueReference<K, V> extends java.lang.Object {
            public static class: java.lang.Class<com.google.common.collect.MapMaker.ValueReference<any, any>>;
            /**
             * Constructs a new instance of the com.google.common.collect.MapMaker$ValueReference interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: {
              get(): V;
              copyFor(param0: com.google.common.collect.MapMaker.ReferenceEntry<K, V>): com.google.common.collect.MapMaker.ValueReference<K, V>;
              waitForValue(): V;
            });
            public constructor();
            public get(): V;
            public copyFor(param0: com.google.common.collect.MapMaker.ReferenceEntry<K, V>): com.google.common.collect.MapMaker.ValueReference<K, V>;
            public waitForValue(): V;
          }
          export class WeakEntry<K, V> extends com.google.common.base.FinalizableWeakReference<any> implements com.google.common.collect.MapMaker.ReferenceEntry<any, any> {
            public static class: java.lang.Class<com.google.common.collect.MapMaker.WeakEntry<any, any>>;
            public finalizeReferent(): void;
            public setValueReference(param0: com.google.common.collect.MapMaker.ValueReference<any, any>): void;
            public getKey(): any;
            public getNext(): com.google.common.collect.MapMaker.ReferenceEntry<any, any>;
            public valueReclaimed(): void;
            public getHash(): number;
            public setValueReference(valueReference: com.google.common.collect.MapMaker.ValueReference<any, any>): void;
            public getValueReference(): com.google.common.collect.MapMaker.ValueReference<any, any>;
          }
          export class WeakValueReference<K, V> extends com.google.common.base.FinalizableWeakReference<any> implements com.google.common.collect.MapMaker.ValueReference<any, any> {
            public static class: java.lang.Class<com.google.common.collect.MapMaker.WeakValueReference<any, any>>;
            public waitForValue(): any;
            public finalizeReferent(): void;
            public copyFor(param0: com.google.common.collect.MapMaker.ReferenceEntry<any, any>): com.google.common.collect.MapMaker.ValueReference<any, any>;
            public copyFor(entry: com.google.common.collect.MapMaker.ReferenceEntry<any, any>): com.google.common.collect.MapMaker.ValueReference<any, any>;
            public get(): any;
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class Maps {
          public static class: java.lang.Class<com.google.common.collect.Maps>;
          public static newTreeMap(): java.util.TreeMap<any, any>;
          public static fromProperties(key: java.util.Properties): com.google.common.collect.ImmutableMap<string, string>;
          public static newLinkedHashMap(): java.util.LinkedHashMap<any, any>;
          public static synchronizedBiMap(bimap: com.google.common.collect.BiMap<any, any>): com.google.common.collect.BiMap<any, any>;
          public static newTreeMap(map: java.util.SortedMap<any, any>): java.util.TreeMap<any, any>;
          public static uniqueIndex(value: java.lang.Iterable<any>, i$: com.google.common.base.Function<any, any>): com.google.common.collect.ImmutableMap<any, any>;
          public static immutableEntry(key: any, value: any): java.util.Map.Entry<any, any>;
          public static filterValues(unfiltered: java.util.Map<any, any>, valuePredicate: com.google.common.base.Predicate<any>): java.util.Map<any, any>;
          public static newTreeMap(comparator: java.util.Comparator<any>): java.util.TreeMap<any, any>;
          public static newEnumMap(type: java.lang.Class<any>): java.util.EnumMap<any, any>;
          public static transformValues(fromMap: java.util.Map<any, any>, function_: com.google.common.base.Function<any, any>): java.util.Map<any, any>;
          public static newHashMap(): java.util.HashMap<any, any>;
          public static unmodifiableBiMap(bimap: com.google.common.collect.BiMap<any, any>): com.google.common.collect.BiMap<any, any>;
          public static newLinkedHashMap(map: java.util.Map<any, any>): java.util.LinkedHashMap<any, any>;
          public static difference(rightValue: java.util.Map<any, any>, leftKey: java.util.Map<any, any>): com.google.common.collect.MapDifference<any, any>;
          public static filterKeys(unfiltered: java.util.Map<any, any>, keyPredicate: com.google.common.base.Predicate<any>): java.util.Map<any, any>;
          public static newHashMap(map: java.util.Map<any, any>): java.util.HashMap<any, any>;
          public static newIdentityHashMap(): java.util.IdentityHashMap<any, any>;
          public static filterEntries(unfiltered: java.util.Map<any, any>, entryPredicate: com.google.common.base.Predicate<any>): java.util.Map<any, any>;
          public static newEnumMap(map: java.util.Map<any, any>): java.util.EnumMap<any, any>;
          public static newHashMapWithExpectedSize(expectedSize: number): java.util.HashMap<any, any>;
        }
        export module Maps {
          export abstract class AbstractFilteredMap<K, V> extends java.util.AbstractMap<any, any> {
            public static class: java.lang.Class<com.google.common.collect.Maps.AbstractFilteredMap<any, any>>;
            public put(key: any, value: any): any;
            public putAll(i$: java.util.Map<any, any>): void;
            public remove(key: any): any;
            public get(key: any): any;
            public isEmpty(): boolean;
            public containsKey(key: any): boolean;
            public values(): java.util.Collection<any>;
          }
          export module AbstractFilteredMap {
            export class Values extends java.util.AbstractCollection<any> {
              public static class: java.lang.Class<com.google.common.collect.Maps.AbstractFilteredMap.Values>;
              public size(): number;
              public iterator(): java.util.Iterator<any>;
              public removeAll(this_: java.util.Collection<any>): boolean;
              public clear(): void;
              public toArray(): androidNative.Array<any>;
              public isEmpty(): boolean;
              public toArray(array: androidNative.Array<any>): androidNative.Array<any>;
              public remove(this_: any): boolean;
              public retainAll(this_: java.util.Collection<any>): boolean;
            }
          }
          export class FilteredEntryMap<K, V> extends com.google.common.collect.Maps.AbstractFilteredMap<any, any> {
            public static class: java.lang.Class<com.google.common.collect.Maps.FilteredEntryMap<any, any>>;
            public entrySet(): java.util.Set<java.util.Map.Entry<any, any>>;
            public keySet(): java.util.Set<any>;
          }
          export module FilteredEntryMap {
            export class EntrySet extends com.google.common.collect.ForwardingSet<java.util.Map.Entry<any, any>> {
              public static class: java.lang.Class<com.google.common.collect.Maps.FilteredEntryMap.EntrySet>;
              public delegate(): java.util.Collection<any>;
              public delegate(): java.util.Set<java.util.Map.Entry<any, any>>;
              public delegate(): any;
              public iterator(): java.util.Iterator<java.util.Map.Entry<any, any>>;
            }
            export class KeySet extends java.util.AbstractSet<any> {
              public static class: java.lang.Class<com.google.common.collect.Maps.FilteredEntryMap.KeySet>;
              public removeAll(i$: java.util.Collection<any>): boolean;
              public size(): number;
              public iterator(): java.util.Iterator<any>;
              public contains(o: any): boolean;
              public clear(): void;
              public toArray(): androidNative.Array<any>;
              public toArray(array: androidNative.Array<any>): androidNative.Array<any>;
              public remove(o: any): boolean;
              public retainAll(this_: java.util.Collection<any>): boolean;
            }
          }
          export class FilteredKeyMap<K, V> extends com.google.common.collect.Maps.AbstractFilteredMap<any, any> {
            public static class: java.lang.Class<com.google.common.collect.Maps.FilteredKeyMap<any, any>>;
            public entrySet(): java.util.Set<java.util.Map.Entry<any, any>>;
            public containsKey(key: any): boolean;
            public keySet(): java.util.Set<any>;
          }
          export abstract class ImprovedAbstractMap<K, V> extends java.util.AbstractMap<any, any> {
            public static class: java.lang.Class<com.google.common.collect.Maps.ImprovedAbstractMap<any, any>>;
            public createEntrySet(): java.util.Set<java.util.Map.Entry<any, any>>;
            public entrySet(): java.util.Set<java.util.Map.Entry<any, any>>;
            public isEmpty(): boolean;
            public values(): java.util.Collection<any>;
            public keySet(): java.util.Set<any>;
          }
          export class MapDifferenceImpl<K, V> extends com.google.common.collect.MapDifference<any, any> {
            public static class: java.lang.Class<com.google.common.collect.Maps.MapDifferenceImpl<any, any>>;
            public equals(this_: any): boolean;
            public entriesOnlyOnLeft(): java.util.Map<any, any>;
            public hashCode(): number;
            public equals(param0: any): boolean;
            public areEqual(): boolean;
            public entriesOnlyOnRight(): java.util.Map<any, any>;
            public entriesInCommon(): java.util.Map<any, any>;
            public toString(): string;
            public entriesDiffering(): java.util.Map<any, com.google.common.collect.MapDifference.ValueDifference<any>>;
          }
          export class TransformedValuesMap<K, V1, V2> extends java.util.AbstractMap<any, any> {
            public static class: java.lang.Class<com.google.common.collect.Maps.TransformedValuesMap<any, any, any>>;
            public entrySet(): java.util.Set<java.util.Map.Entry<any, any>>;
            public remove(key: any): any;
            public get(key: any): any;
            public containsKey(key: any): boolean;
            public clear(): void;
            public size(): number;
          }
          export module TransformedValuesMap {
            export class EntrySet extends java.util.AbstractSet<java.util.Map.Entry<any, any>> {
              public static class: java.lang.Class<com.google.common.collect.Maps.TransformedValuesMap.EntrySet>;
              public size(): number;
              public contains(o: any): boolean;
              public clear(): void;
              public remove(key: any): boolean;
              public iterator(): java.util.Iterator<java.util.Map.Entry<any, any>>;
            }
          }
          export class UnmodifiableBiMap<K, V> extends com.google.common.collect.ForwardingMap<any, any> {
            public static class: java.lang.Class<com.google.common.collect.Maps.UnmodifiableBiMap<any, any>>;
            public delegate(): any;
            public forcePut(key: any, value: any): any;
            public put(param0: any, param1: any): any;
            public putAll(param0: java.util.Map<any, any>): void;
            public values(): java.util.Set<any>;
            public delegate(): java.util.Map<any, any>;
            public forcePut(param0: any, param1: any): any;
            public inverse(): com.google.common.collect.BiMap<any, any>;
            public values(): java.util.Collection<any>;
          }
          export class UnmodifiableEntries<K, V> extends com.google.common.collect.ForwardingCollection<java.util.Map.Entry<any, any>> {
            public static class: java.lang.Class<com.google.common.collect.Maps.UnmodifiableEntries<any, any>>;
            public delegate(): any;
            public toArray(array: androidNative.Array<any>): androidNative.Array<any>;
            public contains(o: any): boolean;
            public iterator(): java.util.Iterator<java.util.Map.Entry<any, any>>;
            public toArray(): androidNative.Array<any>;
            public containsAll(c: java.util.Collection<any>): boolean;
            public delegate(): java.util.Collection<java.util.Map.Entry<any, any>>;
          }
          export class UnmodifiableEntrySet<K, V> extends com.google.common.collect.Maps.UnmodifiableEntries<any, any> implements java.util.Set<java.util.Map.Entry<any, any>> {
            public static class: java.lang.Class<com.google.common.collect.Maps.UnmodifiableEntrySet<any, any>>;
            public hashCode(): number;
            public equals(object: any): boolean;
          }
          export class ValueDifferenceImpl<V> extends com.google.common.collect.MapDifference.ValueDifference<any> {
            public static class: java.lang.Class<com.google.common.collect.Maps.ValueDifferenceImpl<any>>;
            public rightValue(): any;
            public leftValue(): any;
            public equals(this_: any): boolean;
            public hashCode(): number;
            public equals(param0: any): boolean;
            public toString(): string;
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class Multimap<K, V> extends java.lang.Object {
          public static class: java.lang.Class<com.google.common.collect.Multimap<any, any>>;
          /**
           * Constructs a new instance of the com.google.common.collect.Multimap<any,any> interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            size(): number;
            isEmpty(): boolean;
            containsKey(param0: any): boolean;
            containsValue(param0: any): boolean;
            containsEntry(param0: any, param1: any): boolean;
            put(param0: K, param1: V): boolean;
            remove(param0: any, param1: any): boolean;
            putAll(param0: K, param1: java.lang.Iterable<any>): boolean;
            putAll(param0: com.google.common.collect.Multimap<any, any>): boolean;
            replaceValues(param0: K, param1: java.lang.Iterable<any>): java.util.Collection<V>;
            removeAll(param0: any): java.util.Collection<V>;
            clear(): void;
            get(param0: K): java.util.Collection<V>;
            keySet(): java.util.Set<K>;
            keys(): com.google.common.collect.Multiset<K>;
            values(): java.util.Collection<V>;
            entries(): java.util.Collection<java.util.Map.Entry<K, V>>;
            asMap(): java.util.Map<K, java.util.Collection<V>>;
            equals(param0: any): boolean;
            hashCode(): number;
          });
          public constructor();
          public removeAll(param0: any): java.util.Collection<V>;
          public isEmpty(): boolean;
          public values(): java.util.Collection<V>;
          public replaceValues(param0: K, param1: java.lang.Iterable<any>): java.util.Collection<V>;
          public put(param0: K, param1: V): boolean;
          public keySet(): java.util.Set<K>;
          public size(): number;
          public putAll(param0: K, param1: java.lang.Iterable<any>): boolean;
          public putAll(param0: com.google.common.collect.Multimap<any, any>): boolean;
          public entries(): java.util.Collection<java.util.Map.Entry<K, V>>;
          public keys(): com.google.common.collect.Multiset<K>;
          public equals(param0: any): boolean;
          public containsKey(param0: any): boolean;
          public containsValue(param0: any): boolean;
          public containsEntry(param0: any, param1: any): boolean;
          public clear(): void;
          public get(param0: K): java.util.Collection<V>;
          public asMap(): java.util.Map<K, java.util.Collection<V>>;
          public hashCode(): number;
          public remove(param0: any, param1: any): boolean;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class Multimaps {
          public static class: java.lang.Class<com.google.common.collect.Multimaps>;
          public static index(value: java.lang.Iterable<any>, i$: com.google.common.base.Function<any, any>): com.google.common.collect.ImmutableMultimap<any, any>;
          public static forMap(map: java.util.Map<any, any>): com.google.common.collect.SetMultimap<any, any>;
          public static newListMultimap(map: java.util.Map<any, any>, factory: com.google.common.base.Supplier<any>): com.google.common.collect.ListMultimap<any, any>;
          public static newSetMultimap(map: java.util.Map<any, any>, factory: com.google.common.base.Supplier<any>): com.google.common.collect.SetMultimap<any, any>;
          public static synchronizedListMultimap(multimap: com.google.common.collect.ListMultimap<any, any>): com.google.common.collect.ListMultimap<any, any>;
          public static newSortedSetMultimap(map: java.util.Map<any, any>, factory: com.google.common.base.Supplier<any>): com.google.common.collect.SortedSetMultimap<any, any>;
          public static synchronizedSetMultimap(multimap: com.google.common.collect.SetMultimap<any, any>): com.google.common.collect.SetMultimap<any, any>;
          public static unmodifiableMultimap(delegate: com.google.common.collect.Multimap<any, any>): com.google.common.collect.Multimap<any, any>;
          public static unmodifiableSortedSetMultimap(delegate: com.google.common.collect.SortedSetMultimap<any, any>): com.google.common.collect.SortedSetMultimap<any, any>;
          public static synchronizedSortedSetMultimap(multimap: com.google.common.collect.SortedSetMultimap<any, any>): com.google.common.collect.SortedSetMultimap<any, any>;
          public static synchronizedMultimap(multimap: com.google.common.collect.Multimap<any, any>): com.google.common.collect.Multimap<any, any>;
          public static invertFrom(entry: com.google.common.collect.Multimap<any, any>, i$: com.google.common.collect.Multimap<any, any>): com.google.common.collect.Multimap<any, any>;
          public static unmodifiableSetMultimap(delegate: com.google.common.collect.SetMultimap<any, any>): com.google.common.collect.SetMultimap<any, any>;
          public static unmodifiableListMultimap(delegate: com.google.common.collect.ListMultimap<any, any>): com.google.common.collect.ListMultimap<any, any>;
          public static newMultimap(map: java.util.Map<any, any>, factory: com.google.common.base.Supplier<any>): com.google.common.collect.Multimap<any, any>;
        }
        export module Multimaps {
          export class CustomListMultimap<K, V> extends com.google.common.collect.StandardListMultimap<any, any> {
            public static class: java.lang.Class<com.google.common.collect.Multimaps.CustomListMultimap<any, any>>;
            public removeAll(key: any): java.util.Collection<any>;
            public equals(param0: any): boolean;
            public hashCode(): number;
            public createCollection(): java.util.List<any>;
            public asMap(): java.util.Map<any, java.util.Collection<any>>;
            public values(): java.util.Collection<any>;
            public removeAll(param0: any): java.util.List<any>;
            public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Collection<any>;
            public get(key: any): java.util.Collection<any>;
            public replaceValues(key: any, values: java.lang.Iterable<any>): java.util.Collection<any>;
            public isEmpty(): boolean;
            public put(param0: any, param1: any): boolean;
            public putAll(i$: com.google.common.collect.Multimap<any, any>): boolean;
            public remove(param0: any, param1: any): boolean;
            public keys(): com.google.common.collect.Multiset<any>;
            public size(): number;
            public entries(): java.util.Collection<java.util.Map.Entry<any, any>>;
            public get(param0: any): java.util.List<any>;
            public containsValue(param0: any): boolean;
            public containsKey(param0: any): boolean;
            public removeAll(param0: any): java.util.Collection<any>;
            public putAll(param0: any, param1: java.lang.Iterable<any>): boolean;
            public putAll(param0: com.google.common.collect.Multimap<any, any>): boolean;
            public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.List<any>;
            public get(param0: any): java.util.Collection<any>;
            public clear(): void;
            public containsEntry(param0: any, param1: any): boolean;
            public keySet(): java.util.Set<any>;
          }
          export class CustomMultimap<K, V> extends com.google.common.collect.StandardMultimap<any, any> {
            public static class: java.lang.Class<com.google.common.collect.Multimaps.CustomMultimap<any, any>>;
            public entries(): java.util.Collection<java.util.Map.Entry<any, any>>;
            public equals(param0: any): boolean;
            public hashCode(): number;
            public asMap(): java.util.Map<any, java.util.Collection<any>>;
            public containsValue(param0: any): boolean;
            public values(): java.util.Collection<any>;
            public containsKey(param0: any): boolean;
            public removeAll(param0: any): java.util.Collection<any>;
            public createCollection(): java.util.Collection<any>;
            public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Collection<any>;
            public putAll(param0: any, param1: java.lang.Iterable<any>): boolean;
            public putAll(param0: com.google.common.collect.Multimap<any, any>): boolean;
            public isEmpty(): boolean;
            public put(param0: any, param1: any): boolean;
            public putAll(i$: com.google.common.collect.Multimap<any, any>): boolean;
            public get(param0: any): java.util.Collection<any>;
            public remove(param0: any, param1: any): boolean;
            public clear(): void;
            public keys(): com.google.common.collect.Multiset<any>;
            public size(): number;
            public containsEntry(param0: any, param1: any): boolean;
            public keySet(): java.util.Set<any>;
          }
          export class CustomSetMultimap<K, V> extends com.google.common.collect.StandardSetMultimap<any, any> {
            public static class: java.lang.Class<com.google.common.collect.Multimaps.CustomSetMultimap<any, any>>;
            public equals(param0: any): boolean;
            public hashCode(): number;
            public asMap(): java.util.Map<any, java.util.Collection<any>>;
            public values(): java.util.Collection<any>;
            public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Set<any>;
            public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Collection<any>;
            public isEmpty(): boolean;
            public put(param0: any, param1: any): boolean;
            public putAll(i$: com.google.common.collect.Multimap<any, any>): boolean;
            public remove(param0: any, param1: any): boolean;
            public get(key: any): java.util.Set<any>;
            public keys(): com.google.common.collect.Multiset<any>;
            public size(): number;
            public createCollection(): java.util.Set<any>;
            public entries(): java.util.Collection<java.util.Map.Entry<any, any>>;
            public containsValue(param0: any): boolean;
            public containsKey(param0: any): boolean;
            public removeAll(param0: any): java.util.Collection<any>;
            public removeAll(param0: any): java.util.Set<any>;
            public get(param0: any): java.util.Set<any>;
            public putAll(param0: any, param1: java.lang.Iterable<any>): boolean;
            public replaceValues(key: any, values: java.lang.Iterable<any>): java.util.Set<any>;
            public putAll(param0: com.google.common.collect.Multimap<any, any>): boolean;
            public get(param0: any): java.util.Collection<any>;
            public removeAll(key: any): java.util.Set<any>;
            public clear(): void;
            public containsEntry(param0: any, param1: any): boolean;
            public keySet(): java.util.Set<any>;
            public entries(): java.util.Set<java.util.Map.Entry<any, any>>;
          }
          export class CustomSortedSetMultimap<K, V> extends com.google.common.collect.StandardSortedSetMultimap<any, any> {
            public static class: java.lang.Class<com.google.common.collect.Multimaps.CustomSortedSetMultimap<any, any>>;
            public removeAll(key: any): java.util.Collection<any>;
            public equals(param0: any): boolean;
            public hashCode(): number;
            public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.SortedSet<any>;
            public asMap(): java.util.Map<any, java.util.Collection<any>>;
            public values(): java.util.Collection<any>;
            public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Set<any>;
            public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Collection<any>;
            public createCollection(): java.util.SortedSet<any>;
            public get(key: any): java.util.Collection<any>;
            public valueComparator(): java.util.Comparator<any>;
            public replaceValues(key: any, values: java.lang.Iterable<any>): java.util.Collection<any>;
            public isEmpty(): boolean;
            public put(param0: any, param1: any): boolean;
            public putAll(i$: com.google.common.collect.Multimap<any, any>): boolean;
            public remove(param0: any, param1: any): boolean;
            public get(key: any): java.util.Set<any>;
            public keys(): com.google.common.collect.Multiset<any>;
            public size(): number;
            public removeAll(param0: any): java.util.SortedSet<any>;
            public entries(): java.util.Collection<java.util.Map.Entry<any, any>>;
            public containsValue(param0: any): boolean;
            public containsKey(param0: any): boolean;
            public get(param0: any): java.util.SortedSet<any>;
            public removeAll(param0: any): java.util.Collection<any>;
            public removeAll(param0: any): java.util.Set<any>;
            public get(param0: any): java.util.Set<any>;
            public replaceValues(key: any, values: java.lang.Iterable<any>): java.util.Set<any>;
            public putAll(param0: any, param1: java.lang.Iterable<any>): boolean;
            public putAll(param0: com.google.common.collect.Multimap<any, any>): boolean;
            public get(param0: any): java.util.Collection<any>;
            public removeAll(key: any): java.util.Set<any>;
            public clear(): void;
            public containsEntry(param0: any, param1: any): boolean;
            public keySet(): java.util.Set<any>;
            public entries(): java.util.Set<java.util.Map.Entry<any, any>>;
          }
          export class MapMultimap<K, V> extends java.lang.Object {
            public static class: java.lang.Class<com.google.common.collect.Multimaps.MapMultimap<any, any>>;
            public equals(this_: any): boolean;
            public hashCode(): number;
            public equals(param0: any): boolean;
            public containsKey(key: any): boolean;
            public containsEntry(key: any, value: any): boolean;
            public put(key: K, value: V): boolean;
            public putAll(key: K, values: java.lang.Iterable<any>): boolean;
            public values(): java.util.Collection<V>;
            public keys(): com.google.common.collect.Multiset<K>;
            public remove(key: any, value: any): boolean;
            public get(param0: K): java.util.Set<V>;
            public isEmpty(): boolean;
            public asMap(): java.util.Map<K, java.util.Collection<V>>;
            public remove(param0: any, param1: any): boolean;
            public replaceValues(key: K, values: java.lang.Iterable<any>): java.util.Set<V>;
            public replaceValues(param0: K, param1: java.lang.Iterable<any>): java.util.Collection<V>;
            public size(): number;
            public put(param0: K, param1: V): boolean;
            public entries(): java.util.Collection<java.util.Map.Entry<K, V>>;
            public containsValue(value: any): boolean;
            public containsValue(param0: any): boolean;
            public containsKey(param0: any): boolean;
            public toString(): string;
            public get(param0: K): java.util.Collection<V>;
            public putAll(multimap: com.google.common.collect.Multimap<any, any>): boolean;
            public keySet(): java.util.Set<K>;
            public removeAll(key: any): java.util.Set<V>;
            public entries(): java.util.Set<java.util.Map.Entry<K, V>>;
            public putAll(param0: com.google.common.collect.Multimap<any, any>): boolean;
            public removeAll(param0: any): java.util.Set<V>;
            public putAll(param0: K, param1: java.lang.Iterable<any>): boolean;
            public removeAll(param0: any): java.util.Collection<V>;
            public clear(): void;
            public replaceValues(param0: K, param1: java.lang.Iterable<any>): java.util.Set<V>;
            public get(key: K): java.util.Set<V>;
            public containsEntry(param0: any, param1: any): boolean;
          }
          export module MapMultimap {
            export class AsMap extends com.google.common.collect.Maps.ImprovedAbstractMap<any, java.util.Collection<any>> {
              public static class: java.lang.Class<com.google.common.collect.Multimaps.MapMultimap.AsMap>;
              public createEntrySet(): java.util.Set<java.util.Map.Entry<any, java.util.Collection<any>>>;
              public get(key: any): java.util.Collection<any>;
              public containsKey(key: any): boolean;
              public remove(key: any): java.util.Collection<any>;
            }
            export class AsMapEntries extends java.util.AbstractSet<java.util.Map.Entry<any, java.util.Collection<any>>> {
              public static class: java.lang.Class<com.google.common.collect.Multimaps.MapMultimap.AsMapEntries>;
              public iterator(): java.util.Iterator<java.util.Map.Entry<any, java.util.Collection<any>>>;
              public size(): number;
              public contains(o: any): boolean;
              public remove(o: any): boolean;
            }
          }
          export class UnmodifiableAsMapEntries<K, V> extends com.google.common.collect.ForwardingSet<java.util.Map.Entry<any, java.util.Collection<any>>> {
            public static class: java.lang.Class<com.google.common.collect.Multimaps.UnmodifiableAsMapEntries<any, any>>;
            public delegate(): any;
            public toArray(array: androidNative.Array<any>): androidNative.Array<any>;
            public contains(o: any): boolean;
            public delegate(): java.util.Set<java.util.Map.Entry<any, java.util.Collection<any>>>;
            public delegate(): java.util.Collection<any>;
            public toArray(): androidNative.Array<any>;
            public iterator(): java.util.Iterator<java.util.Map.Entry<any, java.util.Collection<any>>>;
            public containsAll(c: java.util.Collection<any>): boolean;
            public equals(object: any): boolean;
          }
          export class UnmodifiableAsMapValues<V> extends com.google.common.collect.ForwardingCollection<java.util.Collection<any>> {
            public static class: java.lang.Class<com.google.common.collect.Multimaps.UnmodifiableAsMapValues<any>>;
            public delegate(): any;
            public toArray(array: androidNative.Array<any>): androidNative.Array<any>;
            public contains(o: any): boolean;
            public delegate(): java.util.Collection<java.util.Collection<any>>;
            public toArray(): androidNative.Array<any>;
            public iterator(): java.util.Iterator<java.util.Collection<any>>;
            public containsAll(c: java.util.Collection<any>): boolean;
          }
          export class UnmodifiableListMultimap<K, V> extends com.google.common.collect.Multimaps.UnmodifiableMultimap<any, any> implements com.google.common.collect.ListMultimap<any, any> {
            public static class: java.lang.Class<com.google.common.collect.Multimaps.UnmodifiableListMultimap<any, any>>;
            public removeAll(key: any): java.util.Collection<any>;
            public get(key: any): java.util.List<any>;
            public delegate(): com.google.common.collect.ListMultimap<any, any>;
            public equals(param0: any): boolean;
            public hashCode(): number;
            public delegate(): com.google.common.collect.Multimap<any, any>;
            public asMap(): java.util.Map<any, java.util.Collection<any>>;
            public values(): java.util.Collection<any>;
            public removeAll(param0: any): java.util.List<any>;
            public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Collection<any>;
            public get(key: any): java.util.Collection<any>;
            public replaceValues(key: any, values: java.lang.Iterable<any>): java.util.Collection<any>;
            public isEmpty(): boolean;
            public put(param0: any, param1: any): boolean;
            public remove(param0: any, param1: any): boolean;
            public keys(): com.google.common.collect.Multiset<any>;
            public size(): number;
            public removeAll(key: any): java.util.List<any>;
            public entries(): java.util.Collection<java.util.Map.Entry<any, any>>;
            public get(param0: any): java.util.List<any>;
            public replaceValues(key: any, values: java.lang.Iterable<any>): java.util.List<any>;
            public containsValue(param0: any): boolean;
            public containsKey(param0: any): boolean;
            public removeAll(param0: any): java.util.Collection<any>;
            public putAll(multimap: com.google.common.collect.Multimap<any, any>): boolean;
            public delegate(): any;
            public putAll(param0: any, param1: java.lang.Iterable<any>): boolean;
            public putAll(param0: com.google.common.collect.Multimap<any, any>): boolean;
            public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.List<any>;
            public get(param0: any): java.util.Collection<any>;
            public clear(): void;
            public containsEntry(param0: any, param1: any): boolean;
            public keySet(): java.util.Set<any>;
          }
          export class UnmodifiableMultimap<K, V> extends com.google.common.collect.ForwardingMultimap<any, any> implements java.io.Serializable {
            public static class: java.lang.Class<com.google.common.collect.Multimaps.UnmodifiableMultimap<any, any>>;
            public removeAll(key: any): java.util.Collection<any>;
            public equals(param0: any): boolean;
            public hashCode(): number;
            public delegate(): com.google.common.collect.Multimap<any, any>;
            public asMap(): java.util.Map<any, java.util.Collection<any>>;
            public values(): java.util.Collection<any>;
            public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Collection<any>;
            public remove(key: any, value: any): boolean;
            public get(key: any): java.util.Collection<any>;
            public replaceValues(key: any, values: java.lang.Iterable<any>): java.util.Collection<any>;
            public isEmpty(): boolean;
            public put(param0: any, param1: any): boolean;
            public remove(param0: any, param1: any): boolean;
            public keys(): com.google.common.collect.Multiset<any>;
            public size(): number;
            public put(key: any, value: any): boolean;
            public entries(): java.util.Collection<java.util.Map.Entry<any, any>>;
            public putAll(key: any, values: java.lang.Iterable<any>): boolean;
            public containsValue(param0: any): boolean;
            public containsKey(param0: any): boolean;
            public removeAll(param0: any): java.util.Collection<any>;
            public putAll(multimap: com.google.common.collect.Multimap<any, any>): boolean;
            public delegate(): any;
            public putAll(param0: any, param1: java.lang.Iterable<any>): boolean;
            public putAll(param0: com.google.common.collect.Multimap<any, any>): boolean;
            public get(param0: any): java.util.Collection<any>;
            public clear(): void;
            public containsEntry(param0: any, param1: any): boolean;
            public keySet(): java.util.Set<any>;
          }
          export class UnmodifiableSetMultimap<K, V> extends com.google.common.collect.Multimaps.UnmodifiableMultimap<any, any> implements com.google.common.collect.SetMultimap<any, any> {
            public static class: java.lang.Class<com.google.common.collect.Multimaps.UnmodifiableSetMultimap<any, any>>;
            public removeAll(key: any): java.util.Collection<any>;
            public delegate(): com.google.common.collect.SetMultimap<any, any>;
            public equals(param0: any): boolean;
            public hashCode(): number;
            public delegate(): com.google.common.collect.Multimap<any, any>;
            public asMap(): java.util.Map<any, java.util.Collection<any>>;
            public values(): java.util.Collection<any>;
            public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Set<any>;
            public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Collection<any>;
            public get(key: any): java.util.Collection<any>;
            public replaceValues(key: any, values: java.lang.Iterable<any>): java.util.Collection<any>;
            public isEmpty(): boolean;
            public put(param0: any, param1: any): boolean;
            public remove(param0: any, param1: any): boolean;
            public get(key: any): java.util.Set<any>;
            public keys(): com.google.common.collect.Multiset<any>;
            public size(): number;
            public entries(): java.util.Collection<java.util.Map.Entry<any, any>>;
            public containsValue(param0: any): boolean;
            public containsKey(param0: any): boolean;
            public removeAll(param0: any): java.util.Set<any>;
            public removeAll(param0: any): java.util.Collection<any>;
            public putAll(multimap: com.google.common.collect.Multimap<any, any>): boolean;
            public delegate(): any;
            public get(param0: any): java.util.Set<any>;
            public replaceValues(key: any, values: java.lang.Iterable<any>): java.util.Set<any>;
            public putAll(param0: any, param1: java.lang.Iterable<any>): boolean;
            public putAll(param0: com.google.common.collect.Multimap<any, any>): boolean;
            public get(param0: any): java.util.Collection<any>;
            public removeAll(key: any): java.util.Set<any>;
            public clear(): void;
            public containsEntry(param0: any, param1: any): boolean;
            public entries(): java.util.Set<java.util.Map.Entry<any, any>>;
            public keySet(): java.util.Set<any>;
          }
          export class UnmodifiableSortedSetMultimap<K, V>
            extends com.google.common.collect.Multimaps.UnmodifiableSetMultimap<any, any>
            implements com.google.common.collect.SortedSetMultimap<any, any>
          {
            public static class: java.lang.Class<com.google.common.collect.Multimaps.UnmodifiableSortedSetMultimap<any, any>>;
            public removeAll(key: any): java.util.Collection<any>;
            public delegate(): com.google.common.collect.SetMultimap<any, any>;
            public equals(param0: any): boolean;
            public hashCode(): number;
            public delegate(): com.google.common.collect.Multimap<any, any>;
            public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.SortedSet<any>;
            public asMap(): java.util.Map<any, java.util.Collection<any>>;
            public values(): java.util.Collection<any>;
            public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Set<any>;
            public delegate(): com.google.common.collect.SortedSetMultimap<any, any>;
            public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Collection<any>;
            public get(key: any): java.util.Collection<any>;
            public valueComparator(): java.util.Comparator<any>;
            public replaceValues(key: any, values: java.lang.Iterable<any>): java.util.Collection<any>;
            public isEmpty(): boolean;
            public put(param0: any, param1: any): boolean;
            public remove(param0: any, param1: any): boolean;
            public get(key: any): java.util.Set<any>;
            public keys(): com.google.common.collect.Multiset<any>;
            public size(): number;
            public removeAll(param0: any): java.util.SortedSet<any>;
            public replaceValues(key: any, values: java.lang.Iterable<any>): java.util.SortedSet<any>;
            public entries(): java.util.Collection<java.util.Map.Entry<any, any>>;
            public containsValue(param0: any): boolean;
            public containsKey(param0: any): boolean;
            public get(param0: any): java.util.SortedSet<any>;
            public removeAll(param0: any): java.util.Set<any>;
            public removeAll(param0: any): java.util.Collection<any>;
            public putAll(multimap: com.google.common.collect.Multimap<any, any>): boolean;
            public delegate(): any;
            public get(param0: any): java.util.Set<any>;
            public replaceValues(key: any, values: java.lang.Iterable<any>): java.util.Set<any>;
            public putAll(param0: any, param1: java.lang.Iterable<any>): boolean;
            public putAll(param0: com.google.common.collect.Multimap<any, any>): boolean;
            public get(param0: any): java.util.Collection<any>;
            public get(key: any): java.util.SortedSet<any>;
            public removeAll(key: any): java.util.Set<any>;
            public clear(): void;
            public removeAll(key: any): java.util.SortedSet<any>;
            public containsEntry(param0: any, param1: any): boolean;
            public entries(): java.util.Set<java.util.Map.Entry<any, any>>;
            public keySet(): java.util.Set<any>;
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class Multiset<E> extends java.util.Collection<any> {
          public static class: java.lang.Class<com.google.common.collect.Multiset<any>>;
          /**
           * Constructs a new instance of the com.google.common.collect.Multiset<any> interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            count(param0: any): number;
            add(param0: any, param1: number): number;
            remove(param0: any, param1: number): number;
            setCount(param0: any, param1: number): number;
            setCount(param0: any, param1: number, param2: number): boolean;
            elementSet(): java.util.Set<any>;
            entrySet(): java.util.Set<com.google.common.collect.Multiset.Entry<any>>;
            equals(param0: any): boolean;
            hashCode(): number;
            toString(): string;
            contains(param0: any): boolean;
            containsAll(param0: java.util.Collection<any>): boolean;
            add(param0: any): boolean;
            remove(param0: any): boolean;
            removeAll(param0: java.util.Collection<any>): boolean;
            retainAll(param0: java.util.Collection<any>): boolean;
          });
          public constructor();
          public remove(param0: any): boolean;
          public removeAll(param0: java.util.Collection<any>): boolean;
          public setCount(param0: any, param1: number): number;
          public add(param0: any): boolean;
          public containsAll(param0: java.util.Collection<any>): boolean;
          public retainAll(param0: java.util.Collection<any>): boolean;
          public setCount(param0: any, param1: number, param2: number): boolean;
          public equals(param0: any): boolean;
          public toString(): string;
          public add(param0: any, param1: number): number;
          public remove(param0: any, param1: number): number;
          public count(param0: any): number;
          public elementSet(): java.util.Set<any>;
          public hashCode(): number;
          public entrySet(): java.util.Set<com.google.common.collect.Multiset.Entry<any>>;
          public contains(param0: any): boolean;
        }
        export module Multiset {
          export class Entry<E> extends java.lang.Object {
            public static class: java.lang.Class<com.google.common.collect.Multiset.Entry<any>>;
            /**
             * Constructs a new instance of the com.google.common.collect.Multiset$Entry interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: { getElement(): E; getCount(): number; equals(param0: any): boolean; hashCode(): number; toString(): string });
            public constructor();
            public getElement(): E;
            public equals(param0: any): boolean;
            public hashCode(): number;
            public getCount(): number;
            public toString(): string;
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class Multisets {
          public static class: java.lang.Class<com.google.common.collect.Multisets>;
          public static unmodifiableMultiset(multiset: com.google.common.collect.Multiset<any>): com.google.common.collect.Multiset<any>;
          public static immutableEntry(e: any, n: number): com.google.common.collect.Multiset.Entry<any>;
        }
        export module Multisets {
          export abstract class AbstractEntry<E> extends com.google.common.collect.Multiset.Entry<any> {
            public static class: java.lang.Class<com.google.common.collect.Multisets.AbstractEntry<any>>;
            public getElement(): any;
            public equals(this_: any): boolean;
            public hashCode(): number;
            public equals(param0: any): boolean;
            public getCount(): number;
            public toString(): string;
          }
          export class SetMultiset<E> extends com.google.common.collect.ForwardingCollection<any> {
            public static class: java.lang.Class<com.google.common.collect.Multisets.SetMultiset<any>>;
            public setCount(element: any, oldCount: number, newCount: number): boolean;
            public equals(this_: any): boolean;
            public add(o: any): boolean;
            public add(param0: any): boolean;
            public elementSet(): java.util.Set<any>;
            public hashCode(): number;
            public equals(param0: any): boolean;
            public count(element: any): number;
            public retainAll(param0: java.util.Collection<any>): boolean;
            public remove(param0: any, param1: number): number;
            public removeAll(param0: java.util.Collection<any>): boolean;
            public addAll(c: java.util.Collection<any>): boolean;
            public setCount(element: any, count: number): number;
            public setCount(param0: any, param1: number): number;
            public contains(param0: any): boolean;
            public delegate(): java.util.Collection<any>;
            public count(param0: any): number;
            public remove(element: any, occurrences: number): number;
            public add(param0: any, param1: number): number;
            public toString(): string;
            public remove(param0: any): boolean;
            public delegate(): any;
            public setCount(param0: any, param1: number, param2: number): boolean;
            public remove(object: any): boolean;
            public delegate(): java.util.Set<any>;
            public add(element: any): boolean;
            public entrySet(): java.util.Set<com.google.common.collect.Multiset.Entry<any>>;
            public add(element: any, occurrences: number): number;
            public containsAll(param0: java.util.Collection<any>): boolean;
          }
          export module SetMultiset {
            export class ElementSet extends com.google.common.collect.ForwardingSet<any> {
              public static class: java.lang.Class<com.google.common.collect.Multisets.SetMultiset.ElementSet>;
              public delegate(): java.util.Collection<any>;
              public delegate(): java.util.Set<any>;
              public delegate(): any;
              public addAll(c: java.util.Collection<any>): boolean;
              public add(o: any): boolean;
            }
            export class EntrySet extends java.util.AbstractSet<com.google.common.collect.Multiset.Entry<any>> {
              public static class: java.lang.Class<com.google.common.collect.Multisets.SetMultiset.EntrySet>;
              public size(): number;
              public iterator(): java.util.Iterator<com.google.common.collect.Multiset.Entry<any>>;
            }
          }
          export class UnmodifiableMultiset<E> extends com.google.common.collect.ForwardingMultiset<any> implements java.io.Serializable {
            public static class: java.lang.Class<com.google.common.collect.Multisets.UnmodifiableMultiset<any>>;
            public setCount(element: any, oldCount: number, newCount: number): boolean;
            public iterator(): java.util.Iterator<any>;
            public add(param0: any): boolean;
            public elementSet(): java.util.Set<any>;
            public equals(param0: any): boolean;
            public hashCode(): number;
            public retainAll(param0: java.util.Collection<any>): boolean;
            public remove(param0: any, param1: number): number;
            public remove(element: any): boolean;
            public removeAll(param0: java.util.Collection<any>): boolean;
            public setCount(element: any, count: number): number;
            public setCount(param0: any, param1: number): number;
            public contains(param0: any): boolean;
            public delegate(): java.util.Collection<any>;
            public count(param0: any): number;
            public add(element: any, occurences: number): number;
            public remove(element: any, occurrences: number): number;
            public add(param0: any, param1: number): number;
            public toString(): string;
            public removeAll(elementsToRemove: java.util.Collection<any>): boolean;
            public retainAll(elementsToRetain: java.util.Collection<any>): boolean;
            public remove(param0: any): boolean;
            public delegate(): any;
            public setCount(param0: any, param1: number, param2: number): boolean;
            public delegate(): com.google.common.collect.Multiset<any>;
            public addAll(elementsToAdd: java.util.Collection<any>): boolean;
            public clear(): void;
            public add(element: any): boolean;
            public entrySet(): java.util.Set<com.google.common.collect.Multiset.Entry<any>>;
            public add(element: any, occurrences: number): number;
            public containsAll(param0: java.util.Collection<any>): boolean;
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class MutableClassToInstanceMap<B>
          extends com.google.common.collect.MapConstraints.ConstrainedMap<java.lang.Class<any>, any>
          implements com.google.common.collect.ClassToInstanceMap<any>
        {
          public static class: java.lang.Class<com.google.common.collect.MutableClassToInstanceMap<any>>;
          public static create(): com.google.common.collect.MutableClassToInstanceMap<any>;
          public putInstance(param0: java.lang.Class<any>, param1: any): any;
          public putInstance(type: java.lang.Class<any>, value: any): any;
          public static create(backingMap: java.util.Map<any, any>): com.google.common.collect.MutableClassToInstanceMap<any>;
          public getInstance(type: java.lang.Class<any>): any;
          public getInstance(param0: java.lang.Class<any>): any;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class NullOutputException {
          public static class: java.lang.Class<com.google.common.collect.NullOutputException>;
          public constructor(s: string);
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class ObjectArrays {
          public static class: java.lang.Class<com.google.common.collect.ObjectArrays>;
          public static concat(first: androidNative.Array<any>, second: androidNative.Array<any>, type: java.lang.Class<any>): androidNative.Array<any>;
          public static newArray(type: java.lang.Class<any>, length: number): androidNative.Array<any>;
          public static concat(array: androidNative.Array<any>, element: any): androidNative.Array<any>;
          public static newArray(reference: androidNative.Array<any>, length: number): androidNative.Array<any>;
          public static concat(element: any, array: androidNative.Array<any>): androidNative.Array<any>;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export abstract class Ordering<T> extends java.util.Comparator<any> {
          public static class: java.lang.Class<com.google.common.collect.Ordering<any>>;
          public binarySearch(sortedList: java.util.List<any>, key: any): number;
          public max(a: any, b: any): any;
          public compound(secondaryComparator: java.util.Comparator<any>): com.google.common.collect.Ordering<any>;
          public onResultOf(function_: com.google.common.base.Function<any, any>): com.google.common.collect.Ordering<any>;
          public max(iterable: java.lang.Iterable<any>): any;
          public max(arr$: any, len$: any, i$: any, this_: androidNative.Array<any>): any;
          public sortedCopy(iterable: java.lang.Iterable<any>): java.util.List<any>;
          public min(iterable: java.lang.Iterable<any>): any;
          public nullsFirst(): com.google.common.collect.Ordering<any>;
          public static natural(): com.google.common.collect.Ordering<any>;
          public reverse(): com.google.common.collect.Ordering<any>;
          public static from(comparator: java.util.Comparator<any>): com.google.common.collect.Ordering<any>;
          public nullsLast(): com.google.common.collect.Ordering<any>;
          public min(arr$: any, len$: any, i$: any, this_: androidNative.Array<any>): any;
          public constructor();
          public isStrictlyOrdered(prev: java.lang.Iterable<any>): boolean;
          public static givenOrder(valuesInOrder: java.util.List<any>): com.google.common.collect.Ordering<any>;
          public min(a: any, b: any): any;
          public isOrdered(prev: java.lang.Iterable<any>): boolean;
          public static compound(comparators: java.lang.Iterable<any>): com.google.common.collect.Ordering<any>;
          public static givenOrder(leastValue: any, remainingValuesInOrder: androidNative.Array<any>): com.google.common.collect.Ordering<any>;
        }
        export module Ordering {
          export class ByFunctionOrdering<F, T> extends com.google.common.collect.Ordering<any> implements java.io.Serializable {
            public static class: java.lang.Class<com.google.common.collect.Ordering.ByFunctionOrdering<any, any>>;
            public compare(left: any, right: any): number;
            public equals(this_: any): boolean;
            public hashCode(): number;
            public toString(): string;
          }
          export class ComparatorOrdering<T> extends com.google.common.collect.Ordering<any> implements java.io.Serializable {
            public static class: java.lang.Class<com.google.common.collect.Ordering.ComparatorOrdering<any>>;
            public equals(this_: any): boolean;
            public compare(a: any, b: any): number;
            public hashCode(): number;
            public toString(): string;
          }
          export class CompoundOrdering<T> extends com.google.common.collect.Ordering<any> implements java.io.Serializable {
            public static class: java.lang.Class<com.google.common.collect.Ordering.CompoundOrdering<any>>;
            public compare(comparator: any, i$: any): number;
            public equals(this_: any): boolean;
            public hashCode(): number;
            public toString(): string;
          }
          export class GivenOrder<T> extends com.google.common.collect.Ordering<any> implements java.io.Serializable {
            public static class: java.lang.Class<com.google.common.collect.Ordering.GivenOrder<any>>;
            public compare(left: any, right: any): number;
            public equals(this_: any): boolean;
            public hashCode(): number;
            public toString(): string;
          }
          export class IncomparableValueException {
            public static class: java.lang.Class<com.google.common.collect.Ordering.IncomparableValueException>;
          }
          export class NaturalOrdering extends com.google.common.collect.Ordering<java.lang.Comparable<any>> implements java.io.Serializable {
            public static class: java.lang.Class<com.google.common.collect.Ordering.NaturalOrdering>;
            public compare(left: java.lang.Comparable<any>, right: java.lang.Comparable<any>): number;
            public toString(): string;
          }
          export class NullsFirstOrdering<T> extends com.google.common.collect.Ordering<any> implements java.io.Serializable {
            public static class: java.lang.Class<com.google.common.collect.Ordering.NullsFirstOrdering<any>>;
            public compare(left: any, right: any): number;
            public equals(this_: any): boolean;
            public hashCode(): number;
            public toString(): string;
          }
          export class NullsLastOrdering<T> extends com.google.common.collect.Ordering<any> implements java.io.Serializable {
            public static class: java.lang.Class<com.google.common.collect.Ordering.NullsLastOrdering<any>>;
            public compare(left: any, right: any): number;
            public equals(this_: any): boolean;
            public hashCode(): number;
            public toString(): string;
          }
          export class ReverseOrdering<T> extends com.google.common.collect.Ordering<any> implements java.io.Serializable {
            public static class: java.lang.Class<com.google.common.collect.Ordering.ReverseOrdering<any>>;
            public equals(this_: any): boolean;
            public compare(a: any, b: any): number;
            public hashCode(): number;
            public toString(): string;
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class PeekingIterator<E> extends java.util.Iterator<any> {
          public static class: java.lang.Class<com.google.common.collect.PeekingIterator<any>>;
          /**
           * Constructs a new instance of the com.google.common.collect.PeekingIterator<any> interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { peek(): any; next(): any; remove(): void });
          public constructor();
          public peek(): any;
          public next(): any;
          public remove(): void;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class Platform {
          public static class: java.lang.Class<com.google.common.collect.Platform>;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class RegularImmutableList<E> extends com.google.common.collect.ImmutableList<any> {
          public static class: java.lang.Class<com.google.common.collect.RegularImmutableList<any>>;
          public contains(target: any): boolean;
          public lastIndexOf(this_: any): number;
          public isEmpty(): boolean;
          public toArray(element: androidNative.Array<any>): androidNative.Array<any>;
          public toArray(): androidNative.Array<any>;
          public get(index: number): any;
          public equals(other: any): boolean;
          public size(): number;
          public listIterator(start: number): java.util.ListIterator<any>;
          public toArray(other: androidNative.Array<any>): androidNative.Array<any>;
          public toString(): string;
          public indexOf(this_: any): number;
          public listIterator(): java.util.ListIterator<any>;
          public iterator(): com.google.common.collect.UnmodifiableIterator<any>;
          public hashCode(): number;
          public subList(fromIndex: number, toIndex: number): com.google.common.collect.ImmutableList<any>;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class RegularImmutableMap<K, V> extends com.google.common.collect.ImmutableMap<any, any> {
          public static class: java.lang.Class<com.google.common.collect.RegularImmutableMap<any, any>>;
          public get(index: any): any;
          public containsKey(key: any): boolean;
          public keySet(): com.google.common.collect.ImmutableSet<any>;
          public toString(): string;
          public isEmpty(): boolean;
          public entrySet(): com.google.common.collect.ImmutableSet<java.util.Map.Entry<any, any>>;
          public values(): com.google.common.collect.ImmutableCollection<any>;
          public containsValue(arr$: any): boolean;
          public size(): number;
        }
        export module RegularImmutableMap {
          export class EntrySet<K, V> extends com.google.common.collect.ImmutableSet.ArrayImmutableSet<java.util.Map.Entry<any, any>> {
            public static class: java.lang.Class<com.google.common.collect.RegularImmutableMap.EntrySet<any, any>>;
            public contains(mappedValue: any): boolean;
          }
          export class KeySet<K, V> extends com.google.common.collect.ImmutableSet.TransformedImmutableSet<java.util.Map.Entry<any, any>, any> {
            public static class: java.lang.Class<com.google.common.collect.RegularImmutableMap.KeySet<any, any>>;
            public contains(target: any): boolean;
          }
          export class Values<V> extends com.google.common.collect.ImmutableCollection<any> {
            public static class: java.lang.Class<com.google.common.collect.RegularImmutableMap.Values<any>>;
            public iterator(): com.google.common.collect.UnmodifiableIterator<any>;
            public contains(target: any): boolean;
            public isEmpty(): boolean;
            public size(): number;
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class RegularImmutableSet<E> extends com.google.common.collect.ImmutableSet.ArrayImmutableSet<any> {
          public static class: java.lang.Class<com.google.common.collect.RegularImmutableSet<any>>;
          public hashCode(): number;
          public contains(i: any): boolean;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class Serialization {
          public static class: java.lang.Class<com.google.common.collect.Serialization>;
          public static writeMultimap(value: com.google.common.collect.Multimap<any, any>, i$: java.io.ObjectOutputStream): void;
          public static readCount(stream: java.io.ObjectInputStream): number;
          public static writeMultiset(entry: com.google.common.collect.Multiset<any>, i$: java.io.ObjectOutputStream): void;
          public static populateMultiset(element: com.google.common.collect.Multiset<any>, count: java.io.ObjectInputStream, i: number): void;
          public static populateMultimap(value: com.google.common.collect.Multimap<any, any>, j: java.io.ObjectInputStream, key: number): void;
          public static populateMultimap(multimap: com.google.common.collect.Multimap<any, any>, stream: java.io.ObjectInputStream): void;
          public static populateMap(key: java.util.Map<any, any>, value: java.io.ObjectInputStream, i: number): void;
          public static populateMultiset(multiset: com.google.common.collect.Multiset<any>, stream: java.io.ObjectInputStream): void;
          public static populateMap(map: java.util.Map<any, any>, stream: java.io.ObjectInputStream): void;
          public static writeMap(entry: java.util.Map<any, any>, i$: java.io.ObjectOutputStream): void;
        }
        export module Serialization {
          export class FieldSetter<T> extends java.lang.Object {
            public static class: java.lang.Class<com.google.common.collect.Serialization.FieldSetter<any>>;
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class SetMultimap<K, V> extends com.google.common.collect.Multimap<any, any> {
          public static class: java.lang.Class<com.google.common.collect.SetMultimap<any, any>>;
          /**
           * Constructs a new instance of the com.google.common.collect.SetMultimap<any,any> interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            get(param0: any): java.util.Set<any>;
            removeAll(param0: any): java.util.Set<any>;
            replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Set<any>;
            entries(): java.util.Set<java.util.Map.Entry<any, any>>;
            asMap(): java.util.Map<any, java.util.Collection<any>>;
            equals(param0: any): boolean;
            size(): number;
            isEmpty(): boolean;
            containsKey(param0: any): boolean;
            containsValue(param0: any): boolean;
            containsEntry(param0: any, param1: any): boolean;
            put(param0: any, param1: any): boolean;
            remove(param0: any, param1: any): boolean;
            putAll(param0: any, param1: java.lang.Iterable<any>): boolean;
            putAll(param0: com.google.common.collect.Multimap<any, any>): boolean;
            replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Collection<any>;
            removeAll(param0: any): java.util.Collection<any>;
            clear(): void;
            get(param0: any): java.util.Collection<any>;
            keySet(): java.util.Set<any>;
            keys(): com.google.common.collect.Multiset<any>;
            values(): java.util.Collection<any>;
            entries(): java.util.Collection<java.util.Map.Entry<any, any>>;
            asMap(): java.util.Map<any, java.util.Collection<any>>;
            equals(param0: any): boolean;
            hashCode(): number;
          });
          public constructor();
          public isEmpty(): boolean;
          public keys(): com.google.common.collect.Multiset<any>;
          public asMap(): java.util.Map<any, java.util.Collection<any>>;
          public size(): number;
          public putAll(param0: com.google.common.collect.Multimap<any, any>): boolean;
          public values(): java.util.Collection<any>;
          public removeAll(param0: any): java.util.Set<any>;
          public equals(param0: any): boolean;
          public entries(): java.util.Collection<java.util.Map.Entry<any, any>>;
          public put(param0: any, param1: any): boolean;
          public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Set<any>;
          public entries(): java.util.Set<java.util.Map.Entry<any, any>>;
          public containsKey(param0: any): boolean;
          public containsValue(param0: any): boolean;
          public get(param0: any): java.util.Set<any>;
          public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Collection<any>;
          public get(param0: any): java.util.Collection<any>;
          public keySet(): java.util.Set<any>;
          public containsEntry(param0: any, param1: any): boolean;
          public clear(): void;
          public putAll(param0: any, param1: java.lang.Iterable<any>): boolean;
          public removeAll(param0: any): java.util.Collection<any>;
          public hashCode(): number;
          public remove(param0: any, param1: any): boolean;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class Sets {
          public static class: java.lang.Class<com.google.common.collect.Sets>;
          public static newHashSet(): java.util.HashSet<any>;
          public static newEnumSet(iterable: java.lang.Iterable<any>, elementType: java.lang.Class<any>): java.util.EnumSet<any>;
          public static newHashSet(collection: java.lang.Iterable<any>): java.util.HashSet<any>;
          public static newSetFromMap(map: java.util.Map<any, any>): java.util.Set<any>;
          public static newLinkedHashSet(): java.util.LinkedHashSet<any>;
          public static union(set1: java.util.Set<any>, set2: java.util.Set<any>): com.google.common.collect.Sets.SetView<any>;
          public static intersection(set1: java.util.Set<any>, set2: java.util.Set<any>): com.google.common.collect.Sets.SetView<any>;
          public static filter(filtered: java.util.Set<any>, combinedPredicate: com.google.common.base.Predicate<any>): java.util.Set<any>;
          public static complementOf(collection: java.util.Collection<any>, type: java.lang.Class<any>): java.util.EnumSet<any>;
          public static difference(set1: java.util.Set<any>, set2: java.util.Set<any>): com.google.common.collect.Sets.SetView<any>;
          public static newHashSetWithExpectedSize(expectedSize: number): java.util.HashSet<any>;
          public static newTreeSet(element: java.lang.Iterable<any>): java.util.TreeSet<any>;
          public static complementOf(collection: java.util.Collection<any>): java.util.EnumSet<any>;
          public static newTreeSet(): java.util.TreeSet<any>;
          public static immutableEnumSet(anElement: java.lang.Enum<any>, otherElements: androidNative.Array<java.lang.Enum<any>>): java.util.Set<any>;
          public static newHashSet(elements: androidNative.Array<any>): java.util.HashSet<any>;
          public static newLinkedHashSet(collection: java.lang.Iterable<any>): java.util.LinkedHashSet<any>;
          public static newTreeSet(comparator: java.util.Comparator<any>): java.util.TreeSet<any>;
          public static newHashSet(elements: java.util.Iterator<any>): java.util.HashSet<any>;
        }
        export module Sets {
          export class FilteredSet<E> extends com.google.common.collect.Collections2.FilteredCollection<any> implements java.util.Set<any> {
            public static class: java.lang.Class<com.google.common.collect.Sets.FilteredSet<any>>;
            public hashCode(): number;
            public equals(object: any): boolean;
          }
          export class SetFromMap<E> extends java.util.AbstractSet<any> {
            public static class: java.lang.Class<com.google.common.collect.Sets.SetFromMap<any>>;
            public retainAll(c: java.util.Collection<any>): boolean;
            public add(e: any): boolean;
            public iterator(): java.util.Iterator<any>;
            public toArray(): androidNative.Array<any>;
            public hashCode(): number;
            public remove(o: any): boolean;
            public toString(): string;
            public contains(o: any): boolean;
            public removeAll(c: java.util.Collection<any>): boolean;
            public isEmpty(): boolean;
            public clear(): void;
            public toArray(a: androidNative.Array<any>): androidNative.Array<any>;
            public containsAll(c: java.util.Collection<any>): boolean;
            public size(): number;
            public equals(object: any): boolean;
          }
          export abstract class SetView<E> extends java.util.AbstractSet<any> {
            public static class: java.lang.Class<com.google.common.collect.Sets.SetView<any>>;
            public copyInto(set: java.util.Set<any>): java.util.Set<any>;
            public immutableCopy(): com.google.common.collect.ImmutableSet<any>;
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class SingletonImmutableMap<K, V> extends com.google.common.collect.ImmutableMap<any, any> {
          public static class: java.lang.Class<com.google.common.collect.SingletonImmutableMap<any, any>>;
          public containsKey(key: any): boolean;
          public keySet(): com.google.common.collect.ImmutableSet<any>;
          public get(key: any): any;
          public toString(): string;
          public isEmpty(): boolean;
          public entrySet(): com.google.common.collect.ImmutableSet<java.util.Map.Entry<any, any>>;
          public values(): com.google.common.collect.ImmutableCollection<any>;
          public size(): number;
          public hashCode(): number;
          public containsValue(value: any): boolean;
          public equals(entry: any): boolean;
        }
        export module SingletonImmutableMap {
          export class Values<V> extends com.google.common.collect.ImmutableCollection<any> {
            public static class: java.lang.Class<com.google.common.collect.SingletonImmutableMap.Values<any>>;
            public contains(object: any): boolean;
            public iterator(): com.google.common.collect.UnmodifiableIterator<any>;
            public isEmpty(): boolean;
            public size(): number;
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class SingletonImmutableSet<E> extends com.google.common.collect.ImmutableSet<any> {
          public static class: java.lang.Class<com.google.common.collect.SingletonImmutableSet<any>>;
          public contains(target: any): boolean;
          public toString(): string;
          public isEmpty(): boolean;
          public toArray(element: androidNative.Array<any>): androidNative.Array<any>;
          public equals(this_: any): boolean;
          public toArray(): androidNative.Array<any>;
          public iterator(): com.google.common.collect.UnmodifiableIterator<any>;
          public size(): number;
          public hashCode(): number;
          public toArray(array: androidNative.Array<any>): androidNative.Array<any>;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class SortedSetMultimap<K, V> extends com.google.common.collect.SetMultimap<any, any> {
          public static class: java.lang.Class<com.google.common.collect.SortedSetMultimap<any, any>>;
          /**
           * Constructs a new instance of the com.google.common.collect.SortedSetMultimap<any,any> interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            get(param0: any): java.util.SortedSet<any>;
            removeAll(param0: any): java.util.SortedSet<any>;
            replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.SortedSet<any>;
            asMap(): java.util.Map<any, java.util.Collection<any>>;
            valueComparator(): java.util.Comparator<any>;
            get(param0: any): java.util.Set<any>;
            removeAll(param0: any): java.util.Set<any>;
            replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Set<any>;
            entries(): java.util.Set<java.util.Map.Entry<any, any>>;
            asMap(): java.util.Map<any, java.util.Collection<any>>;
            equals(param0: any): boolean;
            size(): number;
            isEmpty(): boolean;
            containsKey(param0: any): boolean;
            containsValue(param0: any): boolean;
            containsEntry(param0: any, param1: any): boolean;
            put(param0: any, param1: any): boolean;
            remove(param0: any, param1: any): boolean;
            putAll(param0: any, param1: java.lang.Iterable<any>): boolean;
            putAll(param0: com.google.common.collect.Multimap<any, any>): boolean;
            replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Collection<any>;
            removeAll(param0: any): java.util.Collection<any>;
            clear(): void;
            get(param0: any): java.util.Collection<any>;
            keySet(): java.util.Set<any>;
            keys(): com.google.common.collect.Multiset<any>;
            values(): java.util.Collection<any>;
            entries(): java.util.Collection<java.util.Map.Entry<any, any>>;
            asMap(): java.util.Map<any, java.util.Collection<any>>;
            equals(param0: any): boolean;
            hashCode(): number;
          });
          public constructor();
          public isEmpty(): boolean;
          public keys(): com.google.common.collect.Multiset<any>;
          public asMap(): java.util.Map<any, java.util.Collection<any>>;
          public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.SortedSet<any>;
          public size(): number;
          public get(param0: any): java.util.SortedSet<any>;
          public entries(): java.util.Collection<java.util.Map.Entry<any, any>>;
          public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Set<any>;
          public containsValue(param0: any): boolean;
          public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Collection<any>;
          public keySet(): java.util.Set<any>;
          public clear(): void;
          public putAll(param0: any, param1: java.lang.Iterable<any>): boolean;
          public hashCode(): number;
          public remove(param0: any, param1: any): boolean;
          public removeAll(param0: any): java.util.SortedSet<any>;
          public putAll(param0: com.google.common.collect.Multimap<any, any>): boolean;
          public values(): java.util.Collection<any>;
          public removeAll(param0: any): java.util.Set<any>;
          public equals(param0: any): boolean;
          public put(param0: any, param1: any): boolean;
          public entries(): java.util.Set<java.util.Map.Entry<any, any>>;
          public containsKey(param0: any): boolean;
          public get(param0: any): java.util.Set<any>;
          public get(param0: any): java.util.Collection<any>;
          public containsEntry(param0: any, param1: any): boolean;
          public valueComparator(): java.util.Comparator<any>;
          public removeAll(param0: any): java.util.Collection<any>;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class StandardBiMap<K, V> extends com.google.common.collect.ForwardingMap<any, any> {
          public static class: java.lang.Class<com.google.common.collect.StandardBiMap<any, any>>;
          public remove(key: any): any;
          public putAll(i$: java.util.Map<any, any>): void;
          public inverse(): com.google.common.collect.BiMap<any, any>;
          public values(): java.util.Collection<any>;
          public put(param0: any, param1: any): any;
          public containsValue(value: any): boolean;
          public putAll(param0: java.util.Map<any, any>): void;
          public values(): java.util.Set<any>;
          public entrySet(): java.util.Set<java.util.Map.Entry<any, any>>;
          public forcePut(key: any, value: any): any;
          public keySet(): java.util.Set<any>;
          public put(key: any, value: any): any;
          public clear(): void;
          public forcePut(param0: any, param1: any): any;
          public delegate(): any;
          public delegate(): java.util.Map<any, any>;
        }
        export module StandardBiMap {
          export class EntrySet extends com.google.common.collect.ForwardingSet<java.util.Map.Entry<any, any>> {
            public static class: java.lang.Class<com.google.common.collect.StandardBiMap.EntrySet>;
            public delegate(): any;
            public toArray(array: androidNative.Array<any>): androidNative.Array<any>;
            public contains(o: any): boolean;
            public removeAll(c: java.util.Collection<any>): boolean;
            public retainAll(c: java.util.Collection<any>): boolean;
            public iterator(): java.util.Iterator<java.util.Map.Entry<any, any>>;
            public remove(object: any): boolean;
            public delegate(): java.util.Collection<any>;
            public toArray(): androidNative.Array<any>;
            public clear(): void;
            public containsAll(c: java.util.Collection<any>): boolean;
            public delegate(): java.util.Set<java.util.Map.Entry<any, any>>;
          }
          export class Inverse<K, V> extends com.google.common.collect.StandardBiMap<any, any> {
            public static class: java.lang.Class<com.google.common.collect.StandardBiMap.Inverse<any, any>>;
            public put(param0: any, param1: any): any;
            public putAll(param0: java.util.Map<any, any>): void;
            public values(): java.util.Set<any>;
            public forcePut(param0: any, param1: any): any;
            public inverse(): com.google.common.collect.BiMap<any, any>;
            public values(): java.util.Collection<any>;
          }
          export class KeySet extends com.google.common.collect.ForwardingSet<any> {
            public static class: java.lang.Class<com.google.common.collect.StandardBiMap.KeySet>;
            public remove(key: any): boolean;
            public delegate(): any;
            public iterator(): java.util.Iterator<any>;
            public removeAll(keysToRemove: java.util.Collection<any>): boolean;
            public delegate(): java.util.Collection<any>;
            public delegate(): java.util.Set<any>;
            public retainAll(keysToRetain: java.util.Collection<any>): boolean;
            public clear(): void;
          }
          export class ValueSet extends com.google.common.collect.ForwardingSet<any> {
            public static class: java.lang.Class<com.google.common.collect.StandardBiMap.ValueSet>;
            public delegate(): any;
            public toArray(array: androidNative.Array<any>): androidNative.Array<any>;
            public iterator(): java.util.Iterator<any>;
            public delegate(): java.util.Collection<any>;
            public delegate(): java.util.Set<any>;
            public toArray(): androidNative.Array<any>;
            public toString(): string;
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export abstract class StandardListMultimap<K, V> extends com.google.common.collect.StandardMultimap<any, any> implements com.google.common.collect.ListMultimap<any, any> {
          public static class: java.lang.Class<com.google.common.collect.StandardListMultimap<any, any>>;
          public removeAll(key: any): java.util.List<any>;
          public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.List<any>;
          public isEmpty(): boolean;
          public keys(): com.google.common.collect.Multiset<any>;
          public asMap(): java.util.Map<any, java.util.Collection<any>>;
          public size(): number;
          public replaceValues(key: any, values: java.lang.Iterable<any>): java.util.Collection<any>;
          public removeAll(param0: any): java.util.List<any>;
          public entries(): java.util.Collection<java.util.Map.Entry<any, any>>;
          public equals(object: any): boolean;
          public containsValue(param0: any): boolean;
          public get(key: any): java.util.Collection<any>;
          public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Collection<any>;
          public removeAll(key: any): java.util.Collection<any>;
          public keySet(): java.util.Set<any>;
          public constructor(map: java.util.Map<any, java.util.Collection<any>>);
          public clear(): void;
          public get(key: any): java.util.List<any>;
          public putAll(param0: any, param1: java.lang.Iterable<any>): boolean;
          public hashCode(): number;
          public remove(param0: any, param1: any): boolean;
          public replaceValues(key: any, values: java.lang.Iterable<any>): java.util.List<any>;
          public putAll(param0: com.google.common.collect.Multimap<any, any>): boolean;
          public put(key: any, value: any): boolean;
          public values(): java.util.Collection<any>;
          public equals(param0: any): boolean;
          public put(param0: any, param1: any): boolean;
          public containsKey(param0: any): boolean;
          public get(param0: any): java.util.List<any>;
          public get(param0: any): java.util.Collection<any>;
          public containsEntry(param0: any, param1: any): boolean;
          public removeAll(param0: any): java.util.Collection<any>;
          public putAll(i$: com.google.common.collect.Multimap<any, any>): boolean;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export abstract class StandardMultimap<K, V> extends java.lang.Object {
          public static class: java.lang.Class<com.google.common.collect.StandardMultimap<any, any>>;
          public containsKey(key: any): boolean;
          public isEmpty(): boolean;
          public values(): java.util.Collection<V>;
          public setMap(i$: java.util.Map<K, java.util.Collection<V>>): void;
          public put(key: K, value: V): boolean;
          public replaceValues(param0: K, param1: java.lang.Iterable<any>): java.util.Collection<V>;
          public keySet(): java.util.Set<K>;
          public putAll(value: K, i$: java.lang.Iterable<any>): boolean;
          public size(): number;
          public keys(): com.google.common.collect.Multiset<K>;
          public remove(key: any, value: any): boolean;
          public toString(): string;
          public containsValue(param0: any): boolean;
          public clear(): void;
          public get(param0: K): java.util.Collection<V>;
          public containsEntry(key: any, value: any): boolean;
          public hashCode(): number;
          public remove(param0: any, param1: any): boolean;
          public removeAll(param0: any): java.util.Collection<V>;
          public containsValue(i$: any): boolean;
          public equals(this_: any): boolean;
          public put(param0: K, param1: V): boolean;
          public get(key: K): java.util.Collection<V>;
          public putAll(param0: K, param1: java.lang.Iterable<any>): boolean;
          public putAll(param0: com.google.common.collect.Multimap<any, any>): boolean;
          public entries(): java.util.Collection<java.util.Map.Entry<K, V>>;
          public constructor(map: java.util.Map<K, java.util.Collection<V>>);
          public equals(param0: any): boolean;
          public containsKey(param0: any): boolean;
          public removeAll(key: any): java.util.Collection<V>;
          public containsEntry(param0: any, param1: any): boolean;
          public asMap(): java.util.Map<K, java.util.Collection<V>>;
          public putAll(i$: com.google.common.collect.Multimap<any, any>): boolean;
          public replaceValues(key: K, values: java.lang.Iterable<any>): java.util.Collection<V>;
        }
        export module StandardMultimap {
          export class AsMap extends java.util.AbstractMap<any, java.util.Collection<any>> {
            public static class: java.lang.Class<com.google.common.collect.StandardMultimap.AsMap>;
            public get(key: any): java.util.Collection<any>;
            public remove(key: any): java.util.Collection<any>;
            public hashCode(): number;
            public entrySet(): java.util.Set<java.util.Map.Entry<any, java.util.Collection<any>>>;
            public containsKey(key: any): boolean;
            public clear(): void;
            public equals(object: any): boolean;
            public toString(): string;
            public keySet(): java.util.Set<any>;
          }
          export class AsMapEntries extends java.util.AbstractSet<java.util.Map.Entry<any, java.util.Collection<any>>> {
            public static class: java.lang.Class<com.google.common.collect.StandardMultimap.AsMapEntries>;
            public contains(o: any): boolean;
            public clear(): void;
            public remove(o: any): boolean;
            public iterator(): java.util.Iterator<java.util.Map.Entry<any, java.util.Collection<any>>>;
            public size(): number;
          }
          export class AsMapIterator extends java.util.Iterator<java.util.Map.Entry<any, java.util.Collection<any>>> {
            public static class: java.lang.Class<com.google.common.collect.StandardMultimap.AsMapIterator>;
            public next(): java.util.Map.Entry<any, java.util.Collection<any>>;
            public hasNext(): boolean;
            public remove(): void;
          }
          export class Entries extends java.util.AbstractCollection<java.util.Map.Entry<any, any>> {
            public static class: java.lang.Class<com.google.common.collect.StandardMultimap.Entries>;
            public contains(o: any): boolean;
            public iterator(): java.util.Iterator<java.util.Map.Entry<any, any>>;
            public clear(): void;
            public remove(o: any): boolean;
            public size(): number;
          }
          export class EntryIterator extends java.util.Iterator<java.util.Map.Entry<any, any>> {
            public static class: java.lang.Class<com.google.common.collect.StandardMultimap.EntryIterator>;
            public next(): java.util.Map.Entry<any, any>;
            public hasNext(): boolean;
            public remove(): void;
          }
          export class EntrySet extends com.google.common.collect.StandardMultimap.Entries implements java.util.Set<java.util.Map.Entry<any, any>> {
            public static class: java.lang.Class<com.google.common.collect.StandardMultimap.EntrySet>;
            public hashCode(): number;
            public equals(object: any): boolean;
          }
          export class KeySet extends java.util.AbstractSet<any> {
            public static class: java.lang.Class<com.google.common.collect.StandardMultimap.KeySet>;
            public remove(key: any): boolean;
            public iterator(): java.util.Iterator<any>;
            public hashCode(): number;
            public containsAll(c: java.util.Collection<any>): boolean;
            public size(): number;
            public contains(key: any): boolean;
            public equals(object: any): boolean;
          }
          export class MultisetEntry extends com.google.common.collect.Multisets.AbstractEntry<any> {
            public static class: java.lang.Class<com.google.common.collect.StandardMultimap.MultisetEntry>;
            public getElement(): any;
            public constructor(entry: java.util.Map.Entry<any, java.util.Collection<any>>);
            public equals(param0: any): boolean;
            public hashCode(): number;
            public getCount(): number;
            public toString(): string;
          }
          export class MultisetEntryIterator extends java.util.Iterator<com.google.common.collect.Multiset.Entry<any>> {
            public static class: java.lang.Class<com.google.common.collect.StandardMultimap.MultisetEntryIterator>;
            public hasNext(): boolean;
            public next(): com.google.common.collect.Multiset.Entry<any>;
            public remove(): void;
          }
          export class MultisetKeyIterator extends java.util.Iterator<any> {
            public static class: java.lang.Class<com.google.common.collect.StandardMultimap.MultisetKeyIterator>;
            public next(): any;
            public hasNext(): boolean;
            public remove(): void;
          }
          export class MultisetView extends com.google.common.collect.AbstractMultiset<any> {
            public static class: java.lang.Class<com.google.common.collect.StandardMultimap.MultisetView>;
            public setCount(param0: any, param1: number): number;
            public setCount(element: any, oldCount: number, newCount: number): boolean;
            public iterator(): java.util.Iterator<any>;
            public contains(param0: any): boolean;
            public add(param0: any): boolean;
            public count(param0: any): number;
            public elementSet(): java.util.Set<any>;
            public equals(param0: any): boolean;
            public hashCode(): number;
            public add(param0: any, param1: number): number;
            public toString(): string;
            public remove(param0: any): boolean;
            public retainAll(param0: java.util.Collection<any>): boolean;
            public setCount(param0: any, param1: number, param2: number): boolean;
            public remove(param0: any, param1: number): number;
            public remove(element: any): boolean;
            public count(e: any): number;
            public remove(e: any, i: number): number;
            public clear(): void;
            public add(element: any): boolean;
            public size(): number;
            public entrySet(): java.util.Set<com.google.common.collect.Multiset.Entry<any>>;
            public removeAll(param0: java.util.Collection<any>): boolean;
            public containsAll(param0: java.util.Collection<any>): boolean;
          }
          export module MultisetView {
            export class EntrySet extends java.util.AbstractSet<com.google.common.collect.Multiset.Entry<any>> {
              public static class: java.lang.Class<com.google.common.collect.StandardMultimap.MultisetView.EntrySet>;
              public size(): number;
              public contains(o: any): boolean;
              public clear(): void;
              public iterator(): java.util.Iterator<com.google.common.collect.Multiset.Entry<any>>;
              public remove(o: any): boolean;
            }
          }
          export class RandomAccessWrappedList extends com.google.common.collect.StandardMultimap.WrappedList {
            public static class: java.lang.Class<com.google.common.collect.StandardMultimap.RandomAccessWrappedList>;
          }
          export class SortedKeySet extends com.google.common.collect.StandardMultimap.KeySet implements java.util.SortedSet<any> {
            public static class: java.lang.Class<com.google.common.collect.StandardMultimap.SortedKeySet>;
            public first(): any;
            public last(): any;
            public headSet(toElement: any): java.util.SortedSet<any>;
            public tailSet(fromElement: any): java.util.SortedSet<any>;
            public subSet(fromElement: any, toElement: any): java.util.SortedSet<any>;
            public comparator(): java.util.Comparator<any>;
          }
          export class ValueIterator extends java.util.Iterator<any> {
            public static class: java.lang.Class<com.google.common.collect.StandardMultimap.ValueIterator>;
            public next(): any;
            public hasNext(): boolean;
            public remove(): void;
          }
          export class Values extends java.util.AbstractCollection<any> {
            public static class: java.lang.Class<com.google.common.collect.StandardMultimap.Values>;
            public iterator(): java.util.Iterator<any>;
            public contains(value: any): boolean;
            public clear(): void;
            public size(): number;
          }
          export class WrappedCollection extends java.util.AbstractCollection<any> {
            public static class: java.lang.Class<com.google.common.collect.StandardMultimap.WrappedCollection>;
            public iterator(): java.util.Iterator<any>;
            public addAll(this_: java.util.Collection<any>): boolean;
            public retainAll(this_: java.util.Collection<any>): boolean;
            public hashCode(): number;
            public add(value: any): boolean;
            public remove(o: any): boolean;
            public toString(): string;
            public contains(o: any): boolean;
            public clear(): void;
            public containsAll(c: java.util.Collection<any>): boolean;
            public size(): number;
            public equals(object: any): boolean;
            public removeAll(this_: java.util.Collection<any>): boolean;
          }
          export module WrappedCollection {
            export class WrappedIterator extends java.util.Iterator<any> {
              public static class: java.lang.Class<com.google.common.collect.StandardMultimap.WrappedCollection.WrappedIterator>;
              public hasNext(): boolean;
              public remove(): void;
              public next(): any;
            }
          }
          export class WrappedList extends com.google.common.collect.StandardMultimap.WrappedCollection implements java.util.List<any> {
            public static class: java.lang.Class<com.google.common.collect.StandardMultimap.WrappedList>;
            public remove(index: number): any;
            public indexOf(o: any): number;
            public addAll(this_: number, index: java.util.Collection<any>): boolean;
            public listIterator(): java.util.ListIterator<any>;
            public set(index: number, element: any): any;
            public addAll(this_: java.util.Collection<any>): boolean;
            public get(index: number): any;
            public add(index: number, element: any): void;
            public lastIndexOf(o: any): number;
            public add(value: any): boolean;
            public remove(o: any): boolean;
            public subList(fromIndex: number, toIndex: number): java.util.List<any>;
            public listIterator(index: number): java.util.ListIterator<any>;
          }
          export module WrappedList {
            export class WrappedListIterator extends com.google.common.collect.StandardMultimap.WrappedCollection.WrappedIterator implements java.util.ListIterator<any> {
              public static class: java.lang.Class<com.google.common.collect.StandardMultimap.WrappedList.WrappedListIterator>;
              public constructor(index: com.google.common.collect.StandardMultimap.WrappedList, param1: number);
              public previousIndex(): number;
              public previous(): any;
              public nextIndex(): number;
              public set(value: any): void;
              public hasPrevious(): boolean;
              public add(value: any): void;
            }
          }
          export class WrappedSet extends com.google.common.collect.StandardMultimap.WrappedCollection implements java.util.Set<any> {
            public static class: java.lang.Class<com.google.common.collect.StandardMultimap.WrappedSet>;
          }
          export class WrappedSortedSet extends com.google.common.collect.StandardMultimap.WrappedCollection implements java.util.SortedSet<any> {
            public static class: java.lang.Class<com.google.common.collect.StandardMultimap.WrappedSortedSet>;
            public first(): any;
            public last(): any;
            public headSet(toElement: any): java.util.SortedSet<any>;
            public tailSet(fromElement: any): java.util.SortedSet<any>;
            public subSet(fromElement: any, toElement: any): java.util.SortedSet<any>;
            public comparator(): java.util.Comparator<any>;
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export abstract class StandardSetMultimap<K, V> extends com.google.common.collect.StandardMultimap<any, any> implements com.google.common.collect.SetMultimap<any, any> {
          public static class: java.lang.Class<com.google.common.collect.StandardSetMultimap<any, any>>;
          public isEmpty(): boolean;
          public keys(): com.google.common.collect.Multiset<any>;
          public asMap(): java.util.Map<any, java.util.Collection<any>>;
          public size(): number;
          public replaceValues(key: any, values: java.lang.Iterable<any>): java.util.Collection<any>;
          public entries(): java.util.Collection<java.util.Map.Entry<any, any>>;
          public equals(object: any): boolean;
          public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Set<any>;
          public containsValue(param0: any): boolean;
          public get(key: any): java.util.Collection<any>;
          public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Collection<any>;
          public removeAll(key: any): java.util.Collection<any>;
          public keySet(): java.util.Set<any>;
          public constructor(map: java.util.Map<any, java.util.Collection<any>>);
          public clear(): void;
          public putAll(param0: any, param1: java.lang.Iterable<any>): boolean;
          public hashCode(): number;
          public remove(param0: any, param1: any): boolean;
          public removeAll(key: any): java.util.Set<any>;
          public putAll(param0: com.google.common.collect.Multimap<any, any>): boolean;
          public put(key: any, value: any): boolean;
          public values(): java.util.Collection<any>;
          public removeAll(param0: any): java.util.Set<any>;
          public equals(param0: any): boolean;
          public put(param0: any, param1: any): boolean;
          public entries(): java.util.Set<java.util.Map.Entry<any, any>>;
          public containsKey(param0: any): boolean;
          public replaceValues(key: any, values: java.lang.Iterable<any>): java.util.Set<any>;
          public get(param0: any): java.util.Set<any>;
          public get(param0: any): java.util.Collection<any>;
          public containsEntry(param0: any, param1: any): boolean;
          public get(key: any): java.util.Set<any>;
          public removeAll(param0: any): java.util.Collection<any>;
          public putAll(i$: com.google.common.collect.Multimap<any, any>): boolean;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export abstract class StandardSortedSetMultimap<K, V> extends com.google.common.collect.StandardSetMultimap<any, any> implements com.google.common.collect.SortedSetMultimap<any, any> {
          public static class: java.lang.Class<com.google.common.collect.StandardSortedSetMultimap<any, any>>;
          public isEmpty(): boolean;
          public keys(): com.google.common.collect.Multiset<any>;
          public asMap(): java.util.Map<any, java.util.Collection<any>>;
          public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.SortedSet<any>;
          public size(): number;
          public replaceValues(key: any, values: java.lang.Iterable<any>): java.util.Collection<any>;
          public removeAll(key: any): java.util.SortedSet<any>;
          public get(param0: any): java.util.SortedSet<any>;
          public entries(): java.util.Collection<java.util.Map.Entry<any, any>>;
          public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Set<any>;
          public containsValue(param0: any): boolean;
          public get(key: any): java.util.SortedSet<any>;
          public get(key: any): java.util.Collection<any>;
          public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Collection<any>;
          public removeAll(key: any): java.util.Collection<any>;
          public keySet(): java.util.Set<any>;
          public constructor(map: java.util.Map<any, java.util.Collection<any>>);
          public clear(): void;
          public putAll(param0: any, param1: java.lang.Iterable<any>): boolean;
          public hashCode(): number;
          public remove(param0: any, param1: any): boolean;
          public removeAll(param0: any): java.util.SortedSet<any>;
          public removeAll(key: any): java.util.Set<any>;
          public replaceValues(key: any, values: java.lang.Iterable<any>): java.util.SortedSet<any>;
          public putAll(param0: com.google.common.collect.Multimap<any, any>): boolean;
          public values(): java.util.Collection<any>;
          public removeAll(param0: any): java.util.Set<any>;
          public equals(param0: any): boolean;
          public put(param0: any, param1: any): boolean;
          public entries(): java.util.Set<java.util.Map.Entry<any, any>>;
          public containsKey(param0: any): boolean;
          public replaceValues(key: any, values: java.lang.Iterable<any>): java.util.Set<any>;
          public get(param0: any): java.util.Set<any>;
          public get(param0: any): java.util.Collection<any>;
          public containsEntry(param0: any, param1: any): boolean;
          public get(key: any): java.util.Set<any>;
          public valueComparator(): java.util.Comparator<any>;
          public removeAll(param0: any): java.util.Collection<any>;
          public putAll(i$: com.google.common.collect.Multimap<any, any>): boolean;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class Synchronized {
          public static class: java.lang.Class<com.google.common.collect.Synchronized>;
          public static biMap(bimap: com.google.common.collect.BiMap<any, any>, mutex: any): com.google.common.collect.BiMap<any, any>;
          public static map(map: java.util.Map<any, any>, mutex: any): java.util.Map<any, any>;
          public static sortedSetMultimap(multimap: com.google.common.collect.SortedSetMultimap<any, any>, mutex: any): com.google.common.collect.SortedSetMultimap<any, any>;
          public static multimap(multimap: com.google.common.collect.Multimap<any, any>, mutex: any): com.google.common.collect.Multimap<any, any>;
          public static setMultimap(multimap: com.google.common.collect.SetMultimap<any, any>, mutex: any): com.google.common.collect.SetMultimap<any, any>;
          public static listMultimap(multimap: com.google.common.collect.ListMultimap<any, any>, mutex: any): com.google.common.collect.ListMultimap<any, any>;
          public static set(set: java.util.Set<any>, mutex: any): java.util.Set<any>;
          public static typePreservingSet(set: java.util.Set<any>, mutex: any): java.util.Set<any>;
        }
        export module Synchronized {
          export class SynchronizedAsMap<K, V> extends com.google.common.collect.Synchronized.SynchronizedMap<any, java.util.Collection<any>> {
            public static class: java.lang.Class<com.google.common.collect.Synchronized.SynchronizedAsMap<any, any>>;
            public constructor(delegate: java.util.Map<any, java.util.Collection<any>>, mutex: any);
            public get(key: any): any;
            public entrySet(): java.util.Set<java.util.Map.Entry<any, java.util.Collection<any>>>;
            public get(this_: any): java.util.Collection<any>;
            public containsValue(o: any): boolean;
            public values(): java.util.Collection<java.util.Collection<any>>;
            public constructor(delegate: any, mutex: any);
          }
          export class SynchronizedAsMapEntries<K, V> extends com.google.common.collect.Synchronized.SynchronizedSet<java.util.Map.Entry<any, java.util.Collection<any>>> {
            public static class: java.lang.Class<com.google.common.collect.Synchronized.SynchronizedAsMapEntries<any, any>>;
            public retainAll(c: java.util.Collection<any>): boolean;
            public constructor(delegate: java.util.Set<java.util.Map.Entry<any, java.util.Collection<any>>>, mutex: any);
            public toArray(): androidNative.Array<any>;
            public remove(o: any): boolean;
            public iterator(): java.util.Iterator<java.util.Map.Entry<any, java.util.Collection<any>>>;
            public constructor(delegate: any, mutex: any);
            public toArray(array: androidNative.Array<any>): androidNative.Array<any>;
            public contains(o: any): boolean;
            public removeAll(c: java.util.Collection<any>): boolean;
            public toArray(a: androidNative.Array<any>): androidNative.Array<any>;
            public constructor(delegate: java.util.Collection<any>, mutex: any);
            public containsAll(c: java.util.Collection<any>): boolean;
            public equals(o: any): boolean;
          }
          export class SynchronizedAsMapValues<V> extends com.google.common.collect.Synchronized.SynchronizedCollection<java.util.Collection<any>> {
            public static class: java.lang.Class<com.google.common.collect.Synchronized.SynchronizedAsMapValues<any>>;
            public toArray(array: androidNative.Array<any>): androidNative.Array<any>;
            public contains(o: any): boolean;
            public removeAll(c: java.util.Collection<any>): boolean;
            public retainAll(c: java.util.Collection<any>): boolean;
            public toArray(): androidNative.Array<any>;
            public iterator(): java.util.Iterator<java.util.Collection<any>>;
            public toArray(a: androidNative.Array<any>): androidNative.Array<any>;
            public remove(o: any): boolean;
            public containsAll(c: java.util.Collection<any>): boolean;
          }
          export class SynchronizedBiMap<K, V> extends com.google.common.collect.Synchronized.SynchronizedMap<any, any> {
            public static class: java.lang.Class<com.google.common.collect.Synchronized.SynchronizedBiMap<any, any>>;
            public forcePut(key: any, value: any): any;
            public put(param0: any, param1: any): any;
            public inverse(): com.google.common.collect.BiMap<any, any>;
            public values(): java.util.Collection<any>;
            public constructor(delegate: com.google.common.collect.BiMap<any, any>, mutex: any, inverse: com.google.common.collect.BiMap<any, any>);
            public constructor(delegate: any, mutex: any);
            public delegate(): any;
            public putAll(param0: java.util.Map<any, any>): void;
            public values(): java.util.Set<any>;
            public delegate(): java.util.Map<any, any>;
            public forcePut(param0: any, param1: any): any;
            public constructor(delegate: java.util.Map<any, any>, mutex: any);
            public delegate(): com.google.common.collect.BiMap<any, any>;
          }
          export class SynchronizedCollection<E> extends com.google.common.collect.Synchronized.SynchronizedObject implements java.util.Collection<any> {
            public static class: java.lang.Class<com.google.common.collect.Synchronized.SynchronizedCollection<any>>;
            public addAll(c: java.util.Collection<any>): boolean;
            public retainAll(c: java.util.Collection<any>): boolean;
            public add(e: any): boolean;
            public iterator(): java.util.Iterator<any>;
            public delegate(): java.util.Collection<any>;
            public toArray(): androidNative.Array<any>;
            public remove(o: any): boolean;
            public constructor(delegate: any, mutex: any);
            public delegate(): any;
            public contains(o: any): boolean;
            public removeAll(c: java.util.Collection<any>): boolean;
            public isEmpty(): boolean;
            public clear(): void;
            public toArray(a: androidNative.Array<any>): androidNative.Array<any>;
            public constructor(delegate: java.util.Collection<any>, mutex: any);
            public containsAll(c: java.util.Collection<any>): boolean;
            public size(): number;
          }
          export class SynchronizedList<E> extends com.google.common.collect.Synchronized.SynchronizedCollection<any> implements java.util.List<any> {
            public static class: java.lang.Class<com.google.common.collect.Synchronized.SynchronizedList<any>>;
            public addAll(c: java.util.Collection<any>): boolean;
            public indexOf(o: any): number;
            public remove(index: number): any;
            public listIterator(): java.util.ListIterator<any>;
            public set(index: number, element: any): any;
            public add(e: any): boolean;
            public delegate(): java.util.Collection<any>;
            public get(index: number): any;
            public add(index: number, element: any): void;
            public hashCode(): number;
            public lastIndexOf(o: any): number;
            public remove(o: any): boolean;
            public constructor(delegate: any, mutex: any);
            public delegate(): any;
            public subList(fromIndex: number, toIndex: number): java.util.List<any>;
            public delegate(): java.util.List<any>;
            public addAll(index: number, c: java.util.Collection<any>): boolean;
            public constructor(delegate: java.util.List<any>, mutex: any);
            public constructor(delegate: java.util.Collection<any>, mutex: any);
            public equals(o: any): boolean;
            public listIterator(index: number): java.util.ListIterator<any>;
          }
          export class SynchronizedListMultimap<K, V> extends com.google.common.collect.Synchronized.SynchronizedMultimap<any, any> implements com.google.common.collect.ListMultimap<any, any> {
            public static class: java.lang.Class<com.google.common.collect.Synchronized.SynchronizedListMultimap<any, any>>;
            public removeAll(key: any): java.util.Collection<any>;
            public get(key: any): java.util.List<any>;
            public delegate(): com.google.common.collect.ListMultimap<any, any>;
            public equals(param0: any): boolean;
            public hashCode(): number;
            public delegate(): com.google.common.collect.Multimap<any, any>;
            public asMap(): java.util.Map<any, java.util.Collection<any>>;
            public values(): java.util.Collection<any>;
            public removeAll(param0: any): java.util.List<any>;
            public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Collection<any>;
            public get(key: any): java.util.Collection<any>;
            public replaceValues(key: any, values: java.lang.Iterable<any>): java.util.Collection<any>;
            public isEmpty(): boolean;
            public put(param0: any, param1: any): boolean;
            public remove(param0: any, param1: any): boolean;
            public keys(): com.google.common.collect.Multiset<any>;
            public size(): number;
            public removeAll(key: any): java.util.List<any>;
            public entries(): java.util.Collection<java.util.Map.Entry<any, any>>;
            public get(param0: any): java.util.List<any>;
            public replaceValues(key: any, values: java.lang.Iterable<any>): java.util.List<any>;
            public containsValue(param0: any): boolean;
            public containsKey(param0: any): boolean;
            public removeAll(param0: any): java.util.Collection<any>;
            public putAll(multimap: com.google.common.collect.Multimap<any, any>): boolean;
            public delegate(): any;
            public putAll(param0: any, param1: java.lang.Iterable<any>): boolean;
            public putAll(param0: com.google.common.collect.Multimap<any, any>): boolean;
            public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.List<any>;
            public get(param0: any): java.util.Collection<any>;
            public clear(): void;
            public containsEntry(param0: any, param1: any): boolean;
            public keySet(): java.util.Set<any>;
          }
          export class SynchronizedMap<K, V> extends com.google.common.collect.Synchronized.SynchronizedObject implements java.util.Map<any, any> {
            public static class: java.lang.Class<com.google.common.collect.Synchronized.SynchronizedMap<any, any>>;
            public put(key: any, value: any): any;
            public entrySet(): java.util.Set<java.util.Map.Entry<any, any>>;
            public containsValue(value: any): boolean;
            public get(key: any): any;
            public hashCode(): number;
            public containsKey(key: any): boolean;
            public putAll(map: java.util.Map<any, any>): void;
            public values(): java.util.Collection<any>;
            public constructor(delegate: any, mutex: any);
            public delegate(): any;
            public remove(key: any): any;
            public delegate(): java.util.Map<any, any>;
            public isEmpty(): boolean;
            public constructor(delegate: java.util.Map<any, any>, mutex: any);
            public clear(): void;
            public equals(o: any): boolean;
            public size(): number;
            public keySet(): java.util.Set<any>;
          }
          export class SynchronizedMultimap<K, V> extends com.google.common.collect.Synchronized.SynchronizedObject implements com.google.common.collect.Multimap<any, any> {
            public static class: java.lang.Class<com.google.common.collect.Synchronized.SynchronizedMultimap<any, any>>;
            public removeAll(key: any): java.util.Collection<any>;
            public hashCode(): number;
            public equals(param0: any): boolean;
            public delegate(): com.google.common.collect.Multimap<any, any>;
            public containsKey(key: any): boolean;
            public asMap(): java.util.Map<any, java.util.Collection<any>>;
            public containsEntry(key: any, value: any): boolean;
            public values(): java.util.Collection<any>;
            public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Collection<any>;
            public remove(key: any, value: any): boolean;
            public get(key: any): java.util.Collection<any>;
            public replaceValues(key: any, values: java.lang.Iterable<any>): java.util.Collection<any>;
            public isEmpty(): boolean;
            public put(param0: any, param1: any): boolean;
            public remove(param0: any, param1: any): boolean;
            public keys(): com.google.common.collect.Multiset<any>;
            public equals(o: any): boolean;
            public size(): number;
            public put(key: any, value: any): boolean;
            public containsValue(value: any): boolean;
            public putAll(key: any, values: java.lang.Iterable<any>): boolean;
            public entries(): java.util.Collection<java.util.Map.Entry<any, any>>;
            public containsValue(param0: any): boolean;
            public containsKey(param0: any): boolean;
            public removeAll(param0: any): java.util.Collection<any>;
            public putAll(multimap: com.google.common.collect.Multimap<any, any>): boolean;
            public delegate(): any;
            public putAll(param0: any, param1: java.lang.Iterable<any>): boolean;
            public putAll(param0: com.google.common.collect.Multimap<any, any>): boolean;
            public get(param0: any): java.util.Collection<any>;
            public clear(): void;
            public containsEntry(param0: any, param1: any): boolean;
            public keySet(): java.util.Set<any>;
          }
          export class SynchronizedMultiset<E> extends com.google.common.collect.Synchronized.SynchronizedCollection<any> implements com.google.common.collect.Multiset<any> {
            public static class: java.lang.Class<com.google.common.collect.Synchronized.SynchronizedMultiset<any>>;
            public setCount(element: any, oldCount: number, newCount: number): boolean;
            public add(param0: any): boolean;
            public elementSet(): java.util.Set<any>;
            public hashCode(): number;
            public equals(param0: any): boolean;
            public retainAll(param0: java.util.Collection<any>): boolean;
            public remove(param0: any, param1: number): number;
            public constructor(delegate: com.google.common.collect.Multiset<any>, mutex: any);
            public constructor(delegate: java.util.Collection<any>, mutex: any);
            public equals(o: any): boolean;
            public removeAll(param0: java.util.Collection<any>): boolean;
            public setCount(element: any, count: number): number;
            public setCount(param0: any, param1: number): number;
            public add(e: any): boolean;
            public contains(param0: any): boolean;
            public delegate(): java.util.Collection<any>;
            public add(e: any, n: number): number;
            public count(param0: any): number;
            public count(o: any): number;
            public remove(o: any): boolean;
            public remove(o: any, n: number): number;
            public add(param0: any, param1: number): number;
            public constructor(delegate: any, mutex: any);
            public toString(): string;
            public remove(param0: any): boolean;
            public delegate(): any;
            public setCount(param0: any, param1: number, param2: number): boolean;
            public delegate(): com.google.common.collect.Multiset<any>;
            public entrySet(): java.util.Set<com.google.common.collect.Multiset.Entry<any>>;
            public containsAll(param0: java.util.Collection<any>): boolean;
          }
          export class SynchronizedObject {
            public static class: java.lang.Class<com.google.common.collect.Synchronized.SynchronizedObject>;
            public mutex: any;
            public delegate(): any;
            public constructor(delegate: any, mutex: any);
            public toString(): string;
          }
          export class SynchronizedRandomAccessList<E> extends com.google.common.collect.Synchronized.SynchronizedList<any> implements java.util.RandomAccess {
            public static class: java.lang.Class<com.google.common.collect.Synchronized.SynchronizedRandomAccessList<any>>;
            public constructor(list: java.util.List<any>, mutex: any);
            public constructor(delegate: java.util.Collection<any>, mutex: any);
            public constructor(delegate: any, mutex: any);
          }
          export class SynchronizedSet<E> extends com.google.common.collect.Synchronized.SynchronizedCollection<any> implements java.util.Set<any> {
            public static class: java.lang.Class<com.google.common.collect.Synchronized.SynchronizedSet<any>>;
            public constructor(delegate: java.util.Set<any>, mutex: any);
            public delegate(): any;
            public delegate(): java.util.Collection<any>;
            public delegate(): java.util.Set<any>;
            public hashCode(): number;
            public constructor(delegate: java.util.Collection<any>, mutex: any);
            public equals(o: any): boolean;
            public constructor(delegate: any, mutex: any);
          }
          export class SynchronizedSetMultimap<K, V> extends com.google.common.collect.Synchronized.SynchronizedMultimap<any, any> implements com.google.common.collect.SetMultimap<any, any> {
            public static class: java.lang.Class<com.google.common.collect.Synchronized.SynchronizedSetMultimap<any, any>>;
            public removeAll(key: any): java.util.Collection<any>;
            public delegate(): com.google.common.collect.SetMultimap<any, any>;
            public equals(param0: any): boolean;
            public hashCode(): number;
            public delegate(): com.google.common.collect.Multimap<any, any>;
            public asMap(): java.util.Map<any, java.util.Collection<any>>;
            public values(): java.util.Collection<any>;
            public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Set<any>;
            public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Collection<any>;
            public get(key: any): java.util.Collection<any>;
            public replaceValues(key: any, values: java.lang.Iterable<any>): java.util.Collection<any>;
            public isEmpty(): boolean;
            public put(param0: any, param1: any): boolean;
            public remove(param0: any, param1: any): boolean;
            public get(key: any): java.util.Set<any>;
            public keys(): com.google.common.collect.Multiset<any>;
            public size(): number;
            public entries(): java.util.Collection<java.util.Map.Entry<any, any>>;
            public containsValue(param0: any): boolean;
            public containsKey(param0: any): boolean;
            public removeAll(param0: any): java.util.Set<any>;
            public removeAll(param0: any): java.util.Collection<any>;
            public putAll(multimap: com.google.common.collect.Multimap<any, any>): boolean;
            public delegate(): any;
            public get(param0: any): java.util.Set<any>;
            public replaceValues(key: any, values: java.lang.Iterable<any>): java.util.Set<any>;
            public putAll(param0: any, param1: java.lang.Iterable<any>): boolean;
            public putAll(param0: com.google.common.collect.Multimap<any, any>): boolean;
            public get(param0: any): java.util.Collection<any>;
            public removeAll(key: any): java.util.Set<any>;
            public clear(): void;
            public containsEntry(param0: any, param1: any): boolean;
            public entries(): java.util.Set<java.util.Map.Entry<any, any>>;
            public keySet(): java.util.Set<any>;
          }
          export class SynchronizedSortedSet<E> extends com.google.common.collect.Synchronized.SynchronizedSet<any> implements java.util.SortedSet<any> {
            public static class: java.lang.Class<com.google.common.collect.Synchronized.SynchronizedSortedSet<any>>;
            public delegate(): java.util.SortedSet<any>;
            public first(): any;
            public last(): any;
            public delegate(): java.util.Collection<any>;
            public headSet(toElement: any): java.util.SortedSet<any>;
            public constructor(delegate: java.util.SortedSet<any>, mutex: any);
            public tailSet(fromElement: any): java.util.SortedSet<any>;
            public constructor(delegate: any, mutex: any);
            public comparator(): java.util.Comparator<any>;
            public constructor(delegate: java.util.Set<any>, mutex: any);
            public delegate(): any;
            public delegate(): java.util.Set<any>;
            public constructor(delegate: java.util.Collection<any>, mutex: any);
            public subSet(fromElement: any, toElement: any): java.util.SortedSet<any>;
          }
          export class SynchronizedSortedSetMultimap<K, V>
            extends com.google.common.collect.Synchronized.SynchronizedSetMultimap<any, any>
            implements com.google.common.collect.SortedSetMultimap<any, any>
          {
            public static class: java.lang.Class<com.google.common.collect.Synchronized.SynchronizedSortedSetMultimap<any, any>>;
            public removeAll(key: any): java.util.Collection<any>;
            public delegate(): com.google.common.collect.SetMultimap<any, any>;
            public equals(param0: any): boolean;
            public hashCode(): number;
            public delegate(): com.google.common.collect.Multimap<any, any>;
            public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.SortedSet<any>;
            public asMap(): java.util.Map<any, java.util.Collection<any>>;
            public values(): java.util.Collection<any>;
            public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Set<any>;
            public delegate(): com.google.common.collect.SortedSetMultimap<any, any>;
            public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Collection<any>;
            public get(key: any): java.util.Collection<any>;
            public valueComparator(): java.util.Comparator<any>;
            public replaceValues(key: any, values: java.lang.Iterable<any>): java.util.Collection<any>;
            public isEmpty(): boolean;
            public put(param0: any, param1: any): boolean;
            public remove(param0: any, param1: any): boolean;
            public get(key: any): java.util.Set<any>;
            public keys(): com.google.common.collect.Multiset<any>;
            public size(): number;
            public removeAll(param0: any): java.util.SortedSet<any>;
            public replaceValues(key: any, values: java.lang.Iterable<any>): java.util.SortedSet<any>;
            public entries(): java.util.Collection<java.util.Map.Entry<any, any>>;
            public containsValue(param0: any): boolean;
            public containsKey(param0: any): boolean;
            public get(param0: any): java.util.SortedSet<any>;
            public removeAll(param0: any): java.util.Set<any>;
            public removeAll(param0: any): java.util.Collection<any>;
            public putAll(multimap: com.google.common.collect.Multimap<any, any>): boolean;
            public delegate(): any;
            public get(param0: any): java.util.Set<any>;
            public replaceValues(key: any, values: java.lang.Iterable<any>): java.util.Set<any>;
            public putAll(param0: any, param1: java.lang.Iterable<any>): boolean;
            public putAll(param0: com.google.common.collect.Multimap<any, any>): boolean;
            public get(param0: any): java.util.Collection<any>;
            public get(key: any): java.util.SortedSet<any>;
            public removeAll(key: any): java.util.Set<any>;
            public clear(): void;
            public removeAll(key: any): java.util.SortedSet<any>;
            public containsEntry(param0: any, param1: any): boolean;
            public entries(): java.util.Set<java.util.Map.Entry<any, any>>;
            public keySet(): java.util.Set<any>;
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class TreeMultimap<K, V> extends com.google.common.collect.StandardSortedSetMultimap<any, any> {
          public static class: java.lang.Class<com.google.common.collect.TreeMultimap<any, any>>;
          public isEmpty(): boolean;
          public keyComparator(): java.util.Comparator<any>;
          public keys(): com.google.common.collect.Multiset<any>;
          public asMap(): java.util.Map<any, java.util.Collection<any>>;
          public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.SortedSet<any>;
          public size(): number;
          public replaceValues(key: any, values: java.lang.Iterable<any>): java.util.Collection<any>;
          public get(param0: any): java.util.SortedSet<any>;
          public entries(): java.util.Collection<java.util.Map.Entry<any, any>>;
          public containsValue(param0: any): boolean;
          public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Set<any>;
          public get(key: any): java.util.Collection<any>;
          public replaceValues(param0: any, param1: java.lang.Iterable<any>): java.util.Collection<any>;
          public keySet(): java.util.Set<any>;
          public keySet(): java.util.SortedSet<any>;
          public removeAll(key: any): java.util.Collection<any>;
          public clear(): void;
          public putAll(param0: any, param1: java.lang.Iterable<any>): boolean;
          public hashCode(): number;
          public remove(param0: any, param1: any): boolean;
          public removeAll(param0: any): java.util.SortedSet<any>;
          public removeAll(key: any): java.util.Set<any>;
          public static create(keyComparator: java.util.Comparator<any>, valueComparator: java.util.Comparator<any>): com.google.common.collect.TreeMultimap<any, any>;
          public putAll(param0: com.google.common.collect.Multimap<any, any>): boolean;
          public values(): java.util.Collection<any>;
          public static create(): com.google.common.collect.TreeMultimap<any, any>;
          public removeAll(param0: any): java.util.Set<any>;
          public equals(param0: any): boolean;
          public put(param0: any, param1: any): boolean;
          public containsKey(param0: any): boolean;
          public entries(): java.util.Set<java.util.Map.Entry<any, any>>;
          public static create(multimap: com.google.common.collect.Multimap<any, any>): com.google.common.collect.TreeMultimap<any, any>;
          public replaceValues(key: any, values: java.lang.Iterable<any>): java.util.Set<any>;
          public get(param0: any): java.util.Collection<any>;
          public get(param0: any): java.util.Set<any>;
          public containsEntry(param0: any, param1: any): boolean;
          public valueComparator(): java.util.Comparator<any>;
          public get(key: any): java.util.Set<any>;
          public removeAll(param0: any): java.util.Collection<any>;
          public putAll(i$: com.google.common.collect.Multimap<any, any>): boolean;
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export class TreeMultiset<E> extends com.google.common.collect.AbstractMapBasedMultiset<any> {
          public static class: java.lang.Class<com.google.common.collect.TreeMultiset<any>>;
          public setCount(param0: any, param1: number): number;
          public add(param0: any): boolean;
          public count(e: any): number;
          public containsAll(param0: java.util.Collection<any>): boolean;
          public remove(element: any): boolean;
          public add(element: any): boolean;
          public toString(): string;
          public add(param0: any, param1: number): number;
          public elementSet(): java.util.SortedSet<any>;
          public remove(param0: any, param1: number): number;
          public count(param0: any): number;
          public hashCode(): number;
          public contains(param0: any): boolean;
          public setCount(element: any, oldCount: number, newCount: number): boolean;
          public remove(param0: any): boolean;
          public removeAll(param0: java.util.Collection<any>): boolean;
          public retainAll(param0: java.util.Collection<any>): boolean;
          public setCount(param0: any, param1: number, param2: number): boolean;
          public static create(comparator: java.util.Comparator<any>): com.google.common.collect.TreeMultiset<any>;
          public createElementSet(): java.util.Set<any>;
          public equals(param0: any): boolean;
          public static create(elements: java.lang.Iterable<any>): com.google.common.collect.TreeMultiset<any>;
          public static create(): com.google.common.collect.TreeMultiset<any>;
          public elementSet(): java.util.Set<any>;
          public entrySet(): java.util.Set<com.google.common.collect.Multiset.Entry<any>>;
        }
        export module TreeMultiset {
          export class SortedMapBasedElementSet extends com.google.common.collect.AbstractMapBasedMultiset.MapBasedElementSet implements java.util.SortedSet<any> {
            public static class: java.lang.Class<com.google.common.collect.TreeMultiset.SortedMapBasedElementSet>;
            public first(): any;
            public last(): any;
            public remove(e: any): boolean;
            public headSet(toElement: any): java.util.SortedSet<any>;
            public tailSet(fromElement: any): java.util.SortedSet<any>;
            public subSet(fromElement: any, toElement: any): java.util.SortedSet<any>;
            public comparator(): java.util.Comparator<any>;
          }
        }
      }
    }
  }
}

declare module com {
  export module google {
    export module common {
      export module collect {
        export abstract class UnmodifiableIterator<E> extends java.util.Iterator<any> {
          public static class: java.lang.Class<com.google.common.collect.UnmodifiableIterator<any>>;
          public constructor();
          public remove(): void;
        }
      }
    }
  }
}

//Generics information:
//com.google.common.base.FinalizablePhantomReference:1
//com.google.common.base.FinalizableSoftReference:1
//com.google.common.base.FinalizableWeakReference:1
//com.google.common.base.Function:2
//com.google.common.base.Functions.ConstantFunction:1
//com.google.common.base.Functions.ForMapWithDefault:2
//com.google.common.base.Functions.FunctionComposition:3
//com.google.common.base.Functions.FunctionForMapNoDefault:2
//com.google.common.base.Functions.PredicateFunction:1
//com.google.common.base.Predicate:1
//com.google.common.base.Predicates.AndPredicate:1
//com.google.common.base.Predicates.CompositionPredicate:2
//com.google.common.base.Predicates.InPredicate:1
//com.google.common.base.Predicates.IsEqualToPredicate:1
//com.google.common.base.Predicates.NotPredicate:1
//com.google.common.base.Predicates.OrPredicate:1
//com.google.common.base.Supplier:1
//com.google.common.base.Suppliers.MemoizingSupplier:1
//com.google.common.base.Suppliers.SupplierComposition:2
//com.google.common.base.Suppliers.SupplierOfInstance:1
//com.google.common.base.Suppliers.ThreadSafeSupplier:1
//com.google.common.collect.AbstractImmutableMultimap:3
//com.google.common.collect.AbstractImmutableMultimap.CountMap:3
//com.google.common.collect.AbstractImmutableMultimap.CountMap.EntrySet:3
//com.google.common.collect.AbstractImmutableMultimap.EntryCollection:3
//com.google.common.collect.AbstractImmutableMultimap.Values:1
//com.google.common.collect.AbstractIterator:1
//com.google.common.collect.AbstractMapBasedMultiset:1
//com.google.common.collect.AbstractMapEntry:2
//com.google.common.collect.AbstractMultiset:1
//com.google.common.collect.ArrayListMultimap:2
//com.google.common.collect.BiMap:2
//com.google.common.collect.ClassToInstanceMap:1
//com.google.common.collect.Collections2.FilteredCollection:1
//com.google.common.collect.Collections2.TransformedCollection:2
//com.google.common.collect.ConcurrentHashMultiset:1
//com.google.common.collect.CustomConcurrentHashMap.ComputingImpl:3
//com.google.common.collect.CustomConcurrentHashMap.ComputingStrategy:3
//com.google.common.collect.CustomConcurrentHashMap.Impl:3
//com.google.common.collect.CustomConcurrentHashMap.Internals:3
//com.google.common.collect.CustomConcurrentHashMap.SimpleInternalEntry:2
//com.google.common.collect.CustomConcurrentHashMap.SimpleStrategy:2
//com.google.common.collect.CustomConcurrentHashMap.Strategy:3
//com.google.common.collect.EnumBiMap:2
//com.google.common.collect.EnumHashBiMap:2
//com.google.common.collect.EnumMultiset:1
//com.google.common.collect.ForwardingCollection:1
//com.google.common.collect.ForwardingConcurrentMap:2
//com.google.common.collect.ForwardingIterator:1
//com.google.common.collect.ForwardingList:1
//com.google.common.collect.ForwardingListIterator:1
//com.google.common.collect.ForwardingMap:2
//com.google.common.collect.ForwardingMapEntry:2
//com.google.common.collect.ForwardingMultimap:2
//com.google.common.collect.ForwardingMultiset:1
//com.google.common.collect.ForwardingQueue:1
//com.google.common.collect.ForwardingSet:1
//com.google.common.collect.ForwardingSortedMap:2
//com.google.common.collect.ForwardingSortedSet:1
//com.google.common.collect.HashBiMap:2
//com.google.common.collect.HashMultimap:2
//com.google.common.collect.HashMultiset:1
//com.google.common.collect.ImmutableBiMap:2
//com.google.common.collect.ImmutableBiMap.Builder:2
//com.google.common.collect.ImmutableBiMap.RegularImmutableBiMap:2
//com.google.common.collect.ImmutableClassToInstanceMap:1
//com.google.common.collect.ImmutableClassToInstanceMap.Builder:1
//com.google.common.collect.ImmutableCollection:1
//com.google.common.collect.ImmutableCollection.ArrayImmutableCollection:1
//com.google.common.collect.ImmutableEntry:2
//com.google.common.collect.ImmutableList:1
//com.google.common.collect.ImmutableList.Builder:1
//com.google.common.collect.ImmutableMap:2
//com.google.common.collect.ImmutableMap.Builder:2
//com.google.common.collect.ImmutableMultimap:2
//com.google.common.collect.ImmutableMultimap.Builder:2
//com.google.common.collect.ImmutableMultimap.BuilderMultimap:2
//com.google.common.collect.ImmutableMultiset:1
//com.google.common.collect.ImmutableMultiset.EntrySet:1
//com.google.common.collect.ImmutableSet:1
//com.google.common.collect.ImmutableSet.ArrayImmutableSet:1
//com.google.common.collect.ImmutableSet.Builder:1
//com.google.common.collect.ImmutableSet.TransformedImmutableSet:2
//com.google.common.collect.ImmutableSetMultimap:2
//com.google.common.collect.ImmutableSetMultimap.Builder:2
//com.google.common.collect.ImmutableSetMultimap.BuilderMultimap:2
//com.google.common.collect.ImmutableSortedSet:1
//com.google.common.collect.ImmutableSortedSet.Builder:1
//com.google.common.collect.ImmutableSortedSet.EmptyImmutableSortedSet:1
//com.google.common.collect.ImmutableSortedSet.RegularImmutableSortedSet:1
//com.google.common.collect.ImmutableSortedSet.SerializedForm:1
//com.google.common.collect.Iterables.IterableWithToString:1
//com.google.common.collect.Iterators.PeekingImpl:1
//com.google.common.collect.LinkedHashMultimap:2
//com.google.common.collect.LinkedHashMultiset:1
//com.google.common.collect.LinkedListMultimap:2
//com.google.common.collect.LinkedListMultimap.Node:2
//com.google.common.collect.ListMultimap:2
//com.google.common.collect.Lists.OnePlusArrayList:1
//com.google.common.collect.Lists.Partition:1
//com.google.common.collect.Lists.RandomAccessPartition:1
//com.google.common.collect.Lists.TransformingRandomAccessList:2
//com.google.common.collect.Lists.TransformingSequentialList:2
//com.google.common.collect.Lists.TwoPlusArrayList:1
//com.google.common.collect.MapConstraint:2
//com.google.common.collect.MapConstraints.ConstrainedEntries:2
//com.google.common.collect.MapConstraints.ConstrainedEntrySet:2
//com.google.common.collect.MapConstraints.ConstrainedMap:2
//com.google.common.collect.MapDifference:2
//com.google.common.collect.MapDifference.ValueDifference:1
//com.google.common.collect.MapMaker.ComputationExceptionReference:2
//com.google.common.collect.MapMaker.LinkedSoftEntry:2
//com.google.common.collect.MapMaker.LinkedStrongEntry:2
//com.google.common.collect.MapMaker.LinkedWeakEntry:2
//com.google.common.collect.MapMaker.NullOutputExceptionReference:2
//com.google.common.collect.MapMaker.ReferenceEntry:2
//com.google.common.collect.MapMaker.SoftEntry:2
//com.google.common.collect.MapMaker.SoftValueReference:2
//com.google.common.collect.MapMaker.StrategyImpl:2
//com.google.common.collect.MapMaker.StrongEntry:2
//com.google.common.collect.MapMaker.StrongValueReference:2
//com.google.common.collect.MapMaker.ValueReference:2
//com.google.common.collect.MapMaker.WeakEntry:2
//com.google.common.collect.MapMaker.WeakValueReference:2
//com.google.common.collect.Maps.AbstractFilteredMap:2
//com.google.common.collect.Maps.FilteredEntryMap:2
//com.google.common.collect.Maps.FilteredKeyMap:2
//com.google.common.collect.Maps.ImprovedAbstractMap:2
//com.google.common.collect.Maps.MapDifferenceImpl:2
//com.google.common.collect.Maps.TransformedValuesMap:3
//com.google.common.collect.Maps.UnmodifiableBiMap:2
//com.google.common.collect.Maps.UnmodifiableEntries:2
//com.google.common.collect.Maps.UnmodifiableEntrySet:2
//com.google.common.collect.Maps.ValueDifferenceImpl:1
//com.google.common.collect.Multimap:2
//com.google.common.collect.Multimaps.CustomListMultimap:2
//com.google.common.collect.Multimaps.CustomMultimap:2
//com.google.common.collect.Multimaps.CustomSetMultimap:2
//com.google.common.collect.Multimaps.CustomSortedSetMultimap:2
//com.google.common.collect.Multimaps.MapMultimap:2
//com.google.common.collect.Multimaps.UnmodifiableAsMapEntries:2
//com.google.common.collect.Multimaps.UnmodifiableAsMapValues:1
//com.google.common.collect.Multimaps.UnmodifiableListMultimap:2
//com.google.common.collect.Multimaps.UnmodifiableMultimap:2
//com.google.common.collect.Multimaps.UnmodifiableSetMultimap:2
//com.google.common.collect.Multimaps.UnmodifiableSortedSetMultimap:2
//com.google.common.collect.Multiset:1
//com.google.common.collect.Multiset.Entry:1
//com.google.common.collect.Multisets.AbstractEntry:1
//com.google.common.collect.Multisets.SetMultiset:1
//com.google.common.collect.Multisets.UnmodifiableMultiset:1
//com.google.common.collect.MutableClassToInstanceMap:1
//com.google.common.collect.Ordering:1
//com.google.common.collect.Ordering.ByFunctionOrdering:2
//com.google.common.collect.Ordering.ComparatorOrdering:1
//com.google.common.collect.Ordering.CompoundOrdering:1
//com.google.common.collect.Ordering.GivenOrder:1
//com.google.common.collect.Ordering.NullsFirstOrdering:1
//com.google.common.collect.Ordering.NullsLastOrdering:1
//com.google.common.collect.Ordering.ReverseOrdering:1
//com.google.common.collect.PeekingIterator:1
//com.google.common.collect.RegularImmutableList:1
//com.google.common.collect.RegularImmutableMap:2
//com.google.common.collect.RegularImmutableMap.EntrySet:2
//com.google.common.collect.RegularImmutableMap.KeySet:2
//com.google.common.collect.RegularImmutableMap.Values:1
//com.google.common.collect.RegularImmutableSet:1
//com.google.common.collect.Serialization.FieldSetter:1
//com.google.common.collect.SetMultimap:2
//com.google.common.collect.Sets.FilteredSet:1
//com.google.common.collect.Sets.SetFromMap:1
//com.google.common.collect.Sets.SetView:1
//com.google.common.collect.SingletonImmutableMap:2
//com.google.common.collect.SingletonImmutableMap.Values:1
//com.google.common.collect.SingletonImmutableSet:1
//com.google.common.collect.SortedSetMultimap:2
//com.google.common.collect.StandardBiMap:2
//com.google.common.collect.StandardBiMap.Inverse:2
//com.google.common.collect.StandardListMultimap:2
//com.google.common.collect.StandardMultimap:2
//com.google.common.collect.StandardSetMultimap:2
//com.google.common.collect.StandardSortedSetMultimap:2
//com.google.common.collect.Synchronized.SynchronizedAsMap:2
//com.google.common.collect.Synchronized.SynchronizedAsMapEntries:2
//com.google.common.collect.Synchronized.SynchronizedAsMapValues:1
//com.google.common.collect.Synchronized.SynchronizedBiMap:2
//com.google.common.collect.Synchronized.SynchronizedCollection:1
//com.google.common.collect.Synchronized.SynchronizedList:1
//com.google.common.collect.Synchronized.SynchronizedListMultimap:2
//com.google.common.collect.Synchronized.SynchronizedMap:2
//com.google.common.collect.Synchronized.SynchronizedMultimap:2
//com.google.common.collect.Synchronized.SynchronizedMultiset:1
//com.google.common.collect.Synchronized.SynchronizedRandomAccessList:1
//com.google.common.collect.Synchronized.SynchronizedSet:1
//com.google.common.collect.Synchronized.SynchronizedSetMultimap:2
//com.google.common.collect.Synchronized.SynchronizedSortedSet:1
//com.google.common.collect.Synchronized.SynchronizedSortedSetMultimap:2
//com.google.common.collect.TreeMultimap:2
//com.google.common.collect.TreeMultiset:1
//com.google.common.collect.UnmodifiableIterator:1
