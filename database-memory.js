import { randomUUID } from "node:crypto";

export class DatabaseMemory {
    #motos = new Map();

    getById(id) {
        return this.#motos.get(id);
    }

    // Listando motos
    list(search) {
        return Array.from(this.#motos.entries()).map(([id, data]) => ({
            id,
            ...data,
        })).filter(moto => search ? moto.modelo.includes(search) : true);
    }

    // Criando moto
    create(moto) {
        const motoID = randomUUID();
        this.#motos.set(motoID, moto);
    }

    // Atualizando moto
    update(id, moto) {
        this.#motos.set(id, moto);
    }

    // Apagando moto
    delete(id) {
        this.#motos.delete(id);
    }
}
