type Dispatch<T> = React.Dispatch<React.SetStateAction<T>>;

export class Subject<T> {
  private observers: Set<Dispatch<T>>;
  // public для удобства чтобы можно было прочитать
  // это свойство не только через hook, но и на прямую из store
  public value: T;
  constructor(value: T) {
    this.observers = new Set<Dispatch<T>>();
    this.value = value;
  }

  subscribe(observer: Dispatch<T>) {
    this.observers.add(observer);
    observer(this.value);
  }

  unsubscribe(observer: Dispatch<T>) {
    this.observers.delete(observer);
  }

  notify(value: T) {
    this.value = value;
    this.observers.forEach((observer) => {
      observer(this.value);
    });
  }
}
