import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import VideoController from "./video.controller";
import {VideoService} from "./video.service";
import {Video, VideoSchema} from "./entities/video.entity";
import {Keynote, KeynoteSchema} from "./entities/keynote.entity";
import KeynoteController from "./keynote.controller";
import {KeynoteService} from "./keynote.service";

@Module({
    imports: [
        MongooseModule.forFeature([
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
    controllers: [VideoController, KeynoteController],
    providers: [VideoService, KeynoteService],
})
export class LessonModule {}
