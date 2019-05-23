declare module 'paypal-rest-sdk'
{
	export namespace core
	{
		export class LiveEnvironment
		{
			constructor(clientId: string, clientSecret: string);
		}
		export class SandboxEnvironment
		{
			constructor(clientId: string, clientSecret: string);
		}
		export class PayPalHttpClient
		{
			constructor(environment: LiveEnvironment | SandboxEnvironment);
		}
	}
}