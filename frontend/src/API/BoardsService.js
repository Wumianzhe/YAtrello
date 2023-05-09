import { axInstance } from './Auth';

export default class BoardsService{
	async getBoard (id) {
		try {
			const response = await axInstance.get(`/api/boards/${id}`);
			return response.data;
		} catch (err) {
			console.log(err);
		}
	}  

	async getBoardsByName (name) {
		try {
			const response = await axInstance.get(`/api/boards/by_name/`, name);
			return response.data;
		} catch (err) {
			console.log(err);
		}
	}  
	async createBoard(board){
		try {
			await axInstance.post(`/api/boards/`, board);
		} catch (err) {
			console.log(err);
		}
	}
    async getSections(id) {
        try {
			const response = await axInstance.get(`/api/boards/${id}/sections`);
			return response.data;
		} catch (err) {
			console.log(err);
		}
    }
}
