"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Faker = require("faker");
const roles_entity_1 = require("./roles.entity");
const random = Faker.random.arrayElement;
function generateRole(users, domain = []) {
    const role = new roles_entity_1.Role();
    role.userId = random(users).id;
    role.name = random(['admin', 'user', 'guest', 'app_admin', 'app_owner']);
    role.domain = random(domain);
    return role;
}
exports.generateRole = generateRole;
function generateUserRole(user) {
    const role = new roles_entity_1.Role();
    role.userId = user.id;
    role.name = random(['admin', 'user', 'guest', 'app_admin', 'app_owner']);
    role.domain = user.id;
    return role;
}
exports.generateUserRole = generateUserRole;
//# sourceMappingURL=role.factory.js.map