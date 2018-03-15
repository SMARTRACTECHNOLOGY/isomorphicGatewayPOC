export const NEW_ENABLEMENT = "NEW_ENABLEMENT"

export function showProcessDetail(detail) {
  return {
    type: "PAGE",
    page: "PROCESS_DETAIL",
    card: detail
  }
}

export function showProcessList() {
  return {
    type: "PAGE",
    page: "PROCESS_LIST"
  }
}
