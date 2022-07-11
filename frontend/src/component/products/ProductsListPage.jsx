import React, { Fragment, useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import LoaderSpinner from '../utilis/LoaderSpinner';
import { getProductsBySlug } from '../../redux/actions/productAction';
import { useParams } from 'react-router-dom';
import CatPage from '../../page/CatPage';
function ProductsListPage() {
  const params = useParams();
  const dispatch = useDispatch();
  console.log(params);

  useEffect(() => {
    dispatch(getProductsBySlug(params.slug));
  }, []);
  // const { products, loading } = useSelector(
  //   (state) => state.productsManagement
  // );
  const { products, loading } = useSelector((state) => state.getProductsBySlug);
  return (
    <Fragment>
      {loading ? <LoaderSpinner /> : <CatPage products={products} />}
    </Fragment>
  );
}

export default ProductsListPage;
