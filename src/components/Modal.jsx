import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropTypes } from "prop-types";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="bg-black bg-opacity-60 fixed top-0 left-0 w-full h-full flex justify-center items-center z-[999]">
      <div className="bg-slate-800 max-w-4xl max-h-full rounded-lg m-3 md:m-5">
        <div className="flex w-full justify-between items-center border-slate-600 border-b px-5 py-4">
          <h2 className='text-xl text-slate-200 font-medium'>{title}</h2>
          <button onClick={onClose} className="button bg-slate-700 pb-1 pt-2">
            <FontAwesomeIcon icon={faTimes} className='text-xl text-slate-200' />
          </button>
        </div>
        <div className="w-full p-5">
          {children}
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
 
export default Modal;