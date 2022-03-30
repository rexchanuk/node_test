'use strict';
const Config = require('./env.config')
const gFile = require("./lib/general/File")
const mGeneral = require("./lib/general/General")
const Jwt = require('@hapi/jwt')
const Hapi = require('@hapi/hapi')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const error_arr = {
	statusCode: 500,
	error: "Internal Server Error",
	message: "An internal server error occurred"
};
const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];

const init = async () => {

    const server = Hapi.server({
        port: Config.port,
        host: Config.host
    });
	
	await server.register(Jwt);
	
	// generate strategy of JWT
	server.auth.strategy('my_jwt_strategy', 'jwt', {
        keys: Config.secret,
        verify: {
            aud: 'urn:audience:test',
            iss: 'urn:issuer:test',
            sub: false,
            nbf: true,
            exp: true,
            maxAgeSec: 14400, // 4 hours
            timeSkewSec: 15
        },
        validate: (artifacts, request, h) => {
			if(artifacts.decoded.payload.username == 'test'){
				return {
					isValid: true,
					credentials: { username: artifacts.decoded.payload.username }
				};
			}else{
				return {
					isValid: false,
					credentials: { username: artifacts.decoded.payload.username }
				};
			}
            
        }
    });
	
	// Set the strategy
    server.auth.default('my_jwt_strategy');
	
	// login
	server.route({
        method: ['POST'],
        path: '/api/login',
		options: {
            auth: false
        },
        handler: async (request, h) => {
			if(request.payload.username == users[0].username && request.payload.password == users[0].password){
				const token = Jwt.token.generate(
					{
						aud: 'urn:audience:test',
						iss: 'urn:issuer:test',
						username: request.payload.username
					},
					Config.secret,
					{
						ttlSec: 14400 // 4 hours
					}
				);
				return { id_token: token};
			}else{
				return {errors: ['Invalid email or password']};
			}
		},
    });
	
	// get all post / single post
	server.route({
        method: ['GET','POST'],
        path: '/api/post',
		options: {
            'auth': 'my_jwt_strategy',
        },
        async handler(request, h) {
			let ret_data = await mGeneral.GetRequest("https://dinotest.wpengine.com/wp-json/wp/v2/posts")
			if(request.payload == null){
				return ret_data.data;
			}else{
				for(let i=0;i<ret_data.data.length; i++){
					if(ret_data.data[i].id == request.payload.postid){
						return ret_data.data[i];
					}
				}
				return error_arr
			}
		}
    });
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();