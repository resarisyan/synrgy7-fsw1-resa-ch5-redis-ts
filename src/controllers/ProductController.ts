import { Request, Response } from 'express';
import fs from 'fs/promises';
import cloudinary from '../config/cloudinary.js';

class ProductController {
  static storeProduct = async (req: any, res: Response): Promise<Response> => {
    try {
      const data = await fs.readFile('./data/products.json', 'utf8');
      const parsedData = JSON.parse(data);
      const { name, id_category, description } = req.body;
      if (!req.file) {
        return res.status(400).send({
          success: false,
          message: 'File must be uploaded',
        });
      }
      const fileBase64 = req.file.buffer.toString('base64');
      const file = `data:${req.file.mimetype};base64,${fileBase64}`;
      const resultFile = await cloudinary.uploader.upload(file);
      parsedData.push({
        id: parsedData.length + 1,
        name,
        id_category,
        description,
        image: resultFile.secure_url,
      });

      await fs.writeFile(
        './data/products.json',
        JSON.stringify(parsedData),
        'utf8'
      );
      return res.status(201).send({
        success: true,
        message: 'Product Created',
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: 'Internal Server Error',
      });
    }
  };

  static getAllProduct = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const data = await fs.readFile('./data/products.json', 'utf8');
      return res.status(200).send(JSON.parse(data));
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: 'Internal Server Error',
      });
    }
  };

  static getProductById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const rawData = await fs.readFile('./data/products.json', 'utf8');
      const data = JSON.parse(rawData);
      const product = data.find(
        (product: any) => product.id === Number(req.params.id)
      );
      if (product) {
        return res.status(200).send({
          success: true,
          data: product,
        });
      } else {
        return res.status(404).send({
          success: false,
          message: `Product with id ${req.params.id} Not Found`,
        });
      }
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: 'Internal Server Error',
      });
    }
  };

  static updateProduct = async (req: any, res: Response): Promise<Response> => {
    try {
      const rawData = await fs.readFile('./data/products.json', 'utf8');
      const data = JSON.parse(rawData);
      const productIndex = data.findIndex(
        (product: any) => product.id === Number(req.params.id)
      );
      const { name, id_category, description } = req.body;

      if (productIndex !== -1) {
        let result: any;
        if (req.file) {
          const fileBase64 = req.file.buffer.toString('base64');
          const file = `data:${req.file.mimetype};base64,${fileBase64}`;
          result = await cloudinary.uploader.upload(file);
        }
        data[productIndex] = {
          id: Number(req.params.id),
          name,
          id_category,
          description,
          image: req.file ? result.secure_url : data[productIndex].image,
        };
        await fs.writeFile(
          './data/products.json',
          JSON.stringify(data),
          'utf8'
        );
        return res.status(200).send({
          success: true,
          message: 'Product Updated',
        });
      } else {
        return res.status(404).send({
          success: false,
          message: `Product with id ${req.params.id} Not Found`,
        });
      }
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: 'Internal Server Error',
      });
    }
  };

  static deleteProduct = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const rawData = await fs.readFile('./data/products.json', 'utf8');
      const data = JSON.parse(rawData);
      const productIndex = data.findIndex(
        (product: any) => product.id === Number(req.params.id)
      );
      if (productIndex !== -1) {
        await cloudinary.uploader.destroy(
          data[productIndex].image.split('/').pop().split('.')[0]
        );
        data.splice(productIndex, 1);
        await fs.writeFile(
          './data/products.json',
          JSON.stringify(data),
          'utf8'
        );
        return res.status(200).send({
          success: true,
          message: 'Product Deleted',
        });
      } else {
        return res.status(404).send({
          success: false,
          message: `Product with id ${req.params.id} Not Found`,
        });
      }
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: 'Internal Server Error',
      });
    }
  };
}

export default ProductController;
