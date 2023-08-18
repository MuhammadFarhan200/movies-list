import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BackButton = () => {
  return (
    <div className='container mx-auto p-5 sm:p-10'>
      <button onClick={() => history.back()} className='block w-fit button py-3 my-5 ms-auto'>
        <FontAwesomeIcon icon={faArrowLeft} className='me-1' /> Back to Before
      </button>
    </div>
  );
}
 
export default BackButton;