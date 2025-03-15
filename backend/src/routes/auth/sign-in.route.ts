import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
    res.json({msg: 'Sign in...'});
});

export { router as signInRouter };