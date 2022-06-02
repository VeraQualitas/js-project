import { FastifyInstance } from "fastify";

import { $ref } from "../schemas/equipments.schema";
import { getEquipments, getEquipment, addEquipment, updateEquipment, deleteEquipment } from '../controllers/equipments.controller';
import { e400Properties, e500Properties } from "./_error_opts";

const path = '/equipments';

async function equipmentRoutes(server: FastifyInstance) {

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
        getEquipments
    );

    server.get(
        path + '/:equipmentId',
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
        getEquipment
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
        addEquipment
    );

    server.put(
        path + '/:equipmentId',
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
        updateEquipment
    );

    server.delete(
        path + '/:equipmentId',
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
        deleteEquipment
    );
};

export default equipmentRoutes;