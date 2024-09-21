import { useMemo } from "react";

export default function useUser() {
    return useMemo(() => {
        const cookie = document.cookie;
        if (!cookie) return null;

        // get jwt token from cookie with key 'jwt'
        const jwt = cookie.split(';').find(c => c.trim().startsWith('jwt='));
        if (!jwt) return null;

        // get payload from jwt token
        const payload = jwt.split('.')[1];
        const decodedPayload = atob(payload);
        return JSON.parse(decodedPayload);
    }, [document.cookie]);
}