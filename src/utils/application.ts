import toast from 'react-hot-toast';

export const addValue = (key: string, value?: string) => {
    if (!value) {
        toast.error(`LocalStorage value must not be null ${key}`);
        return;
    }
    localStorage.setItem(key, value);
};

export const getValue = (key: string) => {
    try {
        return localStorage.getItem(key);
    } catch (error) {
        toast.error((error as Error).message);
    }
};

export const removeValue = (key: string) => {
    localStorage.removeItem(key);
};

const base64UrlDecode = (input: string) => {
    // Replace characters not supported in base64url and convert to base64
    const base64 = input.replace(/-/g, '+').replace(/_/g, '/');
    // Pad the base64 string with '=' until its length is a multiple of 4
    const padded = base64.padEnd((base64.length + 3) & ~3, '=');
    // Decode the base64 string
    return atob(padded);
}

export const decodeJwt = (token: string) => {
    // Split the token into header, payload, and signature
    const [headerEncoded, payloadEncoded, signature] = token.split('.');

    // Decode header and payload
    const header = JSON.parse(base64UrlDecode(headerEncoded));
    const payload = JSON.parse(base64UrlDecode(payloadEncoded));

    return { header, payload, signature };
}
