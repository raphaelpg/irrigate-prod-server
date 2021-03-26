import bcrypt from 'bcrypt';

const hashString: (word: string) => Promise<string> = (word) => {
  return bcrypt.hash(word, 10);
}

export default hashString;