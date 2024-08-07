import { Test, TestingModule } from '@nestjs/testing';
import { SkillService } from './skills.service';

describe('Skills', () => {
  let service: SkillService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkillService],
    }).compile();

    service = module.get<SkillService>(SkillService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
