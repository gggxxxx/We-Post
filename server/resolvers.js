import { ObjectId } from 'mongodb';
import collections from './config/collections.js';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
	Upload: GraphQLUpload,
	Query: {
		imageList: async (_, { id }) => {
			const imagesCol = await collections.images();
			const imageList = await imagesCol.find().toArray();

			return imageList
				.map(item => ({
					...item,
					like: item.like.includes(id)
				}))
				.reverse();
		}
	},
	Mutation: {
		signUp: async (_, userInfo) => {
			const accountsCol = await collections.accounts();
			const { insertedId: _id } = await accountsCol.insertOne(userInfo);
			if (!_id) throw 'Sign up failed, please try again later';

			return { _id, ...userInfo };
		},

		signIn: async (_, { email, password }) => {
			const accountsCol = await collections.accounts();
			const accountInfo = await accountsCol.findOne({ email });
			if (accountInfo.password !== password) throw 'Password Wrong!';

			delete accountInfo.password;
			return accountInfo;
		},

		uploadFile: async (_, { file, title, description, author }) => {
			const { createReadStream, filename } = await file;
			const stream = createReadStream();
			const pathName = path.join(__dirname, `/images/${filename}`);
			await stream.pipe(fs.createWriteStream(pathName));
			const url = `http://localhost:4000/images/${filename}`;

			const imagesCol = await collections.images();
			await imagesCol.insertOne({ title, description, author, like: [], url });

			return { path: url };
		},

		likeImage: async (_, { userId, imageId, status }) => {
			const imagesCol = await collections.images();
			status
				? await imagesCol.updateOne({ _id: ObjectId(imageId) }, { $addToSet: { like: userId } })
				: await imagesCol.updateOne({ _id: ObjectId(imageId) }, { $pull: { like: userId } });
		}
	}
};
