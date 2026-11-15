import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 10 }, // Ramp-up ke 10 user
    { duration: '30s', target: 10 }, // Tahan di 10 user selama 30 detik
    { duration: '10s', target: 0 },  // Ramp-down ke 0
  ],
};

export default function () {
  http.get('http://localhost:3000/api');
  sleep(1);
}