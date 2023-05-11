import { axInstance } from './Auth';

export default class ProfileService {
  async createProfile(profile) {
    return axInstance.post(`/auth/users/`,profile)
  }
  async getProfile(id) {
    try {
      const response = await axInstance.get(`/api/profiles/${id}`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
  async getProfileList() {
    try {
      const response = await axInstance.get(`/auth/users/`);
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
  async getSubtasks(id) {
    try {
      const response = await axInstance.get(`/api/subtasks/by_user_id/${id}/`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
  async getGroups(id) {
    try {
      const response = await axInstance.get(`/api/profiles/${id}/groups`);
      return (response.data);
    } catch (err) {
      console.log(err);
    }
  }
  async createGroup(name){
    try{
      const responce = await axInstance.post(`/api/groups/`, {is_visible: true, name: name});
      return responce.data.id
    } catch(err){
      console.log(err)
    }
  }
  async addUsersToGroup(uidList, gid){
    try {
      await axInstance.post(`/api/groups/${gid}/add_users/`, {users: uidList})
    } catch (err){
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
  async updateProfile(id, user) {
    try {
      await axInstance.patch(`/api/profiles/${id}/`, user);
    } catch (err) {
      console.log(err);
    }
  }
}
