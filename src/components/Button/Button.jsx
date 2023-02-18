import '../Button/Button.css'
import PropTypes from 'prop-types';

export function Button({ loadMore }) {
  return (
    <button onClick={loadMore} className="button" type="button">
      Load more
    </button>
  );
}

Button.propTypes = {
  loadMore: PropTypes.func
};