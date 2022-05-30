// REDUCER

export function globalStateReducer(globalState = [], action) {
    return globalState;
}

// ACTIONS --> move to different file if needed!

// example:
export function getGlobalStateRequests(globalState) {
    return {
        type: "globalState",
        payload: { globalState },
    };
}
