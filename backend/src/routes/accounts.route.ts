import { FastifyInstance } from "fastify";

import { $ref } from "../schemas/accounts.schema";
import { registerAccount, loginAccount, authenticateAccount, updateAccount, myAccount } from '../controllers/accounts.controller';
import { e400Properties, e500Properties } from "./_error_opts";

const path = '/accounts';

async function accountRoutes(server: FastifyInstance) {

    server.post(
        path + '/register',
        {
            schema: {
                body: $ref('registerAccountSchema'),
                response: {
                    201: $ref('accountResponseSchema'),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        registerAccount
    );

    server.post(
        path + '/login',
        {
            schema: {
                body: $ref('loginAccountSchema'),
                response: {
                    200: $ref('loginResponseSchema'),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        loginAccount
    );

    server.get(
        path + '/authenticate',
        {
            preHandler: [server.authorize],
            schema: {
                // body: $ref('authenticateAccountSchema'),
                response: {
                    200: $ref('authenticateResponseSchema'),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        authenticateAccount
    );

    server.put(
        path + '/update',
        {
            preHandler: [server.authorize],
            schema: {
                body: $ref('updateAccountSchema'),
                response: {
                    201: $ref('authenticateResponseSchema'),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        updateAccount
    );

    server.get(
        path + '/me',
        {
            preHandler: [server.authorize],
            schema: {
                // body: $ref('authenticateAccountSchema'),
                response: {
                    200: $ref('authenticateResponseSchema'),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        myAccount
    );

};

export default accountRoutes;