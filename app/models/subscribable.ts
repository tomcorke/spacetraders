interface ISubscribable<T> {
  subscribe(callback: (value: T) => void): () => void;
  unsubscribe(callback: (value: T) => void): void;
}

export abstract class Subscribable<T> implements ISubscribable<T> {
  private subscribers: ((value: T) => void)[] = [];

  constructor() {
    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
  }

  subscribe(callback: (value: T) => void): () => void {
    this.subscribers.push(callback);
    return () => this.unsubscribe(callback);
  }

  unsubscribe(callback: (value: T) => void): void {
    this.subscribers = this.subscribers.filter(
      (subscriber) => subscriber !== callback
    );
  }

  protected notify(value: T) {
    this.subscribers.forEach((callback) => callback(value));
  }
}
