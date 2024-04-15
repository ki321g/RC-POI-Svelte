


// User Types

export type LoggedInUser = {
	email: string;
	token: string;
	_id: string;
};

export type User = {
	firstName: string;
	lastName: string;
	email: string;
    accountType: string;
	password?: string;
	_id: string;
};
