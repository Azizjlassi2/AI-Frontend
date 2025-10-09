/**
 * Possible billing periods for a subscription plan.
 * - MONTHLY: Billed every month.
 * - ANNUAL: Billed every year.
 * - PAY_AS_YOU_GO: Billed based on usage.
 */
export enum BillingPeriod {
  MONTHLY = "MONTHLY",
  ANNUAL = "ANNUAL",
  WEEKLY = "WEEKLY",
  PAY_AS_YOU_GO = "PAY_AS_YOU_GO",
}

/**
 * Possible statuses for a subscription.
 * - ACTIVE: The subscription is currently active.
 * - CANCELED: The subscription has been canceled and will not renew.
 * - EXPIRED: The subscription period has ended and has not been renewed.
 * - PENDING: The subscription is in a pending state, possibly awaiting payment or activation.
 */
export enum SubscriptionStatus {
  ACTIVE = "ACTIVE",
  CANCELED = "CANCELED",
  EXPIRED = "EXPIRED",
  PENDING = "PENDING",
}

/**
 * Represents a user's subscription to a model.
 * Includes details about the model, plan, billing, and usage.
 * Usage data is optional and may not be available for all subscriptions
 */
export interface Subscription {
  id: number;
  modelId: number;
  modelName: string;
  planId: number;
  planName: string;
  startDate: string;
  price: number;
  currency: string;
  billingPeriod: BillingPeriod;
  nextBillingDate: string;
  status?: SubscriptionStatus;
  usageData?: {
    apiCallsUsed: number;
    apiCallsLimit?: number;
    lastUsed?: string;
  };
}

/**
 * Represents an invoice for a subscription payment.
 * Includes details about the subscription, amount, date, and status.
 * Status can be PAID, PENDING, FAILED, or REFUNDED.
 */
export interface Invoice {
  id: string;
  subscriptionId: number;
  modelName: string;
  planName: string;
  date: string;
  amount: number;
  currency: string;
  status: "PAID" | "PENDING" | "FAILED" | "REFUNDED";
}

/**
 * Represents a notification for the user.
 * Includes details about the notification type, title, message, date, and read status.
 * An optional link can be included for more information or actions.
 * Types can be INFO, WARNING, SUCCESS, or ERROR.
 *
 */
export interface Notification {
  id: number;
  type: "INFO" | "WARNING" | "SUCCESS" | "ERROR";
  title: string;
  message: string;
  date: string;
  read: boolean;
  link?: string;
}

/**
 * Represents an activity item in the user's activity log.
 * Includes details about the activity type, action, target, date, and optional details.
 * Types can be MODEL_USAGE, SUBSCRIPTION, PAYMENT, or SYSTEM.
 * Details provide additional context about the activity.
 *
 */
export interface ActivityItem {
  id: number;
  type: "MODEL_USAGE" | "SUBSCRIPTION" | "PAYMENT" | "SYSTEM";
  action: string;
  target: string;
  date: string;
  details?: string;
}

/** Represents the usage data for a specific model.
 * Includes daily usage, error rates, endpoints, and response times.
 * This is mock data for demonstration purposes.
 * In a real application, this data would be fetched from an API.
 */
export interface ModelUsageData {
  id: number;
  modelId: number;
  modelName: string;
  planName: string;
  billingPeriod: BillingPeriod;
  apiCallsUsed: number;
  apiCallsLimit: number | null;
  apiCallsCost: number | null;
  currency: string;
  startDate: string;
  endDate: string;
  dailyUsage: {
    date: string;
    calls: number;
    cost?: number;
  }[];
  errorRates: {
    date: string;
    success: number;
    clientError: number;
    serverError: number;
  }[];
  endpoints: {
    name: string;
    calls: number;
    percentage: number;
  }[];
  responseTime: {
    date: string;
    average: number;
    p95: number;
  }[];
}

/**
 * Represents an API key associated with a user's subscription.
 * Includes details about the key, associated model and plan, creation date, last used date, and status.
 * Status can be active or revoked.
 */
export interface ApiKey {
  id: string;
  name: string;
  key: string;
  subscriptionId: number;
  modelId: number;
  modelName: string;
  planName: string;
  created: string;
  lastUsed: string | null;
  status: "active" | "revoked";
}
