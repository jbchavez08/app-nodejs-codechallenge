export class AntifraudEvent {
    constructor(
      public readonly status: string,
      public readonly id: string,
      public readonly value: number
    ) {}
  }