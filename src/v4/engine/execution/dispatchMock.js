const startFunc = async ({ inEndpoint, inParam, inArgs }) => {
    const localEndpoint = inEndpoint;
    const localParam = inParam;
    const localArgs = inArgs;

    if (localEndpoint?.data !== undefined) {
        return localEndpoint.data;
    }

    return {
        resource: localEndpoint?.resource,
        queryParam: localParam,
        extraArgs: localArgs,
        timestamp: new Date().toISOString(),
        status: "success",
        data: {
            description: localEndpoint?.description
        }
    };
};

export default startFunc;
