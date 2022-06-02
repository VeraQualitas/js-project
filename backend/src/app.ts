import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import fjwt, { JWT } from 'fastify-jwt';
import dotenv from 'dotenv';
import swagger from 'fastify-swagger';
import { withRefResolver } from 'fastify-zod';
import { version } from '../package.json';

import accountRoutes from './routes/accounts.route';

import { accountSchemas } from './schemas/accounts.schema';

dotenv.config({ path: '../.env' });

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOS || '0.0.0.0';

declare module "fastify" {
    interface FastifyRequest {
        jwt: JWT;
    }
    export interface FastifyInstance {
        authenticate: any;
        authorize: any;
    }
}

declare module "fastify-jwt" {
    interface FastifyJWT {
        account: {
            account_id: string;
        };
    }
}

export const server = Fastify({
    logger: {
        prettyPrint: true,
        serializers: {
            res(reply) {
                // The default
                return {
                    statusCode: reply.statusCode
                }
            },
            req(request) {
                return {
                    method: request.method,
                    url: request.url,
                    path: request.routerPath,
                    parameters: request.params,
                    // Including the headers in the log could be in violation
                    // of privacy laws, e.g. GDPR. You should use the "redact" option to
                    // remove sensitive fields. It could also leak authentication data in
                    // the logs.
                    headers: request.headers
                };
            }
        }
    }
});


async function main() {

    for (const schema of [...accountSchemas]) {
        server.addSchema(schema);
    }

    server.register(fjwt, { secret: 'fdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsdfsfdfdsfdsf' });

    server.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            await request.jwtVerify();
        } catch (e) {
            console.error(e);
        }
    });

    server.decorate('authorize', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            await request.jwtVerify();
        } catch (e) {
            return reply.send(e);
        }
    });

    server.register(
        swagger,
        withRefResolver({
            routePrefix: '/docs',
            exposeRoute: true,
            staticCSP: true,
            openapi: {
                info: {
                    title: 'REST API for mosp',
                    description: '',
                    version
                }
            }
        })
    );

    server.get('/healthcheck', async function (request, response) {
        return { status: 'ok' };
    });

    server.addHook('preHandler', (req, reply, next) => {
        req.jwt = server.jwt;
        return next();
    });

    server.register(accountRoutes);

    try {
        const listener = await server.listen(PORT, HOST);
    } catch (e) {
        console.error(e);
        process.exit(-1);
    }
}

main();