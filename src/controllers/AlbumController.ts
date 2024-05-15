import { Request, Response } from 'express';
import axios from 'axios';
import client from '../config/redis.js';

class AlbumController {
  static getAlbums = async (req: Request, res: Response): Promise<Response> => {
    const id = Number(req.params.id);
    try {
      const album = await client.get('album-' + id);
      if (album) {
        return res.status(200).send({
          success: true,
          data: JSON.parse(album),
        });
      }

      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      client.setEx('album-' + id, 60, JSON.stringify(response.data));
      return res.status(200).send({
        success: true,
        data: response.data,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: error,
      });
    }
  };
}

export default AlbumController;
