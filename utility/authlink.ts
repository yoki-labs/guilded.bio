export const getServers = (token: string) =>
    fetch("https://authlink.guildedapi.com/api/v1/users/@me/servers", {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    }).then((x) => x.json());
