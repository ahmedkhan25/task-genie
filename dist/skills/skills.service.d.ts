import { Skill } from './skills.interface';
export declare class SkillService {
    private skillsFilePath;
    constructor();
    getAllSkills(): Promise<Skill[]>;
    getSkill(name: string): Promise<Skill | undefined>;
    addSkill(skill: Skill): Promise<void>;
    executeSkill(name: string, params: any[]): Promise<any>;
    private validateParameters;
    private readSkillsFromFile;
    private writeSkillsToFile;
    private writeSkillFile;
}
