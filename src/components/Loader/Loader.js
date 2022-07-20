import { TailSpin } from 'react-loader-spinner';
import { LoadSpinner } from './Loader.styled';
const Loader = () => {
  return (
    <LoadSpinner>
      <TailSpin height="100" width="100" color="#a2c893" ariaLabel="loading" />
    </LoadSpinner>
  );
};

export default Loader;
