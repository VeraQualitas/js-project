import { FastifyInstance } from "fastify";

import { $ref } from "../schemas/firefighters.schema";
import { getFirefighters, getFirefighter, addFirefighter, updateFirefighter, deleteFirefighter } from '../controllers/firefighters.controller';
import { e400Properties, e500Properties } from "./_error_opts";

const path = '/firefighters';

async function firefighterRoutes(server: FastifyInstance) {

    server.get(
        'stations/:stationId' + path,
        {
            preHandler: [server.authorize],
            schema: {
                params: $ref(''),
                response: {
                    201: $ref(''),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        getFirefighters
    );

    server.get(
        path + '/:firefighterId',
        {
            preHandler: [server.authorize],
            schema: {
                params: $ref(''),
                response: {
                    201: $ref(''),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        getFirefighter
    );

    server.post(
        path,
        {
            preHandler: [server.authorize],
            schema: {
                body: $ref(''),
                response: {
                    201: $ref(''),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        addFirefighter
    );

    server.put(
        path + '/:firefighterId',
        {
            preHandler: [server.authorize],
            schema: {
                params: $ref(''),
                body: $ref(''),
                response: {
                    201: $ref(''),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        updateFirefighter
    );

    server.delete(
        path + '/:firefighterId',
        {
            preHandler: [server.authorize],
            schema: {
                params: $ref(''),
                body: $ref(''),
                response: {
                    201: $ref(''),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        deleteFirefighter
    );
};

export default firefighterRoutes;