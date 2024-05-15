var _a;
import axios from 'axios';
import { client } from 'src/config/redis.js';
class CommentController {
}
_a = CommentController;
CommentController.getComment = async (req, res) => {
    const searchTerm = req.query.search;
    try {
        const comments = await client.get(searchTerm);
        if (comments) {
            return res.status(200).send({
                success: true,
                data: JSON.parse(comments),
            });
        }
        const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?q=${searchTerm}`);
        client.setEx(searchTerm, 60, JSON.stringify(response.data));
        return res.status(200).send({
            success: true,
            data: response.data,
        });
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error',
        });
    }
};
export default JobController;
//# sourceMappingURL=JobController.js.map