import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  HttpCode,
  Param,
  Body,
  Next,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { createToken } from 'src/utils/createToken';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    @InjectModel(User.name) private UserSchema: Model<User>,
  ) {}

  // @desc    Get list of users
  // @route   GET /api/v1/users
  // @access  Private/Admin

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  // @desc    Get specific user by id
  // @route   GET /api/v1/users/:id
  // @access  Private/Admin

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  // @desc    Create user
  // @route   POST  /api/v1/users
  // @access  Private/Admin

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  // @desc    Update specific user
  // @route   PUT /api/v1/users/:id
  // @access  Private/Admin

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  // @desc    Delete specific user
  // @route   DELETE /api/v1/users/:id
  // @access  Private/Admin

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }

  // @desc    Get Logged user data
  // @route   GET /api/v1/users/getMe
  // @access  Private/Protect
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  @Get('me')
  async getLoggedUserData(@Req() req): Promise<User> {
    return this.userService.findOne(req.user._id);
  }

  // @desc    Update logged user password
  // @route   PUT /api/v1/users/updateMyPassword
  // @access  Private/Protect
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  @Put('me/password')
  async updateLoggedUserPassword(
    @Req() req,
    @Body('password') newPassword: string,
  ): Promise<{ data: User; token: string }> {
    const user = await this.userService.updatePassword(
      req.user._id,
      newPassword,
    );
    const token = createToken(user._id); // Make sure to implement createToken function
    return { data: user, token };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  @Put(':id/password')
  async changeUserPassword(
    @Param('id') id: string,
    @Body('password') newPassword: string,
  ): Promise<User> {
    return this.userService.updatePassword(id, newPassword);
  }

  // @desc    Update logged user data (without password, role)
  // @route   PUT /api/v1/users/updateMe
  // @access  Private/Protect

  @Put('me')
  async updateLoggedUserData(
    @Param() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateLoggedUser(req.user._id, updateUserDto);
  }

  @Delete('me')
  async deleteLoggedUserData(@Req() req): Promise<void> {
    return this.userService.deactivateUser(req.user._id);
  }
}
