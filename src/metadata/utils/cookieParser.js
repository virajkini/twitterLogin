const cookieParser = () => {
    if (!window.document || !document.cookie) {
        return {};
    }

    const cookies = document.cookie.split(/;\s*/);

    if (cookies.length < 1) {
        return {};
    }

    return cookies.reduce((acc, cookie) => {
        const key = cookie.split('=');
        return {
            ...acc,
            [key[0]] : key[1],
        };
    }, {});
}

export default cookieParser;