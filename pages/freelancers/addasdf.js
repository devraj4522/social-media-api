import React, { useReducer, useState } from "react";
import upload from "@/utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {createGig} from "@/utils/authUser"
import { useRouter } from 'next/router';
import axios from "axios";
import { toast } from "react-toastify";

export const INITIAL_STATE = {
  userId: JSON.parse(localStorage.getItem("currentUser"))?._id,
  title: "",
  cat: "",
  cover: "",
  images: [],
  desc: "",
  shortTitle: "",
  shortDesc: "",
  deliveryTime: 0,
  revisionNumber: 0,
  features: [],
  price: 0,
};

export const gigReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "ADD_IMAGES":
      return {
        ...state,
        cover: action.payload.cover,
        images: action.payload.images,
      };
    case "ADD_FEATURE":
      return {
        ...state,
        features: [...state.features, action.payload],
      };
    case "REMOVE_FEATURE":
      return {
        ...state,
        features: state.features.filter(
          (feature) => feature !== action.payload
        ),
      };

    default:
      return state;
  }
};



const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [state, setState] = useState(INITIAL_STATE);
  const router = useRouter();

  const handleChange = (e) => {
    
    setState({
      ...state,
     [e.target.name]: e.target.value,
    })
  };
  
  const handleFeature = (e) => {
    e.preventDefault();
    setState({...state, features: [...state.features, e.target[0].value]})
    e.target[0].value = "";
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      setState({
        ...state,
        cover,
        images,
      });
    } catch (err) {
      console.log(err);
    }
  };


  // const queryClient = useQueryClient();

  // const mutation = useMutation({
  //   mutationFn: (gig) => {
  //     return newRequest.post("/gigs", gig);
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["myGigs"]);
  //   },
  // });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(state);
    await createGig(state, setErrorMsg, setFormLoading);
    if (errorMsg) {
      toast.dark(errorMsg);
    }
  };

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            />
            <label htmlFor="">Category</label>
            <select name="cat" id="cat" onChange={handleChange}>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>
            <div className="images">
              <div className="imagesInputs">
                <label htmlFor="">Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => { setSingleFile(e.target.files[0])}}
                />
                <label htmlFor="">Upload Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(Array.from(e.target.files))}
                />
              </div>
              <button onClick={handleUpload}>
                {uploading ? "uploading" : "Upload"}
              </button>
            </div>
            <label htmlFor="">Description</label>
            <textarea
              name="desc"
              id=""
              placeholder="Brief descriptions to introduce your service to customers"
              cols={0}
              rows={16}
              onChange={handleChange}
            ></textarea>
            <button onClick={handleSubmit}>Create</button>
          </div>
          <div className="details">
            <label htmlFor="">Service Title</label>
            <input
              type="text"
              name="shortTitle"
              placeholder="e.g. One-page web design"
              onChange={handleChange}
            />
            <label htmlFor="">Short Description</label>
            <textarea
              name="shortDesc"
              onChange={handleChange}
              id=""
              placeholder="Short description of your service"
              cols={30}
              rows={10}
            ></textarea>
            <label htmlFor="">Delivery Time (e.g. 3 days)</label>
            <input type="number" name="deliveryTime" onChange={handleChange} />
            <label htmlFor="">Revision Number</label>
            <input
              type="number"
              name="revisionNumber"
              onChange={handleChange}
            />
            <label htmlFor="">Add Features</label>
            <form action="" className="add" onSubmit={handleFeature}>
              <input type="text" placeholder="e.g. page design" />
              <button type="submit">add</button>
            </form>
            <div className="addedFeatures">
              {state?.features?.map((f) => (
                <div className="item" key={f}>
                  <button
                    onClick={() =>
                      setState({   ...state,
                      features: state.features.filter(
                        (feature) => feature !== f)})
                    }
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            <label htmlFor="">Price</label>
            <input type="number" onChange={handleChange} name="price" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
