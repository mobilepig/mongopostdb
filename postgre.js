const { Pool } = require("pg");
require("dotenv").config(); // dotenv 라이브러리를 사용하여 .env 파일의 환경 변수 로드

// PostgreSQL 연결 정보
const pool = new Pool({
  user: process.env.POSTGRE_USER,
  host: process.env.POSTGRE_HOST,
  database: process.env.POSTGRE_DATABASE,
  password: process.env.POSTGRE_PASSWORD,
  port: process.env.POSTGRE_PORT, // PostgreSQL 포트 번호
  max: 20, // Connection Pool의 최대 연결 수
  idleTimeoutMillis: 30000, // 연결이 유휴 상태로 유지되는 시간 (밀리초)
});

// 간단한 쿼리 실행 예제
// pool.query("SELECT NOW()", (err, res) => {
//   console.log(err ? err.stack : res.rows[0].now);
//   console.log("바보");
//   pool.end(); // 연결 풀 종료
// });

pool.query(
  "SELECT table_name FROM information_schema.tables WHERE table_schema = $1",
  ["public"],
  (err, res) => {
    if (err) {
      console.error("Error executing query:", err);
    } else {
      console.log(
        "Table Names:",
        res.rows.map((row) => row.table_name)
      );
    }
    pool.end(); // 연결 풀 종료
  }
);
