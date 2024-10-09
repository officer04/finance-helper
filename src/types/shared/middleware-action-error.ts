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
