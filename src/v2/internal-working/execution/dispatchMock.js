const startFunc = async ({ inEndpoint, inParam }) => {
    const localEndpoint = inEndpoint;
    const localParam = inParam;

    // In a real client, this dispatches HTTP / gRPC / DB query.
    // For this reference blueprint, it returns a structured result matching the resource.
    return {
        resource: localEndpoint?.resource,
        queryParam: localParam,
        timestamp: new Date().toISOString(),
        status: "success",
        data: {
            id: localParam,
            description: localEndpoint?.description
        }
    };
};

export default startFunc;
