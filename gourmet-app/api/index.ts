export const baseURL = 'https://ad-backend-production.up.railway.app/api/'
export const exampleId = '659d87ab6dc7b6a21793b539'
export const setBasicHeaders = () => {
    const token = false;
    if (token) {
      return {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "auth": JSON.parse(token),
      };
    } else {
      return {
        "Accept": "application/json",
        "Content-Type": "application/json",
      };
    }
  };