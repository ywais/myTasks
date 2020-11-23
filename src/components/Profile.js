import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

function Profile(props) {
  const firestore = props.firebase.firestore();
  const booksRef = firestore.collection("Books");
  booksRef.get();
  const [books] = useCollectionData(booksRef);

  const usersRef = firestore.collection("users");
  usersRef.get();
  const [users] = useCollectionData(usersRef);
  
  const currentUser = users && users.find(user => user.uid === props.user.uid);
    
  const saveToFirestorm = () => {
    booksRef.add({
      author: "me",
      title: "my",
      year: 2020
    })
  }

  return (
    <div>
      <h1>
        Welcome {props.user.displayName || props.user.email}!
      </h1>
      {currentUser && currentUser.imgUrl && <img src={currentUser.imgUrl} alt="user's profile" width={100}/>}
      <button onClick={() => firebase.auth().signOut()}>Sign Out</button>
      <button onClick={saveToFirestorm}>save to firestore</button>
      {books && books.map((book, index) => {
        return (
          <p key={index}>"{book.title}" by {book.author}</p>
        )
      })}
    </div>
  );
}

export default Profile;
