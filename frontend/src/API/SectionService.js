import { axInstance } from './Auth';

/*
	getCustomers(): получает первую страницу клиентов.
	getCustomersByURL(): получает клиентов по URL. Это позволяет получить следующие страницы клиентов путем передачи таких ссылок, как /api/customers/?page=2.
	getCustomer(): получает клиента по первичному ключу.
	createCustomer(): создает клиента.
	updateCustomer(): обновляет клиента.
	deleteCustomer(): удаляет клиента.
 */

export default class SectionService {
	//constructor(){}
	async getSection(id) {
		try {
			const response = await axInstance.get(`/api/sections/${id}`);
			return response.data;
		} catch (error) {
			console.error(error);
		}
	}
	async deleteSection(section) {
		try {
			await axInstance.delete(`/api/section/${section.id}`);
		} catch (err) {
			console.log(err);
		}
	}
	async createSection(section) {
		try {
			await axInstance.post(`/api/sections/`, section);
		} catch (err) {
			console.log(err);
		}
	}
	async updateSection(section) {
		try {
			await axInstance.put(`/api/section/${section.id}`, section);
		} catch (err) {
			console.log(err);
		}
	}
}
