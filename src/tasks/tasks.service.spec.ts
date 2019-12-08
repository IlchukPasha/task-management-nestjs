import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';

const mockUser = { username: 'Test user' };

const mockTaskRepository = () => ({
  getTasks: jest.fn()
});

describe('TasksService', () => {
  let tasksService;
  let tasksRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository }
      ]
    }).compile();

    tasksService = await module.get<TasksService>(TasksService);
    tasksRepository = await module.get<TaskRepository>(TaskRepository);
  });

  describe('getTasks', () => {
    it('gets all tasks from the repository', async () => {
      tasksRepository.getTasks.mockResolvedValue('some value');

      expect(tasksRepository.getTasks).not.toHaveBeenCalled();

      const filters: GetTasksFilterDto = { status: TaskStatus.IN_PROGRESS, search: 'Search query' };
      const result = await tasksService.getTasks(filters, mockUser);

      expect(tasksRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('some value');
    });
  });
});