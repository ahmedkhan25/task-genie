import { SkillService } from './skills.service';
import { Skill } from './skills.interface';
export declare class SkillController {
    private readonly skillService;
    constructor(skillService: SkillService);
    getAllSkills(): Promise<Skill[]>;
    getSkill(name: string): Promise<Skill | undefined>;
    addSkill(Skill: Skill): Promise<void>;
    executeSkill(name: string): Promise<void>;
}
