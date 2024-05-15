import { Request, Response } from 'express';
import fs from 'fs/promises';

class CategoryController {
  static storeCategory = async (req: any, res: Response): Promise<Response> => {
    try {
      const data = await fs.readFile('./data/categories.json', 'utf8');
      const parsedData = JSON.parse(data);
      const { name } = req.body;
      parsedData.push({
        id: parsedData.length + 1,
        name,
      });

      await fs.writeFile(
        './data/categories.json',
        JSON.stringify(parsedData),
        'utf8'
      );
      return res.status(201).send({
        success: true,
        message: 'Category Created',
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: 'Internal Server Error',
      });
    }
  };

  static getAllCategory = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const data = await fs.readFile('./data/categories.json', 'utf8');
      return res.status(200).send(JSON.parse(data));
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: 'Internal Server Error',
      });
    }
  };

  static getCategoryById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const rawData = await fs.readFile('./data/categories.json', 'utf8');
      const data = JSON.parse(rawData);
      const category = data.find(
        (category: any) => category.id === Number(req.params.id)
      );
      if (category) {
        return res.status(200).send({
          success: true,
          data: category,
        });
      } else {
        return res.status(404).send({
          success: false,
          message: `Category with id ${req.params.id} Not Found`,
        });
      }
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: 'Internal Server Error',
      });
    }
  };

  static updateCategory = async (
    req: any,
    res: Response
  ): Promise<Response> => {
    try {
      const rawData = await fs.readFile('./data/categories.json', 'utf8');
      const data = JSON.parse(rawData);
      const categoryIndex = data.findIndex(
        (category: any) => category.id === Number(req.params.id)
      );
      const { name } = req.body;

      if (categoryIndex !== -1) {
        data[categoryIndex] = {
          id: Number(req.params.id),
          name,
        };
        await fs.writeFile(
          './data/categories.json',
          JSON.stringify(data),
          'utf8'
        );
        return res.status(200).send({
          success: true,
          message: 'Category Updated',
        });
      } else {
        return res.status(404).send({
          success: false,
          message: `Category with id ${req.params.id} Not Found`,
        });
      }
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: 'Internal Server Error',
      });
    }
  };

  static deleteCategory = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const rawData = await fs.readFile('./data/categories.json', 'utf8');
      const data = JSON.parse(rawData);
      const categoryIndex = data.findIndex(
        (category: any) => category.id === Number(req.params.id)
      );
      if (categoryIndex !== -1) {
        data.splice(categoryIndex, 1);
        await fs.writeFile(
          './data/categories.json',
          JSON.stringify(data),
          'utf8'
        );
        return res.status(200).send({
          success: true,
          message: 'Category Deleted',
        });
      } else {
        return res.status(404).send({
          success: false,
          message: `Category with id ${req.params.id} Not Found`,
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

export default CategoryController;
