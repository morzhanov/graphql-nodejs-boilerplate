import { ObjectDiff } from 'typelevel-ts';

export type TypedInject<Stores> = <StoreKeyToInject extends keyof Stores>(
  ...storeKeysToInject: StoreKeyToInject[]
) => <ExpectedProps extends Pick<Stores, StoreKeyToInject>>(
  component: React.ComponentType<ExpectedProps>
) => React.ComponentType<ObjectDiff<ExpectedProps, Pick<Stores, StoreKeyToInject>>>;
