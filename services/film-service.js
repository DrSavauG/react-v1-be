import FilmSchema from "../models/film-model";

class FilmService {
    async getFilms(arg) {
        const films = await FilmSchema.find(arg);
        return films;
    }

    async addFilm(arg) {
        const createFilm = new FilmSchema(arg.arg);
        return await createFilm.save();
    }

    async getItemById(id) {
        return FilmSchema.find({_id: id});
    }

    async updateFilm(id, params) {
        return FilmSchema.updateOne({_id: id}, params);
    }

    async deleteFilm(id, params) {
        return FilmSchema.updateOne({_id: id}, {_deletedAt: Date.now()});
    }

}

export default new FilmService();