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
exports.SkillController = exports.SkillDto = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const swagger_2 = require("@nestjs/swagger");
const skills_service_1 = require("./skills.service");
const agent_service_1 = require("./agent.service");
class SkillDto {
}
exports.SkillDto = SkillDto;
__decorate([
    (0, swagger_2.ApiProperty)({ example: 'addNumbers', description: 'The name of the skill' }),
    __metadata("design:type", String)
], SkillDto.prototype, "name", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({ example: 'Adds two numbers', description: 'The description of the skill' }),
    __metadata("design:type", String)
], SkillDto.prototype, "description", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({ example: 'function addNumbers(a: number, b: number): number { return a + b; }', description: 'The code of the skill' }),
    __metadata("design:type", String)
], SkillDto.prototype, "code", void 0);
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
    addSkill(skill) {
        return this.skillService.addSkill(skill);
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
    (0, swagger_1.ApiOperation)({ summary: 'Get all skills' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all skills.', type: [SkillDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SkillController.prototype, "getAllSkills", null);
__decorate([
    (0, common_1.Get)(':name'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a skill by name' }),
    (0, swagger_1.ApiParam)({ name: 'name', type: 'string' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the skill.', type: SkillDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Skill not found.' }),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SkillController.prototype, "getSkill", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Add a new skill' }),
    (0, swagger_1.ApiBody)({ type: SkillDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The skill has been successfully created.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SkillController.prototype, "addSkill", null);
__decorate([
    (0, common_1.Post)('generate'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate a new skill' }),
    (0, swagger_1.ApiBody)({ schema: { properties: { taskDescription: { type: 'string' } } } }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The skill has been successfully generated.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Skill generation failed.' }),
    __param(0, (0, common_1.Body)('taskDescription')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SkillController.prototype, "generateSkill", null);
__decorate([
    (0, common_1.Post)(':name/execute'),
    (0, swagger_1.ApiOperation)({ summary: 'Execute a skill' }),
    (0, swagger_1.ApiParam)({ name: 'name', type: 'string' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The skill has been successfully executed.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Skill not found.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Skill execution failed.' }),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SkillController.prototype, "executeSkill", null);
exports.SkillController = SkillController = __decorate([
    (0, swagger_1.ApiTags)('skills'),
    (0, common_1.Controller)('skills'),
    __metadata("design:paramtypes", [skills_service_1.SkillService,
        agent_service_1.AgentService])
], SkillController);
//# sourceMappingURL=skills.controller.js.map