import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';

import { CreateParticipantDto } from './dto/create-participant.dto';
import { Participant } from './entities/participant.entity';
import { ParticipantsAmount } from './participants.module';
import { setParticipantOptions } from '../common/utils/query';
import { FindAllQueryParams } from '../common/types';

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectRepository(Participant)
    private repository: Repository<Participant>,
  ) {}

  async create(createParticipantDto: CreateParticipantDto): Promise<Participant> {
    const entity = new Participant();
    entity.email = createParticipantDto.email;

    return await this.repository.save(entity);
  }

  async findAll(query: FindAllQueryParams = {}): Promise<ParticipantsAmount> {
    const { projectId, ...restParams } = query;
    let where: FindOptionsWhere<Participant> = {};
    const options: FindManyOptions = { where };

    if (projectId) {
      where = {
        positions: {
          project: {
            id: projectId,
          },
        },
      };
      options.where = setParticipantOptions(where, restParams);
      options.relations = ['positions', 'positions.project'];
    }

    const [participants, count] = await this.repository.findAndCount(options);

    return { participants, count };
  }

  async findOne(id: string): Promise<Participant> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['positions', 'positions.project', 'positions.technologies'],
    });

    if (!entity) {
      throw new NotFoundException();
    }

    return entity;
  }
}
