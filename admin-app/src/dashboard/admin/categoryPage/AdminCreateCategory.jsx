import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  adminCreateCategory,
  clearErrors,
} from '../../../redux/actions/categoryAction';
import './admin-create-category.scss';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const AdminCreateCategory = () => {
  //!for create new category
  const [enterCategoryName, setEnterCategoryName] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');
  const [categoryImage, setCategoryImage] = useState('');
  const [categoryType, setCategoryType] = useState('');
  const [categoryImagePre, setCategoryImagePre] = useState(
    'https://brecke.com/wp-content/uploads/2017/06/no-image-icon-13.png'
  );

  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };
  const handleImageChange = (e) => {
    setCategoryImage(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setCategoryImagePre(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmitCategory = (e) => {
    e.preventDefault();

    const form = new FormData();

    form.append('name', enterCategoryName);
    form.append('parentId', parentCategoryId);
    form.append('categoryImage', categoryImage);
    form.append('showType', categoryType);

    const promise = dispatch(adminCreateCategory(form));

    toast
      .promise(promise, {
        loading: 'Loading',
        success: 'Category Updated successfully',
        error: 'Error happened',
      })
      .then(() => navigate('/admin/categories'))
      .catch((error) => {
        toast.error(error);
        dispatch(clearErrors());
      });
  };
  return (
    <div className="admin-create-category">
      <form
        onSubmit={handleSubmitCategory}
        className="admin-create-category__form"
      >
        <div className="field_container">
          <label htmlFor="category-name" className="field-label">
            Category Name
          </label>
          <input
            required
            className="field-input"
            id="category-name"
            type="text"
            placeholder="Enter category name"
            onChange={(e) => setEnterCategoryName(e.target.value)}
          />
        </div>
        <div className="field_container">
          <label htmlFor="cat-select-parent" className="field-label">
            Select Parent Category if there
          </label>
          <select
            id="cat-select-parent"
            onChange={(e) => setParentCategoryId(e.target.value)}
            value={parentCategoryId}
            className="field-input"
          >
            <option value=" ">Choose Parent Category</option>
            {createCategoryList(categories) &&
              createCategoryList(categories).map((option) => (
                <option value={option.value} key={option.value}>
                  {option.name}
                </option>
              ))}
          </select>
        </div>
        <div className="field_container">
          <label htmlFor="cat-select-parent" className="field-label">
            Select Type
          </label>
          <select
            id="cat-select-parent"
            value={categoryType}
            onChange={(e) => setCategoryType(e.target.value)}
            className="field-input"
          >
            <option value=""></option>
            <option value="store">Store</option>
            <option value="product">Product</option>
            <option value="page">Page</option>
          </select>
        </div>
        <div className="field_container">
          <img
            src={categoryImagePre}
            alt="cat"
            className="field_container__preview"
          />
        </div>
        <div className="field_container">
          <input
            type="file"
            className="upload-field"
            name="category"
            id="customFile"
            accept="images/*"
            onChange={(e) => handleImageChange(e)}
            // onChange={(e) => setCategoryImage(e.target.files[0])}
          />
        </div>
        <button type="submit" className="create-category-btn">
          Create
        </button>
      </form>
    </div>
  );
};

export default AdminCreateCategory;
