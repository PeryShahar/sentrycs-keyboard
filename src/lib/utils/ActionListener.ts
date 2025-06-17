export class ActionListener {
  private listeners: Map<string, Array<(data: any) => void>> = new Map();

  registerListener(action: string, listener: (data: any) => void): void {
    if (!this.listeners.has(action)) {
      this.listeners.set(action, []);
    }
    this.listeners.get(action)!.push(listener);
  }

  removeListener(action: string): void {
    this.listeners.delete(action);
  }

  emit(action: string, data: any): void {
    const actionListeners = this.listeners.get(action);
    if (!actionListeners) {
      throw new Error(`Can't emit an event. Event "${action}" doesn't exist.`);
    }
    for (const listener of actionListeners) {
      listener(data);
    }
  }
}
