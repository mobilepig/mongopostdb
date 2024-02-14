const { MongoClient } = require("mongodb");
require("dotenv").config();

// MongoDB 서버 URI 및 데이터베이스 이름
const dbSecret = {
  user: process.env.MONGO_USER,
  host: process.env.MONGO_HOST,
  database: process.env.MONGO_DATABASE,
  password: process.env.MONGO_PASSWORD,
  port: process.env.MONGO_PORT,
};

const uri = `mongodb://${dbSecret.user}:${dbSecret.password}@${dbSecret.host}:${dbSecret.port}`;
const dbName = dbSecret.database;

console.log(uri);

// MongoDB 클라이언트 생성
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectMongoDB() {
  try {
    // MongoDB에 연결
    await client.connect();

    // 데이터베이스 선택 (없는 경우 자동으로 생성됨)
    const db = client.db(dbName);

    console.log("Connected to MongoDB");

    // 이후 작업을 수행할 수 있습니다.
    // 컬렉션 목록 가져오기
    const collections = await db.listCollections().toArray();
    console.log("Collections in the database:");
    collections.forEach((collection) => {
      console.log(collection.name);
    });

    // 특정 컬렉션의 모든 데이터 보기
    const collectionName = "testCollection";
    const collection = db.collection(collectionName);
    const allData = await collection.find({}).toArray();
    console.log(`All data in collection '${collectionName}':`);
    console.log(allData);

    // 특정 컬렉션에 데이터 insert
    // const collection = db.collection(collectionName);
    const dataToInsert = { name: "choJinSung" }; // 여기서 "yourFieldName"과 "yourValue"는 추가할 필드명과 값입니다.
    const result1 = await collection.insertOne(dataToInsert);
    console.log(`Inserted document with _id: ${result1.insertedId}`);

    // 데이터 삭제
    const filter = { yourFieldName: "yourValue" };
    const result2 = await collection.deleteOne(filter);
    console.log(`Deleted ${result2.deletedCount} document(s)`);

    // 조회하고나서 하나씩 순회하면서 js array메서드로 변경하면 됨
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  } finally {
    // 연결을 닫습니다.
    await client.close();
  }
}

// MongoDB에 연결
connectMongoDB();
