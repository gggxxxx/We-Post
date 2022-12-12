import collections from './config/collections.js';
import dbConnection from './config/connection.js';

const photoSource = [
	{
		url: 'https://burst.shopifycdn.com/photos/winter-sun-on-snowy-mountain.jpg?width=925&format=pjpg&exif=1&iptc=1',
		title: 'Winter Sun',
		author: 'Cristina Gottardi',
		like: [],
		description: ''
	},
	{
		url: 'https://burst.shopifycdn.com/photos/blue-sea-crashes-against-yellowstone-cliffs.jpg?width=925&format=pjpg&exif=1&iptc=1',
		title: 'Blue Sea',
		author: 'Murilo Cardoso',
		like: [],
		description: ''
	},
	{
		url: 'https://burst.shopifycdn.com/photos/green-cat-eyes.jpg?width=925&format=pjpg&exif=1&iptc=1',
		title: 'Green Cat Eyes',
		author: 'Scott Webb',
		like: [],
		description: ''
	},
	{
		url: 'https://burst.shopifycdn.com/photos/sitting-squirrel.jpg?width=925&format=pjpg&exif=1&iptc=1',
		title: 'Squirrel',
		author: 'Samuel Mitchell',
		like: [],
		description: ''
	},
	{
		url: 'https://burst.shopifycdn.com/photos/brown-white-dogs.jpg?width=925&format=pjpg&exif=1&iptc=1',
		title: 'Dogs',
		author: 'Shopify Partners',
		like: [],
		description: ''
	},
	{
		url: 'https://burst.shopifycdn.com/photos/reading-still-life.jpg?width=925&format=pjpg&exif=1&iptc=1',
		title: 'Reading',
		author: 'Matthew Henry',
		like: [],
		description: ''
	},
	{
		url: 'https://burst.shopifycdn.com/photos/teak-headboard-table.jpg?width=925&format=pjpg&exif=1&iptc=1',
		title: 'Headboard',
		author: 'Matthew Henry',
		like: [],
		description: ''
	}
];

const main = async () => {
	const db = await dbConnection();
	await db.dropDatabase(); //drop the database that is currently in use
	try {
		const imagesCol = await collections.images();
		await imagesCol.insertMany(photoSource); //write the default images into the database
	} catch (error) {
		await db.dropDatabase();
	} finally {
		await db.s.client.close();
	}
};

main();
