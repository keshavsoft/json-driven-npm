const startFunc = ({ inParam }) => {
    const localParam = inParam;

    if (typeof localParam !== "string" || !localParam.trim()) {
        throw new TypeError("Parameter must be a non-empty string.");
    }

    return localParam.trim();
};

export default startFunc;
