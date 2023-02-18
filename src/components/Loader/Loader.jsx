import { Dna } from 'react-loader-spinner';
import '../Loader/Loader.css';

export function Loader() {
  return (
    <Dna
      visible={true}
      height="80"
      width="80"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
    />
  );
}
