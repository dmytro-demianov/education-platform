import { PartialType } from "@nestjs/swagger";
import { CreateKeynoteDto } from "./create-keynote.dto";

export class UpdateKeynoteDto extends PartialType(CreateKeynoteDto) {}
