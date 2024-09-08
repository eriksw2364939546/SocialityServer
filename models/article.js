import { Schema, model } from 'mongoose';

const articleSchema = new Schema({
	author: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	text: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	comments: {
		type: Array,
		default: []
	},
	likes: {
		type: Array,
		default: []
	},
	date: {
		type: Date,
		default: Date.now
	}
})

const Article = model('Article', articleSchema)

export default Article
