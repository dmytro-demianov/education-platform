import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import VideoController from "./video.controller";
import {VideoService} from "./video.service";
import {Video, VideoSchema} from "./entities/video.entity";
import {Keynote, KeynoteSchema} from "./entities/keynote.entity";
import KeynoteController from "./keynote.controller";
import {KeynoteService} from "./keynote.service";
import {Class, ClassSchema} from "./entities/class.entity";
import ClassController from "./class.controller";
import {ClassService} from "./class.service";
import {Lesson, LessonSchema} from "./entities/lesson.entity";
import LessonController from "./lesson.controller";
import {LessonService} from "./lesson.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Class.name,
                schema: ClassSchema,
            },
            {
                name: Lesson.name,
                schema: LessonSchema,
            },
            {
                name: Video.name,
                schema: VideoSchema,
            },
            {
                name: Keynote.name,
                schema: KeynoteSchema,
            },
        ]),
    ],
    controllers: [
        VideoController,
        KeynoteController,
        ClassController,
        LessonController,
    ],
    providers: [
        VideoService,
        KeynoteService,
        ClassService,
        LessonService,
    ],
})
export class EduModule {}
