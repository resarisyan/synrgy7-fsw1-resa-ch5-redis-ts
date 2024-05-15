var _a;
import axios from 'axios';
import client from '../config/redis.js';
class PostController {
}
_a = PostController;
PostController.getPosts = async (req, res) => {
    const id = Number(req.params.id);
    try {
        console.log('id: ', id);
        const post = await client.get('post-' + id);
        if (post) {
            return res.status(200).send({
                success: true,
                data: JSON.parse(post),
            });
        }
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        await client.set('post-' + id, JSON.stringify(response.data));
        return res.status(200).send({
            success: true,
            data: response.data,
        });
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: error,
        });
    }
};
export default PostController;
//# sourceMappingURL=PostController.js.map