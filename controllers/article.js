import Article from "../models/article.js";
import multer from "multer";

async function getArticle(req, res) {

}

async function getAllArticle(req, res) {
	try {
		let allArticles = await Article.find()

		if (!allArticles) return res.status(404).json({ status: false, message: "Постів на даний момент ще немає" })
		return res.status(200).json({ status: true, allArticles, message: "Масив з постами!" })
	} catch (error) {
		return res.status(500).json({ status: false, message: error })
	}
}

async function createArticle(req, res) {
	try {
		let user = req.user
		let { title, text } = req.body
		let image = req.file;

		console.log(user)
		if (!title || !text || !image || !user) {
			return res.status(400).json({
				status: false,
				message: "Ви передали не всі поля!"
			})
		}

		let newArticle = new Article({
			author: user.name, title, text, image: image.path
		})

		await newArticle.save()

		return res.status(201).json({
			status: true,
			message: "Пост опубліковано!",
		})
	} catch (error) {
		return res.status(500).json({ status: false, message: error })
	}
}

async function createComment(req, res) {
	try {
		let user = req.user
		let { comment, articleId } = req.body

		if (!comment || !user || !articleId) {
			return res.status(400).json({
				status: false,
				message: "Ви передали не всі поля!"
			})
		}

		let currArticle = await Article.findById({ _id: articleId })

		if (!currArticle) return res.status(404).json({
			status: false,
			message: "Такого поста більше не існує!"
		})

		currArticle.comments.push({
			author: user.name,
			text: comment
		})

		await currArticle.save()

		return res.status(201).json({
			status: true,
			message: "Коментар додано!"
		})
	} catch (error) {
		return res.status(500).json({ status: false, message: error })
	}
}

async function controllLike(req, res) {
	try {
		let user = req.user
		let { articleId } = req.body

		if (!user || !articleId) {
			return res.status(400).json({
				status: false,
				message: "Вам потрібно авторизуватись!"
			})
		}

		let currArticle = await Article.findById({ _id: articleId })

		let isLiked = currArticle.likes.findIndex(el => el === user.name)

		if (isLiked >= 0) {
			currArticle.likes.splice(isLiked, 1)
		} else {
			currArticle.likes.push(user.name)
		}

		await currArticle.save()

		return res.status(200).json({
			status: true,
			message: "Лайк оброблено!"
		})
	} catch (error) {
		return res.status(500).json({ status: false, message: error })
	}
}

export { createArticle, createComment, controllLike, getAllArticle }

