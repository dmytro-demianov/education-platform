import {ApiInternalServerErrorResponse as SwaggerApiInternalServerErrorResponse} from "@nestjs/swagger";

export const ApiInternalServerErrorResponse = () => SwaggerApiInternalServerErrorResponse({
	content: {
		'application/json': {
			example: {
				message: "some server error"
			},
			schema: {
				properties: {
					message: {
						type: 'string',
						example: "some server error"
					},
				}
			},
		}
	}
});