
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
	// _id?: string;
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
	// _id?: string;
}

export interface Game {
	home: string;
	homescore: number;
	awayscore: number;
	away: string;
	gametime: string;
	gamelocation: string;
	clubid: Club['_id'];
	// clubid: {
	// 	type: Schema.Types.ObjectId,
	// 	ref: "Club";
	// };
	// _id?: string;
}

export interface Image {
	img: string;	
	clubid: Club['_id'];
}

export interface DataSet {
	labels: string[];
	datasets: [{ values: number[] }];
}


export interface DataSetGames {	
	labels: string[];
	datasets: [{ name: string, chartType: string, values: number[] },
	{ name: string, chartType: string, values: number[] }];
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