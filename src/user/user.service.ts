import { Injectable } from '@nestjs/common';

export interface User {
    id: number;
    name: string;
    age: number;
}

@Injectable()
export class UserService {
    private readonly users: User[] = [];
    private lastUserId: number = 0;

    async createUser(user: User): Promise<User> {
        try {
            const newUser: User = {
                id: ++this.lastUserId,
                name: user.name,
                age: user.age,
            };
            this.users.push(newUser);
            return newUser;
        }
        catch (error) {
            console.error(error);
            throw error;
        }

    }

    async findAllUser(): Promise<User[]> {
        try {
            return await this.users;
        }
        catch (error) {
            console.error(error);
            throw error;
        }

    }

    async findUserById(id: number): Promise<User> {
        try {
            return await this.users.find(user => user.id === id);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateUserById(id: number, user: User): Promise<User | undefined> {
        try {
            const index = this.users.findIndex(existingUser => existingUser.id === id);
            if (index === -1) {
                return undefined;
            }
            this.users[index] = { ...user, id };
            return this.users[index];
        }
        catch (error) {
            console.error(error);
            throw error;
        }

    }

    async deleteUserById(id: number): Promise<User | undefined> {
        try {
            const index = this.users.findIndex(user => user.id === id);
            if (index === -1) {
                return undefined;
            }
            const deletedUser = this.users.splice(index, 1)[0];
            return deletedUser;
        }
        catch (error) {
            console.error(error);
            throw error;
        }

    }
}
