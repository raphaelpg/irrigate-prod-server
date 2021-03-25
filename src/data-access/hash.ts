import bcrypt from 'bcrypt';

const hashString: (word: string) => Promise<string> = (word) => {
  try {
    return bcrypt.hash(word, 10);
  } catch (e) {
    throw Error('Error hashing word');
  }
}

export default hashString;