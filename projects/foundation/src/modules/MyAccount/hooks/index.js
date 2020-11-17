import { useQuery } from 'react-query';
import x from 'config/interceptor';
import { useStoreState } from 'easy-peasy';
import jwtDecode from 'jwt-decode';
import { getToken } from 'config/auth';

const getProfileImage = async (userId) => {
  const tokens = getToken();
  if (tokens?.token) {
    const { userId: userIdFromToken } = jwtDecode(tokens.token);

    const { data } = await x.get(
      `/usermgtservice/api/users/${userId || userIdFromToken}/profile`
    );

    const { targetArray = '', fileName = '' } = data?.baseMessage;

    if (targetArray && fileName) {
      const image = `data:image/${fileName
        .split('.')
        .pop()};base64,${targetArray}`;

      console.log('image', image);
      return image;
    }
    return '';
  }
};

export const useProfileImage = () => {
  const { user: { userId } = { userId: '' } } = useStoreState((state) => state);

  return useQuery('profileImage', getProfileImage(userId));
};
