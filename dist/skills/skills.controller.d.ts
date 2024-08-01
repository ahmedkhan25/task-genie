import { SkillService } from './skills.service';
import { AgentService } from './agent.service';
import { Skill, Parameter } from './skills.interface';
export declare class ParameterDto implements Parameter {
    name: string;
    type: string;
    description: string;
}
export declare class SkillDto implements Skill {
    name: string;
    description: string;
    code: string;
    parameters: Parameter[];
}
export declare class ExecuteSkillDto {
    params: any[];
}
export declare class SkillController {
    private readonly skillService;
    private readonly agentService;
    constructor(skillService: SkillService, agentService: AgentService);
    getAllSkills(): Promise<Skill[]>;
    getSkill(name: string): Promise<Skill>;
    addSkill(skill: Skill): Promise<void>;
    generateSkill(taskDescription: string): Promise<void>;
    executeSkill(name: string, executeSkillDto: ExecuteSkillDto): Promise<{
        result: any;
    }>;
}
