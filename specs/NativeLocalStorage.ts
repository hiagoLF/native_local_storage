import type {EventSubscription, TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

type EventEmitter<T> = (callback: (data: T) => void) => EventSubscription;

export type KeyValuePair = {
  key: string;
  value: string;
}

export interface Spec extends TurboModule {
  setItem(value: string, key: string): void;
  getItem(key: string): string | null;
  removeItem(key: string): void;
  clear(): void;

  readonly onKeyAdded: EventEmitter<KeyValuePair>
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeLocalStorage',
);