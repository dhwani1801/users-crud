import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { UserService, User } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    async findAll(): Promise<object> {
        try {
            return await this.userService.findAllUser();
        }
        catch (error) {
            console.error(error);
            throw error;
        }

    }

    @Post()
    async create(@Body() user) {
        try {
            return await this.userService.createUser(user);
        }
        catch (error) {
            console.error(error);
            throw error;
        }

    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<User> {
        try {
            const user = await this.userService.findUserById(+id);
            return user;
        }
        catch (error) {
            console.error(error);
            throw error;
        }

    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() user: User): Promise<User> {
        const updatedUser = await this.userService.updateUserById(id, user);
        if (!updatedUser) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return updatedUser;
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<User> {
        try {
            const deletedUser = await this.userService.deleteUserById(+id);
            if (!deletedUser) {
                throw new NotFoundException(`User with ID ${id} not found`);
            }
            return deletedUser;
        }
        catch (error) {
            console.log('error :', error);
            throw error;
        }

    }
}
