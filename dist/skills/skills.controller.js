"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillController = void 0;
const common_1 = require("@nestjs/common");
const skills_service_1 = require("./skills.service");
const agent_service_1 = require("./agent.service");
let SkillController = class SkillController {
    constructor(skillService, agentService) {
        this.skillService = skillService;
        this.agentService = agentService;
    }
    getAllSkills() {
        return this.skillService.getAllSkills();
    }
    getSkill(name) {
        return this.skillService.getSkill(name);
    }
    addSkill(Skill) {
        return this.skillService.addSkill(Skill);
    }
    async generateSkill(taskDescription) {
        try {
            await this.agentService.generateSkill(taskDescription);
        }
        catch (error) {
            throw new common_1.HttpException('Skill generation failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async executeSkill(name) {
        try {
            await this.skillService.executeSkill(name);
        }
        catch (error) {
            throw new common_1.HttpException('Skill execution failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.SkillController = SkillController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SkillController.prototype, "getAllSkills", null);
__decorate([
    (0, common_1.Get)(':name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SkillController.prototype, "getSkill", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SkillController.prototype, "addSkill", null);
__decorate([
    (0, common_1.Post)('generate'),
    __param(0, (0, common_1.Body)('taskDescription')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SkillController.prototype, "generateSkill", null);
__decorate([
    (0, common_1.Post)(':name/execute'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SkillController.prototype, "executeSkill", null);
exports.SkillController = SkillController = __decorate([
    (0, common_1.Controller)('skills'),
    __metadata("design:paramtypes", [skills_service_1.SkillService,
        agent_service_1.AgentService])
], SkillController);
//# sourceMappingURL=skills.controller.js.map