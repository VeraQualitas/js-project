import { FastifyInstance } from "fastify";

import { $ref } from "../schemas/stations.schema";
import { getStations, getStation, getStationMembers, getStationMember, addStation, addMemberToStationByEmail, updateStation, updateMemberInStation, deleteStation, deleteMemberFromStation } from '../controllers/stations.controller';
import { e400Properties, e500Properties } from "./_error_opts";

const path = '/stations';

async function stationRoutes(server: FastifyInstance) {

    server.get(
        path,
        {
            preHandler: [server.authorize],
            schema: {
                response: {
                    200: $ref('responseSchema'),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        getStations
    );

    server.get(
        path + '/:stationId',
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
        getStation
    );

    server.get(
        path + '/:stationId/members',
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
        getStationMembers
    );

    server.get(
        path + '/:stationId/members/:accountId',
        {
            preHandler: [server.authorize],
            schema: {
                params: $ref('accountsStationsParamsSchema'),
                response: {
                    200: $ref('responseSchema'),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        getStationMember
    );

    server.post(
        path,
        {
            preHandler: [server.authorize],
            schema: {
                body: $ref('addStationBody'),
                response: {
                    201: $ref('responseSchema'),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        addStation
    );

    server.post(
        path + '/:stationId/members',
        {
            preHandler: [server.authorize],
            schema: {
                params: $ref('stationParamsSchema'),
                body: $ref('memberBody'),
                response: {
                    201: $ref('responseSchema'),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        addMemberToStationByEmail
    );

    server.put(
        path + '/:stationId',
        {
            preHandler: [server.authorize],
            schema: {
                params: $ref('stationParamsSchema'),
                body: $ref('editStationBody'),
                response: {
                    204: $ref('responseSchema'),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        updateStation
    );

    server.put(
        path + '/:stationId/members/:accountId',
        {
            preHandler: [server.authorize],
            schema: {
                params: $ref('accountsStationsParamsSchema'),
                body: $ref('memberBody'),
                response: {
                    204: $ref('responseSchema'),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        updateMemberInStation
    );

    server.delete(
        path + '/:stationId',
        {
            preHandler: [server.authorize],
            schema: {
                params: $ref('stationParamsSchema'),
                response: {
                    204: $ref('responseSchema'),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        deleteStation
    );

    server.delete(
        path + '/:stationId/members/:accountId',
        {
            preHandler: [server.authorize],
            schema: {
                params: $ref('accountsStationsParamsSchema'),
                response: {
                    204: $ref('responseSchema'),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        deleteMemberFromStation
    );
};

export default stationRoutes;