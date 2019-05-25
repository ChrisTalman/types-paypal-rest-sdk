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
			public body: object;
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
				export namespace Create
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
				export namespace Subscription
				{
					export namespace Cancel
					{
						export interface Body
						{
							reason: string;
						}
					}
				}
			}
			export namespace Plans
			{
				export namespace Create
				{
					export interface Body
					{
						product_id: string;
						name: string;
						status?: 'CREATED' | 'INACTIVE' | 'ACTIVE';
						description?: string;
						billing_cycles: BillingCycles;
					}
					export interface BillingCycles extends Array<BillingCycle> {}
					export interface BillingCycle
					{
						frequency: BillingCycleFrequency;
						tenure_type: 'REGULAR' | 'TRIAL';
						sequence: number;
						total_cycles?: number;
						payment_preferences?: BillingCyclePaymentPreferences;
					}
					export interface BillingCycleFrequency
					{
						interval_unit: 'DAY' | 'WEEK' | 'SEMI_MONTH' | 'MONTH' | 'YEAR';
						interval_count?: number;
					}
					export interface BillingCyclePaymentPreferences
					{
						auto_bill_outstanding?: boolean;
						setup_fee?: BillingCyclePaymentPreferencesSetupFee;
						setup_fee_failure_action?: 'CONTINUE' | 'CANCEL';
						payment_failure_threshold?: number;
					}
					export interface BillingCyclePaymentPreferencesSetupFee
					{
						currency_code: string;
						value: string;
					}
				}
			}
		}
		export namespace Catalogs
		{
			export namespace Products
			{
				export namespace Create
				{
					export interface Body
					{
						id?: string;
						name: string;
						description?: string;
						type: 'PHYSICAL' | 'DIGITAL' | 'SERVICE';
						category?: 'SOFTWARE';
						image_url?: string;
						home_url?: string;
					}
					export interface BillingCycles extends Array<BillingCycle> {}
					export interface BillingCycle
					{
						frequency: BillingCycleFrequency;
						tenure_type: 'REGULAR' | 'TRIAL';
						sequence: number;
						total_cycles?: number;
						payment_preferences?: BillingCyclePaymentPreferences;
					}
					export interface BillingCycleFrequency
					{
						interval_unit: 'DAY' | 'WEEK' | 'SEMI_MONTH' | 'MONTH' | 'YEAR';
						interval_count?: number;
					}
					export interface BillingCyclePaymentPreferences
					{
						auto_bill_outstanding?: boolean;
						setup_fee?: BillingCyclePaymentPreferencesSetupFee;
						setup_fee_failure_action?: 'CONTINUE' | 'CANCEL';
						payment_failure_threshold?: number;
					}
					export interface BillingCyclePaymentPreferencesSetupFee
					{
						currency_code: string;
						value: string;
					}
				}
			}
		}
	}
}