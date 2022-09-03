import { useUserStore } from "../../store/users/users";

export default function authGuard (to, from, next) {
    const userStore = useUserStore()
    if (userStore.currentUser) {
        return next()
    }
    else {
        return next({name: 'AuthPage'})
    }
}