/**
 * project router
 */

export default {
	routes: [
		{
			method: 'GET',
			path: '/projects',
			handler: 'project.find',
			config: {
				policies: ['global::require-static-token'],
			},
		},
		{
			method: 'POST',
			path: '/projects',
			handler: 'project.create',
			config: {
				policies: ['global::require-static-token'],
			},
		},
		{
			method: 'DELETE',
			path: '/projects/:id',
			handler: 'project.delete',
			config: {
				policies: ['global::require-static-token'],
			},
		},
	],
};
