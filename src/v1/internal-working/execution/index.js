import validateInput from "./validateInput.js";
import getEndpointSpec from "./getEndpointSpec.js";
import dispatchMock from "./dispatchMock.js";

const startFunc = async ({ inRoutePath, inParam, inSource }) => {
    const localRoutePath = inRoutePath;
    const localParam = inParam;
    const localSource = inSource;

    const param = validateInput({
        inParam: localParam
    });

    const endpoint = getEndpointSpec({
        inSource: localSource,
        inRoutePath: localRoutePath
    });

    return await dispatchMock({
        inEndpoint: endpoint,
        inParam: param
    });
};

export default startFunc;
