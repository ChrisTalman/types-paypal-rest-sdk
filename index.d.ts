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
			execute <GenericResult extends object> (request: PayPalHttpClientRequest): Promise<ExecuteResponse<GenericResult>>;
		}
		export abstract class PayPalHttpClientRequest
		{
			public readonly path: string;
			public readonly verb: string;
			public readonly headers: { [name: string]: string; };
			public body: object;
		}
		export interface ExecuteResponse <GenericResult extends object>
		{
			statusCode: number;
			headers: { [name: string]: string };
			result: GenericResult;
		}
	}
	export namespace v1
	{
		export namespace webhooks
		{
			export class WebhookVerifySignatureRequest extends core.PayPalHttpClientRequest
			{
				constructor();
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
						application_context: ApplicationContext;
					}
					export interface ApplicationContext
					{
						brand_name?: string;
						locale?: string;
						shipping_preference?: 'GET_FROM_FILE' | 'NO_SHIPPING' | 'SET_PROVIDED_ADDRESS';
						user_action?: 'CONTINUE' | 'SUBSCRIBE_NOW';
						payment_method?: ApplicationContextPaymentMethod;
						return_url: string;
						cancel_url: string;
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
					export interface Details
					{
						id: string;
						plan_id: string;
						start_time: string;
						quantity: string;
						shipping_amount: ShippingAmount;
						subscriber: Subscriber;
						billing_info: BillingInfo;
						auto_renewal: boolean;
						create_time: string;
						update_time: string;
						status: 'APPROVAL_PENDING' | 'APPROVED' | 'ACTIVE' | 'SUSPENDED' | 'CANCELLED' | 'EXPIRED';
						status_update_time: string;
						status_change_note?: string;
					}
					export interface ShippingAmount
					{
						currency_code: string;
						value: string;
					}
					export interface Subscriber
					{
						name: SubscriberName;
						email_address: string;
					}
					export interface SubscriberName
					{
						given_name: string;
						surname: string;
					}
					export interface BillingInfo
					{
						outstanding_balance: BillingInfoOutstandingBalance;
						cycle_executions: CycleExecutions;
						last_payment: BillingInfoLastPayment;
						next_billing_time: string;
						final_payment_time: string;
						failed_payments_count: number;
					}
					export interface BillingInfoOutstandingBalance
					{
						currency_code: string;
						value: string;
					}
					export interface BillingInfoLastPayment
					{
						amount: string;
						time: string;
					}
					export interface CycleExecutions extends Array<CycleExecution> {}
					export interface CycleExecution
					{
						tenure_type: 'REGULAR' | 'TRIAL';
						sequence: number;
						cycles_completed: number;
						cycles_remaining: number;
						current_pricing_scheme_version: number;
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
				export interface Details
				{
					id: string;
					product_id: string;
					name: string;
					status: 'CREATED' | 'INACTIVE' | 'ACTIVE';
					description?: string;
					billing_cycles: BillingCycles;
					payment_preferences: PaymentPreferences;
					taxes: Taxes;
					quantity_supported: boolean;
					create_time: string;
					update_time: string;
				}
				export interface BillingCycles extends Array<BillingCycle> {}
				export interface BillingCycle
				{
					pricing_scheme: BillingCyclePricingScheme;
					frequency: BillingCycleFrequency;
					tenure_type: 'REGULAR' | 'TRIAL';
					sequence: number;
					total_cycles: number;
				}
				export interface BillingCyclePricingScheme
				{
					version: number;
					fixed_price: BillingCyclePricingSchemeFixedPrice;
					create_time: string;
					update_time: string;
				}
				export interface BillingCyclePricingSchemeFixedPrice
				{
					currency_code: string;
					value: string;
				}
				export interface BillingCycleFrequency
				{
					interval_unit: 'DAY' | 'WEEK' | 'SEMI_MONTH' | 'MONTH' | 'YEAR';
					interval_count: number;
				}
				export interface PaymentPreferences
				{
					auto_bill_outstanding: boolean;
					setup_fee: PaymentPreferencesSetupFee;
					setup_fee_failure_action: 'CONTINUE' | 'CANCEL';
					payment_failure_threshold: number;
				}
				export interface PaymentPreferencesSetupFee
				{
					currency_code: string;
					value: string;
				}
				export interface Taxes
				{
					percentage: string;
					inclusive: boolean;
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
		export namespace Webhooks
		{
			export namespace Verify
			{
				export interface Body
				{
					transmission_id: string;
					transmission_time: string;
					cert_url: string;
					auth_algo: string;
					transmission_sig: string;
					webhook_id: string;
					webhook_event: object;
				}
				export interface Result
				{
					verification_status: 'SUCCESS' | 'FAILURE';
				}
			}
		}
	}
	export interface WebhookEventData <GenericResource extends object>
	{
		id: string;
		create_time: string;
		resource_type: string;
		event_type: string;
		summary: string;
		event_version: string;
		resource_version: string;
		resource: GenericResource;
	}
}