"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordValidator = void 0;
exports.PasswordValidator2 = PasswordValidator2;
const class_validator_1 = require("class-validator");
let PasswordValidator = class PasswordValidator {
    validate(value) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value);
    }
    defaultMessage() {
        return 'email must be a valid email address';
    }
};
exports.PasswordValidator = PasswordValidator;
exports.PasswordValidator = PasswordValidator = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'PasswordValidator', async: false })
], PasswordValidator);
function PasswordValidator2(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: PasswordValidator,
        });
    };
}
//# sourceMappingURL=password.decorator.js.map