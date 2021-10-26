import { Injectable } from '@nestjs/common';
import * as faker from 'faker';
import { delay, Observable, of } from 'rxjs';

const departments = [
  'Development',
  'Management',
  'Sales',
  'Design',
  'Devops',
] as const;
export type Department = typeof departments[number];

const level = [
  'Trainee',
  'Junior',
  'Intermediate',
  'Experienced',
  'Senior',
] as const;
export type Level = typeof level[number];

export interface User {
  id: number;
  joinDate: string;
  username: string;
  firstName: string;
  lastName: string;
  department: Department;
  level: Level;
}

const users: User[] = [];

export interface Pagination {
  page: number;
  limit: number;
  total: number;
}

export interface PagedResult<T> {
  pagination: Pagination;
  results: T[];
}

for (let i = 0; i < 1000; i++) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  users.push({
    id: i + 1,
    joinDate: faker.date.past().toISOString(),
    username: faker.internet.userName(firstName, lastName),
    firstName,
    lastName,
    department: faker.random.arrayElement(departments),
    level: faker.random.arrayElement(level),
  });
}

console.log(users);

@Injectable()
export class UsersService {
  getAll(options: {
    page: number;
    limit: number;
    department: string;
    level: string;
  }): Observable<PagedResult<User>> {
    const limit = Math.max(options.limit, 1);
    const page = Math.max(options.page, 0);
    const start = page * limit;

    let filteredUsers = users;

    if (options.department) {
      filteredUsers = filteredUsers.filter(
        (user) => user.department.toLowerCase() === options.department,
      );
    }

    if (options.level) {
      filteredUsers = filteredUsers.filter(
        (user) => user.level.toLowerCase() === options.level,
      );
    }

    const resultingUsers = filteredUsers.slice(start, start + limit);

    return of({
      pagination: {
        page,
        limit,
        total: filteredUsers.length,
      },
      results: resultingUsers,
    });
  }
}
