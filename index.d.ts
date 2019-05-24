declare module 'paypal-rest-sdk'
{
	export namespace core
	{
		export class PayPalEnvironment
		{
			public readonly clientId: string;
			public readonly clientSecret: string;
			public readonly baseUrl: string;
			public readonly webUrl: string;
		}
		export class LiveEnvironment extends PayPalEnvironment
		{
			constructor(clientId: string, clientSecret: string);
		}
		export class SandboxEnvironment extends PayPalEnvironment
		{
			constructor(clientId: string, clientSecret: string);
		}
		export class PayPalHttpClient
		{
			constructor(environment: PayPalEnvironment);
			execute(request: PayPalHttpClientRequest);
		}
		export interface PayPalHttpClientRequest
		{
			path: string;
			verb: string;
			body: string;
			headers:
			{
				[name: string]: string;
			};
		}
	}
	export namespace v1
	{
		export namespace webhooks
		{
			export class WebhookVerifySignatureRequest
			{
				constructor(parameters: WebhookVerifySignatureParameters);
			}
			export interface WebhookVerifySignatureParameters
			{
				transmission_id: string;
				transmission_time: string;
				cert_url: string;
				auth_algo: string;
				transmission_sig: string;
				webhook_id: string;
				webhook_event: object;
			}
		}
	}
}