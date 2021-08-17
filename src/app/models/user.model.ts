export class User {

  static fromFirebase({ uid, name, email }: User) {
    return new User(uid, name, email);
  }

  constructor(
    public uid: string | undefined,
    public name: string,
    public email: string
  ) {
  }
}
