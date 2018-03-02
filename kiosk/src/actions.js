export const NEW_ENABLEMENT = "NEW_ENABLEMENT"

export function newEnablement(detail) {
  return {
    type: NEW_ENABLEMENT,
    detail: detail
  }
}
