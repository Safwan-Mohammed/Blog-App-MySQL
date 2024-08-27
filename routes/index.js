const express = require('express')
const router = express.Router()

const blogController = require('../controllers/blogController')
const authController = require('../controllers/authController')
const verifyTokenMiddleware = require('../middlewares/verifyToken')

router.get('/hello', (req, res) => {
    res.json({message : "Hello"})
})

router.post('/add-blog', verifyTokenMiddleware.authenticateToken, blogController.addBlog)
router.get('/get-blog/:id', blogController.getBlog)
router.get('/get-user-blog/:email', blogController.getUserBlog)
router.get('/get-all-blogs', blogController.getAllBlogs)
router.post('/delete-blog', verifyTokenMiddleware.authenticateToken, blogController.deleteBlog)
router.post('/auth/sign-in', authController.signIn)
router.post('/auth/sign-up', authController.signUp)
router.post('/auth/sign-out', authController.signOut)
router.post('/auth/refresh-token', authController.refreshToken)

module.exports = router