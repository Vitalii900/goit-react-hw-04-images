import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import '../components/App.css'
import getPhotoFromServer from './API';

export class App extends Component {
  state = {
    page: 1,
    total: null,
    searchName: null,
    arrayOfPhoto: [],
    isLoading: false,
    showModal: false,
    filter: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchName, page } = this.state;
    if (searchName !== prevState.searchName) {
      this.setState({ arrayOfPhoto: [], page: 1 });
      this.addResponseToState(searchName, page);
    }
    if (page !== prevState.page) {
      this.addResponseToState(searchName, page);
    }
  }

  addResponseToState = async (value, page) => {
    this.setState({ isLoading: true });
    const { hits, totalHits } = await getPhotoFromServer(value, page);
    this.setState(prevProps => ({
      arrayOfPhoto: [...prevProps.arrayOfPhoto, ...hits],
      isLoading: false,
      total: totalHits,
    }));
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  reset = () => {
    this.setState(({ filter }) => ({ filter: null }));
  };

  onImageClick = largeImage => {
    this.toggleModal();
    const findLargePhoto = this.state.arrayOfPhoto.filter(
      photo => photo.largeImageURL === largeImage
    );
    this.setState({ filter: findLargePhoto[0].largeImageURL });
  };

  formSubmitHandler = data => {
    this.setState({
      searchName: data.name,
    });
  };

  render() {
    const { arrayOfPhoto, isLoading, showModal, filter, total } = this.state;
    return (
      <div className="container">
        <Searchbar onSubmit={this.formSubmitHandler}></Searchbar>
        <ImageGallery
          onImageClick={this.onImageClick}
          images={arrayOfPhoto}
        ></ImageGallery>
        {showModal && (
          <Modal
            reset={this.reset}
            onClose={this.toggleModal}
            image={filter}
          ></Modal>
        )}
        {arrayOfPhoto.length !== 0 && isLoading === false && arrayOfPhoto.length < total && <Button loadMore={this.loadMore}></Button>}
        {isLoading && <Loader></Loader>}
      </div>
    );
  }
}
