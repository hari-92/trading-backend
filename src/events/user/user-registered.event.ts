export class UserRegisteredEvent {
  constructor(public readonly userID: number) {}
}

export const UserRegisteredEventName: string = 'user.registered';
