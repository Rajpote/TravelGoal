export const getSentimentScore = (comment) => {
    // This is a placeholder. You can use a library like sentiment or any other approach.
    const positiveWords = ["good", "great", "excellent", "amazing"];
    const negativeWords = ["bad", "poor", "terrible", "awful"];
 
    let score = 0;
    comment.split(" ").forEach((word) => {
       if (positiveWords.includes(word.toLowerCase())) score += 1;
       if (negativeWords.includes(word.toLowerCase())) score -= 1;
    });
    return score;
 };
 