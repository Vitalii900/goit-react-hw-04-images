import { useState, useEffect} from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import '../components/App.css';
import getPhotoFromServer from './API';

export const App = () => {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(null);
  const [searchName, setSearchName] = useState(null);
  const [arrayOfPhoto, setArrayOfPhoto] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    if (!searchName) {
      return;
    }
    addResponseToState(searchName, page);
  }, [page, searchName]);

  const addResponseToState = async (value, page) => {
    setIsLoading(true);
    const { hits, totalHits } = await getPhotoFromServer(value, page);
    setArrayOfPhoto(state => {
      return [...state, ...hits];
    });
    setIsLoading(false);
    setTotal(totalHits);
  };

  const loadMore = () => {
    setPage(state => {
      return state + 1;
    });
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const reset = () => {
    setFilter(null);
  };

  const onImageClick = largeImage => {
    toggleModal();
    const findLargePhoto = arrayOfPhoto.filter(
      photo => photo.largeImageURL === largeImage
    );
    setFilter(findLargePhoto[0].largeImageURL);
  };

  const formSubmitHandler = name => {
    setSearchName(name);
    setPage(1);
    setTotal(null);
    setFilter(null);
    setShowModal(false);
    setIsLoading(false);
    setArrayOfPhoto([]);
  };

  return (
    <div className="container">
      <Searchbar onSubmit={formSubmitHandler}></Searchbar>
      <ImageGallery
        onImageClick={onImageClick}
        images={arrayOfPhoto}
      ></ImageGallery>
      {showModal && (
        <Modal reset={reset} onClose={toggleModal} image={filter}></Modal>
      )}
      {arrayOfPhoto.length !== 0 &&
        isLoading === false &&
        arrayOfPhoto.length < total && <Button loadMore={loadMore}></Button>}
      {isLoading && <Loader></Loader>}
    </div>
  );
};
