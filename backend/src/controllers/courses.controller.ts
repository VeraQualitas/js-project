import { FastifyRequest, FastifyReply } from "fastify";

import { getCoursesService, getCourseService, addCourseService, updateCourseService, updateCourseFirefighterService, deleteCourseService, deleteCourseFirefighterService } from "../services/courses.service";

interface IGetStationParams {
    stationId: number;
}

interface IGetCourseParams {
    courseId: number;
}

interface IGetCoursesFirefightersParams {
    courseId: number;
    firefighterId: number;
}

interface IAddCourseBody {

}

interface IUpdateCourseBody {

}

export const getCourses = async (request: FastifyRequest<{ Params: IGetStationParams }>, reply: FastifyReply) => {
    try {
        const courses = await getCoursesService(request.user, request.params.stationId);

        if (courses === undefined) {
            reply.code(500).send({});
        }

        if (courses === null) {
            reply.code(400).send({});
        }

        const response = {
            success: true,
            data: { courses }
        };

        reply.code(200).send(response);

    } catch (e) {
        console.error(e);
        reply.code(500).send({});
    }
};

export const getCourse = async (request: FastifyRequest<{ Params: IGetCourseParams }>, reply: FastifyReply) => {
    try {
        const course = await getCourseService(request.user, request.params.courseId);

        if (course === undefined) {
            reply.code(500).send({});
        }

        if (course === null) {
            reply.code(400).send({});
        }

        const response = {
            success: true,
            data: { course }
        };

        reply.code(200).send(response);

    } catch (e) {
        console.error(e);
        reply.code(500).send({});
    }
};

export const getCourseFirefighters = async (request: FastifyRequest<{ Params: IGetCourseParams }>, reply: FastifyReply) => {
    try {
        const firefighters = await getCourseService(request.user, request.params.courseId);

        if (firefighters === undefined) {
            reply.code(500).send({});
        }

        if (firefighters === null) {
            reply.code(400).send({});
        }

        const response = {
            success: true,
            data: { firefighters }
        };

        reply.code(200).send(response);

    } catch (e) {
        console.error(e);
        reply.code(500).send({});
    }
};

export const addCourse = async (request: FastifyRequest<{ Body: IAddCourseBody }>, reply: FastifyReply) => {
    try {
        const course = await addCourseService(request.user, request.body);

        if (course === undefined) {
            reply.code(500).send({});
        }

        if (course === null) {
            reply.code(400).send({});
        }

        const response = {
            success: true,
            message: 'Added successfully. ',
            data: { course }
        };

        reply.code(201).send(response);

    } catch (e) {
        console.error(e);
        reply.code(500).send({});
    }
};

export const updateCourse = async (request: FastifyRequest<{ Body: IUpdateCourseBody, Params: IGetCourseParams }>, reply: FastifyReply) => {
    try {
        const course = await updateCourseService(request.user, request.body, request.params.courseId);

        if (course === undefined) {
            reply.code(500).send({});
        }

        if (course === null) {
            reply.code(400).send({});
        }

        const response = {
            success: true,
            message: 'Updated successfully. ',
            data: { course }
        };

        reply.code(204).send(response);

    } catch (e) {
        console.error(e);
        reply.code(500).send({});
    }
};

export const updateCourseFirefighter = async (request: FastifyRequest<{ Body: IUpdateCourseBody, Params: IGetCoursesFirefightersParams }>, reply: FastifyReply) => {
    try {
        const firefighter = await updateCourseFirefighterService(request.user, request.body, request.params.courseId, request.params.firefighterId);

        if (firefighter === undefined) {
            reply.code(500).send({});
        }

        if (firefighter === null) {
            reply.code(400).send({});
        }

        const response = {
            success: true,
            message: 'Updated successfully. ',
            data: { firefighter }
        };

        reply.code(204).send(response);

    } catch (e) {
        console.error(e);
        reply.code(500).send({});
    }
};

export const deleteCourse = async (request: FastifyRequest<{ Params: IGetCourseParams }>, reply: FastifyReply) => {
    try {
        const course = await deleteCourseService(request.user, request.params.courseId);

        if (course === undefined) {
            reply.code(500).send({});
        }

        if (course === null) {
            reply.code(400).send({});
        }

        const response = {
            success: true,
            message: 'Deleted successfully. ',
            data: {}
        };

        reply.code(204).send(response);

    } catch (e) {
        console.error(e);
        reply.code(500).send({});
    }
};

export const deleteCourseFirefighter = async (request: FastifyRequest<{ Body: IUpdateCourseBody, Params: IGetCoursesFirefightersParams }>, reply: FastifyReply) => {
    try {
        const firefighter = await deleteCourseFirefighterService(request.user, request.body, request.params.courseId, request.params.firefighterId);

        if (firefighter === undefined) {
            reply.code(500).send({});
        }

        if (firefighter === null) {
            reply.code(400).send({});
        }

        const response = {
            success: true,
            message: 'Deleted successfully. ',
            data: {}
        };

        reply.code(204).send(response);

    } catch (e) {
        console.error(e);
        reply.code(500).send({});
    }
};