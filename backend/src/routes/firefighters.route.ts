import { FastifyInstance } from "fastify";

import { $ref } from "../schemas/firefighters.schema";
import { getStationFirefighters, getFirefighter, getFirefighterCourses, addFirefighter, updateFirefighter, deleteFirefighter } from '../controllers/firefighters.controller';
import { e400Properties, e500Properties } from "./_error_opts";

const path = '/firefighters';

async function firefighterRoutes(server: FastifyInstance) {

    server.get(
        '/stations/:stationId' + path,
        {
            preHandler: [server.authorize],
            schema: {
                params: $ref('stationParamsSchema'),
                response: {
                    200: $ref('responseSchema'),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        getStationFirefighters
    );

    server.get(
        path + '/:firefighterId',
        {
            preHandler: [server.authorize],
            schema: {
                params: $ref('firefighterParamsSchema'),
                response: {
                    200: $ref('responseSchema'),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        getFirefighter
    );

    server.get(
        path + '/:firefighterId/courses',
        {
            preHandler: [server.authorize],
            schema: {
                params: $ref('firefighterParamsSchema'),
                response: {
                    200: $ref('responseSchema'),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        getFirefighterCourses
    );

    server.post(
        path,
        {
            preHandler: [server.authorize],
            schema: {
                body: $ref('addFirefighterBody'),
                response: {
                    201: $ref('responseSchema'),
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
                params: $ref('firefighterParamsSchema'),
                body: $ref('editFirefighterBody'),
                response: {
                    204: $ref('responseSchema'),
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
                params: $ref('firefighterParamsSchema'),
                response: {
                    204: $ref('responseSchema'),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        deleteFirefighter
    );
};

export default firefighterRoutes;