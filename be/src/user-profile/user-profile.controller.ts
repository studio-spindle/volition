import {
    BadRequestException,
    Controller,
    Get,
    Logger,
    Param,
    ParseIntPipe,
    Post,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import {UserProfileService} from './user-profile.service';
import {UserProfileEntity} from './user-profile.entity';
import {FileInterceptor} from '@nestjs/platform-express';
import {AuthGuard} from '@nestjs/passport';
import {allowedFileExtensions, FileValidationErrors, imageFileInterceptorMulterOptions} from './imageFileValidators';

@Controller('user-profile')
@UseGuards(AuthGuard())
export class UserProfileController {
    private logger = new Logger('UserProfileController');

    constructor(private userProfileService: UserProfileService) {
    }

    @Get('/:id')
    findUserProfileById(@Param('id', ParseIntPipe) id: number): Promise<UserProfileEntity> {
        this.logger.verbose(`Get user profile by id ${id}`);
        return this.userProfileService.getUserProfileById(id);
    }

    // TODO: Use S3/AWS bucket CDN to store photos using IAM user
    // source: https://wanago.io/2020/08/10/api-nestjs-private-files-amazon-s3/
    @Post('/:id/upload-photo')
    @UseInterceptors(
        FileInterceptor('image', {dest: './uploads', ...imageFileInterceptorMulterOptions})
    )
    uploadSinglePhoto(
        @Param('id', ParseIntPipe) id: number,
        @UploadedFile() image,
        @Req() req
    ): Promise<UserProfileEntity> {
        if (req?.fileValidationError === FileValidationErrors.UNSUPPORTED_FILE_TYPE) {
            this.logger.warn(`Bad request, user with id "${req.user.id}" attempted to upload file with wrong extension.`);
            throw new BadRequestException('Only images are allowed', `Bad request. Accepted file extensions are: ${allowedFileExtensions.toString()}`);
        }
        this.logger.verbose(`Adding image ${image}`);
        const imageUrlLocation = `${image.destination.substring(1)}/${image.filename}`;
        return this.userProfileService.saveUserProfilePhotoLocation(id, imageUrlLocation);
    }
}
