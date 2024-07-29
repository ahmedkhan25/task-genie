import { Skill } from './skills.interface';
export declare class SkillService {
    private skillsFilePath;
    constructor();
    getAllSkills(): Promise<Skill[]>;
    getSkill(name: string): Promise<Skill | undefined>;
    addSkill(skill: Skill): Promise<void>;
    executeSkill(name: string): Promise<void>;
    private readSkillsFromFile;
    private writeSkillsToFile;
    private writeSkillFile;
}
