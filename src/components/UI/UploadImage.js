import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";

class UploadImage extends Component {
  state = {
    image: null
  };

  // Handles the click event for uploading an image
  onUploadClickHandler = e => {
    const { firebase, mealDetail, firestore, toggleLoading } = this.props;
    const { image } = this.state;
    const storage = firebase.storage().ref(`meals/${mealDetail.id}`);

    // Toggles the loading state
    toggleLoading();

    // Uploads the image to Firebase storage
    storage.put(image).then(() => {
      // Retrieves the download URL for the uploaded image
      storage.getDownloadURL().then(img => {
        // Updates the meal details with the image URL
        const updatedMeal = {
          ...mealDetail,
          img
        };

        // Updates the Firestore document with the new meal details
        firestore
          .update({ collection: "meals", doc: mealDetail.id }, updatedMeal)
          .then(() => toggleLoading());
      });
    });
  };

  render() {
    const { image } = this.state;

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div
          className="file-field input-field"
          style={{ margin: "1rem 0 0 0" }}
        >
          <div className="btn orange darken-2">
            <span>Photo</span>
            <input
              type="file"
              onChange={event =>
                this.setState({ image: event.target.files[0] })
              }
            />
          </div>
          <div className="file-path-wrapper">
            <input
              className="file-path validate"
              type="text"
              style={{ margin: "0" }}
            />
          </div>
        </div>
        <button
          style={{ marginTop: "1rem" }}
          className="btn-small orange darken-2"
          onClick={this.onUploadClickHandler}
          disabled={!image}
        >
          <i className="material-icons">file_upload</i>
        </button>
      </div>
    );
  }
}

export default firestoreConnect()(UploadImage);
