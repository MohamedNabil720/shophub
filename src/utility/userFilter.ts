import type { User } from "@/types/User";

export class UserFilter {
  static filterBySearch(users: User[], searchText: string): User[] {
    const search = searchText.toLowerCase();

    if (!search) return users;

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.role.toLowerCase().includes(search)
    );
  }

  static paginateUsers(
    users: User[],
    startIndex: number,
    pageSize: number
  ): User[] {
    return users.slice(startIndex, startIndex + pageSize);
  }
}
