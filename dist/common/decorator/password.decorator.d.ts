import { ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
export declare class PasswordValidator implements ValidatorConstraintInterface {
    validate(value: string): boolean;
    defaultMessage(): string;
}
export declare function PasswordValidator2(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
