import { SkillService } from './skills.service';
import { AgentService } from './agent.service';
import { Skill } from './skills.interface';
export declare class SkillDto implements Skill {
    name: string;
    description: string;
    code: string;
}
export declare class SkillController {
    private readonly skillService;
    private readonly agentService;
    constructor(skillService: SkillService, agentService: AgentService);
    getAllSkills(): Promise<Skill[]>;
    getSkill(name: string): Promise<Skill | undefined>;
    addSkill(skill: Skill): Promise<void>;
    generateSkill(taskDescription: string): Promise<void>;
    executeSkill(name: string): Promise<void>;
}
