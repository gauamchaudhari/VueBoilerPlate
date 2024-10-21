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


  async roles() {
    const token = localStorage.getItem('authToken');
    const response = await axios.get(AppConstants.ROLES_LIST, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  }

  async getRole(id) {
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.get(`${AppConstants.ROLE_GET}/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching role:', error);
      throw error;
    }
  }

  async updateRole(id, roleData) {
    const token = localStorage.getItem('authToken');
    return axios.put(`${AppConstants.ROLE_UPDATE}/${id}`, roleData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  async deleteRole(id) {
    const token = localStorage.getItem('authToken');
    return axios.delete(`${AppConstants.ROLE_DELETE}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  async permissions() {
    const token = localStorage.getItem('authToken');
    const response = await axios.get(AppConstants.PERMISSIONS_LIST, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  }
}

export default new AuthService();
