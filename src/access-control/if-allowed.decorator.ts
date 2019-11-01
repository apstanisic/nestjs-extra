import { SetMetadata } from "@nestjs/common";

type Action = "read" | "write";

/**
 * @example
 *  @IfAllowed('read')
 *  method() {}
 *
 * @example
 *  @IfAllowed('read', '/company/someId')
 *  method() {}
 */
export function IfAllowed(
  action: Action = "write",
  resourcePath?: string
): any {
  return SetMetadata("access_control", [true, action, resourcePath]);
}
