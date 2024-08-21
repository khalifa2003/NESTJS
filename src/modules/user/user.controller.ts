import {
  Controller,
  Get,
  Post,
  Delete,
  HttpCode,
  Param,
  Body,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/common/enums/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('user')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.User, Role.Admin, Role.Manager)
  @Get('me')
  async getLoggedUserData(@Req() req): Promise<User> {
    return this.userService.findOne(req.user._id);
  }

  @Roles(Role.User, Role.Admin, Role.Manager)
  @Put('me/password')
  async updateLoggedUserPassword(
    @Req() req,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.userService.updatePassword(req.user._id, changePasswordDto);
  }

  @Roles(Role.User, Role.Admin, Role.Manager)
  @Put('me')
  async updateLoggedUserData(@Body() updateUserDto: UpdateUserDto, @Req() req) {
    return this.userService.updateLoggedUser(req.user._id, updateUserDto);
  }

  @Roles(Role.User, Role.Admin, Role.Manager)
  @Delete('me')
  async deleteLoggedUserData(@Req() req): Promise<void> {
    return this.userService.deactivateUser(req.user._id);
  }

  @Roles(Role.Admin, Role.Manager)
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  // @desc    Get specific user by id
  // @route   GET /api/v1/users/:id
  // @access  Private/Admin

  @Roles(Role.Admin, Role.Manager)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Roles(Role.Admin, Role.Manager)
  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Roles(Role.Admin, Role.Manager)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Roles(Role.Admin, Role.Manager)
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
