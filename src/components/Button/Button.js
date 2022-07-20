import PropTypes from 'prop-types';
import { LoadBtn } from './Button.styled';

const Button = ({ loadMore }) => {
  return (
    <LoadBtn type="button" onClick={loadMore}>
      Load more
    </LoadBtn>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};

export default Button;
