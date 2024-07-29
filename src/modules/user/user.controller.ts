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
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @InjectModel(User.name) private UserSchema: Model<User>,
  ) {}

  // @desc    Get list of users
  // @route   GET /api/v1/users
  // @access  Private/Admin
  @Get()
  async getUsers() {
    return this.userService.findAll();
  }

  // @desc    Get specific user by id
  // @route   GET /api/v1/users/:id
  // @access  Private/Admin
  @Get('/:id')
  async getUser(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  // @desc    Create user
  // @route   POST  /api/v1/users
  // @access  Private/Admin
  @Post()
  @HttpCode(201)
  async createUser(@Body() body) {
    return this.userService.createOne(body);
  }

  // @desc    Update specific user
  // @route   PUT /api/v1/users/:id
  // @access  Private/Admin
  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body) {
    return this.userService.updateOne(id, body);
  }

  // @desc    Delete specific user
  // @route   DELETE /api/v1/users/:id
  // @access  Private/Admin
  @Delete('/:id')
  @HttpCode(204)
  async deleteProduct(@Param('id') id: string) {
    return this.userService.deleteOne(id);
  }

  // @desc    Get Logged user data
  // @route   GET /api/v1/users/getMe
  // @access  Private/Protect
  async getLoggedUserData(@Next() next, @Param() params, @Body() body) {
    params.id = body.user._id;
    next();
  }

  // @desc    Update logged user password
  // @route   PUT /api/v1/users/updateMyPassword
  // @access  Private/Protect
  async updateLoggedUserPassword(@Body() body) {
    // 1) Update user password based user payload (req.user._id)
    const user = await this.UserSchema.findByIdAndUpdate(
      body.user._id,
      {
        // password: await bcrypt.hash(body.password, 12),
        passwordChangedAt: Date.now(),
      },
      {
        new: true,
      },
    );
    // 2) Generate token
    // const token = createToken(user._id);
    // return { data: user, token }
  }

  // @desc    Update logged user data (without password, role)
  // @route   PUT /api/v1/users/updateMe
  // @access  Private/Protect
  async updateLoggedUserData(@Body() body) {
    const updatedUser = await this.UserSchema.findByIdAndUpdate(
      body.user._id,
      {
        name: body.name,
        email: body.email,
        phone: body.phone,
      },
      { new: true },
    );

    return { data: updatedUser };
  }

  // @desc    Deactivate logged user
  // @route   DELETE /api/v1/users/deleteMe
  // @access  Private/Protect
  async deleteLoggedUserData(@Body() body) {
    await this.UserSchema.findByIdAndUpdate(body.user._id, { active: false });

    return { status: 'Success' };
  }
}
