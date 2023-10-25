
const ScoreBar = ({ wrongCount, rightCount }) => {
  const total = wrongCount + rightCount;
  const wrongPercentage = (wrongCount / total) * 100;
  const rightPercentage = (rightCount / total) * 100;

  return (
    <div className="flex rounded-lg shadow-md">
      <div className={`bg-green-500 text-white p-2 w-${rightPercentage}% rounded-l-lg`}>
        {rightCount}
      </div>
      <div className={`bg-red-500 text-white p-2 w-${wrongPercentage}% rounded-r-lg`}>
        {wrongCount}
      </div>
    </div>
  );
};

export default ScoreBar;

