import config from '../config/ormConfig';
import { DataSource } from 'typeorm';

export default new DataSource(config);
