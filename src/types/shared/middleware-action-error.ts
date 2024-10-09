import { MiddlewareActionErrorType } from './middleware-action-error-type';

/**
 * Interface presents handled redux toolkit exception
 */
export interface MiddlewareActionError {
  /**
   * Error type
   */
  type: MiddlewareActionErrorType;
  /**
   * Message to show for the user, if exists
   */
  detail?: string;
  /**
   * HTTP status code, if exists
   */
  statusCode?: number;
}

export function isMiddlewareActionError(obj: any): obj is MiddlewareActionError {
  if (obj && typeof obj === 'object') {
    const hasValidType = !('type' in obj) || typeof obj.detail === "string";

    const hasValidDetail = !('detail' in obj) || typeof obj.detail === 'string';

    const hasValidStatusCode = !('statusCode' in obj) || typeof obj.statusCode === 'number';

    return hasValidType && hasValidDetail && hasValidStatusCode;
  }
  return false;
}
