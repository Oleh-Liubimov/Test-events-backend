import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventDto } from './dto/createEventDto.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async getEvents(page: number, limit: number) {
    try {
      const skip = (page - 1) * limit;
      const events = await this.prisma.event.findMany({
        skip,
        take: limit,
        include: { registrants: true },
      });

      events.forEach((event) => {
        if (typeof event.eventDate === 'string') {
          event.eventDate = new Date(event.eventDate);
        }
      });

      const totalEvents = await this.prisma.event.count();

      return {
        events,
        totalEvents,
      };
    } catch (error) {
      console.error('Error retrieving events from database:', error);
      throw new Error('Failed to retrieve events');
    }
  }
  async createEvent(createEventDto: CreateEventDto) {
    return this.prisma.event.create({
      data: createEventDto,
    });
  }

  async registerForEvent(
    eventId: string,
    registrantData: Prisma.UserCreateInput,
  ) {
    return this.prisma.user.create({
      data: {
        ...registrantData,
        event: {
          connect: {
            id: eventId,
          },
        },
      },
    });
  }

  async getRegistrants(eventId: string) {
    return this.prisma.user.findMany({
      where: {
        eventId,
      },
    });
  }
}
