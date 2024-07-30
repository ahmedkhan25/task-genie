"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv");
const swagger_1 = require("@nestjs/swagger");
const express = require("express");
const path_1 = require("path");
dotenv.config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use('/public', express.static((0, path_1.join)(__dirname, '..', 'public')));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('taskGenie AI POC - Skills API')
        .setDescription('  API description')
        .setVersion('0.1')
        .addTag('skills')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map