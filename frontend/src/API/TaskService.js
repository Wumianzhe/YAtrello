import { axInstance } from './Auth';

export default class TaskService {
  async createTask(task) {
    try {
      await axInstance.post(`/api/tasks/`,task);
    } catch (err) {
      console.log(err)
    }
  }
  async getTask(id) {
    try {
      const response = await axInstance.get(`/api/tasks/${id}`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
  async getComments(id) {
    try {
      const response = await axInstance.get(`/api/tasks/${id}/comments`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
  async getSubtasks(id) {
    try {
      const response = await axInstance.get(`/api/tasks/${id}/subtasks`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
  async deleteTask(id) {
    try {
      await axInstance.delete(`/api/tasks/${id}`);
    } catch (err) {
      console.log(err);
    }
  }
}
