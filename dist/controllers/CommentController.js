var _a;
import axios from 'axios';
import client from '../config/redis.js';
class CommentController {
}
_a = CommentController;
CommentController.getComments = async (req, res) => {
    const searchTerm = req.query.search;
    try {
        const comments = await client.get('comment-' + searchTerm);
        if (comments) {
            return res.status(200).send({
                success: true,
                data: JSON.parse(comments),
            });
        }
        const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${searchTerm}`);
        client.setEx('comment-' + searchTerm, 60, JSON.stringify(response.data));
        return res.status(200).send({
            success: true,
            data: response.data,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error,
        });
    }
};
export default CommentController;
//# sourceMappingURL=CommentController.js.map