import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 20 },
    { duration: '30s', target: 100 }, // Menaikkan beban secara agresif
    { duration: '10s', target: 0 },
  ],
};

export default function () {
  http.get('http://localhost:3000/api');
  sleep(1);
}