import React, { useState, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import firebase from "firebase/app";
import { auth, firestore } from "./firebase";
import * as actApp from "./store/App/ac-App";
import { showSnackbar, fbError } from "./utils";

const AuthContext = React.createContext();

// Provides access to AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  // Authentication Methods
  const signup = (username, email, password) => {
    dispatch(actApp.handleState("isLoading", true));
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        updateDisplayName(result.user, username);
        showSnackbar("success", "Welcome to Connexion " + username);
        dispatch(actApp.handleState("isLoading", false));
      })
      .catch((e) => {
        const errorMsg = fbError(e.code, "Failed to sign up");
        showSnackbar("error", errorMsg);
        dispatch(actApp.handleState("isLoading", false));
      });
  };

  const signinGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    dispatch(actApp.handleState("isLoading", true));
    return auth
      .signInWithPopup(provider)
      .then((result) => {
        const username = result ? result.user.displayName : "";
        showSnackbar("success", "Welcome to Connexion " + username);
        dispatch(actApp.handleState("isLoading", false));
      })
      .catch((e) => {
        const errorMsg = fbError(e.code, "Failed to sign in");
        showSnackbar("error", errorMsg);
        dispatch(actApp.handleState("isLoading", false));
      });
  };

  const login = (email, password) => {
    dispatch(actApp.handleState("isLoading", true));
    return auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        showSnackbar("success", "Welcome back");
        dispatch(actApp.handleState("isLoading", false));
      })
      .catch((e) => {
        const errorMsg = fbError(e.code, "Failed to sign in");
        showSnackbar("error", errorMsg);
        dispatch(actApp.handleState("isLoading", false));
      });
  };

  const logout = () => {
    return auth
      .signOut()
      .then(() => {
        showSnackbar("success", "Logged out");
      })
      .catch((e) => {
        const errorMsg = fbError(e.code, "Failed to log out");
        showSnackbar("error", errorMsg);
      });
  };

  // Update User details
  const updateDisplayName = (user, displayName) => {
    if (user) {
      user
        .updateProfile({
          displayName,
        })
        .then(() => console.log("Display name update -> ", displayName))
        .catch((e) => {
          console.log("Failed to update display name", e);
        });
    }
  };

  // Firestore Refs
  const postRef = firestore.collection("posts");

  // Firestore Methods
  const addPost = (title, body, university, categories) => {
    if (!currentUser || !title || !body || !university) return;
    return postRef
      .add({
        uid: currentUser.uid,
        title,
        body,
        university,
        categories,
        views: 0,
        rating: 0,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => console.log("Post added successfully"))
      .catch((e) => console.log("Error Adding post", e));
  };

  const addPostComment = (postId, body) => {
    if (!postId || !currentUser || !body) return;
    return postRef
      .doc(postId)
      .collection("comments")
      .add({
        uid: currentUser.uid,
        body,
        rating: 0,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => console.log("Comment added successfully"))
      .catch((e) => console.log("Error Adding comment", e));
  };

  const increment = firebase.firestore.FieldValue.increment(1);
  const decrement = firebase.firestore.FieldValue.increment(-1);

  const upvotePost = (postId) => {
    if (!postId) return;
    return postRef
      .doc(postId)
      .update({ rating: increment })
      .then(() => console.log("Upvote Success"))
      .catch((e) => console.log("Error Upvote -> ", e));
  };

  const downvotePost = (postId) => {
    if (!postId) return;
    return postRef
      .doc(postId)
      .update({ rating: decrement })
      .then(() => console.log("Downvote Success"))
      .catch((e) => console.log("Error Downvote -> ", e));
  };

  const upvoteComment = (postId, commentId) => {
    if (!postId || !commentId) return;
    return postRef
      .doc(postId)
      .collection("comments")
      .doc(commentId)
      .update({ rating: increment })
      .then(() => console.log("Upvote Comment Success"))
      .catch((e) => console.log("Error Upvote Comment -> ", e));
  };

  const downvoteComment = (postId, commentId) => {
    if (!postId || !commentId) return;
    return postRef
      .doc(postId)
      .collection("comments")
      .doc(commentId)
      .update({ rating: decrement })
      .then(() => console.log("Downvote Comment Success"))
      .catch((e) => console.log("Error Downvote Comment -> ", e));
  };

  const viewPost = (postId) => {
    if (!postId) return;
    return postRef
      .doc(postId)
      .update({ views: increment })
      .then(() => console.log("View Post Success"))
      .catch((e) => console.log("Error View Post -> ", e));
  };

  const fetchPostComments = (postId) => {
    if (!postId) return;
    return postRef
      .doc(postId)
      .collection("comments")
      .get()
      .then((snapshot) =>
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      )
      .catch((e) => {
        console.log("Error fetching Comment -> ", e);
      });
  };

  const fetchAllPosts = () => {
    return postRef
      .get()
      .then((snapshot) =>
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      )
      .catch((e) => {
        console.log("Error fetching all posts -> ", e);
      });
  };

  // onAuthStateChanged:
  // Observe changes to user so we can show an error/redirect to page
  // Takes in a user which will either be current user or null
  // This must be inside a useEffect so it runs once and that it unsubscribes
  // when the component unmounts (assign to unsubscribe and return it)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("Set current user ->", user);
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    updateDisplayName,
    signup,
    login,
    logout,
    signinGoogle,
    addPost,
    upvotePost,
    downvotePost,
    upvoteComment,
    downvoteComment,
    fetchAllPosts,
    fetchPostComments,
    addPostComment,
    viewPost,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
