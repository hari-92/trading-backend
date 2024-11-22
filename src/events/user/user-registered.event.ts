export class UserRegisteredEvent {
  constructor(public readonly userID: number) {}
}

export const USER_REGISTERED_EVENT: string = 'user.registered';
