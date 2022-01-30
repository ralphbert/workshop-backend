import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';

export function getDatabase(name: string) {
  console.log('created database', name);
  return new JsonDB(new Config(name, true, true, '/'));
}
