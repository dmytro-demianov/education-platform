import { PartialType } from "@nestjs/mapped-types";
import { CreateKeynoteDto } from "./create-keynote.dto";

export class UpdateKeynoteDto extends PartialType(CreateKeynoteDto) {}
