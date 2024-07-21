const ContentBasedRecommender = require("content-based-recommender");
const recommender = new ContentBasedRecommender({
  minScore: 0.1,
  maxSimilarDocuments: 100,
});

// prepare documents data
const documents = [
  { id: "1000001", content: "Why studying javascript is fun?" },
  { id: "1000002", content: "The trend for javascript in machine learning" },
  { id: "1000003", content: "The most insightful stories about JavaScript" },
  { id: "1000004", content: "Introduction to Machine Learning" },
  { id: "1000005", content: "Machine learning and its application" },
  { id: "1000006", content: "Python vs Javascript, which is better?" },
  { id: "1000007", content: "How Python saved my life?" },
  { id: "1000008", content: "The future of Bitcoin technology" },
  {
    id: "1000009",
    content: "Is it possible to use javascript for machine learning?",
  },
];

// start training
recommender.train(documents);

//get top 10 similar items to document 1000002
const similarDocuments = recommender.getSimilarDocuments("1000007", 0, 10);

console.log(similarDocuments);
/*
  the higher the score, the more similar the item is
  documents with score < 0.1 are filtered because options minScore is set to 0.1
  [
    { id: '1000004', score: 0.5114304586412038 },
    { id: '1000009', score: 0.45056313558918837 },
    { id: '1000005', score: 0.37039308109283564 },
    { id: '1000003', score: 0.10896767690747626 }
  ]
*/
