const fs = require('fs');
import {denormalize, normalize, schema} from 'normalizr';
import {v4 as uuidv4} from 'uuid';

const author = new schema.Entity('authors', {});

const message = new schema.Entity('messages', {author});

const finalSchema = new schema.Array(message)

class MessageService {

    constructor(private fileName) {
    }

    async getAllNormalized() {
        const file = await fs.promises.readFile(this.fileName, 'utf-8')
        return normalize(JSON.parse(file).map(row => ({...row, id: uuidv4()})), finalSchema);
    }

    async getAllDenormalized() {
        const data = await this.getAllNormalized();
        return denormalize(data.result, finalSchema, data.entities);
    }
}

export default new MessageService("chat_not_normalized.json");

