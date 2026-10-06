const startFunc = ({ inParam }) => {
    const localParam = inParam;

    if (localParam === undefined || localParam === null) {
        return "";
    }

    if (typeof localParam !== "string") {
        return String(localParam);
    }

    return localParam.trim();
};

export default startFunc;
