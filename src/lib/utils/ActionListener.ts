export class ActionListener {
  private listeners: Map<string, Array<(data: unknown) => void>> = new Map();

  registerListener(action: string, listener: (data: any) => void): void {
    const actionListeners = this.listeners.get(action);
    if (actionListeners) {
      actionListeners.push(listener);
    } else {
      this.listeners.set(action, [listener]);
    }
  }

  removeListener(action: string): void {
    this.listeners.delete(action);
  }

  emit(action: string, data: unknown): void {
    const actionListeners = this.listeners.get(action);
    if (!actionListeners) {
      throw new Error(`Can't emit an event. Event "${action}" doesn't exist.`);
    }
    for (const listener of actionListeners) {
      listener(data);
    }
  }
}
