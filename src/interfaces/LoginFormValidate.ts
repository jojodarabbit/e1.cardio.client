import { LiteralUnion, RegisterOptions } from 'react-hook-form';

export interface LoginFormValidateMessage {
    message?: string;
    type: LiteralUnion<keyof RegisterOptions, string>;
}