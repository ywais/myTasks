import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import ErrorBoundary from './ErrorBoundary';
import Content from './Content';
import Count from './Count';
import './App.css';
const Comment = lazy(() =>import('./Comment'));

function App() {
  const [comments, setComments] = useState([]);
  const nameRef = useRef();
  const contentRef = useRef();
  const ButtonRef = useRef();

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const onChange = (event, field) => {
    if(event.keyCode === 13) {
      switch (field) {
        case 'name':
          contentRef.current.focus();
          break;
        case 'content':
          ButtonRef.current.click();
          break;
        default:
          break;
      }
    }
  }
  
  const handleClick = (event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const content = contentRef.current.value;
    if(content !== '') {
      if(content === 'throw error') {
        throw Error('bad choice')
      }
      const newComments = [...comments];
      newComments.push({name: name ? name : 'anonymous', content: content});
      setComments(newComments);
      nameRef.current.value = '';
      contentRef.current.value = '';
      nameRef.current.focus();
    } else {
      contentRef.current.focus();
    }
  }
  const printComments = () => {
    if(comments.length > 0) {
      return comments.map((comment, index) => {
        return (
          <Suspense fallback={<p>Loading...</p>}>
            <Comment comment={comment} index={index} />
          </Suspense>
        ) 
      })
    } else {
      return (
        <div className='commentPlaceholder'>
          <p>Be the first one to comment!</p>
        </div>
      )
    }
  }

  return (
    <div className='blogContent'>
      <div className='postContent'>
        <h2>First Latin Post</h2>
        <ErrorBoundary>
          <Content />  
        </ErrorBoundary>
        <div className="commentsSection">
          <h3>
          <ErrorBoundary>
            <Count comments={comments}/>  
          </ErrorBoundary>
            Comments
          </h3>
          {printComments()}
        </div>
      </div>
      <div className='commentsForm'>
        {/* <form> */}
          <fieldset>
            <legend>Add a comment</legend>
            <input ref={nameRef} onKeyUp={(event) => onChange(event, 'name')} placeholder='Name' /><br />
            <input ref={contentRef} onKeyUp={(event) => onChange(event, 'content')} placeholder='Content' /><br />
            <button ref={ButtonRef} onClick={handleClick}>Submit</button>
          </fieldset>
        {/* </form> */}
      </div>
    </div>
  );
}

export default App;
