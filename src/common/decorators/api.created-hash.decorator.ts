import { ApiCreatedResponse as SwaggerApiCreatedResponse } from "@nestjs/swagger";

export const ApiCreatedResponse = () => SwaggerApiCreatedResponse({
	content: {
		'application/json': {
			example: {
				hash: "10ba038e-48da-487b-96e8-8d3b99b6d18a"
			},
			schema: {
				properties: {
					hash: {
						type: 'string',
						example: "10ba038e-48da-487b-96e8-8d3b99b6d18a"
					}
				}
			}
		}
	}
});