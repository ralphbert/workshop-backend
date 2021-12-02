import { Injectable } from '@nestjs/common';
import * as faker from 'faker';
import { Observable, of } from 'rxjs';

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
  password: string;
  firstName: string;
  lastName: string;
  department: Department;
  level: Level;
}

const users: User[] = [
  {
    department: 'Development',
    level: 'Senior',
    username: 'admin',
    firstName: 'Administra',
    lastName: 'Admininowa',
    id: 10000,
    joinDate: new Date().toISOString(),
    password: 'admin',
  },
];

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
    password: '12345678',
  });
}

@Injectable()
export class UsersService {
  async findOneByUsername(username: string): Promise<User | undefined> {
    return users.find((current) => current.username === username);
  }

  async findOneById(id: number): Promise<Omit<User, 'password'> | undefined> {
    const user = users.find((current) => current.id == id);

    if (user) {
      const { password, ...rest } = user;
      return rest;
    }

    return undefined;
  }

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
