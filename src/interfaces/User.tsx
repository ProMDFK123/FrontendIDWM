export interface User {
    firstName?:    string;
    lastName?:     string;
    email:        string;
    thelephone?:   string;
    street?:       string;
    number?:       string;
    commune?:      string;
    region?:       string;
    postalCode?:   string;
    registeredAt?: Date;
    lastAccess?:   Date;
    isActive?:     boolean;
    token:        string;
    role?:         string;
}