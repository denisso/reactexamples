type Listener = Function;

export class Store<T extends object> {
  listeners = new Set<Listener>();
  constructor(public state: T) {}
  getSnapshot() {
    return this.state;
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  set(state: T) {
    if (state === this.state) return;
    state = this.state;
    this.listeners.forEach((l) => l());
  }
}
