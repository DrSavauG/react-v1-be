import FilmSchema from "../models/film-model";
const JsonStreamStringify = require( "json-stream-stringify");

class FilmService {
    async getSome(req) {
        const params = JSON.parse(req)
        console.log("params", params);
        const {page = 1, limit = 20} = params;
        return FilmSchema.find(params.find)
            .sort(params.sort)
            .skip(page > 0 ? (page * 1 - 1) * limit : 0)
            .limit(+limit)
    }

    getFilms(arg) {
        return new JsonStreamStringify(FilmSchema.find(arg).stream());
    }

    async addFilm(arg) {
        const createFilm = new FilmSchema(arg.arg);
        return await createFilm.save();
    }

    async getItemById(id) {
        return FilmSchema.find({_id: id});
    }

    async updateFilm(id, params) {
        return FilmSchema.updateOne({_id: id}, params.arg);
    }

    async deleteFilm(id, params) {
        return FilmSchema.updateOne({_id: id}, {_deletedAt: Date.now()});
    }

}

export default new FilmService();