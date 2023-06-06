import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';

import { ParticipantsService } from './participants.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { Participant } from './entities/participant.entity';
import { ParticipantsAmount } from './participants.module';
import { Roles } from '../common/decorators/Roles';
import { Role } from '../common/constants';
import { FindAllQueryParams } from '../common/types';

@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post()
  @Roles(Role.SuperAdmin)
  create(@Body() createParticipantDto: CreateParticipantDto): Promise<Participant> {
    return this.participantsService.create(createParticipantDto);
  }

  @Get()
  @Roles(Role.SuperAdmin, Role.Admin)
  findAll(@Query() query: FindAllQueryParams = {}): Promise<ParticipantsAmount> {
    return this.participantsService.findAll(query);
  }

  @Get(':id')
  @Roles(Role.SuperAdmin, Role.Admin)
  findOne(@Param('id') id: string): Promise<Participant> {
    return this.participantsService.findOne(id);
  }
}
