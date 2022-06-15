import prisma from '../utils/prisma';

import { RegisterAccountInput, UpdateAccountInput } from '../schemas/accounts.schema';
import { hashPassword } from '../utils/hash';

export async function registerAccountService(input: RegisterAccountInput) {
    try {
        const { password, confirmPassword, ...rest } = input;

        if (password !== confirmPassword) {
            return 'passwords not the same';
        }

        const { hash, salt } = hashPassword(password);


        return await prisma.accounts.create({
            data: { ...rest, salt, hash }
        });
    } catch (e) {
        console.error(e);
        return undefined;
    }
};

export async function findAccountByEmailService(email: string) {
    try {
        return await prisma.accounts.findUnique({
            where: { email }
        });
    } catch (e) {
        console.error(e);
        return undefined;
    }
};

export async function updateAccountService(accountId: number, input: UpdateAccountInput) {
    try {
        const { currentPassword, password, confirmPassword, ...rest } = input;

        if (password !== confirmPassword) {
            return 'passwords not the same';
        }

        if (password) {
            const { hash, salt } = hashPassword(password);
            return await prisma.accounts.update({
                where: { accountId },
                data: { ...rest, salt, hash }
            });
        }
        else {
            return await prisma.accounts.update({
                where: { accountId },
                data: { ...rest }
            });
        }


    } catch (e) {
        console.error(e);
        return undefined;
    }
};

export async function myAccountService(accountId: number) {
    try {
        return await prisma.accounts.findUnique({
            where: { accountId }
        });
    } catch (e) {
        console.error(e);
        return undefined;
    }
};
