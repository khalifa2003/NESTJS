import {
  Controller,
  Post,
  Delete,
  Get,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Address } from './address.schema';

@Controller('addresses')
@UseGuards(JwtAuthGuard)
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post('add')
  async addAddress(@Req() req, @Body() address: Address) {
    const userId = req.user._id;
    const updatedUser = await this.addressService.addAddress(userId, address);
    return {
      status: 'success',
      message: 'Address Added Successfully',
      user: updatedUser.addresses,
    };
  }

  @Delete('remove/:addressId')
  async removeAddress(@Req() req, @Param('addressId') addressId: string) {
    const userId = req.user._id;
    const updatedUser = await this.addressService.removeAddress(
      userId,
      addressId,
    );
    return {
      status: 'success',
      message: 'Address removed successfully',
      user: updatedUser.addresses,
    };
  }

  @Get()
  async getLoggedUserAddresses(@Req() req) {
    const userId = req.user._id;
    const addresses = await this.addressService.getLoggedUserAddresses(userId);
    return {
      status: 'success',
      message: 'Addresses Fetched Successfully.',
      data: addresses,
    };
  }
}
