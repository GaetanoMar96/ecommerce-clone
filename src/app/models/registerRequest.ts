export interface RegisterRequest { 
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    role?: Role;
}

export enum Role { 
    'USER', 'ADMIN'
}