import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from './App.styled';
import { fetchImages } from 'services/api';
import { mapPictures } from 'services/mapPictures';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Modal from 'components/Modal';
import Loader from 'components/Loader';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(null);
  const [error, setError] = useState(null);
  // const isFirstRender = useRef(true);

  useEffect(() => {
    // if (isFirstRender.current) {
    //   isFirstRender.current = false;
    //   return;
    // }

    if (inputValue === '') {
      return;
    }

    const updateImages = () => {
      setIsLoading(true);
      try {
        fetchImages(inputValue, page).then(data => {
          if (!data.hits.length) {
            return toast.error(
              'There is no images with this request, please, try again'
            );
          }
          const newImages = mapPictures(data.hits);
          setImages(images => [...images, ...newImages]);
        });
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    updateImages();
  }, [inputValue, page]);

  const handleSearchSubmit = inputValue => {
    setInputValue(inputValue);
    setImages([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(page => page + 1);
  };

  const showModalImage = largeImageURL => {
    const image = images.find(image => image.largeImageURL === largeImageURL);
    setShowModal({
      largeImageURL: image.largeImageURL,
      tags: image.tags,
    });
  };

  const closeModalImage = () => {
    setShowModal(null);
  };

  return (
    <Container>
      <Searchbar onSearch={handleSearchSubmit} />
      {error && toast.warning(`Ooops, something went wrong: ${error.message}`)}
      {isLoading && <Loader />}
      {images.length > 0 && (
        <>
          <ImageGallery images={images} openModal={showModalImage} />
          <Button loadMore={loadMore} />
        </>
      )}
      {showModal && (
        <Modal
          lgImage={showModal.largeImageURL}
          tags={showModal.tags}
          closeModal={closeModalImage}
        />
      )}

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
};

// class App extends Component {
//   state = {
//     inputValue: '',
//     images: [],
//     page: 1,
//     isLoading: false,
//     showModal: null,
//     error: null,
//   };

//   componentDidUpdate(_, prevState) {
//     const prevSearch = prevState.inputValue;
//     const currentSearch = this.state.inputValue;
//     const prevPage = prevState.page;
//     const currentPage = this.state.page;

//     if (prevSearch !== currentSearch || prevPage !== currentPage) {
//       this.updateImages();
//     }
//   }

//   async updateImages() {
//     const { inputValue, page } = this.state;
//     this.setState({ isLoading: true });
//     try {
//       await fetchImages(inputValue, page).then(res => {
//         if (!res.data.hits.length) {
//           return toast.error(
//             'There is no images with this request, please, try again'
//           );
//         }
//         const newImages = mapPictures(res.data.hits);
//         this.setState({
//           images: [...this.state.images, ...newImages],
//         });
//       });
//     } catch (error) {
//       this.setState({ error });
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   }

//   handleSearchSubmit = inputValue => {
//     this.setState({
//       inputValue,
//       images: [],
//       page: 1,
//     });
//   };

//   loadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   showModalImage = largeImageURL => {
//     const image = this.state.images.find(
//       image => image.largeImageURL === largeImageURL
//     );
//     this.setState({
//       showModal: {
//         largeImageURL: image.largeImageURL,
//         tags: image.tags,
//       },
//     });
//   };

//   closeModalImage = () => {
//     this.setState({ showModal: null });
//   };

//   render() {
//     const { images, isLoading, error, showModal } = this.state;
//     const { handleSearchSubmit, showModalImage, loadMore, closeModalImage } =
//       this;
//     return (
//       <Container>
//         <Searchbar onSearch={handleSearchSubmit} />
//         {error &&
//           toast.warning(`Ooops, something went wrong: ${error.message}`)}
//         {isLoading && <Loader />}
//         {images.length > 0 && (
//           <>
//             <ImageGallery images={images} openModal={showModalImage} />
//             <Button loadMore={loadMore} />
//           </>
//         )}
//         {showModal && (
//           <Modal
//             lgImage={showModal.largeImageURL}
//             tags={showModal.tags}
//             closeModal={closeModalImage}
//           />
//         )}

//         <ToastContainer
//           position="top-right"
//           autoClose={4000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//         />
//       </Container>
//     );
//   }
// }

export default App;
