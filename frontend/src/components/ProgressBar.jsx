import PropTypes from 'prop-types';

function ProgressBar({ value, max = 100, color = 'blue' }) {
  const percent = Math.min(100, Math.round((value / max) * 100));
  const colorClass =
    color === 'blue'
      ? 'bg-blue-600'
      : color === 'red'
      ? 'bg-red-600'
      : color === 'yellow'
      ? 'bg-yellow-500'
      : 'bg-gray-400';

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className={`${colorClass} h-2.5 rounded-full transition-all duration-300`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number,
  color: PropTypes.string,
};

export default ProgressBar; 