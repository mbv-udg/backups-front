export interface Login {
    status: boolean,
    data : {
        token: string,
        refreshToken: string
    }
}