import {Controller, Get, Logger, Param, ParseIntPipe} from '@nestjs/common';

@Controller('user-profile')
export class UserProfileController {
    private logger = new Logger('UserController');

    // constructor() {}

    @Get('/:id')
    findUserById(@Param('id', ParseIntPipe) id: number): string {
        this.logger.verbose(`Get user profile by id ${id}`);
        console.log('findUserById called', id);
        return 'this action returns a user by id'
    }
}
