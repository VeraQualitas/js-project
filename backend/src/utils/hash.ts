import crypto from 'crypto';

export function hashPassword(password: string) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    return { hash, salt };
};

export function verifyPassword({ receivedPassword, salt, hash }: { receivedPassword: string; salt: string; hash: string; }) {
    const generatedHash = crypto.pbkdf2Sync(receivedPassword, salt, 1000, 64, 'sha512').toString('hex');

    return hash === generatedHash;
};