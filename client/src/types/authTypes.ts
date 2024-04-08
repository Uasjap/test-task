export type AuthSliceType = {
    user: {
        login: string,
        email: string,
        password: string,
        birthDate: Date,
        gender:string,
        avatar:string,
        },
    isLoading: boolean,
}

export type DataType = {
    login: string,
    email: string,
    password: string,
    birthDate: Date,
    gender: string,
    avatar: File
}

export type User = {
    user: {
    login: string,
    email: string,
    password: string,
    birthDate: Date,
    gender:string,
    },
    login: string,
    email: string,
    password: string,
    birthDate: Date,
    gender:string,
    message?: string
}

export type LoginData = {
    login: string,
    password: string;
}