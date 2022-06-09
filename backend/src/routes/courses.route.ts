import { FastifyInstance } from "fastify";

import { $ref } from "../schemas/courses.schema";
import { getCourses, getCourse, getCourseFirefighters, addCourse, updateCourse, updateCourseFirefighter, deleteCourse, deleteCourseFirefighter } from '../controllers/courses.controller';
import { e400Properties, e500Properties } from "./_error_opts";

const path = '/courses';

async function courseRoutes(server: FastifyInstance) {

    server.get(
        '/stations/:stationId' + path,
        {
            preHandler: [server.authorize],
            schema: {
                params: $ref(''),
                response: {
                    200: $ref(''),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        getCourses
    );

    server.get(
        path + '/:courseId',
        {
            preHandler: [server.authorize],
            schema: {
                params: $ref(''),
                response: {
                    200: $ref(''),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        getCourse
    );

    server.get(
        path + '/:courseId/firefighters',
        {
            preHandler: [server.authorize],
            schema: {
                params: $ref(''),
                response: {
                    200: $ref(''),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        getCourseFirefighters
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
        addCourse
    );

    server.put(
        path + '/:courseId',
        {
            preHandler: [server.authorize],
            schema: {
                params: $ref(''),
                body: $ref(''),
                response: {
                    204: $ref(''),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        updateCourse
    );

    server.put(
        path + '/:courseId/firefighters/:firefighterId',
        {
            preHandler: [server.authorize],
            schema: {
                params: $ref(''),
                response: {
                    204: $ref(''),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        updateCourseFirefighter
    );

    server.delete(
        path + '/:courseId',
        {
            preHandler: [server.authorize],
            schema: {
                params: $ref(''),
                body: $ref(''),
                response: {
                    204: $ref(''),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        deleteCourse
    );

    server.delete(
        path + '/:courseId/firefighters/:firefighterId',
        {
            preHandler: [server.authorize],
            schema: {
                params: $ref(''),
                response: {
                    204: $ref(''),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        deleteCourseFirefighter
    );
};

export default courseRoutes;