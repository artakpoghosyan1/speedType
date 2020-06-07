import * as React from "react";
import {getLocalStorage} from "../../shared/utilities/localstorage";
import {IUser} from "../../shared/models/IUser";
import {users} from "../../shared/users/users";

const storage = getLocalStorage()

export const useLogin = () => {
    const [userData, setUserData] = React.useState<IUser | null>(null)
    const [error, setError] = React.useState<string>('')

    const findUser = (username: string, password: string): IUser | undefined =>
        users.find((user: IUser) => {
            return username === user.username && password === user.password
        })

    const login = (username: string, password: string): void => {
        const user = findUser(username, password)

        if(user) {
            setUserData(user)
        } else {
            setError('User does not exist')
        }
    }

    const logout = (): Promise<any> => {
        return new Promise((resolve) => {
            resolve(storage.removeItem('user'))
        })
    }

    const isLoggedIn = (): boolean => {
        return !!storage.getItem('user')
    }

    return {login, logout, isLoggedIn, userData, error}
}
