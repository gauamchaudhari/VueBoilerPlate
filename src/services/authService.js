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


}

export default new AuthService();
