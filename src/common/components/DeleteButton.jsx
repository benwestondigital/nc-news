const DeleteButton = ({ handleDelete }) => {
  return (
    <div className='Comment__deletebox'>
      <button type='button' onClick={handleDelete} className='Comment__delete'>
        Delete
      </button>
    </div>
  );
};

export default DeleteButton;
