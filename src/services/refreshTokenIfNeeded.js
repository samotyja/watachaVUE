import axios from 'axios';

const refreshTokenIfNeeded = async () => {
  const expiresAt = localStorage.getItem('spotify_token_expiration');
  const now = Date.now();

  if (expiresAt && now >= parseInt(expiresAt)) {
    const refreshToken = localStorage.getItem('spotify_refresh_token');
    try {
      const response = await axios.post('https://api.watacha.live/refresh-token', { refreshToken });
      // const response = await axios.post('http://localhost:3000/refresh-token', { refreshToken });
      const { access_token, expires_in} = response.data;
      if (response.data.refresh_token) {
        localStorage.setItem('spotify_refresh_token', response.data.refresh_token);
        console.log('Zmiana tokenu odświeżania!');
      }
      
      localStorage.setItem('spotify_access_token', access_token);
      localStorage.setItem('spotify_token_expiration', Date.now() + expires_in * 1000);
      console.log('Token dostepu odświeżony');
    } catch (error) {
      console.error('Nie udało się odświeżyć tokenu', error);
      throw error;
    }
  } else {
    console.log('Token nadal aktualny...');
    }
  }

export { refreshTokenIfNeeded };