/* eslint-disable no-console */

import axios from 'axios';
import config from './config/config';

const HTTP = axios.create(config);

export default HTTP;
