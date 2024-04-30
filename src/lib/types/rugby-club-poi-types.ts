// User Types

export interface Session {
	firstName: string;
	lastName: string;
	email: string;
	accountType: string;
	token: string;
	_id: string;
}

export interface User {
	firstName: string;
	lastName: string;
	email: string;
	password?: string;
	accountType: string;
	_id?: string;
	//__v?: string;
}

// export interface Club {
// 	club: String;
// 	address: String;
// 	phone: String;
// 	email: String;
// 	website: String;
// 	latitude: String;
// 	longitude: String;
// 	description: String;
// 	category: String;
// 	img?: [String];
// 	userId: User['_id'];
// 	_id?: string;
// }
export interface Club {
	club: String;
	address: String;
	phone: String;
	email: String;
	website: String;
	latitude: String;
	longitude: String;
	description: String;
	category: String;
	img?: [String];
	userId: User['_id'];
	_id?: {
		type: Schema.Types.ObjectId,
		ref: "_id",
	  },
}