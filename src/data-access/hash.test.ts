import bcrypt from 'bcrypt';
import hashString from './hash';

test('properly hash string', () => {
  const word = "HashMe";
  const hashedWord = bcrypt.hash(word, 10);
  expect(hashedWord).toEqual(hashString(word));
});