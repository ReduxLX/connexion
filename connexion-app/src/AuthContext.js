import React, { useState, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import firebase from "firebase/app";
import { auth, firestore } from "./firebase";
import * as actApp from "./store/App/ac-App";
import * as actHome from "./screens/Home/ac-Home";
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

  // Field values
  const increment = firebase.firestore.FieldValue.increment(1);
  const increment2 = firebase.firestore.FieldValue.increment(2);
  const decrement = firebase.firestore.FieldValue.increment(-1);
  const decrement2 = firebase.firestore.FieldValue.increment(-2);

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
    if (!user) return;
    user
      .updateProfile({
        displayName,
      })
      .then(() => console.log("Display name update -> ", displayName))
      .catch((e) => {
        console.log("Failed to update display name", e);
      });
  };

  const updateProfilePicture = (file) => {
    if (!file || !currentUser) return;
    const storageRef = firebase
      .storage()
      .ref(currentUser.uid + "/profilePicture/" + file.name);
    const profilePicsRef = storageRef.child("profile.jpg");
    profilePicsRef
      .put(file)
      .then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then((photoURL) => {
            console.log("File available at", photoURL);
            currentUser
              .updateProfile({
                photoURL,
              })
              .then(() =>
                console.log("Success in updating photo url -> ", photoURL)
              )
              .catch((e) => {
                console.log("Failed to update profile picture", e);
              });
          })
          .catch((e) => console.log("Failed to get picture URL ", e));
      })
      .catch((e) => console.log("Failed to upload image ", e));
  };

  // Firestore Refs
  const postRef = firestore.collection("posts");

  // Firestore Methods
  const addPost = (title, body, bodyPlain, university, categories) => {
    if (!currentUser || !title || !body || !bodyPlain || !university) {
      return showSnackbar("error", "Some post details are missing");
    }
    const { uid, displayName, photoURL } = currentUser;
    return postRef
      .add({
        uid,
        displayName,
        photoURL,
        title,
        body,
        bodyPlain,
        university,
        categories,
        views: 0,
        rating: 0,
        comments: 0,
        upvotedUsers: [],
        downvotedUsers: [],
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => showSnackbar("success", "Post added successfully"))
      .catch((e) => {
        const errorMsg = fbError(e.code, "Failed to add post");
        showSnackbar("error", errorMsg);
      });
  };

  const addPostComment = (postId, body) => {
    if (!postId || !currentUser || !body) return;
    postRef
      .doc(postId)
      .collection("comments")
      .add({
        uid: currentUser.uid,
        body,
        rating: 0,
        upvotedUsers: [],
        downvotedUsers: [],
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() =>
        postRef
          .doc(postId)
          .update({ comments: increment })
          .then(() => showSnackbar("success", "Post added successfully"))
          .catch((e) => {
            console.log("Failed to update comment counter");
          })
      )
      .catch((e) => {
        const errorMsg = fbError(e.code, "Failed to add comment");
        showSnackbar("error", errorMsg);
      });
  };

  // 3 cases: No up/down vote (+1), undo upvote (-1), undo downvote then upvote(+2)
  const upvotePost = (postId) => {
    if (!postId || !currentUser) return;
    postRef
      .doc(postId)
      .get()
      .then((doc) => {
        const { upvotedUsers, downvotedUsers } = doc.data();
        const userHasUpvoted = upvotedUsers.includes(currentUser.uid);
        const userHasDownvoted = downvotedUsers.includes(currentUser.uid);
        const updateObject = !userHasDownvoted
          ? {
              rating: !userHasUpvoted ? increment : decrement,
              upvotedUsers: userHasUpvoted
                ? firebase.firestore.FieldValue.arrayRemove(currentUser.uid)
                : firebase.firestore.FieldValue.arrayUnion(currentUser.uid),
            }
          : {
              rating: increment2,
              upvotedUsers: firebase.firestore.FieldValue.arrayUnion(
                currentUser.uid
              ),
              downvotedUsers: firebase.firestore.FieldValue.arrayRemove(
                currentUser.uid
              ),
            };
        postRef
          .doc(postId)
          .update(updateObject)
          .then(() => console.log("Upvote Success"))
          .catch((e) => console.log("Error Upvote -> ", e));
      })
      .catch((e) => console.log("Error Upvote", e));
  };

  // 3 cases: No up/down vote (-1), undo upvote (+1), undo downvote then upvote(+2)
  const downvotePost = (postId) => {
    if (!postId || !currentUser) return;
    postRef
      .doc(postId)
      .get()
      .then((doc) => {
        const { upvotedUsers, downvotedUsers } = doc.data();
        const userHasUpvoted = upvotedUsers.includes(currentUser.uid);
        const userHasDownvoted = downvotedUsers.includes(currentUser.uid);
        const updateObject = !userHasUpvoted
          ? {
              rating: !userHasDownvoted ? decrement : increment,
              downvotedUsers: userHasDownvoted
                ? firebase.firestore.FieldValue.arrayRemove(currentUser.uid)
                : firebase.firestore.FieldValue.arrayUnion(currentUser.uid),
            }
          : {
              rating: decrement2,
              upvotedUsers: firebase.firestore.FieldValue.arrayRemove(
                currentUser.uid
              ),
              downvotedUsers: firebase.firestore.FieldValue.arrayUnion(
                currentUser.uid
              ),
            };
        postRef
          .doc(postId)
          .update(updateObject)
          .then(() => console.log("Downvote Post Success"))
          .catch((e) => console.log("Error Downvote Post -> ", e));
      })
      .catch((e) => console.log("Error Downvote", e));
  };

  const upvoteComment = (postId, commentId) => {
    if (!postId || !commentId || !currentUser) return;
    postRef
      .doc(postId)
      .collection("comments")
      .doc(commentId)
      .get()
      .then((doc) => {
        const { upvotedUsers, downvotedUsers } = doc.data();
        const userHasUpvoted = upvotedUsers.includes(currentUser.uid);
        const userHasDownvoted = downvotedUsers.includes(currentUser.uid);
        const updateObject = !userHasDownvoted
          ? {
              rating: !userHasUpvoted ? increment : decrement,
              upvotedUsers: userHasUpvoted
                ? firebase.firestore.FieldValue.arrayRemove(currentUser.uid)
                : firebase.firestore.FieldValue.arrayUnion(currentUser.uid),
            }
          : {
              rating: increment2,
              upvotedUsers: firebase.firestore.FieldValue.arrayUnion(
                currentUser.uid
              ),
              downvotedUsers: firebase.firestore.FieldValue.arrayRemove(
                currentUser.uid
              ),
            };
        postRef
          .doc(postId)
          .collection("comments")
          .doc(commentId)
          .update(updateObject)
          .then(() => console.log("Upvote Comment Success"))
          .catch((e) => console.log("Error Upvote Comment -> ", e));
      })
      .catch((e) => console.log("Error Upvote Comment", e));
  };

  const downvoteComment = (postId, commentId) => {
    if (!postId || !commentId || !currentUser) return;
    postRef
      .doc(postId)
      .collection("comments")
      .doc(commentId)
      .get()
      .then((doc) => {
        const { upvotedUsers, downvotedUsers } = doc.data();
        const userHasUpvoted = upvotedUsers.includes(currentUser.uid);
        const userHasDownvoted = downvotedUsers.includes(currentUser.uid);
        const updateObject = !userHasUpvoted
          ? {
              rating: !userHasDownvoted ? decrement : increment,
              downvotedUsers: userHasDownvoted
                ? firebase.firestore.FieldValue.arrayRemove(currentUser.uid)
                : firebase.firestore.FieldValue.arrayUnion(currentUser.uid),
            }
          : {
              rating: decrement2,
              upvotedUsers: firebase.firestore.FieldValue.arrayRemove(
                currentUser.uid
              ),
              downvotedUsers: firebase.firestore.FieldValue.arrayUnion(
                currentUser.uid
              ),
            };
        postRef
          .doc(postId)
          .collection("comments")
          .doc(commentId)
          .update(updateObject)
          .then(() => console.log("Downvote Comment Success"))
          .catch((e) => console.log("Error Downvote Comment -> ", e));
      })
      .catch((e) => console.log("Error Downvote Comment", e));
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
        const errorMsg = fbError(e.code, "Failed to fetch comments");
        showSnackbar("error", errorMsg);
      });
  };

  const fetchSortRef = (sortBy) => {
    if (sortBy === "Latest") return postRef.orderBy("timestamp", "desc");
    else if (sortBy === "Oldest") return postRef.orderBy("timestamp");
    else if (sortBy === "Popular") return postRef.orderBy("rating", "desc");
  };

  const fetchAllPosts = (sortBy = "Latest") => {
    const sortRef = fetchSortRef(sortBy);
    dispatch(actHome.handleState("isFetchingPosts", true));
    return sortRef
      .get()
      .then((snapshot) => {
        const posts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(
          actHome.handleStateGlobal({
            posts,
            isFetchingPosts: false,
          })
        );
        console.log("Success fetching posts ", posts);
      })
      .catch((e) => {
        const errorMsg = fbError(e.code, "Failed to fetch posts");
        showSnackbar("error", errorMsg);
        dispatch(actHome.handleState("isFetchingPosts", false));
      });
  };

  const fetchAllPosts2 = () => {
    dispatch(actHome.handleState("isFetchingPosts", true));
    return postRef
      .orderBy("timestamp")
      .get()
      .then((snapshot) => {
        const posts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(
          actHome.handleStateGlobal({
            posts,
            isFetchingPosts: false,
          })
        );
        console.log("Success fetching posts ", posts);
      })
      .catch((e) => {
        const errorMsg = fbError(e.code, "Failed to fetch posts");
        showSnackbar("error", errorMsg);
        dispatch(actHome.handleState("isFetchingPosts", false));
      });
  };

  const fetchSinglePost = (postId) => {
    if (!postId) return;
    return postRef
      .doc(postId)
      .get()
      .then((doc) => {
        if (doc.exists) return doc.data();
      })
      .catch((e) => {
        const errorMsg = fbError(e.code, "Failed to fetch post");
        showSnackbar("error", errorMsg);
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
    updateProfilePicture,
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
    fetchSinglePost,
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
