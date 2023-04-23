import axios from 'axios';
const API_URL = 'http://localhost:8080';

export default class BoardsService{
	//constructor(){}
	
	static async getBoards2() {
		const url = `${API_URL}/api/boards`;
		return axios.get(url).then(response => response.data).catch(error => {console.error(error)});
	}  
	getBoards() {
		const url = `${API_URL}/api/boards`;
		return axios.get(url).then(response => response.data);
	}  
	createBoard(board){
		const url = `${API_URL}/api/boards/`;
		return axios.post(url,board);
	}
}
