var _a;
import fs from 'fs/promises';
import cloudinary from '../config/cloudinary.js';
class PeopleController {
}
_a = PeopleController;
PeopleController.index = async (req, res) => {
    try {
        const data = await fs.readFile('./data/peoples.json', 'utf8');
        const peoples = JSON.parse(data);
        res.render('index', {
            peoples,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Internal Server Error',
        });
    }
};
PeopleController.storePeople = async (req, res) => {
    try {
        const data = await fs.readFile('./data/peoples.json', 'utf8');
        const parsedData = JSON.parse(data);
        const { name, username, email } = req.body;
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
            username,
            email,
            image: resultFile.secure_url,
        });
        await fs.writeFile('./data/peoples.json', JSON.stringify(parsedData), 'utf8');
        return res.status(201).send({
            success: true,
            message: 'People Created',
        });
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error',
        });
    }
};
PeopleController.getAllPeople = async (req, res) => {
    try {
        const data = await fs.readFile('./data/peoples.json', 'utf8');
        return res.status(200).send(JSON.parse(data));
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error',
        });
    }
};
PeopleController.getPeopleById = async (req, res) => {
    try {
        const rawData = await fs.readFile('./data/peoples.json', 'utf8');
        const data = JSON.parse(rawData);
        const people = data.find((people) => people.id === Number(req.params.id));
        if (people) {
            return res.status(200).send({
                success: true,
                data: people,
            });
        }
        else {
            return res.status(404).send({
                success: false,
                message: `People with id ${req.params.id} Not Found`,
            });
        }
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error',
        });
    }
};
PeopleController.updatePeople = async (req, res) => {
    try {
        const rawData = await fs.readFile('./data/peoples.json', 'utf8');
        const data = JSON.parse(rawData);
        const peopleIndex = data.findIndex((people) => people.id === Number(req.params.id));
        const { name, username, email } = req.body;
        if (peopleIndex !== -1) {
            let result;
            if (req.file) {
                const fileBase64 = req.file.buffer.toString('base64');
                const file = `data:${req.file.mimetype};base64,${fileBase64}`;
                result = await cloudinary.uploader.upload(file);
            }
            data[peopleIndex] = {
                id: Number(req.params.id),
                name,
                username,
                email,
                image: result ? result.secure_url : data[peopleIndex].image,
            };
            await fs.writeFile('./data/peoples.json', JSON.stringify(data), 'utf8');
            return res.status(200).send({
                success: true,
                message: 'People Updated',
            });
        }
        else {
            return res.status(404).send({
                success: false,
                message: `People with id ${req.params.id} Not Found`,
            });
        }
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error',
        });
    }
};
PeopleController.deletePeople = async (req, res) => {
    try {
        const rawData = await fs.readFile('./data/peoples.json', 'utf8');
        const data = JSON.parse(rawData);
        const peopleIndex = data.findIndex((people) => people.id === Number(req.params.id));
        if (peopleIndex !== -1) {
            await cloudinary.uploader.destroy(data[peopleIndex].image.split('/').pop().split('.')[0]);
            data.splice(peopleIndex, 1);
            await fs.writeFile('./data/peoples.json', JSON.stringify(data), 'utf8');
            return res.status(200).send({
                success: true,
                message: 'People Deleted',
            });
        }
        else {
            return res.status(404).send({
                success: false,
                message: `People with id ${req.params.id} Not Found`,
            });
        }
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error',
        });
    }
};
PeopleController.uploadFile = async (req, res) => {
    try {
        if (req.file) {
            return res.status(200).send({
                success: true,
                message: 'File Uploaded',
                data: req.file,
            });
        }
        else {
            return res.status(400).send({
                success: false,
                message: 'File must be uploaded',
            });
        }
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error',
        });
    }
};
PeopleController.cdnUploadImage = async (req, res) => {
    try {
        if (req.file) {
            const fileBase64 = req.file.buffer.toString('base64');
            const file = `data:${req.file.mimetype};base64,${fileBase64}`;
            const result = await cloudinary.uploader.upload(file);
            return res.status(200).send({
                success: true,
                message: 'File Uploaded',
                data: result,
            });
        }
        else {
            return res.status(400).send({
                success: false,
                message: 'File must be uploaded',
            });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error',
        });
    }
};
export default PeopleController;
//# sourceMappingURL=PeopleController.js.map