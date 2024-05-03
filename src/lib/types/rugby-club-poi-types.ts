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

export interface Club {
	club: string;
	address: string;
	phone: string;
	email: string;
	website: string;
	latitude: string;
	longitude: string;
	description: string;
	category: string;
	img?: [string];
	userId: User['_id'];
	_id?: string;
}

export interface Game {
	home: String,
	homescore: Number,
	awayscore: Number,
	away: String,
	gametime: String,
	gamelocation: String,
	clubid: {
		type: Schema.Types.ObjectId,
		ref: "Club",
	},
	_id?: string;
}

export interface DataSet {
	labels: string[];
	datasets: [{ values: number[] }];
}

// export interface Club {
// 	club: string;
// 	address: string;
// 	phone: string;
// 	email: string;
// 	website: string;
// 	latitude: string;
// 	longitude: string;
// 	description: string;
// 	category: string;
// 	img?: [string];
// 	userId: User['_id'];
// 	_id?: {
// 		type: Schema.Types.ObjectId,
// 		ref: "_id",
// 	  },
// }