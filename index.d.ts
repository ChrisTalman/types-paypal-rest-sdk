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