declare global {
	namespace NodeJS {
		interface ProcessEnv {
			API_GATEWAY_KEY: string;
		}
	}
}

export {};
