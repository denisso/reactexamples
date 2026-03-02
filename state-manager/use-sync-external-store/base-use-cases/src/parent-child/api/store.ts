type Listener = Function;

export class Store<T extends object> {
  listeners = new Set<Listener>();
  constructor(public state: T) {
    this.subscribe = this.subscribe.bind(this);
    this.getSnapshot = this.getSnapshot.bind(this);
  }
  getSnapshot() {
    return this.state;
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  set(state: T) {
    if (state === this.state) return;
    this.state = state;
    this.listeners.forEach((l) => l());
  }
}
