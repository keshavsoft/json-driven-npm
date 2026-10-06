const startFunc = async ({ inEndpoint, inParam }) => {
    const localEndpoint = inEndpoint;
    const localParam = inParam;

    if (localEndpoint?.data !== undefined) {
        return localEndpoint.data;
    }

    return {
        resource: localEndpoint?.resource,
        queryParam: localParam,
        timestamp: new Date().toISOString(),
        status: "success",
        data: {
            description: localEndpoint?.description
        }
    };
};

export default startFunc;
