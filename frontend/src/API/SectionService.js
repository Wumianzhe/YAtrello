import axios from 'axios';
const API_URL = 'http://localhost:8080';

/*
    getCustomers(): получает первую страницу клиентов.
    getCustomersByURL(): получает клиентов по URL. Это позволяет получить следующие страницы клиентов путем передачи таких ссылок, как /api/customers/?page=2.
    getCustomer(): получает клиента по первичному ключу.
    createCustomer(): создает клиента.
    updateCustomer(): обновляет клиента.
    deleteCustomer(): удаляет клиента.
 */

export default class SectionService{
	
	//constructor(){}
	
	
	static async getSection2() {
		const url = `${API_URL}/api/boards/by_name/Board2`;
		return axios.get(url).then(response => response.data).catch(error => {console.error(error)});
	}  
	getSection() {
		const url = `${API_URL}/api/sections`;
		return axios.get(url).then(response => response.data).catch(error => {console.error(error)});
	}  
	getSectionByURL(link){
		const url = `${API_URL}${link}`;
		return axios.get(url).then(response => response.data);
	}
	getSectionById(pk) {
		const url = `${API_URL}/api/sections/${pk}`;
		return axios.get(url).then(response => response.data);
	}
	deleteSection(section){
		const url = `${API_URL}/api/section/${section.pk}`;
		return axios.delete(url);
	}
	createSection(section){
		const url = `${API_URL}/api/sections/`;
		return axios.post(url,section);
	}
	createSection2(section){
		const url = `${API_URL}/api/sections/`;
		return axios.post(url, {
            id: section.id,
            name: section.name,
            board_id: section.board_id,
        });
	}
	updateSection(section){
		const url = `${API_URL}/api/section/${section.pk}`;
		return axios.put(url,section);
	}
}
