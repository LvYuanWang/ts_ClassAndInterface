class User {
  constructor(public id: number, public name: string) { }
}

interface Repository<U> {
  findById(id: number): U | undefined;
  save(item: U): void;
  delete(item: U): boolean;
}

class UserRepository implements Repository<User> {
  private users = new Map<number, User>;

  findById(id: number): User | undefined {
    return this.users.get(id);
  }

  save(item: User): void {
    this.users.set(item.id, item);
  }

  delete(item: User): boolean {
    return this.users.delete(item.id);
  }
}

const userRepository = new UserRepository();
userRepository.save(new User(1, 'John Doe'));
userRepository.save(new User(2, 'Jane Doe'));
userRepository.save(new User(3, 'Alice Doe'));
userRepository.delete({ id: 2, name: 'Jane Doe' });
console.log(userRepository.findById(3));  // User { id: 3, name: 'Alice Doe' }
console.log(userRepository.findById(2));  // undefined