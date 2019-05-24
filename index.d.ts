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
		export abstract class PayPalHttpClientRequest
		{
			public readonly path: string;
			public readonly verb: string;
			public readonly headers: { [name: string]: string; };
			public body: string;
		}
	}
	export namespace v1
	{
		export namespace webhooks
		{
			export class WebhookVerifySignatureRequest extends core.PayPalHttpClientRequest
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
	export namespace Api
	{
		export namespace Billing
		{
			export namespace Subscriptions
			{
				export namespace Methods
				{
					export namespace Post
					{
						export interface Body
						{
							plan_id: string;
							start_time?: string;
							quantity?: string;
							auto_renewal?: boolean;
						}
						export interface ApplicationContext
						{
							brand_name?: string;
							locale?: string;
							shipping_preference?: 'GET_FROM_FILE' | 'NO_SHIPPING' | 'SET_PROVIDED_ADDRESS';
							user_action?: 'CONTINUE' | 'SUBSCRIBE_NOW';
							payment_method?: ApplicationContextPaymentMethod;
							return_url?: string;
							cancel_url?: string;
						}
						export interface ApplicationContextPaymentMethod
						{
							payer_selected?: 'PAYPAL' | 'PAYPAL_CREDIT';
							payee_preferred?: 'UNRESTRICTED' | 'IMMEDIATE_PAYMENT_REQUIRED';
						}
					}
				}
			}
		}
	}
}