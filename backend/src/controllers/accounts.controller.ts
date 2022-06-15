import { FastifyRequest, FastifyReply } from "fastify";

import { registerAccountService, findAccountByEmailService, updateAccountService, myAccountService } from "../services/accounts.service";
import { RegisterAccountInput, LoginAccountInput, UpdateAccountInput } from "../schemas/accounts.schema";
import { verifyPassword } from "../utils/hash";
import { server } from "../app";

export const registerAccount = async (request: FastifyRequest<{ Body: RegisterAccountInput }>, reply: FastifyReply) => {

    const body = request.body;

    try {
        const account = await registerAccountService(body);

        if (account === 'passwords not the same') {
            reply.code(400).send({ success: false, message: 'Passwords are not the same.'});
        }

        if (account === undefined) {
            reply.code(500).send({});
        }

        if (account === null) {
            reply.code(400).send({});
        }

        const response = {
            success: true,
            message: 'Registered successfully. ',
            data: {}
        };

        reply.code(201).send(response);

    } catch (e) {
        console.error(e);
        reply.code(500).send({});
    }
};

export const loginAccount = async (request: FastifyRequest<{ Body: LoginAccountInput }>, reply: FastifyReply) => {

    const body = request.body;

    try {
        const account = await findAccountByEmailService(body.email);

        if (account === undefined) {
            reply.code(500).send({});
        }

        else if (account === null) {
            reply.code(400).send({ message: 'Invalid name or password. ' });
        }
        else {
            const correctPassword = verifyPassword({
                receivedPassword: body.password,
                salt: account.salt,
                hash: account.hash
            });

            if (correctPassword) {
                const { hash, salt, ...rest} = account;

                reply.code(200).send({ success: true, message: 'Logged in successfully. ', data: { accessToken: server.jwt.sign(rest) }});
            }

            reply.code(400).send({ message: 'Invalid name or password. ' });
        }

    } catch (e) {
        console.error(e);
        reply.code(500).send({});
    }
};

export const authenticateAccount = async (request: FastifyRequest, reply: FastifyReply) => {
    console.error(request.user);
    reply.code(200).send({success: true, message: 'Authenticated successfully. '})
};

export const updateAccount = async (request: FastifyRequest<{ Body: UpdateAccountInput }>, reply: FastifyReply) => {

    const body = request.body;

    try {
        const account = await updateAccountService(request.user.accountId, body);

        if (account === 'passwords not the same') {
            reply.code(400).send({ success: false, message: 'Passwords are not the same.'});
        }

        if (account === undefined) {
            reply.code(500).send({});
        }

        if (account === null) {
            reply.code(400).send({});
        }

        const response = {
            success: true,
            message: 'Updated successfully. ',
            data: {account}
        };

        reply.code(201).send(response);

    } catch (e) {
        console.error(e);
        reply.code(500).send({});
    }
};

export const myAccount = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const account = await myAccountService(request.user.accountId);

        if (account === undefined) {
            reply.code(500).send({});
        }

        if (account === null) {
            reply.code(400).send({});
        }

        const response = {
            success: true,
            message: 'Authorized successfully. ',
            data: {account}
        };

        reply.code(201).send(response);

    } catch (e) {
        console.error(e);
        reply.code(500).send({});
    }
};