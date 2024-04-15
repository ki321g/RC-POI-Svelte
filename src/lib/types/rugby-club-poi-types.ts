


// User Types

export interface LoggedInUser {
	email: string;
	token: string;
	_id: string;
};

export interface User {
	firstName: string;
	lastName: string;
	email: string;
    accountType: string;
	password?: string;
	_id: string;
};
