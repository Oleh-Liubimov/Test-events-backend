import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { RegisterUserDto } from './dto/createUserDto.dto';
import { CreateEventDto } from './dto/createEventDto.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async getEvents(@Query('page') page = 1, @Query('limit') limit = 10) {
    try {
      const result = await this.eventsService.getEvents(+page, +limit);
      return {
        data: result.events,
        total: result.totalEvents,
        page,
        limit,
      };
    } catch (error) {
      console.error('Error fetching events:', error);
      throw new InternalServerErrorException('Failed to fetch events');
    }
  }
  @Post()
  async createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.createEvent(createEventDto);
  }

  @Post(':id/register')
  async register(
    @Param('id') eventId: string,
    @Body() registrantData: RegisterUserDto,
  ) {
    return this.eventsService.registerForEvent(eventId, registrantData);
  }

  @Get(':id/registrants')
  async getRegistrants(@Param('id') eventId: string) {
    return this.eventsService.getRegistrants(eventId);
  }
}
