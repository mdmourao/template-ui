function getAccessTokenFromLocalStorage() {
    return localStorage.getItem("access_token");
}

function addAccessTokenToLocalStorage(access_token: string) {
    localStorage.setItem("access_token", access_token);
    return;
}
export { getAccessTokenFromLocalStorage, addAccessTokenToLocalStorage };