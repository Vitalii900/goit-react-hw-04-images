import { useState, useEffect, useRef } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import '../components/App.css';
import getPhotoFromServer from './API';

export const App = () => {
  // state = {
  //   page: 1,
  //   total: null,
  //   searchName: null,
  //   arrayOfPhoto: [],
  //   isLoading: false,
  //   showModal: false,
  //   filter: null,
  // };
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(null);
  const [searchName, setSearchName] = useState(null);
  const [arrayOfPhoto, setArrayOfPhoto] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState(null);

  const skipFirstRender = useRef(true);

  useEffect(() => {
    // if (searchName === null) {
    //   console.log('return');
    //   return;
    // }
    // setArrayOfPhoto([]);
    // setPage(1);
    // addResponseToState(searchName, page);
    // ====================================
    if (skipFirstRender.current) {
      skipFirstRender.current = false;
      console.log('return');
      return;
    }
    setArrayOfPhoto([]);
    setPage(1);
    addResponseToState(searchName, page);
    console.log('API');
    // ==================================
  }, [searchName]);

  // useEffect(() => {
  //   addResponseToState(searchName, page);
  // }, [page]);

  // componentDidUpdate(prevProps, prevState) {
  //   const { searchName, page } = this.state;
  //   if (searchName !== prevState.searchName) {
  //     this.setState({ arrayOfPhoto: [], page: 1 });
  //     this.addResponseToState(searchName, page);
  //   }
  //   if (page !== prevState.page) {
  //     this.addResponseToState(searchName, page);
  //   }
  // }

  const addResponseToState = async (value, page) => {
    setIsLoading(true);
    // this.setState({ isLoading: true });
    const { hits, totalHits } = await getPhotoFromServer(value, page);
    setArrayOfPhoto(state => {
      return [...state, ...hits];
    });
    setIsLoading(false);
    setTotal(totalHits);
    // this.setState(prevProps => ({
    //   arrayOfPhoto: [...prevProps.arrayOfPhoto, ...hits],
    //   isLoading: false,
    //   total: totalHits,
    // }));
  };

  const loadMore = () => {
    setPage(state => {
      return state + 1;
    });
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    // this.setState(({ showModal }) => ({ showModal: !showModal }));
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
    // this.setState({ filter: findLargePhoto[0].largeImageURL });
  };

  const formSubmitHandler = name => {
    setSearchName(name);
    // this.setState({
    //   searchName: name,
    // });
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
