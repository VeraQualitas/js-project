import { FastifyInstance } from "fastify";

import { $ref } from "../schemas/accounts.schema";
import { registerAccount, loginAccount, authenticateAccount } from '../controllers/accounts.controller';
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

    server.post(
        path + '/authenticate',
        {
            preHandler: [server.authorize],
            schema: {
                body: $ref('authenticateAccountSchema'),
                response: {
                    200: $ref('authenticateResponseSchema'),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        authenticateAccount
    );
};

export default accountRoutes;