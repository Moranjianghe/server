import userDao from '../dao/user';

const register = async (username: string, password: string) => {
  return await userDao.createUser(username, password);
};

const login = async (username: string, password: string) => {
  const user = await userDao.findUser(username, password);
  console.log('user =', user);
  // 确保 user 是一个有效的对象
  if (user && Array.isArray(user) && user.length > 0) {
    return { message: 'Login successful', user };
  } else {
    return { message: 'Invalid username or password' };
  }
};


export default { register, login };
