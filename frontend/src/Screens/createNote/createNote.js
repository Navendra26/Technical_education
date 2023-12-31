// react-markdown -> whenever we type anything it helps to convert file into markdown file like README.md file

import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createNoteAction } from "../../actions/notesAction";
import Loading from "../../components/Loading";
import ReactMarkdown from "react-markdown";
import Mainscreen from "../../components/Mainscreen";
import ErrorMessage from "../../components/Errormessage";
import { useNavigate } from "react-router-dom";

function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [files, setfiles] = useState([]);
  const [videoCaption, setVideoCap] = useState([]);
  const [ ytVideos, setytVideos] = useState([]);

  const dispatch = useDispatch();
  
  const navigate = useNavigate();

  const noteCreate = useSelector((state) => state.noteCreate);  // taking state from noteReducer
  const { loading, error } = noteCreate;

  const userLogin = useSelector((state) => state.userLogin); //using this state becoz we want to go on login screen page whenever user logout
  const { userInfo } = userLogin;

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
    setAuthor("");
    setfiles([]);
    setVideoCap([]);
    setytVideos([]);
  };
 
  const createdBy = userInfo.name;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createNoteAction(title, content, category, author, files, videoCaption, ytVideos, createdBy));
    if (!title || !content || !category || !author) return;
 
    resetHandler();
    navigate(-1);
  };
  
  useEffect(() => {}, []);

  // cloudnary allow us to upload images (this is the logic to upload an image over here to the cloudinary)
 const postDetails = (pics) => {

   if(!pics) {
   return setfiles(null)
   }
    // this is generic code while uploading photos and files with cloudinary or with anything
   const imageArray = Array.from(pics);
   const urlArray=[];
   imageArray.forEach((image) => {
   const data = new FormData();      // whenever we want to uplode new file we create new FormData <-- basic html
    data.append('file', image);
     data.append('upload_preset', 'notezipper');  
     data.append('cloud_name', 'mysuperclouds');  
     fetch("https://api.cloudinary.com/v1_1/mysuperclouds/image/upload", {
       method:"post",
       body: data,
     })
      .then((res) => res.json())
      .then((data) => {
        const url = data.url.toString();
       urlArray.push(url); 
      })
      .catch((err) => {
        console.log(err);
      });
   });
   setfiles(urlArray);
  }
 
  return (
    <Mainscreen title="CREATE A CONTENT">
      <Card>
        <Card.Header>Create a new Content</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {loading && <Loading/>}
            <Form.Group controlId="title">
              <Form.Label>Title*</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content*</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                placeholder="Enter the content"
                rows={4}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Content Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="category">
              <Form.Label>Category*</Form.Label>
              <Form.Control
                type="category"
                value={category}
                placeholder="Enter the Category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="author">
              <Form.Label>Author Name*</Form.Label>
              <Form.Control
                type="author"
                value={author}
                placeholder="Enter the Author Name"
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Form.Group>
            <Form.Group >
           <Form.Label>Upload related Pictures(if necessory)</Form.Label>
            <Form.Control multiple
              onChange={(e) => postDetails(e.target.files)}  // files[0] means if selected more than one image only first img will going to select 
              id="custom-file"
              type="file"
              label="Upload related Picture"
              custom="true"
            />
          </Form.Group>
          <Form.Group controlId="ytVideos">
              <Form.Label>YouTube Video links (if any)</Form.Label>
              <Form.Control multiple
                type="ytVideos"
                name="Arrays[]"
               value={ytVideos}
                placeholder="Put your video link here"
                onChange={(e) => setytVideos(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="videoCaption">
              <Form.Label>Caption to for your youtube video link</Form.Label>
              <Form.Control multiple
                type="videoCaption"
                name="Arrays[]"
                value={videoCaption}
                placeholder="video title"
                onChange={(e) => setVideoCap(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Create Your Content
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating by - {createdBy}  <br/>
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </Mainscreen>
  );
}

export default CreateNote;