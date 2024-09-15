import axios from 'axios';
import AppConstants from '@/config/constants';
class AuthService {
  async register(userData) {
    const response = await axios.post(AppConstants.REGISTRATION_URL, userData);
    return response.data;
  }
  async login(email, password) {
    const response = await axios.post(AppConstants.LOGIN_URL, { email, password });
    return response.data;
  }

  async users() {
    const token = localStorage.getItem('authToken');
    const response = await axios.get(AppConstants.USERS_LIST, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  }

  async getUser(id) {
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.get(`${AppConstants.USER_GET}/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  async updateUser(id, userData) {
    const token = localStorage.getItem('authToken');
    return axios.put(`${AppConstants.USER_UPDATE}/${id}`, userData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  async deleteUser(id) {
    const token = localStorage.getItem('authToken');
    // USER_DELETE
    return axios.delete(`${AppConstants.USER_DELETE}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }


}

export default new AuthService();
