import PropTypes from 'prop-types';

const colorMap = {
  Programming: 'bg-blue-100 text-blue-800',
  Design: 'bg-red-100 text-red-800',
  Marketing: 'bg-yellow-100 text-yellow-800',
  IN_PROGRESS: 'bg-blue-100 text-blue-800',
  COMPLETED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-gray-100 text-gray-800',
};

function Badge({ children, color }) {
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${colorMap[color] || 'bg-gray-100 text-gray-800'}`}>
      {children}
    </span>
  );
}

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
};

export default Badge; 