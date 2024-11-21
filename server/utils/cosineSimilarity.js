export const cosineSimilarity = (vectorA, vectorB) => {
   const dotProduct = vectorA.reduce((acc, val, index) => acc + val * vectorB[index], 0);
   const magnitudeA = Math.sqrt(vectorA.reduce((acc, val) => acc + val * val, 0));
   const magnitudeB = Math.sqrt(vectorB.reduce((acc, val) => acc + val * val, 0));

   if (magnitudeA === 0 || magnitudeB === 0) return 0; // Avoid division by zero

   return dotProduct / (magnitudeA * magnitudeB);
};
