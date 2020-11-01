import { ApiBadRequestResponse as SwaggerApiBadRequestResponse } from "@nestjs/swagger";

// invalid payload
export const ApiBadRequestResponse = () => SwaggerApiBadRequestResponse({
	content: {
		'application/json': {
			example: {
				error: "Bad Request",
				message: [
					[
						"sex must be a valid enum value",
						"role must be a valid enum value"
					]
				]
			},
			schema: {
				properties: {
					error: {
						type: 'string',
						example: "Bad Request",
					},
					message: {
						type: 'array',
						items: {
							type: 'string',
						},
						example: [
							"sex must be a valid enum value",
							"role must be a valid enum value"
						]
					},
				}
			},
		}
	}
});