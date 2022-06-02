import prisma from '../utils/prisma';

import { RegisterAccountInput } from '../schemas/accounts.schema';
import { hashPassword } from '../utils/hash';

export async function registerAccountService(input: RegisterAccountInput) {
    try {
        const { password, confirmPassword, ...rest } = input;

        if (password !== confirmPassword) {
            return 'passwords not the same';
        }

        const { hash, salt } = hashPassword(password);


        return await prisma.accounts.create({
            data: { ...rest, salt, hash: hash }
        });
    } catch (e) {
        console.error(e);
        return undefined;
    }
};

export async function findAccountByEmail(email: string) {
    try {
        return await prisma.accounts.findUnique({
            where: { email }
        });
    } catch (e) {
        console.error(e);
        return undefined;
    }
};