import { axInstance } from './Auth';

export default class ProfileService {
  async getProfile(id) {
    try {
      const response = await axInstance.get(`/api/profiles/${id}`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
  async getTasks(id) {
    try {
      const response = await axInstance.get(`/api/profiles/${id}/tasks`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
  async getGroups(id) {
    try {
      const response = await axInstance.get(`/api/profiles/${id}/groups`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
  async getBoards(id) {
    try {
      const response = await axInstance.get(`/api/profiles/${id}/boards`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
  async deleteProfile(id) {
    try {
      await axInstance.delete(`/api/profiles/${id}`);
    } catch (err) {
      console.log(err);
    }
  }
  async updateProfile(profile) {
    try {
      await axInstance.put(`/api/profile/${profile.id}`, profile);
    } catch (err) {
      console.log(err);
    }
  }
}
